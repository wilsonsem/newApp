const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    surnName:{
        type:String,
        required: true
    },
    firstName:{
        type:String,
        required: false,
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
        required: false,
    }
},{ timestamps: true})

const User = mongoose.model('USer', userSchema)

module.exports = workout