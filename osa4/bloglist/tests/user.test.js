const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')

const supertest = require('supertest')
const app = require('../app')
const User = require('../models/user')

const api = supertest(app)

beforeEach(async () => {
    await User.deleteMany({})

    const passwordHash = await bcrypt.hash('sekret', 10)
    const user = new User({ username: 'root', passwordHash })

    await user.save()
})

test('add new user', async () => {
    const newUser = {
        username: 'unicorn',
        name: 'Linda Blow',
        password: 'salainen',
    }

    await api
        .post('/api/users')
        .send(newUser)
        .expect(201)

    const getResponse = await api.get('/api/users').expect(200)
    expect(getResponse.body).toHaveLength(2)
})

test('add invalid user', async () => {
    const newUser = {
        username: 'root',
        name: 'Linda Blow',
        password: 'salainen',
    }

    const postResponse = await api.post('/api/users').send(newUser).expect(400)
    expect(postResponse.body.error).toBe("user validation failed: username: Error, expected `username` to be unique. Value: `root`")
})

afterAll(() => {
    mongoose.connection.close()
})