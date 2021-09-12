import React, { useState }  from 'react'

const Blog = ({ blog, user, saveLikesHandler, handleDelete }) => {
  const [visible, showFullBlog] = useState(false)

  const blogStyle = {
    padding: 10,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  const saveLikes = async () => {
    const updatedBlog = { ...blog, likes: blog.likes+1 }
    saveLikesHandler(updatedBlog)
  }

  if (visible === false) {
    return (
      <div style={blogStyle}>
        <div>
          {blog.title} by {blog.author}&nbsp;
          <button onClick={() => showFullBlog(true)}>
            view
          </button>
        </div>
      </div>
    )
  }

  const deleteButtonStyle = {
    backgroundColor: '#6bc2e8',
    color: 'white',
  }

  return (
    <div style={blogStyle}>
      <div>
        {blog.title}&nbsp;
        <button onClick={() => showFullBlog(false)}>
            hide
        </button>
      </div>
      <div>
        {blog.author}
      </div>
      <div>
        {blog.url}
      </div>
      <div>
        {blog.likes}&nbsp;
        <button onClick={saveLikes}>
          like
        </button>
      </div>
      <div>
        {user.name}
      </div>
      <div>
        <button style={deleteButtonStyle} onClick={() => handleDelete(blog)}>
          delete blog
        </button>
      </div>
    </div>
  )
}

export default Blog