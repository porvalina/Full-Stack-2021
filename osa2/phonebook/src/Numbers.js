import React, { useState, useEffect } from 'react'

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
          handleDelete(p)
          }
          >
      delete
  </button>
    </li>)
  }
    </ul>
   
  </div>
   }

export default Numbers