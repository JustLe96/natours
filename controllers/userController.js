const fs = require('fs');

const users = JSON.parse(
  fs.readFileSync(`${__dirname}/../dev-data/data/users.json`)
);

/* CALL BACK FUNCTION FOR HTTP ACTIONS */
exports.getAllUsers = (req, res) => {
  res.status(500).json({
    status: 'error',
    message: 'this rout is not defined yet'
  });
};
exports.createUser = (req, res) => {
  res.status(500).json({
    status: 'error',
    message: 'this rout is not defined yet'
  });
};
exports.getUserById = (req, res) => {
  res.status(500).json({
    status: 'error',
    message: 'this rout is not defined yet'
  });
};
exports.updateUser = (req, res) => {
  res.status(500).json({
    status: 'error',
    message: 'this rout is not defined yet'
  });
};
exports.deleteUser = (req, res) => {
  res.status(500).json({
    status: 'error',
    message: 'this rout is not defined yet'
  });
};
