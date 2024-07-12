const express = require('express');
const userController = require('../controller/userController');
const rideController = require('../controller/rideController');

const router = express.Router();

router.use(userController.protect);

router
  .route('/')
  .get(rideController.getAllRide)
  .post(rideController.createRide);

router.route('/searchRide').post(rideController.searchRide);

module.exports = router;
