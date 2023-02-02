const express = require('express')
const controllers = require('../controllers/userController')
require('../models/userModel')

const router = express.Router()

//
router.get('/', controllers.getUsers)
router.post('/login', controllers.userLogin)
router.post('/register', (req, res)=>{
    res.send("Sign up route")
})

module.exports = router