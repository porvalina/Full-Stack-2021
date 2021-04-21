import logo from './logo.svg';
import './App.css';

function App () {
  const title = "Welcome to the new blog" ;
  
  return (
    <div className="App">
      <div classname="content">
        <h1>App Component</h1>
      </div>
    </div>
  );
}

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>I love you baby</p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
