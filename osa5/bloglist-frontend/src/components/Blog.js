import React, { useState }  from 'react'
import { useSelector, useDispatch } from 'react-redux'
import {
  useParams
} from 'react-router-dom'

import { saveLikesHandler, deleteBlog } from '../reducers/BlogsReducer'
import CommentForm from './CommentForm'

const Blog = ({ blogId }) => {

  const id = blogId ? blogId : useParams().id

  const [visible, showFullBlog] = useState(false)

  const dispatch = useDispatch()
  const user = useSelector(state => state.user)
  const blog = useSelector(state => state.blogs.find(blog => blog.id === id))


  const blogStyle = {
    padding: 10,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  const saveLikes = async () => {
    const updatedBlog = { ...blog, likes: blog.likes+1 }
    dispatch(saveLikesHandler(updatedBlog))
  }

  if (!blog) {
    return null
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
        <a href={blog.url} target="_blank" rel="noreferrer">{blog.url}</a>
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
      <h3>comments</h3>
      <CommentForm blogId={id} />
      <ul>
        {
          blog.comments.map((comment, index) => <li key={index}>{ comment.comment }</li>)
        }
      </ul>
      <div>
        <button style={deleteButtonStyle} onClick={() => {
          dispatch(deleteBlog(blog))
        }}>
          delete blog
        </button>
      </div>
    </div>
  )
}

export default Blog