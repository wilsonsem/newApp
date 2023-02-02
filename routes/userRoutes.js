const express = require('express')
require('../models/userModel')
require('../controllers/userController')

const router = express.Router()

//
router.get('/', (req, res) => {
    res.send("User Profile")
})
router.post('/login', (req, res)=>{
    res.send("Login route")
})
router.post('/register', (req, res)=>{
    res.send("Sign up route")
})

module.exports = router