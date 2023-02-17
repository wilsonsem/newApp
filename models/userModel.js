const mongoose = require('mongoose')
const bcrypt = require('bcryptjs') 

//database schema for user
const userSchema = new mongoose.Schema({
    firstName:{
        type:String,
        required: true,
    },
    lastName:{
        type:String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
      },
    password:{
        type:String,
        trim: true,
        required: true,
    },
    uniqueID:{
      type:String,
      required: true,
  },
  status:{
    type:String,
    required: true,
  }
    }
,{ timestamps: true})

userSchema.methods.matchPassword = async function(inputPassword){
  return await bcrypt.compare(inputPassword, this.password)
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