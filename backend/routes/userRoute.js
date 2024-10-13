const express = require('express');
const router = express.Router();

const { Signup, Login, Logout } = require('../controllers/userController')

router.route("/signup").post(Signup)

router.route("/login").post(Login)

router.route("/logout").post(Logout)

module.exports = router;