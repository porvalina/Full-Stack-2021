import React, { useState, useEffect, useRef, useReducer } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import BlogForm from './components/BlogForm'
import LoginForm from './components/LoginForm'
import Notification from './components/Notification'
import Togglable from './components/Togglable'

const compareFn = (blog1, blog2) => {
  return blog2.likes - blog1.likes
}

const userReducer = (state, action) => {
  if (action.type === 'SET_USER') {
    return action.payload
  }
  return state
}

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [user, dispatch] = useReducer(userReducer, null)
  const [message, setMessage] = useState(null)

  const blogFormRef = useRef()

  const getBlogs = () => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs.sort(compareFn) )
    )
  }

  const saveLikesHandler = async (updatedBlog) => {
    await blogService.update(updatedBlog.id, updatedBlog)
    getBlogs()
  }

  const handleDelete = async (blog) => {
    if (window.confirm('Remove ' + blog.title  + ' by ' + blog.author)) {
      await blogService.remove(blog.id)
        .then(response => {
        //showNotification(blog.title + ' is removed', 'success')
          console.log(response)
        })
      getBlogs()
    }
  }

  const showNotification = (text, type) => {
    setMessage({
      text: text,
      type: type
    }
    )
    setTimeout(() => {
      setMessage(null)
    }, 5000)
  }

  useEffect(() => {
    if (user && user.token)
      getBlogs()
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
      getBlogs()
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
    showNotification('new blog ' + blog.title + ' by ' + blog.author + ' added.', 'success')
    blogFormRef.current.toggleVisibility()
  }

  if (user === null) {
    return <div>
      <Notification message={message} />
      <LoginForm setUser={dispatch} showNotification={showNotification} />
    </div>
  }

  return (
    <div>
      <div style={{ margin:10 }}>
        <h1>blogs</h1>
        <Notification message={message} />
        {user.name + ' logged in'}
        <button type="button" onClick={logout}>logout</button>
        <Togglable buttonLabel="new blog" ref={blogFormRef}>
          <BlogForm createBlog={createBlog} />
        </Togglable>
      </div>
      {blogs.map(blog =>
        <Blog key={blog.id} saveLikesHandler={saveLikesHandler} handleDelete={handleDelete} user={user} blog={blog} />
      )}
    </div>
  )
}

export default App