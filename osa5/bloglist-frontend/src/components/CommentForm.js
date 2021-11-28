import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { addComment } from '../reducers/BlogsReducer'

const CommentForm = ({ blogId }) => {

  const [comment, setComment] = useState('')
  const dispatch = useDispatch()

  const handleSubmit = async (event) => {
    event.preventDefault()
    dispatch(addComment(
      blogId,
      comment
    ))
  }

  return (
    <form onSubmit={handleSubmit}>
      <input value={comment}onChange={({ target }) => setComment(target.value)}/>
      <button type="submit">add comment</button>
    </form>
  )
}

export default CommentForm