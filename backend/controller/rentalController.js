const RentalBooking = require('../models/rentalBooking');
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
  res.status(201).json({
    status: 'Success',
    data: { car },
  });
};

exports.getAllCars = async (req, res, next) => {
  const cars = await Rental.find();
  if (!cars) {
    res.status(204).json({
      status: 'Success',
      data: null,
    });
  }
  res.status(200).json({
    status: 'Success',
    data: { cars },
  });
};

exports.bookCar = async (req, res, next) => {
  if (!req.body && !req.carUserDetails) {
    res.status(404).json({
      status: 'Fail',
      message: 'Something went wrong! Please try again😊',
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
    user: req.carUserDetails.user._id,
  };

  const rentalBooking = await RentalBooking.create(bookingDetails);

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
    res.status(404).json({
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
  const carDetails = await Rental.find({ user: req.user._id });

  let renterDetails = [];

  for (let i = 0; i < carDetails.length; i++) {
    const rentalId = carDetails[i]._id;

    const bookings = await RentalBooking.find({ rental: rentalId });

    if (bookings.length > 0) {
      renterDetails.push(...bookings);
    }
  }

  if (renterDetails.length === 0) {
    return res.status(404).json({
      status: 'Fail',
      message: "You've not posted any car for rental.",
    });
  }

  res.status(200).json({
    status: 'Success',
    data: { renterDetails },
  });
};
