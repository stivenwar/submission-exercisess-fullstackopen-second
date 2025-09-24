var _ = require('lodash')

const dummy = (blog) => {
    return 1
}
const totalLikes = (blogs) => {
  return blogs.reduce((sum, blog) => sum + blog.likes, 0)
}

const favoriteBlog= (blogs) => {

    const blog = blogs.reduce((prev,current) => prev.likes>current.likes? prev:current);
    delete blog.__v
    delete blog.url
    delete blog._id

    return blog

}
const mostBlogs = (blogs) => {
    
  const mostBlogs = _(blogs)
  .countBy('author')    
  .toPairs()                    
  .maxBy(pair => pair[1])     
  
const result = { author: mostBlogs[0], blogs: mostBlogs[1] }
return result

}
const mostLikes = (blogs) => {
    const mostLikes = _(blogs)
  .groupBy('author')                          // agrupa blogs por autor
  .map((blogs, author) => ({                  // transforma cada grupo en objeto
    author,
    likes: _.sumBy(blogs, 'likes')            // suma los likes del grupo
  }))
  .maxBy('likes')                    

   
return mostLikes
    
}

module.exports = {
    dummy, totalLikes, favoriteBlog, mostBlogs,mostLikes
}