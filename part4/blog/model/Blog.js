
const Blog = require('../db/mongoDB')


 function addBlog( info){
  const blog = new Blog(info)

 return blog.save()
}
 function getBlogs(){
    return Blog.find({})
    
}
module.exports = {addBlog,getBlogs}