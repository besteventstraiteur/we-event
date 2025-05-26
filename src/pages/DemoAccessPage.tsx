
import React from 'react';
import DemoLoginButtons from '@/components/auth/DemoLoginButtons';
import WeEventLogo from '@/components/WeEventLogo';

const DemoAccessPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
      <div className="w-full max-w-md space-y-8">
        <div className="text-center">
          <WeEventLogo />
          <h1 className="mt-6 text-3xl font-bold text-gray-900">
            Interface de Démonstration
          </h1>
          <p className="mt-2 text-gray-600">
            Explorez toutes les fonctionnalités de WeEvent
          </p>
        </div>
        
        <DemoLoginButtons />
        
        <div className="text-center">
          <p className="text-xs text-gray-500">
            Ces accès sont destinés uniquement aux démonstrations.<br/>
            Aucune donnée réelle n'est utilisée.
          </p>
        </div>
      </div>
    </div>
  );
};

export default DemoAccessPage;
