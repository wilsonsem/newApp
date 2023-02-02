const express   = require ('express')
const bodyParser = require('body-parser')
const userRoutes = require('./routes/userRoutes')
require('dotenv').config()
require('colors')
require ('./models/db')


const app = express()


app.use(bodyParser.urlencoded({extended : true}))
app.use(bodyParser.json())

// routes
app.use('/api/user', userRoutes)
// view engine setup
app.use(express.static(__dirname + "/views"));
app.use(express.static(__dirname + "/public"));



app.listen(process.env.PORT, (req, res) => {
    console.log("new app is listening on port",process.env.PORT)
})