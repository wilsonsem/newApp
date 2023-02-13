const express = require('express')
const dotenv = require('dotenv')
const bodyParser = require ('body-parser')
const cookieParser = require("cookie-parser");
const sessions = require ("express-session")
const userRoutes = require('./routes/userAuthRoute.js')
const attendanceRoutes = require('./routes/attendanceRoute')
// const sessionMiddleware = require('./middleware/sessionMiddleware')
const errorMiddleware = require('./middleware/errorMiddleware')
const connectDb = require('./models/db.js')
require('./models/db.js')
dotenv.config()



const app = express()

app.set('view engine' , 'ejs')
app.use(express.static(__dirname + "/views"));
app.use(express.static(__dirname + "/public"));
app.use(bodyParser.urlencoded({extended : true}))
app.use(bodyParser.json())
app.use(cookieParser());



//routes
app.get('/', ( req, res) => {
    res.render("index")
})
app.use('/users' , userRoutes)
app.use('/true' , attendanceRoutes) 
app.use(errorMiddleware.errorHandler, errorMiddleware.notFound)//middleware
// app.use(sessionMiddleware.sessionMiddleware)
const oneDay = 1000 * 60 * 60 * 24;
app.use(sessions({
    name:"user",
    secret: "thisismysecrctekeyfhrgfgrfrty84fwir767",
    saveUninitialized:true,
    cookie: { maxAge: oneDay },
    resave: false
}));


const PORT = process.env.PORT || 8000
app.listen(PORT, () => {
    console.log(`New app running on port ${process.env.NODE_ENV}`)
})