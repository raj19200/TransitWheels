const express = require('express');
const parcelController = require('../controller/parcelController');
const userController = require('../controller/userController');

const router = express.Router();
router.use(userController.protect);
router
  .route('/')
  .get(parcelController.getAllParcel)
  .post(parcelController.createParcel);

router
  .route('/:parcelId')
  .get(parcelController.getParcel)
  .patch(parcelController.updateParcel)
  .delete(parcelController.deleteParcel);
router
  .route('/bookedParcel/assignedParcel/:deliverID?')
  .get(parcelController.getAllAssignedParcel)
  .post(parcelController.deliverParcel);
router.route('/bookedParcel/:parcelId').post(parcelController.bookeParcel);

module.exports = router;
