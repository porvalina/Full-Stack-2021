import React, { useState, useEffect } from 'react'
import personServices from './services/persons.js'

const FilterComponent = (props) => {
  return <div>
        filter: <input type="text" name="filter" 
                  onChange={props.filterHandler} value={props.filter} />
        </div>
}

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
 const Numbers = ({persons,filter,handleDelete}) => {
  return <div>
  <ul>
  {
  persons.filter((p)=>{
    return p.name.toUpperCase().includes(filter.toUpperCase())
  }).map(p => 
  <li key={p.name}>
    {p.name} {p.phonenumber}
    {/* <button onClick={()=>handleDelete(p.id)}>delete</button>  */}
    <button
    onClick={() =>
        window.confirm("Are you sure you wish to delete this contact?") &&
        handleDelete(p.id)
        }>
    delete
</button>
  </li>)
}
  </ul>
 
</div>
 }

const Notification= ({ message }) => {
  if (message === null) {

    return null
    
  }

  return (
    <div className="error">
      {message}
    </div>
  )
}

const App = () => {

  const [ persons, setPersons] = useState([]) 

  const [ filter, setFilter ] = useState('')

  const [errorMessage, setErrorMessage] = useState(null)

  useEffect(() => {
    console.log('effect')
    
    personServices.getAll('http://localhost:3001/persons')
      .then(response => {
        console.log('promise fulfilled')
        setPersons(response.data)
      })
  }, [])

  useEffect(() => {
    console.log('effect')
    // save data on server
  }, [filter])

  const filterHandler = (event) => {
    console.log(event.target.value)
    setFilter(event.target.value)
  }
 
  const onSubmit = (newPerson) => {
    const sameNamePersons = persons.filter(p => p.name === newPerson.name)
    if (sameNamePersons.length>0) {
      setErrorMessage(
        newPerson.name + ' is already in list '
      )
      setTimeout(() => {
        setErrorMessage(null)
      }, 2000)
      return
    }
  
    personServices.create(newPerson)
      .then(response => {
        console.log(response)
      })
    setPersons([...persons, newPerson])
  }
 const handleDelete = (id) => {
   const newPersons = persons.filter(person => person.id !== id);
    setPersons(newPersons);
 }
  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={errorMessage} />
      <FilterComponent filterHandler={filterHandler} filter={filter}/>
      <h3>Add a new</h3>
      <PersonForm onSubmit={onSubmit}/>
      <h3>Numbers</h3>
      <Numbers persons={persons} filter={filter} handleDelete={handleDelete}/> 
    </div>
  )

}

export default App
