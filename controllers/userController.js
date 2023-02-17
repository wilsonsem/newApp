const User = require('../models/userModel')
const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')
const session = require('express-session');
const multer  = require('multer')
const upload = multer({ dest: 'uploads/' })
const tokenUtil = require('../utils/generateToken')
const cookieParser = require("cookie-parser");
cookieParser();

const oneDay = 1000 * 60 * 60 * 24;
session({
    name:"user",
    secret: "thisismysecrctekeyfhrgfgrfrty84fwir767",
    saveUninitialized:true,
    cookie: { maxAge: oneDay },
    resave: false
});
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
        // req.session.loggedin = true;
		// req.session.user = req.body.email;
        // console.log(req.session.user)
        console.log("logged in")
        // res.redirect("/true/attendance")
        // console.log(user)
        res.render("attendance", {user})
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
        status: req.body.status
    }
   
    if( data.password !== data.cPassword){
        res.status(401)
        throw new Error("Password does not match")
    }
    
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
        
        res.redirect("/users/login")
    }else{
        res.status(401)
        throw new Error("Registration failed")
    }
}


exports.getUserProfile = async ( req, res) => {

    const {id}  = req.params
    const user = await User.findById(id)
    res.render('profile',{user})
}

exports.logout = async (req , res) => {
        req.session.destroy();
        res.redirect('/');
}
module.exports = exports
