const express = require('express')
const controllers = require('../controllers/userController')
require('../models/userModel')
const authMiddleware = require('../middleware/authMiddleware')
const router = express.Router()
//user registration route
//get user profile route

//user login route
router.route('/login')
    .get(controllers.showLogin)
    .post(controllers.userLogin)

router.route("/register")
    .get(controllers.showSignup)
    .post(controllers.userRegistration)

router.route("/profile")
    .get(authMiddleware.protect, controllers.getUserProfile)


module.exports = router