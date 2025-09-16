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
    name: { type: String, required: true , minLenght: 3},
    number: {
        type: String,
        required: true,
        validate: {
            validator: function(v) {
                return /^\d{2,3}-\d{5,}$/.test(v);
            },
            message: props => `${props.value} is not a valid phone number example 111-55555 or 11-12345!`
        }
    }
});

personSchema.set("toJSON",{
    transform:(document,returnedObject) => {
        returnedObject.id = returnedObject._id.toString()
        delete returnedObject._id
        delete returnedObject.__v
    }
})


module.exports = mongoose.model('Person',personSchema)
