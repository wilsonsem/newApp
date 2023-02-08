const express = require('express')
const controllers = require('../controllers/userController')
require('../models/userModel')
const authMiddleware = require('../middleware/authMiddleware')
const router = express.Router()

//user login route
router.post('/login', controllers.userLogin)

//user registration route
router.post('/register', controllers.userRegistration)

//get user profile route
router.get('/', authMiddleware.protect, controllers.getUserProfile)


module.exports = router