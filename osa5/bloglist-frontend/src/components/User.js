import React, { useState, useEffect } from 'react'
import {
  useParams
} from 'react-router-dom'

import userService from '../services/users'

const User = () => {
  const [user, setUser]= useState({ blog: [] })

  const id = useParams().id

  useEffect(async () => {
    const loggedUserJSON = window.localStorage.getItem('loggedUser')
    if (loggedUserJSON) {
      const loggedUser = JSON.parse(loggedUserJSON)
      userService.setToken(loggedUser.token)
      const users = await userService.getAll()
      setUser(users.find(u => u.id === id))
    }
  }, [])

  return (
    <>
      <h1>{ user.name }</h1>
      <ul>
        { user.blogs && user.blogs.map( blog => {
          return (
            <li key={blog.id}>
              { blog.title }
            </li>
          )
        })}
      </ul>
    </>
  )
}

export default User