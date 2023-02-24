// requesting all necessary packages
const { strictEqual } = require('assert')
let bcrypt = require('bcryptjs'),
    jwt = require('jsonwebtoken'),
    sql = require('../models/attendance')
const e = require('express')


// displaying registeration page
exports.showRegistrationPage = (req, res) => {
    res.render('register')
}    

// registering new user
exports.registerUser = async (req, res) => {
    let {body} = req.body

    if(!body.email && !body.password) {
        res.json(400).render('', {message: 'fields cannot be empty'})
    }

    let alreadyexist = await sql.query(`SELECT * FROM students WHERE email = ${body.email}`)
    let response = await alreadyexist.json()

    if(response){
        res.status(401).render('', {message: 'An acct has already been created with this email'})
    }
    
    const salt = await bcrypt.genSalt(10)
    const password = await bcrypt.hash(body.password, salt) 

    let registered = sql.query(`INSERT INTO students(email, password) VALUES ('${body.email}', '${password}')`, (err, data) => {
        try {
            res.render('', { data: data, message: 'welcome dear user, we hope you have a great experience with us' })
        }
        catch (error) {
            res.render('', { message: 'error in registering user', error: error })
        }
    })
}
 

// displaying login page
exports.showLoginPage = (req, res) => {
    res.render('login')
}


// authenticating user
exports.loginUser = async (req, res) => {
    let {body} = req.body

    if(!body.email && !body.password) {
        res.render('', {message: 'required fields cannot be empty'})
    }

    let user = await sql.query(`SELECT * FROM students WHERE email = '${body.email}'`)
    let response = await user.json()

    if(response){
        const validpassword = await bcrypt.compare(body.password, response.password)

        if(validpassword) {
            res.render('', {message: 'welcomr back dear user'})
        }
        else{
            res.render('', {message: 'the password you provided is invalid'})
        }
    }
    else{
        res.render('', {message: 'the email you provided does not exist please ccreate an account'})
    }
}

module.exports = exports