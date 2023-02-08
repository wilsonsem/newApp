const User = require('../models/userModel')
const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')
const tokenUtil = require('../utils/generateToken')

exports.getUsers = async(req, res) => {
    const users = await User.find({}).sort({createdAt: -1})
    if (users){
        res.status(200).json(users)
    }
}
exports.userLogin = async(req, res) => {
    
    // res.render("login")
    // const { email, password } = req.body
    const data = {
        email : req.body.email,
        password : req.body.password
    }
    const user = await User.findOne({ email : req.body.email })
    // console.log(user)
    if(user && (await user.matchPassword(data.password))){
        // res.status(200).json({
        //     _id: user._id,
        //     firstName: user.firstName,
        //     email: user.email,
        //     token: tokenUtil.generateToken(user._id)
        // })
        res.render("index")
    }else{
        return res.status(200).json({success: false})
    }
}
    // else{
    //     res.status(401)
    //     throw new Error('user auth failed')
        // res.send("Auth Failed")
        // res.send(tokenUtil.generateToken(user._id))
        // console.log(user)

    


//Regiser a user
exports.userRegistration = async( req, res) => {
    // const { firstName, email , Password} = req.body
    const data = {
        firstName: req.body.firstName,
        email : req.body.email,
        password : req.body.password
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
