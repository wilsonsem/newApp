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

userSchema.methods.matchPassword = async function (enteredPassword){
    return await bcrypt.compare(enteredPassword, this.password)
  }

userSchema.pre('save', async function (next) {
    if (!this.isModified('password')) {
      next()
    }
  
    const salt = await bcrypt.genSalt(10)
    this.password = await bcrypt.hash(this.password, salt)
   
  })
  
  

const User = mongoose.model('User', userSchema)

module.exports = User