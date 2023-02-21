const mongoose = require('mongoose')

mongoose.set("strictQuery", false);
mongoose.connect(process.env.DB_URI)
    .then(() => {
            console.log("db connected".bgMagenta.underline.bold)
        })
    .catch((error) => {
        console.log(error)
    })