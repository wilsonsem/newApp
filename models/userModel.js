const mongoose = require('mongoose')
const bcrypt = require('bcryptjs') 

//database schema for user
const userSchema = new mongoose.Schema({
    surnName:{
        type:String,
        required: false
    },
    firstName:{
        type:String,
        required: true,
    },
    otherNames:{
        type:String,
        required: false,
    },
    email: {
        type: String,
        required: true,
        unique: true,
      },
    password:{
        type:String,
        required: true,
    }
},{ timestamps: true})

const User = mongoose.model('USer', userSchema)

module.exports = User