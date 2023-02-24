// requiring packages
require('dotenv').config()
let sql = require('mysql')

// creating a connection with sql credentials
const dbConnection = sql.createConnection({

    host: process.env.HOST,
    user: process.env.SQL_USER,
    password: process.env.SQL_PASSWORD,
    database: process.env.SQL_DATABASE

})

// connection method
dbConnection.connect(()=>{
    console.log(`${process.env.SQL_DATABASE} database connected`)
})

// exporting connection
module.exports = dbConnection