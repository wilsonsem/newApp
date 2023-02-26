
const passport = require('passport')
const localStrategy = require('passport-local')
const bcrypt = require('bcrypt')
const User = require('../models/userModel')

exports.showSignIn = ( req, res) => {
    res.render('login')
    console.log("login Page rendered")
}

exports.showSignUp = ( req, res) => {
    res.render('register')
    console.log("Registeration Page rendered")
}

exports.registerUser = async( req, res) => {

    const { firstName, lastName, email, password, cPassword, status } = req.body

    let errors = [];

    //validate fields
    if (!firstName ||!lastName ||!email ||!password) {
        errors.push({ msg: 'All fields are required' })
    }
    
    //check passwords match
    if (password!== cPassword) {
        errors.push({ msg: 'Passwords do not match' })
    }

    //check password length
    if (password.length < 8) {
        errors.push({ msg: 'Password must be at least 6 characters' })
    }

    //check duplicate email
    const userExists = await User.findOne({ email })
    if(userExists){
        // res.status(400)
        // throw new Error('User already exist')
        errors.push({ msg: 'User already exist' })
    }

    if (errors.length > 0) {
        res.render('register', {
            errors,
            firstName,
            lastName,
            email,
            password,
        })
    }else{
        // res.send('pass')
        console.log('no errors')
    }


    const user = await User.create({
        firstName, lastName, email, password, status
    })

    if(user){
        res.status(201).json({
            _id : user._id,
            firstName : user.firstName,
            lastName : user.lastName,
            email: user.email,
            status: user.status,
            // token: generateToken(user._id)
        })
        console.log(user)
    }else{
        res.status(400)
        throw new Error('Invalid user data')
    }
    
}

exports.verifyPresentAtd = async ( req, res) => {
    console.log('You are present')
}