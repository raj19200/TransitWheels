const express = require('express');
const userRouter = require('./routes/userRoutes');
const rentalRouter = require('./routes/rentalRoutes');
const parcelRouter = require('./routes/parcelRoutes');
const rideRouter = require('./routes/rideRoutes');

const app = express();

app.use(express.json({ limit: '10kb' }));
app.use(express.urlencoded({ extended: true, limit: '10kb' }));

app.use('/user', userRouter);
app.use('/rental', rentalRouter);
app.use('/parcel', parcelRouter);
app.use('/ride', rideRouter);
module.exports = app;
