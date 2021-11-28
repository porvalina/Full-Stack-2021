import React, { useEffect, useRef } from 'react'
import { connect } from 'react-redux'
import {
  Switch, Route
} from 'react-router-dom'
import { Link } from 'react-router-dom'
import Container from '@material-ui/core/Container'
import TableContainer from '@material-ui/core/TableContainer'
import Paper from '@material-ui/core/Paper'
import Table from '@material-ui/core/Table'
import TableRow from '@material-ui/core/TableRow'
import TableCell from '@material-ui/core/TableCell'
import TableBody from '@material-ui/core/TableBody'
import Blog from './components/Blog'
import blogService from './services/blogs'
import BlogForm from './components/BlogForm'
import LoginForm from './components/LoginForm'
import Notification from './components/Notification'
import Togglable from './components/Togglable'
import { setNotification } from './reducers/NotificationReducer'
import { fetchBlogs } from './reducers/BlogsReducer'
import { setUser } from './reducers/UserReducer'
import Navbar from './components/Navbar'
import Users from './components/Users'
import User from './components/User'

const padding = {
  padding: 5
}

const App = (props) => {

  const blogFormRef = useRef()

  // useEffect(() => {
  //   if (props.user && props.user.token)
  //     props.fetchBlogs()
  // }, [user])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      props.setUser(user)
      blogService.setToken(user.token)
      props.fetchBlogs()
    }
  }, [])


  const createBlog = (blog) => {
    blogService.create({
      ...blog,
      userId: props.user.id
    })
    props.setNotification('new blog ' + blog.title + ' by ' + blog.author + ' added.')
    blogFormRef.current.toggleVisibility()
  }

  if (props.user === null) {
    return <Container>
      <Notification />
      <LoginForm />
    </Container>
  }

  return (
    <Container>
      <Navbar/>
      <div style={{ margin:10 }}>
        <h1>blogs</h1>
        <Notification />
        <Switch>
          <Route path="/users/:id">
            <User />
          </Route>
          <Route path="/users">
            <Users />
          </Route>
          <Route path="/blogs/:id">
            <Blog/>
          </Route>
          <Route path="/">
            <Togglable buttonLabel="new blog" ref={blogFormRef}>
              <BlogForm createBlog={createBlog} />
            </Togglable>
            <TableContainer component={Paper}>
              <Table>
                <TableBody>
                  {props.blogs.map(blog =>
                    <TableRow key={blog.id}>
                      <TableCell>
                        <Link key={blog.id} style={padding} to={`/blogs/${blog.id}`}>
                          <Blog blogId={blog.id} />
                        </Link>
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </TableContainer>
          </Route>
        </Switch>
      </div>

    </Container>
  )
}

const mapStateToProps = (state) => {
  return {
    user: state.user,
    blogs: state.blogs
  }
}

const mapDispatchToProps = {
  setNotification: setNotification,
  fetchBlogs: fetchBlogs,
  setUser: setUser,
}

const ConnectedApp = connect(mapStateToProps, mapDispatchToProps)(App)
export default ConnectedApp
