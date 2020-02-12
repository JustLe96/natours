const express = require('express');
const tourController = require('../controllers/tourController');

/* SET UP ROUTER */
const router = express.Router();
router
  .route('/')
  .get(tourController.getAllTour)
  .post(tourController.checkBody, tourController.createTour);

router.param('id', tourController.checkID);

router
  .route('/:id')
  .get(tourController.getTourById)
  .patch(tourController.updateTour)
  .delete(tourController.deleteTour);

module.exports = router;
