const express = require('express');
const userRouter = require('./routes/userRoutes');
const rentalRouter = require('./routes/rentalRoutes');
const app = express();

app.use(express.json({ limit: '10kb' }));
app.use(express.urlencoded({ extended: true, limit: '10kb' }));

app.use('/user', userRouter);
app.use('rental', rentalRouter);
module.exports = app;
