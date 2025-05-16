const express = require('express')
const morgan = require('morgan')
const cors =require('cors')
const app = express()
app.use(express.json())
app.use(express.static('dist'))

var whitelist = ['https://submission-exercisess-fullstackopen.onrender.com', 'http://localhost:5173']
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

    response.json(persons)
})

app.get('/api/persons', (request, response) => {
  response.json(persons)
})

app.get('/api/persons/:id', (request, response) => {
  
  const id = Number(request.params.id)
  const person = persons.find(person => person.id === id)

  if (!person) {
    return response.status(404).json({error:"no se ha encontrado nigun titular con ese identificador"})
  }
  response.status(200).json(person)
})

app.delete('/api/persons/:id', (request, response) => {
  
  const id = Number(request.params.id)
  const person = persons.find(person => person.id === id)

  if (!person) {
     return response.status(404).json({error:"no se ha encontrado nigun titular con ese identificador"})
  }

  const newPersons = persons.filter(person => person.id !== id)

  persons.length = 0
  // console.log(persons);
  
  persons.push(...newPersons)
    // console.log(persons);

  response.status(200).json({response:"persona eliminada correctamente", agenda: persons})
})

app.post('/api/persons', (request, response) => {
  const {name,number} = request.body
  // console.log(name,number);
  
    
    if (!name || !number) {
     return response.status(404).json({error:"name or number empty"})
    }
    const contact = persons.find(person => person.name === name)
    // console.log(contact);
    
    if (contact) {
      return response.status(404).json({error:"name must be unique"})
    }

    let counter = persons.length>0?Math.max(...persons.map(person=>person.id)):0
    const personAdd =  {id: Number(counter+1),name:name, number: number}
    persons.push(
     personAdd
    )
    // console.log(persons);
    
    

     response.status(200).json({response:"personas anyadidas correctamente", personAdd})
  
})
app.get('/info', (request, response) => {
    const date = new Date()
    response.send("<p>Phonebook has info for 2 people</p>"+date)
  
})



app.use(unknownEndpoint)


const PORT = process.env.PORT || 3001

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})