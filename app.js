const express = require('express');
const fs = require('fs');
const morgan = require('morgan');
const tourRouter = require('./routes/tourRoutes.js');
const userRouter = require('./routes/userRoutes.js');

/* SET UP SERVER */
const app = express();
// Declare Middleware to read JSON
app.use(morgan('dev'));

app.use(express.json());

/* SET UP ROUTING */
app.use('/api/v1/tours', tourRouter);
app.use('/api/v1/users', userRouter);

// START THE SERVER
app.listen(80, () => {
  console.log('App running on port 80');
});
