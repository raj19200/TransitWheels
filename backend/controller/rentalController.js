const { default: mongoose } = require('mongoose');
const RentalBooking = require('../models/rentalBookingModel');
const Rental = require('../models/rentalModel');
exports.createRental = async (req, res, next) => {
  const carDetails = {
    carType: req.body.carType,
    model: req.body.model,
    make: req.body.make,
    dailyRate: req.body.dailyRate,
    available: req.body.available,
    color: req.body.color,
    image: req.body.image,
    fuelType: req.body.fuelType,
    carLocation: req.body.carLocation,
    carNumber: req.body.carNumber,
    user: req.user._id,
  };

  const car = await Rental.create(carDetails);
  if (car.length == 0) {
    return res.status(204);
  }
  res.status(201).json({
    status: 'Success',
    data: { car },
  });
};

exports.getAllCars = async (req, res, next) => {
  const cars = await Rental.find({
    active: { $ne: false },
    user: { $ne: req.user._id },
  });
  if (cars.length == 0) {
    return res.status(204).json({
      status: 'Success',
      message:
        'There is no cars available for the rental! Please try again after some times😊',
    });
  }
  res.status(200).json({
    status: 'Success',
    data: { cars },
  });
};

exports.bookCar = async (req, res, next) => {
  if (!req.body && !req.carUserDetails) {
    return res.status(404).json({
      status: 'Fail',
      message: 'Something went wrong! Please try again😊',
    });
  }
  if (req.carUserDetails.user._id == req.user._id) {
    return res.status(404).json({
      status: 'Fail',
      message:
        'You cant book this car because you have posted this car. Please try to book some other car',
    });
  }
  const bookingDetails = {
    startDate: new Date(req.body.startDate),
    endDate: new Date(req.body.endDate),
    pickupTime: req.body.pickupTime,
    license: req.body.license,
    issuedCountry: req.body.issuedCountry,
    birthDate: new Date(req.body.birthDate),
    issuedDate: new Date(req.body.issuedDate),
    expiryDate: new Date(req.body.expiryDate),
    rental: req.carUserDetails._id,
    user: req.user._id,
  };
  const carId = bookingDetails.rental;
  const session = await mongoose.startSession();
  session.startTransaction();
  let rentalBooking;
  try {
    await Rental.findByIdAndUpdate(carId, { active: false }, { session });
    rentalBooking = await RentalBooking.create([bookingDetails], { session });
    await session.commitTransaction();
  } catch (err) {
    await session.abortTransaction();
  } finally {
    await session.endSession();
  }
  res.status(200).json({
    status: 'Success',
    data: { rentalBooking },
  });
};

exports.carUserDetails = async (req, res, next) => {
  const { carId } = req.params;
  const carUserDetails = await Rental.findById(carId)
    .populate('user', '-__v') // Populate the 'user' field, excluding '__v'
    .exec();
  req.carUserDetails = carUserDetails;
  next();
};

exports.getMyBooking = async (req, res, next) => {
  const myBookings = await RentalBooking.find({ user: req.user._id });
  if (myBookings == 0) {
    return res.status(404).json({
      status: 'Fail',
      message: "You've not booked any car so far! Please make a booking.",
    });
  }
  res.status(200).json({
    status: 'Success',
    data: { myBookings },
  });
};

exports.getOwnerBooking = async (req, res, next) => {
  const carDetails = await Rental.find({ user: req.user._id }).select(
    'carNumber active',
  );

  if (carDetails.length === 0) {
    return res.status(404).json({
      status: 'Fail',
      message: "You've not posted any car for rental.",
    });
  }
  let renterDetails = [];
  await Promise.all(
    carDetails.map(async (carDetail) => {
      const bookings = await RentalBooking.find({ rental: carDetail._id })
        .select('startDate endDate -_id')
        .populate('user', 'firstName email phoneNumber')
        .populate('rental', 'carNumber');
      if (bookings.length > 0) {
        renterDetails.push(...bookings);
      }
    }),
  );
  carDetails.map((carDetail) => {
    if (carDetail.active) {
      renterDetails.push(carDetail);
    }
  });
  res.status(200).json({
    status: 'Success',
    data: { renterDetails },
  });
};
