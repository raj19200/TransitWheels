const ParcelBooking = require('../models/parcelBookingModel');
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
  const parcels = await Parcel.find({
    senderCity: { $in: riderDetails.intermediateCities },
    recipientCity: { $in: riderDetails.intermediateCities },
  })
    .populate('user', 'firstName phoneNumber')
    .select('-__v');
  if (parcels.length == 0) {
    return res.status(404).json({
      status: 'Fail',
      message: `There is no parcel available between ${riderDetails.fromCity.split(',')[0]} and ${riderDetails.toCity.split(',')[0]}`,
    });
  }
  res.status(200).json({
    status: 'Success',
    parcels,
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

exports.bookeParcel = async (req, res, next) => {
  const bookParcel = await ParcelBooking.create({
    parcel: req.params.parcelId,
    user: req.user._id,
  });

  if (bookParcel.length == 0) {
    return res.status(204);
  }

  res.status(200).json({
    status: 'Success',
    data: { bookParcel },
  });
};

exports.getAllAssignedParcel = async (req, res, next) => {
  const parcel = await ParcelBooking.find({ user: req.user._id });
  res.status(200).json({
    status: 'Success',
    data: { parcel },
  });
};

exports.deliverParcel = async (req, res, next) => {
  const parcel = await ParcelBooking.findById(req.params.deliverID);
  await Parcel.findByIdAndUpdate(parcel.parcel, {
    isDelivered: true,
  });

  res.status(200).json({
    status: 'Success',
  });
};

exports.updateParcel = async (req, res, next) => {
  const updateParcel = await Parcel.findByIdAndUpdate(
    req.params.parcelId,
    req.body,
    {
      upsert: true,
      runValidators: true,
      new: true,
    },
  );
  if (!updateParcel) {
    return res.status(404).json({
      status: 'Fail',
      message: 'There is no parcel from this id to update',
    });
  }
  res.status(200).json({
    status: 'Success',
    data: { updateParcel },
  });
};

exports.deleteParcel = async (req, res, next) => {
  const doc = await Parcel.findByIdAndDelete(req.params.parcelId);

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
