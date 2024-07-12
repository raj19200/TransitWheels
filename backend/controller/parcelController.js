const Parcel = require('../models/parcelModel');

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
  // sendercity and recipient city are dummy as for now. we will fetch it from database when we create a ride
  const parcels = await Parcel.find({
    senderCity: 'Anytown',
    recipientCity: 'Sometown',
  })
    .populate('user', 'firstName phoneNumber')
    .select('-_id -__v');
  if (parcels.length == 0) {
    return res.status(204);
  }
  res.status(201).json({
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
