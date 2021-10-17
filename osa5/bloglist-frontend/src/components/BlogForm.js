import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { setNotification } from '../reducers/NotificationReducer'

const BlogForm = ({ createBlog }) => {

  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')


  const addBlog = async (event) => {
    event.preventDefault()
    createBlog({
      title,
      author,
      url
    })
  }

  return (
    <form onSubmit={addBlog}>

      <h2>create new</h2>
      <div>
            title:<input
          value={title}
          onChange={({ target }) => setTitle(target.value)}
        />
      </div>
      <div>
            author:<input
          id='author'
          value={author}
          onChange={({ target }) => setAuthor(target.value)}
        />
      </div>
      <div>
            url:<input
          value={url}
          onChange={({ target }) => setUrl(target.value)}
        />
      </div>
      <button type="submit">create</button>

    </form>
  )
}

BlogForm.propTypes = {
  createBlog: PropTypes.func.isRequired,
}

const mapDispatchToProps = {
  setNotification: setNotification,
}

const ConnectedBlogForm = connect(null, mapDispatchToProps )(BlogForm)
export default ConnectedBlogForm
