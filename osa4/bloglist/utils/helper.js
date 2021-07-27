
const User = require('../models/user')

const getUserId = async () => {
    const users = await User.find({})
    return users[0].id
}

module.exports = {
    getUserId
}

