import React, { useState, useEffect } from 'react'
import axios from 'axios'
import CountriesList from './CountriesList'

const FilterComponent = (props) => {
  return <>
         <input type="text" name="filter" 
                  onChange={props.filterHandler} value={props.filter} />
        </>
}

const App = () => {

  const [ countries, setCountries] = useState([]) 
  const [ filter, setFilter ] = useState('')

  const filterHandler = (event) => {
    console.log(event.target.value)
    setFilter(event.target.value)
  }

  useEffect(() => {
    console.log('effect')
    axios
      .get('https://restcountries.eu/rest/v2/all')
      .then(response => {
        console.log('promise fulfilled')
        setCountries(response.data)
      })
  }, [])


  return (
    <div>
      <p>find countries
      <FilterComponent filterHandler={filterHandler} filter={filter}/>
      </p>
      <CountriesList countries={countries} filter={filter}/>
    </div>
  )

}

export default App
