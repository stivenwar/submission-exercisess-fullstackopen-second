const mongoose = require('mongoose')

mongoose.set('StrictQuery',false)

const url = process.env.MONGO_URI;
