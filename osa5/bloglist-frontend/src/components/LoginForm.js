import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import {
  Button,
  TextField
} from '@material-ui/core'

import { login } from '../reducers/UserReducer'

const LoginForm = ({ login }) => {

  const handleLogin = async(event) => {
    event.preventDefault()
    const username = event.target[0].value
    const password = event.target[1].value
    login(username, password)
  }

  return (
    <form onSubmit={handleLogin}>
      <h2>Login to application</h2>
      <div>
        <TextField label="username" />
      </div>
      <div>
        <TextField label="password" type='password' />
      </div>
      <Button variant="contained" color="primary" type="submit">login</Button>
    </form>
  )
}

LoginForm.propTypes = {
  user: PropTypes.object,
  login: PropTypes.func.isRequired,
}

const mapStateToProps = (state) => {
  return {
    user: state.user
  }
}

const mapDispatchToProps = {
  login: login,
}

const ConnectedLoginForm = connect(mapStateToProps, mapDispatchToProps )(LoginForm)
export default ConnectedLoginForm
