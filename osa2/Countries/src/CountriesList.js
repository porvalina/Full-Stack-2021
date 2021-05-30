import axios from 'axios'
import React, { useState,useEffect } from 'react'

const Country = ({country}) => {
    const [weather, setWeather] = useState({})
    useEffect(() => {
      console.log('weatherstack call')
        axios.get('http://api.weatherstack.com/current?access_key=a4570edcfc2a694fbb73110a3bb01b49&query=' + country.name)
        .then(response => {
            console.log('weatherstack got')
            console.log(response.data.current)
            setWeather(response.data.current)
        })
        .catch(
          error => {
            console.log(error)
          }
        )

    }, [country])

    return <>
    <h1>{country.name}</h1>
    capital {country.capital}
    <br></br>
    population {country.population}
    <h3>Languages</h3>
    <>
      {country.languages.map((language, languageIndex) => (
      <div key={languageIndex}>{language.name}</div>
      ))}
    </>
    <>
       <img src={country.flag} alt="" width="100px" />
    </>
      <h3>Weather in {country.name}</h3>
      {
        weather.temperature ? <>
          <div>Temperature : {weather.temperature}</div>
          <div><img src={weather.weather_icons[0]}/></div>
          <div>Wind speed {weather.wind_speed} mph, direction {weather.wind_dir}</div>
        </>:null
      }
    </>
}

const CountriesList = ({countries, filter}) => {
    const [selectedCountry, selectCountry] = useState({})
    useEffect(() => {
        selectCountry({})
    }, [filter])

    const filteredCountries = countries.filter((c)=>{
      return c.name.toUpperCase().includes(filter.toUpperCase())
    })

    if (filteredCountries.length>10) {
      return <>Too many matches, specify another filter,please </>
    }

    if (filteredCountries.length === 1 || selectedCountry.name) {
      const country = selectedCountry.name ? selectedCountry : filteredCountries[0]
      console.log(country)
      return <Country country={country} />
    }

    return <div>
    <ul>
    {filteredCountries.map(c =>
        <li key={c.name}>
            {c.name}&nbsp;
            <button onClick={() => selectCountry(c)}>show</button>
        </li>)}
    </ul>
  </div>
   }

export default CountriesList