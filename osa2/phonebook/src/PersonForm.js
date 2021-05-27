import React, { useState, useEffect } from 'react'

const PersonForm = (props) => {
    const [ newName, setNewName ] = useState('')
    const handler = (event) => {
      console.log(event.target.value)
      setNewName(event.target.value)
    }
    const [ newNumber, setNewNumber ] = useState('')
    const numberHandler = (event) => {
      console.log(event.target.value)
      setNewNumber(event.target.value)
    }
    const onSubmit = (event) => {
      event.preventDefault()
      props.onSubmit({name: newName, phonenumber:newNumber})
      setNewNumber('')
      setNewName('')
    }
    
    return <form>
      <div>
        name: <input type="text" name="name" onChange={handler} value={newName}/>
        <br></br>
        phonenumber: <input type="text" name="number" onChange={numberHandler} value={newNumber}/>
      </div>
      <div>
        <button onClick={onSubmit} type="submit">add</button>
      </div>
    </form>
  }

  export default PersonForm
  