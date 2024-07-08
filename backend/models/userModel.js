const mongoose = require('mongoose');
const validator = require('validator');
const userSchema = new mongoose.Schema({
  userName: {
    type: String,
    unique: true,
    required: [true, 'UserName must have a unique name'],
  },
  firstname: {
    type: String,
    required: [true, 'Please enter a First Name'],
  },
  lastName: {
    type: String,
    required: [true, 'Please enater a Last Name'],
  },
  email: {
    type: String,
    required: [true, 'Please provide your email'],
    unique: true,
    lowercase: true,
    validate: [validator.isEmail, 'Please peovide a valid email'],
  },
  phoneNumber: {
    type: String,
    unique: true,
    required: [true, 'Please provide your valid phone number'],
  },
  address: {
    type: String,
    required: [true, 'Please enter your address'],
  },
  password: {
    type: String,
    minLength: [8, 'Password must contain 8 lettera'],
    required: [true, 'Please enter a password'],
  },
  confirmPassword: {
    type: String,
    required: [true, 'Please enter a confirm password'],
    validate: {
      validator: (val) => {
        return val == this.password;
      },
      message: 'Password and Confirm password must be same',
    },
  },
  userType: {
    type: String,
    enum: ['Customer', 'Rider'],
    default: 'Customer',
  },
  carDetails: {
    licenceNumber: {
      type: String,
      required: [true, 'Please provide a licence number'],
    },
    Number: {
      type: String,
      required: [true, 'Please enter a car number'],
    },
    model: {
      type: String,
      required: [true, 'Please enter a model name'],
    },
    image: String,
    seats: Number,
    carType: {
      type: String,
      enum: ['Sedan', 'SUV'],
    },
  },
});

const User = mongoose.Model('User', userSchema);
module.exports = User;
