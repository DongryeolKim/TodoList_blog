const asyncHandler = require('express-async-handler');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
require('dotenv').config();

const User = require('../models/User');
const SECRETKEY = process.env.SECRETKEY;




const Signup = asyncHandler(async (req, res, next) => {
  const { username, userid, password } = req.body;

  const isUsingId = await User.findOne({ userid });

  if (isUsingId) {
    return res.status(401).json({ message: "ID is in use." })
  }

  const hashPassword = await bcrypt.hash(password, 12);

  const userdata = await User.create({ username, userid, password: hashPassword });

  const token = jwt.sign({ id: userdata._id }, SECRETKEY, { expiresIn: '1h' })

  res.cookie('token', token, { httpOnly: true });

  res.status(200).json({ message: "Signup Completed", token })

})




const Login = asyncHandler(async (req, res, next) => {
  const { userid, password } = req.body;

  const userdata = await User.findOne({ userid });

  if (!userdata) {
    return res.status(401).json({ message: "No matching ID exists." })
  }

  const isValidPassword = await bcrypt.compare(password, userdata.password);

  if (!isValidPassword) {
    return res.status(401).json({ message: "The password is wrong." })
  }

  const token = jwt.sign({ id: userdata._id }, SECRETKEY, { expiresIn: '1h' })

  res.cookie('token', token, { httpOnly: true });

  res.status(200).json({ message: "Login Completed", token })
})




const Logout = asyncHandler(async (req, res, next) => {
  res.clearCookie('token');
  res.status(200).json({ message: "Logout Completed" })
})




module.exports = { Signup, Login, Logout };