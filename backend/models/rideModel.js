const mongoose = require('mongoose');
const { getCities } = require('../utils/getIntermediateCities');
const rideSchema = new mongoose.Schema({
  fromCity: {
    type: String,
    required: [true, 'Please enter a pick-up city'],
  },
  toCity: {
    type: String,
    required: [true, 'Please enter a drop-off city'],
  },
  intermediateCities: [
    {
      type: String,
    },
  ],
  date: {
    type: Date,
    required: [true, 'Please select a date'],
  },
  price: {
    type: Number,
    required: [true, 'Please enter a price'],
  },
  user: {
    type: mongoose.Schema.ObjectId,
    ref: 'User',
  },
  parcel: {
    type: Boolean,
    default: false,
  },
  weight: Number,
  active: {
    type: Boolean,
    default: true,
    select: false,
  },
});

rideSchema.pre('save', async function (next) {
  this.intermediateCities = await getCities(this.fromCity, this.toCity);
});
rideSchema.pre(/^find/, function (next) {
  this.populate({
    path: 'user',
    select: '-_id -__v -userName -email -address -userType',
  });
  next();
});

const Ride = mongoose.model('Ride', rideSchema);
module.exports = Ride;
