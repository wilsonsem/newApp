const express = require('express')
const authControllers = require('../controllers/userController')
const atdControllers = require('../controllers/attendanceController')
require('../models/userModel')
// const authMiddleware = require('../middleware/authMiddleware')
const router = express.Router()
//user registration route
//get user profile route

//user login route
 router.route('/attendance')
        .get(atdControllers.showAttendancePage)
        .post(atdControllers.verifyPresentAtd)

// router..route('/profile')get('/', authMiddleware.protect, controllers.getUserProfile)


module.exports = router