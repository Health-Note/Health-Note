import React from 'react';
import DashBoard from './components/dashBoard/DashBoard';
import { ExerciseProvider } from './contexts/ExerciseContext';
import { MembersProvider } from './contexts/members.context';
import { ScheduleProvider } from './contexts/schedule.context';
import { RoutineProvider } from './contexts/routine.context';
import './App.css';

function App () {
    return (
      <>
      <RoutineProvider>
        <ScheduleProvider>
          <MembersProvider>
              <ExerciseProvider >
                  <DashBoard />
              </ExerciseProvider>
          </MembersProvider>
        </ScheduleProvider>
      </RoutineProvider>
      </>
    );  
}
export default App;
