import React, { useEffect } from 'react';
import logo from './logo.svg';
import './App.css';



function App() {
/*
      useEffect(() => {
      fetch("/postTEST",{
        method: "post",
        headers: new Headers({
          'Content-Type': "application/json"
        }),
        body:JSON.stringify({
          empno: "7902",
          ena : "jkjk"
        })
      })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
      })
    })
*/
  
   useEffect(() => {
     fetch("/hihi", {
       method: "get",
       headers: new Headers({
          'Content-Type': "application/json"
       }),
     })
         .then((res) => res.json())
         .then((data) => {
           console.log(data);
         })
     })
  

    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <p>
            Edit <code>src/App.js</code> and save to reload.
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
      </div>
    );
  }

export default App;
