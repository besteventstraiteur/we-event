
import React from 'react';
import './App.css';
import AppWrapper from './AppWrapper';
import { Outlet } from 'react-router-dom';
import AppRouter from './components/AppRouter';

function App() {
  return (
    <AppWrapper>
      <AppRouter />
    </AppWrapper>
  );
}

export default App;
