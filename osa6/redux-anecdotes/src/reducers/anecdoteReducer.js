import anecdoteService from '../services/anecdotes'

export const createAnecdote = content => {
  return async dispatch => {
    const newAnecdote = await anecdoteService.createNew(content)
    dispatch({
      type: 'NEW_ANECDOTE',
      data: newAnecdote,
    })
  }
}

export const setAnecdotes = () => {
  return async dispatch => {
    const anecdotes = await anecdoteService.getAll()
    dispatch({
      type: 'SET_ANECDOTES',
      data: anecdotes,
    })
  }
}

export const vote = (anecdote) => {
  return async dispatch => {
    const updatedAnecdote = await anecdoteService.update(anecdote.id, {
      ...anecdote, votes: anecdote.votes+1
    })
    dispatch({
      type: 'SET_ANECDOTE',
      data: updatedAnecdote,
    })
  }
}



export const anecdoteReducer = (state = [], action) => {
  switch(action.type) {
    case 'SET_ANECDOTE':
      const otherAnecdotes = state.filter(anecdote => anecdote.id !== action.data.id)
      return [...otherAnecdotes, action.data]
    case 'NEW_ANECDOTE':
      return [...state, action.data]
    case 'SET_ANECDOTES':
      return [...action.data]
    default: 
      return state
  }
}
