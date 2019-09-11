import React from 'react';
import setAuthToken from './utils/setAuthToken';
import broswerRouter from 'react-router-dom'
import DashBoard from './components/dashBoard/DashBoard';
import { ExerciseProvider } from './contexts/exercise.context';
import { MembersProvider } from './contexts/members.context';
import { ScheduleProvider } from './contexts/schedule.context';
import { FixedScheduleProvider } from './contexts/fixedSchedule.context';
import { AuthProvider } from './contexts/auth.context';
import { AlertProvider } from './contexts/alert.context';
import './App.css';

if (localStorage.token) {
  setAuthToken(localStorage.token);
}

function App () {
    return (
      <>
      <AuthProvider>
        <AlertProvider>
            <MembersProvider>
          <ScheduleProvider>
            <FixedScheduleProvider>
              <ExerciseProvider >
                <broswerRouter>
                  <DashBoard />
                </broswerRouter>
              </ExerciseProvider>
            </FixedScheduleProvider>
          </ScheduleProvider>
            </MembersProvider>
        </AlertProvider>
      </AuthProvider>
      </>
    );  
}
export default App;
