const User = require('../models/userModel')
const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')
const tokenUtil = require('../utils/generateToken')

exports.showLogin = async(req, res) => {
   res.render('login')
}
exports.userLogin = async(req, res) => {
    
    const data = {
        email : req.body.email,
        password : req.body.password
    }
    const user = await User.findOne({ email : req.body.email })

    if(user && (await user.matchPassword(data.password))){
        console.log("logged in")
        res.status(200).json({
            _id: user._id,
            firstName: user.firstName,
            email: user.email,
            token: tokenUtil.generateToken(user._id)
        })
        // res.render("index")
    }else{
         res.status(200).json({success: false})
    }
}
    

    
exports.showSignup = async(req, res) => {
    res.render('register')
    }

//new user registration
exports.userRegistration = async( req, res) => {

    const data = {
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email : req.body.email,
        password : req.body.password,
        cPassword : req.body.cPassword,
        status: req.body.status
    }
   
    console.log(data.status)
    const userExist = await User.findOne({email: req.body.email})
    if(userExist){
        res.status(401)
        throw new Error("User already Exist")
    }

     
    const salt = await bcrypt.genSalt(10)
    data.password = await bcrypt.hash(data.password, salt)
    const user = await User.insertMany([data])
    if(user){
        console.log("sucessful")
        // res.send({
        //     _id : user._id,
        //     firstName : user.firstName,
        //     email: user.email,
        //     isAdmin: user.isAdmin,
        //     // token: tokenUtil.generateToken(user._id)
        // })
        res.render("login")
    }else{
        res.status(401)
        throw new Error("Registration failed")
    }
}


exports.getUserProfile = async ( req, res) => {

    const user = await User.findById(req.user.id)

    if(user){
        res.json({
            _id : user._id,
            firstName : user.firstName,
            email: user.email, 
        })
    }else{
        res.status(401)
        throw new Error('User not found')
    }
}

module.exports = exports
