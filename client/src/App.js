import React, { useEffect } from 'react';
import logo from './logo.svg';
import './App.css';


// 디벨롭먼트에 푸쉬 테스트
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
    }) 종열 브랜치 테스트22222
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
        <h1>테스트</h1>
      </div>
    );
  }

export default App;
