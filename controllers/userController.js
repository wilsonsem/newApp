const User = require('../models/userModel')
const mongoose = require('mongoose')
const tokenUtil = require('../utils/generateToken')

exports.getUsers = async(req, res) => {
    const users = await User.find({}).sort({createdAt: -1})
    if (users){
        res.status(200).json(users)
    }
}
exports.userLogin = async(req, res) => {{
    
    const { email, password } = req.body
    const user = await User.findOne({ email })

    if(user&& (await user.matchPassword(password))){
        res.json({
            _id: user._id,
            firstName: user.firstName,
            email: user.email,
            token: tokenUtil.generateToken(user._id)
        })
    }else{
        res.status(401)
        throw new Error('user auth failed')
        // res.send("Auth Failed")
        // res.send(tokenUtil.generateToken(user._id))
        // console.log(user)

    }
}}

//Regiser a user
exports.userRegistration = async( req, res) => {

    const { firstName, email, password} = req.body

    const userExist = await User.findOne({ email })
    if(userExist){
        res.status(401)
        throw new Error("User already Exist")
    }

    const user = await User.create({ firstName, email, password})
    if(user){
        res.status(201).json({
            _id : user._id,
            firstName : user.firstName,
            email: user.email,
            isAdmin: user.isAdmin,
            token: tokenUtil.generateToken(user._id)
        })
    }else{
        res.status(401)
        throw new Error("Registration failed")
    }


}

module.exports = exports
