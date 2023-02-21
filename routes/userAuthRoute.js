const express = require('express')
const controllers = require('../controllers/userController')
require('../models/userModel')
const authMiddleware = require('../middleware/authMiddleware')
const router = express.Router()

//user login route
router.route('/login')
    .get(controllers.showLogin)
    .post(controllers.userLogin)

//user registration route
router.route("/register")
    .get(controllers.showSignup)
    .post(controllers.userRegistration)

//get user profile route
router.route("/profile")
    .get(authMiddleware.protect, controllers.getUserProfile)
router.route("/logout")
    .get()

module.exports = router