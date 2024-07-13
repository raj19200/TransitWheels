const mongoose = require('mongoose');

const parcelBookingSchema = mongoose.Schema({
  parcel: {
    type: mongoose.Schema.ObjectId,
    ref: 'Parcel',
  },
  user: {
    type: mongoose.Schema.ObjectId,
    ref: 'User',
  },
});

const ParcelBooking = mongoose.model('ParcelBookings', parcelBookingSchema);
module.exports = ParcelBooking;
