const mongoose = require('mongoose');
require('dotenv').config();
const asyncHandler = require('express-async-handler');

const MONGOURI = process.env.MONGODB_CONNECT_URI

const connectDB = asyncHandler(async () => {
  await mongoose.connect(MONGOURI)
  console.log('Connect mongoDB')
})

module.exports = connectDB;