import React from 'react'

const Header = ({course}) => <h1>{course}</h1>

const Part = ({theme, exe}) =>
<p>
    {theme} {exe}
</p>

const Content = (props) => {
  return (
    <div>
      {props.content.map(item => <Part theme={item.theme} exe={item.exe} />)}
    </div>
  )
}

const course = 'Half Stack application development'

const themes = [
  { theme:'Fundamentals of React', exe: 10 },
  { theme:'Using props to pass data', exe: 7},
  { theme: 'State of a component', exe: 14}
]

const Total = ({total})=> 
<p>Number of exercises {total[0].exe + total[1].exe + total[2].exe}</p>

const App = () => {
  return (
    <div>
      <Header course={course} />
      <Content content={themes} />
      <Total total={themes} />
      
    </div>
  )
}

export default App
