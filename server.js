const express = require('express')
const dotenv = require('dotenv')
const bodyParser = require ('body-parser')
const userRoutes = require('./routes/userRoutes.js')
const authMiddleware = require('./middleware/authMiddleware')
const errorMiddleware = require('./middleware/errorMiddleware')
const connectDb = require('./models/db.js')
require('./models/db.js')
// require('ejs')
dotenv.config()



const app = express()

app.set('view engine' , 'ejs')
app.use(express.static(__dirname + "/views"));
app.use(express.static(__dirname + "/public"));
app.use(bodyParser.urlencoded({extended : true}))
app.use(bodyParser.json())

//routes
app.get('/', ( req, res) => {
    res.render("register")
})
app.get('/users/login', ( req, res) => {
    res.render("login")
})
app.use('/users' , userRoutes)


//middleware
app.use ( errorMiddleware.errorHandler, errorMiddleware.notFound)
//


const PORT = process.env.PORT || 8000
app.listen(PORT, () => {
    console.log(`New app running on port ${process.env.NODE_ENV}`)
})