const fs = require('fs');

const tours = JSON.parse(
  fs.readFileSync(`${__dirname}/../dev-data/data/tours-simple.json`)
);

/* CALL BACK FUNCTION FOR HTTP ACTIONS */
exports.getAllTour = (req, res) => {
  res.status(200).json({
    status: 'success',
    data: {
      tours
    }
  });
};
exports.getTourById = (req, res) => {
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
exports.createTour = (req, res) => {
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
exports.updateTour = (req, res) => {
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
exports.deleteTour = (req, res) => {
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
