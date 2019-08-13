import React, { Component } from 'react';
import DashBoard from './components/dashBoard/DashBoard';
import { ExerciseProvider } from './contexts/ExerciseContext';
import './App.css';


class App extends Component {
  render(){
    return (
      <>
      <ExerciseProvider >
          <DashBoard />
      </ExerciseProvider>
      </>
    );
  }
  
}
export default App;
