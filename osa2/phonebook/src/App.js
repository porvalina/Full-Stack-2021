import React, { useState, useEffect } from 'react'
import personServices from './services/persons.js'
import PersonForm from './PersonForm'
import Numbers from './Numbers'
import Notification from './Notification'
import FilterComponent from './FilterComponent'

const App = () => {

  const [ persons, setPersons] = useState([]) 

  const [ filter, setFilter ] = useState('')

  const [message, setMessage] = useState(null)

  useEffect(() => {
    console.log('effect')
    
    personServices.getAll()
      .then(response => {
        console.log('promise fulfilled')
        setPersons(response.data)
      })
  }, [])

  useEffect(() => {
    console.log('effect')
    // save data on server
  }, [filter])

  const showNotification = (text, type) => {
    setMessage({
      text: text,
      type: type
    } 
    )
    setTimeout(() => {
      setMessage(null)
    }, 2000)
  }


  const filterHandler = (event) => {
    console.log(event.target.value)
    setFilter(event.target.value)
  }
 
  const onAdd = (newPerson) => {
    const sameNamePersonsArray = persons.filter((p) => {
      return p.name.toUpperCase().indexOf(newPerson.name.toUpperCase()) != -1
    })

    if (sameNamePersonsArray.length > 0) {
      // alert(newPerson.name + ' is already in list ', 'error' )
      if (window.confirm(newPerson.name  + ' is already added to phonebook, replace the old number with a new one?')) {
        const samePerson = sameNamePersonsArray[0]
        personServices.update(samePerson.id, newPerson)
        .then(response => {
          setPersons([...persons.filter((p) => {
            return p.id != samePerson.id
          }), response.data])
          showNotification(newPerson.name + ' is updated successfully', 'success')
          console.log(response)
        })
      }
      return
    }
  
    personServices.create(newPerson)
      .then(response => {
        showNotification(newPerson.name + ' is added successfully', 'success')
        const createdPerson = response.data
        setPersons([...persons, createdPerson])
        console.log(response)
      }).catch(error => {
        // pääset käsiksi palvelimen palauttamaan virheilmoitusolioon näin
        // showNotification(error.response.data, 'error')
        if( error.response ) {
          showNotification(error.response.data.error, 'error')
          console.warn(error.response.data.error); // => the response payload 
        }
      })
  }

 const handleDelete = (person) => {
   personServices.remove(person.id)
   .then(()=> {
    showNotification(person.name + ' is deleted successfully', 'success')
    })
   .catch(error=>{
    showNotification('Information of' + person.name + 'has already been removed from server', 'error')
   })
   const newPersons = persons.filter(p => p.id !== person.id);
    setPersons(newPersons);
    
 }


  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={message} />
      <FilterComponent filterHandler={filterHandler} filter={filter}/>
      <h3>Add a new</h3>
      <PersonForm onSubmit={onAdd}/>
      <h3>Numbers</h3>
      <Numbers persons={persons} filter={filter} handleDelete={handleDelete}/> 
    </div>
  )

}

export default App
