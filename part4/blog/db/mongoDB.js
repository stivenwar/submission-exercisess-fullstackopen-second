const mongoose = require('mongoose')

const mongoUrl = 'mongodb://localhost:27017/bloglist'
mongoose.connect(mongoUrl).then(()=>{
    console.log("conectado a mongoDB");
    
})
const blogSchema = new mongoose.Schema({
  title: String,
  author: String,
  url: String,
  likes: Number
})

const Blog = mongoose.model('Blog', blogSchema)

module.exports = Blog


