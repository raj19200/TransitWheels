const jwt = require('jsonwebtoken');
const User = require('../models/userModel');
const promisify = require('util');

const signToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });
};
const createSendToken = (user, statusCode, res) => {
  const token = signToken(user._id);
  const cookieOptions = {
    expires: new Date(
      Date.now() + process.env.JWT_COOKIE_EXPIRES_IN * 24 * 60 * 60 * 1000,
    ),
    httpOnly: true,
  };
  res.cookie('jwt', token, cookieOptions);
  user.password = undefined;
  res.status(statusCode).json({
    status: 'Success',
    token,
    data: { user },
  });
};

// Register
exports.register = async (req, res, next) => {
  const userData = {
    userName: req.body.userName,
    firstname: req.body.firstname,
    lastName: req.body.lastName,
    email: req.body.email,
    phoneNumber: req.body.phoneNumber,
    address: req.body.address,
    password: req.body.password,
    confirmPassword: req.body.confirmPassword,
    userType: req.body.userType,
  };

  if (req.body.carDetails) {
    userData.carDetails = {
      licenceNumber: req.body.carDetails.licenceNumber,
      carNumber: req.body.carDetails.carNumber,
      model: req.body.carDetails.model,
      image: req.body.carDetails.image,
      seats: req.body.carDetails.seats,
      carType: req.body.carDetails.carType,
    };
  }
  const user = await User.create(userData);

  res.status(201).json({
    status: 'Success',
    data: { user },
  });
};

// Login
exports.login = async (req, res, next) => {
  const { userName, email, password } = req.body;
  console.log(userName, email, password);

  if (!userName && !email) {
    return res.status(400).json({
      status: 'Fail',
      message: 'Please provide userName or email and password',
    });
  }

  try {
    let user;
    if (userName) {
      user = await User.findOne({ userName }).select('+password');
    } else if (email) {
      user = await User.findOne({ email }).select('+password');
    }

    if (!user || !(await user.checkPassword(password, user.password))) {
      return res.status(401).json({
        status: 'Fail',
        message: 'Incorrect userName or password',
      });
    }

    createSendToken(user, 200, res);
  } catch (err) {
    // Log the error and send a response if one has not already been sent
    console.error('Error in login function:', err);
    if (!res.headersSent) {
      res.status(500).json({
        status: 'Error',
        message: err.message,
      });
    }
  }
};

// To check user is loged-in or not
exports.protect = async (req, res, next) => {
  // 1) Getting Token and check it's there.
  let token;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    token = req.headers.authorization.split('')[1];
  } else if (req.cookie.jwt) {
    token = req.cookie.jwt;
  }

  if (!token) {
    res.status(401).json({
      message: 'You are not logged in! Please log in to get access',
    });
  }

  // 2)Verification of token
  const decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET);

  // 3) Check if user still exists
  const currentUser = await User.findById(decoded.id);

  if (!currentUser) {
    res.status(401).json({
      message: 'The user belonging to this token no longer exist',
    });
  }
  // if (currentUser.changePasswordAfter(decoded.iat)) {
  //   res.status(401).json({
  //     message: 'User recently changed password! Please log in again',
  //   });
  // }
  // Grant access to protected route
  req.user = currentUser;
  next();
};
