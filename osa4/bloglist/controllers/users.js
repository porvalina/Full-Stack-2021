const bcrypt = require('bcryptjs')
const usersRouter = require('express').Router()
const User = require('../models/user')

usersRouter.post('/', async (request, response, next) => {
  const body = request.body

  const saltRounds = 10
  const passwordHash = await bcrypt.hash(body.password, saltRounds)

  const user = new User({
    username: body.username,
    name: body.name,
    passwordHash,
  })

  try { 
    const savedUser = await user.save()

    response.status(201).json(savedUser)
  } catch(exception) {
    next(exception)
  }


})

usersRouter.get('/', async (request, response) => {
    const users = await User
      .find({}).populate('blogs')
  
    response.json(users.map(u => u.toJSON()))
  })

module.exports = usersRouter