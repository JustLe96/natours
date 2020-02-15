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

exports.globalErrorHandler = function(err, req, res, next) {
  err.statusCode = err.statusCode || 500;
  err.status = err.status || 'error';

  if (process.env.NODE_ENV === 'development') {
    sendErrorDev(err, res);
  } else if (process.env.NODE_ENV === 'production') {
    sendErrorPro(err, res);
  }
};
