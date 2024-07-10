const mongoose = require('mongoose');
const rentalSchema = new mongoose.Schema({
  carType: {
    type: String,
    enum: ['Sedan', 'SUV'],
    required: [true, 'Please select a car type'],
  },
  model: {
    type: String,
    required: [true, 'Please provide a car model name'],
  },
  make: {
    type: Number,
    required: [true, 'Please provide a car make year'],
  },
  dailyRate: {
    type: Number,
    required: [true, 'Please eneter a daily fair price'],
  },
  available: Date,
  color: {
    type: String,
    required: [true, 'Please eneter a car color'],
  },
  image: String,
  fuelType: {
    type: String,
    enum: ['Petrol', 'Gas'],
  },
  carLocation: {
    type: String,
    required: [true, 'Please enter car pickup location'],
  },
  carNumber: {
    type: String,
    required: [true, 'Please enter a car number'],
  },
  user: {
    type: mongoose.Schema.ObjectId,
    ref: 'User',
  },
});

const Rental = mongoose.model('Rental', rentalSchema);
module.exports = Rental;
