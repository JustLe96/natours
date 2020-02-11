const express = require('express');
const fs = require('fs');

/* SET UP SERVER */
const app = express();
app.use(express.json()); // Declare Middleware to read JSON
const tours = JSON.parse(
  fs.readFileSync(`${__dirname}/dev-data/data/tours-simple.json`)
);

/* CALL BACK FUNCTION FOR HTTP ACTIONS */
const getAllTour = (req, res) => {
  res.status(200).json({
    status: 'success',
    data: {
      tours
    }
  });
};
const getTourById = (req, res) => {
  const tour = tours.find(el => el.id === parseInt(req.params.id));

  if (!tour) {
    return res.status(404).json({
      status: 'fail',
      message: 'Invalid ID'
    });
  }

  res.status(200).json({
    status: '200',
    data: { tour }
  });
};
const createTour = (req, res) => {
  //console.log(req.body);
  const newID = tours[tours.length - 1].id + 1;
  const newTour = Object.assign({ id: newID }, req.body);

  tours.push(newTour);
  fs.writeFile(
    `${__dirname}/dev-data/data/tours-simple.json`,
    JSON.stringify(tours),
    err => {
      res.status(201).json({
        status: 'success',
        data: {
          tour: newTour
        }
      });
    }
  );
};
const updateTour = (req, res) => {
  if (parseInt(req.params.id) >= tours.length)
    res.status(404).json({
      status: 'fail',
      message: 'Invalid ID'
    });
  res.status(200).json({
    satus: 'success',
    data: { tour: 'Updated tour here!' }
  });
};
const deleteTour = (req, res) => {
  if (parseInt(req.params.id) >= tours.length)
    res.status(404).json({
      status: 'fail',
      message: 'Invalid ID'
    });
  res.status(200).json({
    satus: 'success',
    data: null
  });
};

app.get('/api/v1/tours', getAllTour);
app.get('/api/v1/tours/:id', getTourById);
app.post('/api/v1/tours', createTour);
app.patch('/api/v1/tours/:id', updateTour);
app.delete('/api/v1/tours/:id', deleteTour);

app.listen(80, () => {
  console.log('App running on port 80');
});
