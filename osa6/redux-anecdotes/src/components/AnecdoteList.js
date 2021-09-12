import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import {setNotification } from '../reducers/NotificationReducer'
import { vote } from '../reducers/anecdoteReducer'

const AnecdoteList = () => {
  const anecdotes = useSelector(state => state.anecdotes)
  const filter = useSelector(state => state.filter)
  const dispatch = useDispatch()

  const voteHandler = (anecdote) => {  
    dispatch(vote(anecdote))
    const notificationAction = setNotification(`anecdote '${anecdote.content}' has been voted `, 5)
    dispatch(notificationAction)
  }

  return (
    <div>
      {anecdotes.filter(a => a.content && a.content.indexOf(filter)!=-1).sort((a,b)=> b.votes - a.votes).map(anecdote =>
        <div key={anecdote.id}>
          <div>
            {anecdote.content}
          </div>
          <div>
            has {anecdote.votes}
            <button onClick={() => voteHandler(anecdote)}>vote</button>
          </div>
        </div>
      )}
    </div>
  )
}

export default AnecdoteList