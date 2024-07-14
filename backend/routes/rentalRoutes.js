const express = require('express');
const userController = require('../controller/userController');
const rentalController = require('../controller/rentalController');
const router = express.Router();
router.use(userController.protect);
router
  .route('/')
  .get(rentalController.getAllCars)
  .post(rentalController.createRental);

router.route('/dashboard').get(rentalController.getMyBooking);
router.route('/carOwnerDashboard').get(rentalController.getOwnerBooking);

router
  .route('/:carId')
  .post(rentalController.carUserDetails, rentalController.bookCar)
  .patch(rentalController.updateCar)
  .delete(rentalController.deleteCar);
module.exports = router;
