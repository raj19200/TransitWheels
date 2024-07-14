const { default: mongoose } = require('mongoose');
const Ride = require('../models/rideModel');
const { getCityName } = require('../utils/geoCode');
const getIntermediateCities = require('../utils/getIntermediateCities');
const RideBooking = require('../models/rideBookingModel');
const User = require('../models/userModel');

exports.createRide = async (req, res, next) => {
  const rideDetail = {
    fromCity: req.body.fromCity,
    toCity: req.body.toCity,
    date: req.body.date,
    price: req.body.price,
    user: req.user._id,
    parcel: req.body.parcel,
    weight: req.body.weight,
  };

  const ride = await Ride.create(rideDetail);

  if (ride.length == 0) {
    return res.status(204);
  }

  res.status(201).json({
    status: 'Success',
    data: { ride },
  });
};

exports.getAllPostedRide = async (req, res, next) => {
  const rides = await Ride.find({ user: req.user._id });
  if (rides.length == 0) {
    return res.status(204);
  }
  res.status(200).json({
    status: 'Success',
    data: { rides },
  });
};

exports.getAllBookedRide = async (req, res, next) => {
  const rides = await RideBooking.find({ user: req.user._id });
  if (rides.length == 0) {
    return res.status(204);
  }
  res.status(200).json({
    status: 'Success',
    data: { rides },
  });
};

exports.searchRide = async (req, res, next) => {
  const { fromCity, toCity, date } = req.body;

  const search = await Ride.find({
    user: { $ne: req.user._id },
    fromCity,
    date,
    $or: [
      {
        toCity,
      },
      {
        intermediateCities: toCity,
      },
    ],
  }).select('-intermediateCities');

  res.status(200).json({
    status: 'Success',
    data: { search },
  });
};

exports.bookRide = async (req, res, next) => {
  const rideDetail = await Ride.findById(req.params.rideId);
  const bookingDetails = {
    user: req.user._id,
    ride: req.params.rideId,
    pickupAddress: req.body.pickupAddress,
    dropOffAddress: req.body.dropOffAddress,
    seats: req.body.seats,
  };

  if (bookingDetails.seats > rideDetail.user.carDetails.seats) {
    return res.status(400).json({
      status: 'Fail',
      message: 'The requested number of seats exceeds the available seats.',
    });
  }
  const riderId = rideDetail.user._id;
  const session = await mongoose.startSession();
  session.startTransaction();
  let rideBooking;
  try {
    await User.findByIdAndUpdate(
      riderId,
      { $inc: { 'carDetails.seats': -bookingDetails.seats } },
      { session },
    );
    rideBooking = await RideBooking.create([bookingDetails], { session });

    await session.commitTransaction();
  } catch (err) {
    await session.abortTransaction();
    return res.status(404).json({
      status: 'Fail',
      mesage: err.message,
    });
  } finally {
    await session.endSession();
  }
  res.status(200).json({
    status: 'Success',
    data: rideBooking,
  });
};

exports.getAllCustomerBookings = async (req, res, next) => {
  const rides = await Ride.find({ user: req.user._id });
  let ridesId = [];
  rides.forEach((ride) => {
    ridesId.push(ride._id);
  });
  const customerDetails = await RideBooking.find({
    ride: { $in: ridesId },
  })
    .select('pickupAddress dropOffAddress')
    .populate('user', 'firstName phoneNumber')
    .populate('ride', '-_id -intermediateCities -price -parcel -weight -__v');
  res.status(200).json({
    status: 'Success',
    data: { customerDetails },
  });
};
exports.updateRide = async (req, res, next) => {
  const updateRide = await Ride.findByIdAndUpdate(req.params.rideId, req.body, {
    upsert: true,
    runValidators: true,
    new: true,
  });
  if (!updateRide) {
    return res.status(404).json({
      status: 'Fail',
      message: 'There is no parcel from this id to update',
    });
  }
  res.status(200).json({
    status: 'Success',
    data: { updateRide },
  });
};

exports.deleteRide = async (req, res, next) => {
  const doc = await Ride.findByIdAndDelete(req.params.parcelId);

  if (!doc) {
    return res.status(404).json({
      status: 'success',
      data: null,
    });
  }

  res.status(204).json({
    status: 'success',
    data: null,
  });
};
