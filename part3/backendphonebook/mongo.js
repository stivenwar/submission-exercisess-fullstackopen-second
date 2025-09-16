const mongoose = require('mongoose');


if(process.argv.length < 3){
    console.log("give me a password to start")
    process.exit(1)
}

const password = process.argv[2];
console.log(password);




const name = process.argv[3];
const number = process.argv[4];



const url = process.env.MONGO_URI;;

mongoose.set("strictQuery",false)
mongoose.connect(url)

const personSchema = new mongoose.Schema({
    name: String,
    number: Number
})

const Person = mongoose.model('Person',personSchema)

const person = new Person({
    name: name,
    number: number
})

if(!name && !number){
    Person.find({}).then(result => {
    console.log("phonebook:");
    result.forEach(person => {
        console.log(`${person.name} ${person.number}`);
    })
    mongoose.connection.close();
    process.exit(1)
})
}

if(name && number){
    person.save().then(result => {
    console.log(`added ${result} to phonebook`);
    mongoose.connection.close();
    })
}



