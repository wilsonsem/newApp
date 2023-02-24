const express = require('express')
const router = express.Router()
const atdController = require('../controllers/attendanceController')


router.route('/attendance')
    .get(atdController.showAttendancePage)
    // .post(userController.)


// router.route('/login')
//     .get(userController.showSignIn)
    // .post(controller.loginUser)    

// router.route('/:id')
//     .get()
//     .patch()
//     .delete()
    
    
module.exports = router    