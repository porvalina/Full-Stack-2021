import React from 'react'

const Header = ({course}) => {
    return <h1>{course}</h1>
  }
  const Part = ({theme, exe}) =>
  <p>
      {theme} {exe}
  </p>
  
  const Content = (props) => {
    return (
      <div>
        {props.content.map(item => <Part key={item.id} theme={item.name} exe={item.exercises} />)}
      </div>
    )
  }
  const Total = ({partsArray}) => {
    const reducer = (acc, curValue) => { return acc + curValue.exercises }
    const total = partsArray.reduce(reducer, 0)
    return <p>Number of exercises {total}</p>
  
  } 
  
  const Course = ({course}) => {
    return <div>
            <Header course={course.name} />
            <Content content={course.parts} />
            <Total partsArray={course.parts} />
          </div>
  }

export default Course
  