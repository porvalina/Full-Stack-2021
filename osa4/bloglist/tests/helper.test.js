const mongoose = require('mongoose')
const helper = require('../utils/helper')
const User = require('../models/user')

test('helper getUserId returns valid String', async () => {
    const userId = await helper.getUserId()

    expect(userId).toHaveLength(24)
})

beforeEach(async () => {
  await User.deleteMany({})
  const user = new User({ username: 'root', passwordHash: "passwordHash" })
  await user.save()
})

afterAll(() => {
  mongoose.connection.close()
})
