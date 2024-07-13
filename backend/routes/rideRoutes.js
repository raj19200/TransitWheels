const express = require('express');
const userController = require('../controller/userController');
const rideController = require('../controller/rideController');

const router = express.Router();

router.use(userController.protect);
router
  .route('/')
  .get(rideController.getAllPostedRide)
  .post(rideController.createRide);

router.route('/searchRide').post(rideController.searchRide);

router.route('/:rideId').post(rideController.bookRide);

router.route('/dashBoard').get(rideController.getAllBookedRide);

router
  .route('/getAllCustomeBookings')
  .get(rideController.getAllCustomerBookings);
module.exports = router;
