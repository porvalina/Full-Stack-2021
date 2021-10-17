import React, { useEffect, useRef, useReducer } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import BlogForm from './components/BlogForm'
import LoginForm from './components/LoginForm'
import Notification from './components/Notification'
import Togglable from './components/Togglable'
import { setNotification } from './reducers/NotificationReducer'
import { fetchBlogs } from './reducers/BlogsReducer'
import { connect } from 'react-redux'

const userReducer = (state, action) => {
  if (action.type === 'SET_USER') {
    return action.payload
  }
  return state
}

const App = (props) => {
  const [user, dispatch] = useReducer(userReducer, null)

  const blogFormRef = useRef()

  const saveLikesHandler = async (updatedBlog) => {
    await blogService.update(updatedBlog.id, updatedBlog)
    props.fetchBlogs()
  }

  const handleDelete = async (blog) => {
    if (window.confirm('Remove ' + blog.title  + ' by ' + blog.author)) {
      await blogService.remove(blog.id)
        .then(response => {
        //showNotification(blog.title + ' is removed', 'success')
          console.log(response)
        })
      props.fetchBlogs()
    }
  }


  useEffect(() => {
    if (user && user.token)
      props.fetchBlogs()
  }, [user])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      const action = {
        type: 'SET_USER',
        payload: user
      }
      dispatch(action)
      blogService.setToken(user.token)
      props.fetchBlogs()
    }
  }, [])


  const logout = () => {
    window.localStorage.removeItem('loggedUser')
    const action = {
      type: 'SET_USER',
      payload: null
    }
    dispatch(action)
  }


  const createBlog = (blog) => {
    blogService.create({
      ...blog,
      userId: user.id
    })
    props.setNotification('new blog ' + blog.title + ' by ' + blog.author + ' added.')
    blogFormRef.current.toggleVisibility()
  }

  if (user === null) {
    return <div>
      <Notification />
      <LoginForm setUser={dispatch} />
    </div>
  }

  return (
    <div>
      <div style={{ margin:10 }}>
        <h1>blogs</h1>
        <Notification />
        {user.name + ' logged in'}
        <button type="button" onClick={logout}>logout</button>
        <Togglable buttonLabel="new blog" ref={blogFormRef}>
          <BlogForm createBlog={createBlog} />
        </Togglable>
      </div>
      {props.blogs.map(blog =>
        <Blog key={blog.id} saveLikesHandler={saveLikesHandler} handleDelete={handleDelete} user={user} blog={blog} />
      )}
    </div>
  )
}

const mapStateToProps = (state) => {
  return {
    blogs: state.blogs
  }
}

const mapDispatchToProps = {
  setNotification: setNotification,
  fetchBlogs: fetchBlogs,
}

const ConnectedApp = connect(mapStateToProps, mapDispatchToProps)(App)
export default ConnectedApp
