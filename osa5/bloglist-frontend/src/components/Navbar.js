import React from 'react'
import { Link } from 'react-router-dom'
import {
  AppBar,
  Toolbar,
  IconButton,
  Button,
} from '@material-ui/core'
import { useSelector, useDispatch } from 'react-redux'
import { setUser } from '../reducers/UserReducer'

const Navbar = () => {

  const dispatch = useDispatch()
  const user = useSelector(state => state.user)

  const logout = () => {
    window.localStorage.removeItem('loggedUser')
    dispatch(setUser({}))
  }
  return (
    <AppBar position="static">
      <Toolbar>
        <IconButton edge="start" color="inherit" aria-label="menu">
        </IconButton>
        <Button color="inherit">
          <Link to="/">home</Link>
        </Button>
        <Button color="inherit">
          <Link to="/blogs">blogs</Link>
        </Button>
        <Button color="inherit">
          <Link to="/users">users</Link>
        </Button>
        <Button color="inherit">
          {user
            ? <em>{user.name} logged in</em>
            : <Link to="/login">login</Link>
          }
        </Button>
        {user
          ? <Button color="secondary" onClick={logout}>logout</Button>
          : null
        }
      </Toolbar>
    </AppBar>
  )
}

export default Navbar