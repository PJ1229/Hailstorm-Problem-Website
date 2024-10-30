import React from 'react';
import { Outlet } from 'react-router-dom';
import './App.css';

function App() {
  return (
    <div className="App">
      <h1>Number Entry Application</h1>
      <Outlet />
    </div>
  );
}

export default App;