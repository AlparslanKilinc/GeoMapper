const mongoose = require('mongoose')
require('dotenv').config({ path: '../.env' });
mongoose
    .connect(process.env.MONG_URI,{useNewUrlParser: true})
    .catch(e => {
        console.error('Connection error', e.message)
    })

const db = mongoose.connection

module.exports = db