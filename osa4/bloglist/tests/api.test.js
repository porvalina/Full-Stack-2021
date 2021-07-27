const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const Blog = require('../models/blog')
const helper = require('../utils/helper')
const User = require('../models/user')

const api = supertest(app)

const token = "bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6InVuaWNvcm4iLCJpZCI6IjYwZmE3MmJlNDc2ODRkNGQwZWMxNmM0NCIsImlhdCI6MTYyNzMyNTk1OX0.Z0o5OGkRPgMp0Cf-m-fekIoEJznIxxV9RyM15LvWCa8"
const initialBlogs = [
  {
    "title": "fairytale",
    "author": "Pushkin",
    "url": "ya.ru",
    "likes": 0
  },
  {
    "title": "story",
    "author": "Turgenev",
    "url": "google.com",
    "likes": 0
  },
  {
    "title": "novel",
    "author": "Lermontov",
    "url": "google.com",
    "likes": 0
  },
]

test('Get blogs returns 401 if token is missing', async () => {
  await api.get('/api/blogs').expect(401)
})

test('Get blogs', async () => {
    const response = await api.get('/api/blogs').set({ Authorization: token }).expect(200)

    expect(response.body).toHaveLength(3)
})

test('id detected', async () => {
  const response = await api.get('/api/blogs').set({ Authorization: token }).expect(200)

  expect(response.body[0].id).toBeDefined();
});

test('empty likes string', async () => {
  const userId = await helper.getUserId()

  const newBlog =  {
    "title": "bestseller",
    "author": "Sokolov",
    "url": "lala.com",
    "likes": "",
    "userId": userId
  }
  const postResponse = await api.post('/api/blogs').send(newBlog).set({ Authorization: token }).expect(201)
  expect(postResponse.body.likes).toBe(0)
});

test('add new blog 401', async () => {
  const userId = await helper.getUserId()
  const newBlog = {
    "title": "bestseller",
    "author": "Sokolov",
    "url": "lala.com",
    "likes": 0,
    "userId": userId
  }
  await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(401)
})

test('add new blog', async () => {
  const userId = await helper.getUserId()
  const newBlog = {
    "title": "bestseller",
    "author": "Sokolov",
    "url": "lala.com",
    "likes": 0,
    "userId": userId
  }
  await api
    .post('/api/blogs')
    .send(newBlog)
    .set({ Authorization: token })
    .expect(201)

  const getResponse = await api.get('/api/blogs').set({ Authorization: token }).expect(200)
  expect(getResponse.body).toHaveLength(4)
})

test('title and url are defined', async () => {
  const userId = await helper.getUserId()
  const newBlog =  {
    "author": "Sokolov",
    "url": "lala.com",
    "likes": 0,
    "userId": userId
  }
  await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(400)

  const newBlog2 =  {
    "title": "lalaland",
    "author": "Sokolov",
    "url": "",
    "likes": 0,
    "userId": userId
  }

  await api
    .post('/api/blogs')
    .send(newBlog2)
    .expect(400)

})

beforeEach(async () => {
  await User.deleteMany({})
  const user = new User({ username: 'root', passwordHash: "passwordHash" })
  await user.save()

  const initialBlogsWithUserId = initialBlogs.map(blog => {
    return {...blog, "userId": user.id.toString() }
  })
  await Blog.deleteMany({})
  let blogObject = new Blog(initialBlogsWithUserId[0])
  await blogObject.save()
  blogObject = new Blog(initialBlogsWithUserId[1])
  await blogObject.save()
  blogObject = new Blog(initialBlogsWithUserId[2])
  await blogObject.save()
})

afterAll(() => {
  mongoose.connection.close()
})

