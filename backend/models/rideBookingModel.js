const mongoose = require('mongoose');

const rideBookingSchema = mongoose.Schema({
  user: {
    type: mongoose.Schema.ObjectId,
    ref: 'User',
  },
  ride: {
    type: mongoose.Schema.ObjectId,
    ref: 'Ride',
  },
  pickupAddress: {
    type: String,
    require: [true, 'Please enter a pickup address'],
  },
  dropOffAddress: {
    type: String,
    require: [true, 'Please enter a drop-off address'],
  },
  seats: {
    type: String,
    require: [true, 'Please enater a number of seats you want to book!'],
  },
});

const RideBooking = mongoose.model('RideBookings', rideBookingSchema);
module.exports = RideBooking;
