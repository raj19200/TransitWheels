const mongoose = require('mongoose');
const rideSchema = new mongoose.Schema({
  fromCity: {
    type: String,
    required: [true, 'Please enter a pick-up city'],
  },
  toCity: {
    type: String,
    required: [true, 'Please enter a drop-off city'],
  },
  date: {
    type: Date,
    required: [true, 'Please select a date'],
  },
  price: {
    type: Number,
    required: [true, 'Please enter a price'],
  },
  parcel: {
    type: Boolean,
    default: false,
  },
  weight: Number,
});

const Ride = mongoose.Model('Ride', rideSchema);
module.exports = Ride;
