const Parcel = require('../models/parcelModel');
const Ride = require('../models/rideModel');

exports.createParcel = async (req, res, next) => {
  const parcelDetails = {
    user: req.user._id,
    senderAddress: req.body.senderAddress,
    senderCity: req.body.senderCity,
    recipientName: req.body.recipientName,
    recipientAddress: req.body.recipientAddress,
    recipientCity: req.body.recipientCity,
    description: req.body.description,
    weight: req.body.weight,
    isDelivered: req.body.isDelivered,
    image: req.body.image,
    createdAt: req.body.createdAt,
  };
  const parcel = await Parcel.create(parcelDetails);

  if (parcel.length == 0) {
    return res.status(204);
  }
  res.status(201).json({
    status: 'Success',
    data: { parcel },
  });
};

exports.getAllParcel = async (req, res, next) => {
  const riderDetails = await Ride.findOne({ user: req.user._id });
  console.log(riderDetails);
  const parcels = await Parcel.find({
    senderCity: { $in: riderDetails.intermediateCities },
    recipientCity: { $in: riderDetails.intermediateCities },
  })
    .populate('user', 'firstName phoneNumber')
    .select('-_id -__v');
  console.log(parcels);
  if (parcels.length == 0) {
    return res.status(404).json({
      status: 'Fail',
      message: `There is no parcel available between ${riderDetails.fromCity.split(',')[0]} and ${riderDetails.toCity.split(',')[0]}`,
    });
  }
  res.status(200).json({
    status: 'Success',
    data: { parcels },
  });
};

exports.getParcel = async (req, res, next) => {
  const parcel = await Parcel.findById(req.params.parcelId).select(
    'recipientName description isDelivered',
  );
  if (parcel.length == 0) {
    return res.status(204);
  }
  res.status(201).json({
    status: 'Success',
    data: { parcel },
  });
};
