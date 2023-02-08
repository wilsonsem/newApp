const express = require('express')
const controllers = require('../controllers/attendanceController')
require('../models/userModel')
const authMiddleware = require('../middleware/authMiddleware')
const router = express.Router()
//user registration route
//get user profile route

//user login route
 router.route('/attendance')
        .get(controllers.showAttendancePage)
        // .post()

// router..route('/profile')get('/', authMiddleware.protect, controllers.getUserProfile)


module.exports = router