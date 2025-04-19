
import React, { Suspense } from 'react';
import './App.css';
import AppWrapper from './AppWrapper';
import { LazyLoadingFallback } from '@/components/shared/LazyLoadingFallback';
import AppRouter from './components/AppRouter';
import { AuthProvider } from '@/hooks/auth/useAuth';

function App() {
  return (
    <AuthProvider>
      <AppWrapper>
        <Suspense fallback={<LazyLoadingFallback />}>
          <AppRouter />
        </Suspense>
      </AppWrapper>
    </AuthProvider>
  );
}

export default App;
