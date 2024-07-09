const express = require('express');
const userController = require('../controller/userController');
const rentalController = require('../controller/rentalController');
const router = express.Router();
router.use(userController.protect);
router
  .route('/')
  .get(rentalController.getAllCars)
  .post(rentalController.createRental);

module.exports = router;
