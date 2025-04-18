
import React from 'react';
import './App.css';
import AppWrapper from './AppWrapper';
import { Outlet } from 'react-router-dom';

function App() {
  return (
    <AppWrapper>
      <Outlet />
    </AppWrapper>
  );
}

export default App;
