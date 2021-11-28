import React, { useState, useEffect } from 'react'
import userService from '../services/users'
import {
  Link
} from 'react-router-dom'

const Users = () => {
  const [users, setUsers]= useState([])

  useEffect(async () => {
    const fetchedUsers = await userService.getAll()
    setUsers(fetchedUsers)
  }, [])

  return (
    <>
      <h1>users</h1>
      <table>
        <tr>
          <td></td>
          <td>blogs created</td>
        </tr>
        { users.map( user => {
          return (
            <tr key={user.id}>
              <td>
                <Link to={`/users/${user.id}`}>{user.name}</Link>
              </td>
              <td>{ user.blogs.length }</td>
            </tr>
          )
        })}
      </table>
    </>
  )
}

export default Users