const Ride = require('../models/rideModel');
const { getCityName } = require('../utils/geoCode');
const getIntermediateCities = require('../utils/getIntermediateCities');

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

exports.getAllRide = async (req, res, next) => {
  const rides = await Ride.find();
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
    fromCity,
    $or: [
      {
        toCity,
      },
      {
        intermediateCities: toCity,
      },
    ],
    date,
  }).select('-_id -intermediateCities');

  res.status(200).json({
    status: 'Success',
    data: { search },
  });
};
