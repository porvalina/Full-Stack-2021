import loginService from '../services/login'
import blogService from '../services/blogs'
import { fetchBlogs } from './BlogsReducer'
import { setNotification } from './NotificationReducer'

const initialState = null

export const userReducer = (state = initialState, action) => {
  if (action.type === 'SET_USER') {
    return action.user
  }
  return state
}

export const setUser = (user) => {
  return {
    type: 'SET_USER',
    user
  }
}

export const login = (username, password) => {
  return async dispatch => {
    loginService.login(username, password).then((user) => {
      window.localStorage.setItem(
        'loggedUser', JSON.stringify(user)
      )
      blogService.setToken(user.token)
      dispatch(setUser(user))
      dispatch(fetchBlogs())
    }).catch((error) => {
      console.log(error.response.data.error)
      setNotification(error.response.data.error)
    })
  }
}