
import React, { Suspense } from 'react';
import './App.css';
import AppWrapper from './AppWrapper';
import { LazyLoadingFallback } from '@/components/shared/LazyLoadingFallback';
import AppRouter from './components/AppRouter';

function App() {
  console.log('App component rendering');
  return (
    <AppWrapper>
      <Suspense fallback={<LazyLoadingFallback />}>
        <AppRouter />
      </Suspense>
    </AppWrapper>
  );
}

export default App;
