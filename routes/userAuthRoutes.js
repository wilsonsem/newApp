const express = require('express')
const router = express.Router()
const userController = require('../controllers/userController')


router.route('/register')
    // .get(userController.showSignUp)
    .post(userController.registerUser)


router.route('/login')
    .get(userController.showSignIn)
    // .post(controller.loginUser)    

// router.route('/:id')
//     .get()
//     .patch()
//     .delete()
    
    
module.exports = router    