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
    // user: req.user._id,
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
    res.staus(204).json({
      status: 'Success',
      data: null,
    });
  }
  res.staus(200).json({
    status: 'Success',
    data: { cars },
  });
};
