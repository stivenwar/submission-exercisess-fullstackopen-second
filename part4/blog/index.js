const express = require('express')
const app = express()
const cors = require('cors')
const crudBlog = require('./model/Blog')

app.use(cors())
app.use(express.json())

app.get('/api/blogs', (request, response) => {
     crudBlog.getBlogs().then(result => {
        response.json(result)
     })
  
})

app.post('/api/blogs', (request, response) => {

  crudBlog.addBlog(request.body).then(blogs => {
         response.status(201).json(addBlog)

    })

})

const PORT = 3003
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})