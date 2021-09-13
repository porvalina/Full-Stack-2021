import React from 'react'

const Notification = (props) => {
  const style = {
    border: 'solid',
    borderColor: "red",
    padding: 10,
    borderWidth: 2
  }
  if (!props.notification)
    return null
  return (
    <div>
      <span style={style}>{props.notification}</span>
    </div>
  )
}

export default Notification