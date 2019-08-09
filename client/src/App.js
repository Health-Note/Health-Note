import React, { Component } from 'react';
import Calendar from './components/Calendar/Calendar';
import RecentWorkOut from './components/recentWorkOut/RecentWorkOut';
import './App.css';
import Routine from './components/routine/Routine'
import { ExerciseProvider } from './contexts/ExerciseContext'

class App extends Component {
  render(){
    return (
      <>
       <ExerciseProvider>
          <Calendar />
          <Routine />
          <RecentWorkOut />
       </ExerciseProvider>
       
      </>
    );
  }
  
}
export default App;
