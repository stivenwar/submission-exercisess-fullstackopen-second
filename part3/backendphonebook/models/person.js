const mongoose = require('mongoose')
mongoose.set("strictQuery",false)

const url = process.env.MONGO_URI;

console.log("conecting to uri");

mongoose.connect(url)
.then(result => {
    console.log("connected to MongoDB");
    
}).catch(error => {
    console.log("error conecting to MOngoDB", error.message);
    
})

const personSchema = new mongoose.Schema({
    name: {type: String,unique:true},
    number: Number
})

personSchema.set("toJSON",{
    transform:(document,returnedObject) => {
        returnedObject.id = returnedObject._id.toString()
        delete returnedObject._id
        delete returnedObject.__v
    }
})


module.exports = mongoose.model('Note',personSchema)
