const jwt = require('jsonwebtoken')
const User = require('../models/userModel.js')

module.exports.protect = async (req, res) => {

    let token
    if(req.headers.authorization && req.headers.authorization.startsWith('Bearer')){
        try{
            token = req.headers.authorization.split(' ')[1]
            const decoded = jwt.verify(token, process.JWT_SECRET)

            req.user = await User.findById(decoded.id).select('-password')
            console.log(decoded)
            next()
        }catch(error){
            console.error(error)
            res.status(401)
            throw new Error('Not Authorized')
        }
    }
}
module.exports = exports
