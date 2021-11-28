const blogsRouter = require('express').Router()
const logger = require('../utils/logger')
const Blog = require('../models/blog')
const User = require('../models/user')
const Comment = require('../models/comment')
const jwt = require('jsonwebtoken')

blogsRouter.get('/', async (request, response, next) => {
  if (!request.token) {
    return response.status(401).json({ 
      error: 'invalid token'
    })
  }

  logger.info(request.token)
  try {
    decodedToken = jwt.verify(request.token, process.env.SECRET)
  } catch(exception) {
    next(exception)
  }

  
  if (!request.token) {
    return response.status(401).json({ error: 'token missing or invalid' })
  }

  const blogs = await Blog.find({}).populate('user', { username: 1, name: 1, id: 1 })
  .populate('comments')
  return response.json(blogs.map(blog => blog.toJSON()))
})
  
blogsRouter.post('/', async (request, response, next) => {
  const body = request.body
  if (!body.title) {
    return response.status(400).json({ 
      error: 'title is not defined ' + JSON.stringify(body)
    })
  }
  if (body && !body.url) {
    return response.status(400).json({ 
      error: 'url is not defined '  + JSON.stringify(body)
    })
  }

  if (!request.token) {
    return response.status(401).json({ 
      error: 'invalid token'
    })
  }

  let decodedToken = ""
  try { 
    decodedToken = jwt.verify(request.token, process.env.SECRET)
  } catch(exception) {
    next(exception)
  }

  
  if (!request.token || !decodedToken.id) {
    return response.status(401).json({ error: 'token missing or invalid' })
  }

  const user = await User.findById(body.userId)
  const blog = new Blog({
    "title": body.title,
    "author": body.author,
    "url": body.url,
    "likes": body.likes || 0,
    "user": user._id
  })

  try { 
    const savedBlog = await blog.save()
    user.blogs = user.blogs.concat(savedBlog._id)
    await user.save()

    response.status(201).json(savedBlog)
  } catch(exception) {
    next(exception)
  }
})

blogsRouter.delete(`/:id`, async (request, response, next) => {
  if (!request.token) {
    return response.status(401).json({ 
      error: 'invalid token'
    })
  }

  let decodedToken = ""
  try { 
    decodedToken = jwt.verify(request.token, process.env.SECRET)
  } catch(exception) {
    next(exception)
  }

  
  if (!request.token || !decodedToken.id) {
    return response.status(401).json({ error: 'token missing or invalid' })
  }
  const blog = await Blog.findById(request.params.id)
  if ( blog == null){
    return response.status(404).end()
  }
  if ( blog.user && blog.user.toString() !== decodedToken.id.toString() ) {
    return response.status(401).json({ error: 'invalid user' })
  }
  try { 
     await Blog.findByIdAndRemove(request.params.id)
    response.status(204).end()
  } catch(exception) {
    next(exception)
  }
})

blogsRouter.put(`/:id`, async (request, response, next) => {
  const body = request.body

  const blog = {
    "title": body.title,
    "author": body.author,
    "url": body.url,
    "likes": body.likes
  }

  try {
    const updatedBlog = await Blog.findByIdAndUpdate(request.params.id, blog, { new: true })
    response.json(updatedBlog)
  } catch(exception) {
    next(exception)
  }
})

blogsRouter.post(`/:id/comments`, async (request, response, next) => {
  const body = request.body

  const blog = await Blog.findById(request.params.id)
  if (blog == null) {
    return response.status(404).end()
  }

  const comment = new Comment({
    "comment": body.comment,
    "blog": blog._id
  })

  try { 
    const savedComment = await comment.save()
    blog.comments = blog.comments.concat(savedComment._id)
    await blog.save()

    response.status(201).json(savedComment)
  } catch(exception) {
    next(exception)
  }

})

module.exports = blogsRouter