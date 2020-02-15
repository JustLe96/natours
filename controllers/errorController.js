const AppError = require('./../utils/appError');

const sendErrorDev = (err, res) => {
  res.status(err.statusCode).json({
    status: err.status,
    error: err,
    message: err.message,
    stack: err.stack
  });
};

const sendErrorPro = (err, res) => {
  if (err.isOperational) {
    // Operational error, send message to client
    res.status(err.statusCode).json({
      status: err.status,
      message: err.message
    });
  } else {
    // Server error, no information is sent to client
    console.log('INTERNAL ERROR!!!'); // let developer know then to fix
    res.status(500).json({
      status: 'error',
      message: 'Something went very wrong!'
    });
  }
};

const handleCastErrorDB = err => {
  const message = `Invalid ${err.path}: ${err.value}.`;
  return new AppError(message, 400);
};

const handleDuplicateErrorDB = err => {
  const value = err.errmsg.match(/(["'])(\\?.)*?\1/)[0];
  const message = `Duplicate field value: ${value}. Please use another value.`;
  return new AppError(message, 400);
};

const handleValidationErrorDB = err => {
  const errors = Object.values(err.errors).map(el => el.message);
  const message = `Invalid input data: ${errors.join('. ')}.`;
  return new AppError(message, 400);
};

exports.globalErrorHandler = function(err, req, res, next) {
  err.statusCode = err.statusCode || 500;
  err.status = err.status || 'error';

  if (process.env.NODE_ENV === 'development') {
    sendErrorDev(err, res);
  } else if (process.env.NODE_ENV === 'production') {
    let errorCopy = { ...err };
    if (err.name === 'CastError') errorCopy = handleCastErrorDB(errorCopy);
    if (err.code === 11000) errorCopy = handleDuplicateErrorDB(errorCopy);
    if (err.name === 'ValidationError')
      errorCopy = handleValidationErrorDB(errorCopy);
    sendErrorPro(errorCopy, res);
  }
};
