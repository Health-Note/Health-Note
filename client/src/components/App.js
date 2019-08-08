import React, { Component } from 'react';
import Calendar from './Calendar';
import './App.css';
import'./Routine/MaterialTable'
import MaterialTable from 'material-table';
class App extends Component {
  render(){
    return (
      <>
      <Calendar />
      <MaterialTable />
      </>
    );
  }
  
}
export default App;
