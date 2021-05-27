import ReactDOM from 'react-dom'
import App from './App'

ReactDOM.render(
  <App />, 
  document.getElementById('root')
)


// const App = () => {
//     const [ persons, setPersons] = useState([
//       { name: 'Alina Porval' }
//     ]) 
//     const [ newName, setNewName ] = useState('')
//     const [showAll, setShowAll] = useState ('')
//     const contactsToShow = showAll
  
//     return (
//       <div>
//         <h2>Phonebook</h2>
//         <div>
//             filter shown with <input />
//         </div>
//         <h2>Add a new</h2>
//         <form>
//           <div>
//             name: <input type="text" name="name" />
//           </div>
//           <div>
//             number: <input type="numbers" number="number" />
//           </div>
//           <div>
//             <button type="submit">add</button>
//           </div>
//         </form>
//         <h2>Numbers</h2>
//         <li>
//             ...
//         </li>
//       </div>
//     )
  
//   }
  
//   export default App