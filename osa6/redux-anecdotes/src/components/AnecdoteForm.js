import React from 'react'
import {createAnecdote} from '../reducers/anecdoteReducer'
import {setNotification} from '../reducers/NotificationReducer'
import { connect } from 'react-redux'


const AnecdoteForm = (props) => {

  const addAnecdote = (event) => {
    event.preventDefault()
    const content = event.target.anecdote.value
    event.target.anecdote.value = ''
    props.createAnecdote(content)

    props.setNotification(`anecdote '${content}' has been created `)
  }

  return (
    <div>
      <h2>create new</h2>
      <form onSubmit={addAnecdote}>
        <input name="anecdote" /> 
        <button type="submit">create</button>
      </form>
    </div>
  )
}

const mapDispatchToProps = {
  createAnecdote: createAnecdote,
  setNotification: setNotification,
}

const ConnectedAnecdoteForm = connect(null, mapDispatchToProps )(AnecdoteForm)
export default ConnectedAnecdoteForm