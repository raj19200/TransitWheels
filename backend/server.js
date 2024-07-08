const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config({ path: './config.env' });

const db = process.env.DATABASE_URI.replace('<password>', process.env.PASSWORD);
mongoose.connect(db).then(() => console.log('Database connected successfully'));

const app = require('./app');
const port = process.env.PORT || 3000;
app.listen(process.env.PORT, () => {
  console.log(`App is running on port ${port}`);
});
