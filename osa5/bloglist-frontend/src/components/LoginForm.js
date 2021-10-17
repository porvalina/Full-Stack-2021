import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { setNotification } from '../reducers/NotificationReducer'
import loginService from '../services/login'
import blogService from '../services/blogs'

const LoginForm = ({ setUser, setNotification }) => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const handleLogin = async(event) => {
    event.preventDefault()
    try {
      const user = await loginService.login({
        username, password,
      })
      window.localStorage.setItem(
        'loggedUser', JSON.stringify(user)
      )
      blogService.setToken(user.token)
      const action = {
        type: 'SET_USER',
        payload: user
      }

      setUser(action)
      setUsername('')
      setPassword('')
    } catch (error) {
      console.log(error.response.data.error)
      setNotification(error.response.data.error)
    }
  }

  return (
    <form onSubmit={handleLogin}>
      <h2>Login to application</h2>
      <div>
            username
        <input
          id='username'
          type="text"
          value={username}
          name="Username"
          onChange={({ target }) => setUsername(target.value)}
        />
      </div>
      <div>
            password
        <input
          id='password'
          type="password"
          value={password}
          name="Password"
          onChange={({ target }) => setPassword(target.value)}
        />
      </div>
      <button id="login-button" type="submit">login</button>
    </form>
  )
}

LoginForm.propTypes = {
  setUser: PropTypes.func.isRequired,
  setNotification: PropTypes.func.isRequired,
}

const mapDispatchToProps = {
  setNotification: setNotification,
}

const ConnectedLoginForm = connect(null, mapDispatchToProps )(LoginForm)
export default ConnectedLoginForm
