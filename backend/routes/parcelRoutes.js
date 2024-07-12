const express = require('express');
const parcelController = require('../controller/parcelController');
const userController = require('../controller/userController');

const router = express.Router();
router.use(userController.protect);
router
  .route('/')
  .get(parcelController.getAllParcel)
  .post(parcelController.createParcel);

router.route('/:parcelId').get(parcelController.getParcel);
module.exports = router;
