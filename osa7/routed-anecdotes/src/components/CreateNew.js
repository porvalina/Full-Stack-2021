import React, { useState } from 'react'
import  { useField } from '../hooks'

const CreateNew = (props) => {
    const content = useField('content')
    const author = useField('author')
    const info = useField('info')
  
    const reset = (e) => {
        e.preventDefault()
        const empty = {
            target: {
                value: ''
            }
        }
        content.onChange(empty)
        author.onChange(empty)
        info.onChange(empty)
      }

    const handleSubmit = (e) => {
      e.preventDefault()
      props.addNew({
        content,
        author,
        info,
        votes: 0
      })
    }
  
    return (
      <div>
        <h2>create a new anecdote</h2>
        <form onSubmit={handleSubmit}>
          <div>
            content
            <input {...content}/>
          </div>
          <div>
            author
            <input {...author} />
          </div>
          <div>
            url for more info
            <input {...info} />
          </div>
          <button>create</button>
          <button onClick={reset}>reset</button>
        </form>
      </div>
    )
  
  }

export default CreateNew