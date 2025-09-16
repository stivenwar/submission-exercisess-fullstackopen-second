require('dotenv').config()
const express = require('express')
const morgan = require('morgan')
const cors =require('cors')
const app = express()
const path = require('path');

const Person = require("./models/person")

app.use(express.json())
// Servir archivos estáticos desde la carpeta 'dist'
app.use(express.static(path.join(__dirname, 'dist')));

var whitelist = ['https://submission-exercisess-fullstackopen.onrender.com', 'http://localhost:3001']
var corsOptions = {
  origin: function (origin, callback) {
      // console.log('Origin:', origin);
    
    if (!origin || whitelist.indexOf(origin) !== -1) {
      callback(null, true)
    } else {
      callback(new Error('Not allowed by CORS'))
    }
  }
}

app.use(cors(corsOptions))

morgan.token('body', (req) => {
  return req.method === 'POST' ? JSON.stringify(req.body) : '';
});

// app.use(morgan(':method :url :status :res[content-length] - :response-time ms :body'));

const unknownEndpoint = (request, response, next) => {
  response.status(404).send({ error: 'unknown endpoint' })
  next()
}


const persons = [    { 
      "id": 1,
      "name": "Arto Hellas", 
      "number": "040-123456"
    },
    { 
      "id": 2,
      "name": "Ada Lovelace", 
      "number": "39-44-5323523"
    },
    { 
      "id": 3,
      "name": "Dan Abramov", 
      "number": "12-43-234345"
    },
    { 
      "id": 4,
      "name": "Mary Poppendieck", 
      "number": "39-23-6423122"
    }]

app.get('/', (request, response) => {
    res.sendFile(path.join(__dirname, 'dist', 'index.html'));
    // response.json(persons)
})

app.get('/api/persons', (request, response) => {

     Person.find({}).then(result => {
        console.log(result);
  
        response.status(200).send(result)


     })

})

app.get('/api/persons/:id', (request, response) => {
  
  const id = request.params.id
  Person.findById({_id:id}).then(person =>  {

    if(person){
      response.status(200).json(person)
    }else{
      response.status(404).end();
    }
    
  }).catch(error => {
    console.log(error);
    
      return response.status(404).json({error:"no se ha encontrado nigun titular con ese identificador"})
  })

  

})

app.delete('/api/persons/:id', (request, response) => {
  
  const id = request.params.id
  
  Person.deleteOne({_id: id}).then(person => {
      console.log(person);
      if (person) {
        response.status(200).json({response:"persona eliminada correctamente", agenda: person})
      }else {
        response.status(404).end();
      }

  }).catch(error => {
    console.log(error);
      response.status(500).json({message: "ha ocurrido un error",});
  })
      
})
app.put('/api/persons/:id',(request, response)=>{

  const {name,number,id} = request.body

   Person.updateOne({_id: id},{name:name,number:number}).then(person => {
    
      if (person) {
             response.status(201).json({message: "persona cambiada correctamente",});
      }else {
        response.status(404).end();
      }


   
  }).catch(error => {
    console.log(error);
      response.status(500).json({message: "ha ocurrido un error",});
  })

})

app.post('/api/persons', (request, response) => {
  const {name,number} = request.body
   console.log(name,number);
  

    if (!name || !number ) {
     return response.status(404).json({error:"name or number empty"})
    }
    //const contact = persons.find(person => person.name === name)
    // console.log(contact);

    /*Person.findOne({name: name})
  .then(contact => {
    console.log(contact);
    
    if (contact) {
      // ⚠️ IMPORTANTE: return aquí para cortar la ejecución
      return response.status(400).json({ error: "name must be unique" });
    }

   
  })
  .catch(error => next(error));*/
 const newPerson = new Person({ name, number });

    return newPerson.save().then(savedPerson => {
      response.status(201).json({
        message: "persona añadida correctamente",
        savedPerson,
      });
    });

    /*let counter = persons.length>0?Math.max(...persons.map(person=>person.id)):0
    const personAdd =  {id: Number(counter+1),name:name, number: number}
    persons.push(
     personAdd
    )
    // console.log(persons);*/
    
    

     //response.status(200).json({response:"personas anyadidas correctamente", personAdd})
  
})
app.get('/info', (request, response) => {
    const date = new Date()
    const countPerson = persons.length
    response.send(`<p>Phonebook has info for ${countPerson} people</p>${date}`)
  
})



app.use(unknownEndpoint)


const PORT = process.env.PORT || 3001

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})