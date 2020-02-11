const express = require('express');
const fs = require('fs');

const router = express.Router();

const tours = JSON.parse(
  fs.readFileSync(`${__dirname}/../dev-data/data/users.json`)
);

/* CALL BACK FUNCTION FOR HTTP ACTIONS */
const getAllUsers = (req, res) => {
  res.status(500).json({
    status: 'error',
    message: 'this rout is not defined yet'
  });
};
const createUser = (req, res) => {
  res.status(500).json({
    status: 'error',
    message: 'this rout is not defined yet'
  });
};
const getUserById = (req, res) => {
  res.status(500).json({
    status: 'error',
    message: 'this rout is not defined yet'
  });
};
const updateUser = (req, res) => {
  res.status(500).json({
    status: 'error',
    message: 'this rout is not defined yet'
  });
};
const deleteUser = (req, res) => {
  res.status(500).json({
    status: 'error',
    message: 'this rout is not defined yet'
  });
};

// SET UP ROUTER
router
  .route('/')
  .get(getAllUsers)
  .post(createUser);
router
  .route('/:id')
  .get(getUserById)
  .patch(updateUser)
  .delete(deleteUser);

module.exports = router;
