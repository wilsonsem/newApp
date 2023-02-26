const express = require('express');
const bodyParser = require('body-parser');
const userRoutes = require('./routes/userAuthRoutes');
const atdRoutes = require('./routes/attendanceRoutes');
const connectDB = require('./models/db');
const session = require('express-session');
require('dotenv').config()
const app = express();

app.set('view engine', 'ejs')


app.use(bodyParser.urlencoded({extended : true}))
app.use(bodyParser.json())
app.use(express.static('public'))

app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true
}))
app.use('/rtwa/user', userRoutes)
app.use('/rtwa/atd', atdRoutes)

app.get('/', (req, res) => {
    res.render('index')
})

const PORT = process.env.PORT || 8000

app.listen(PORT, () => {
    console.log(`attendance app running on port ${process.env.NODE_ENV}`)
})