import React from 'react';
import logo from './logo.svg';
import './App.css';
import questions from './questions.json';
import { loadQuestions } from './Question';

function App() {
  const a = () => loadQuestions('en-US');

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
      <pre>
        {JSON.stringify(questions, undefined, 2)}
      </pre>
    </div>
  );
}

export default App;
