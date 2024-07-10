const mongoose = require('mongoose');
const parcelSchema = new mongoose.Schema({
  senderName: {
    type: String,
    required: [true, 'Please enter a Sender Name'],
  },
  senderAddress: {
    type: String,
    required: [true, 'Please enter a Sender Address'],
  },
  senderCity: {
    type: String,
    required: [true, 'Please enter a Sender City'],
  },
  recipientName: {
    type: String,
    required: [true, 'Please enter a Recipient Name'],
  },
  recipientAddress: {
    type: String,
    required: [true, 'Please enter a Recipient Address'],
  },
  recipientCity: {
    type: String,
    required: [true, 'Please enter a Recipient City'],
  },
  description: {
    tyep: String,
    trim: true,
    maxLength: [
      40,
      'Description must have less then or equal to 40 characters',
    ],
    minLength: [
      10,
      'Description must have more then or equal to 10 characters',
    ],
  },
  weight: Number,
  isDelivered: {
    type: Boolean,
    default: false,
  },
  image: String,
  createdAt: {
    type: Date,
    default: Date.now(),
  },
});

const Parcel = mongoose.model('Parcel', parcelSchema);
module.exports = Parcel;
