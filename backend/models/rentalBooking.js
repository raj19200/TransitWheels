const mongoose = require('mongoose');

const renatlBookingSchema = new mongoose.Schema({
  startDate: {
    type: Date,
    required: [true, 'Please eneter a start date'],
  },
  endDate: {
    type: Date,
    required: [true, 'Please eneter an end date'],
  },
  pickupTime: {
    type: String,
    required: [true, 'Please eneter a pickup time'],
  },
  license: {
    type: String,
    required: [true, 'Please eneter a licence number'],
  },
  issuedCountry: {
    type: String,
    required: [true, 'Please eneter an issued country'],
  },
  birthDate: {
    type: Date,
    required: [true, 'Please eneter a birth date'],
  },
  issuedDate: {
    type: Date,
    required: [true, 'Please eneter an issued date'],
  },
  expiryDate: {
    type: Date,
    required: [true, 'Please eneter an expiry date'],
  },
  rental: {
    type: mongoose.Schema.ObjectId,
    ref: 'Rental',
  },
  user: {
    type: mongoose.Schema.ObjectId,
    ref: 'User',
  },
});

const RentalBooking = new mongoose.model('RentalBooking', renatlBookingSchema);

module.exports = RentalBooking;
