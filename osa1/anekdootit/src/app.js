import React, { useState } from 'react'

const anecdotes = [
    'If it hurts, do it more often',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
  ]

const defaultVotes = [0,0,0,0,0,0]

const App = () => {
  const [currentAnecdoteIndex, setCurrentAnecdoteIndex] = useState(0)

  const [votes,setVotes] = useState(defaultVotes)

  const generateRandomNumber = () => {
    const randomNumber = Math.ceil(Math.random() * 10)
    console.log(randomNumber % anecdotes.length)
    setCurrentAnecdoteIndex(randomNumber % anecdotes.length);
  }

  const updateVotes=()=>{
      const newVotes=votes
      newVotes[currentAnecdoteIndex]++
      console.log(newVotes)
      setVotes(newVotes)
  }

  const getBestAnecdote = () => {
    const bestVote = Math.max(...votes)
    const bestVoteIndex = votes.indexOf(bestVote)
    return anecdotes[bestVoteIndex]
  }
  return (
    <div>
      <h1>Anecdote of the day</h1>
      {anecdotes[currentAnecdoteIndex]}
      <br />
      <p>has votes {votes[currentAnecdoteIndex]} </p>
      <button onClick={() => updateVotes()}>vote</button>
      <button onClick={() => generateRandomNumber()}>next anecdote</button>
      <h1>Anecdote with most votes</h1>
      { getBestAnecdote() }
    </div>
  )
}

export default App