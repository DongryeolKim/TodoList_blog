const express = require('express');
const app = express();
require('dotenv').config();
const PORT = process.env.PORT || 5000;
const cookieParser = require('cookie-parser');

const mainRoute = require('./routes/mainRoute');
const userRoute = require('./routes/userRoute');
const connectDB = require('./config/connectDB');

connectDB();

app.use(cookieParser());

app.use("/contents", mainRoute);
app.use("/users", userRoute);

app.listen(PORT, () => {
  console.log(`The server is launching at ${PORT} PORT`)
})
