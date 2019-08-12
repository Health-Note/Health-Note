import React, { Component } from 'react';
import Calendar from './components/Calendar/Calendar';
import RecentWorkOut from './components/recentWorkOut/RecentWorkOut';
import Routine from './components/routine/Routine'
import Members from './components/member/Members'
import { ExerciseProvider } from './contexts/ExerciseContext'
import './App.css';

class App extends Component {
  render(){
    return (
      <>
       <ExerciseProvider>
          <Calendar />
          <Routine />
          <RecentWorkOut />
       </ExerciseProvider>
          <Members />
       
      </>
    );
  }
  
}
export default App;
