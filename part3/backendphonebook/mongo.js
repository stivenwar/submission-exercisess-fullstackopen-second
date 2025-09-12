const mongoose = require('mongoose');


if(process.argv.length < 3){
    console.log("give me a password to start")
    process.exit(1)   
}

const password = process.argv[2];



const name = process.argv[3];
const number = process.argv[4];



const url = `mongodb+srv://stivenwar:${password}@cluster0.byec2uo.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;

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



