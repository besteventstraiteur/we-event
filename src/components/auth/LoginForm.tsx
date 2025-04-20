
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { Loader2 } from 'lucide-react';

interface LoginFormProps {
  onSubmit: (email: string, password: string, rememberMe: boolean) => void;
  onForgotPassword: () => void;
  isLoading: boolean;
  error: string | null;
}

const LoginForm: React.FC<LoginFormProps> = ({
  onSubmit,
  onForgotPassword,
  isLoading,
  error
}) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  
  // Charger l'email sauvegardé si "se souvenir de moi" était activé
  React.useEffect(() => {
    const savedEmail = localStorage.getItem('weddingPlannerEmail');
    const savedRememberMe = localStorage.getItem('weddingPlannerRememberMe') === 'true';
    
    if (savedEmail) {
      setEmail(savedEmail);
      setRememberMe(savedRememberMe);
    }
  }, []);
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(email, password, rememberMe);
  };
  
  // En mode démo, ajouter des comptes pré-remplis
  const loginAsUser = (userType: string) => {
    let userEmail: string;
    
    switch(userType) {
      case 'admin':
        userEmail = 'admin@best-events.fr';
        break;
      case 'partner':
        userEmail = 'partner@best-events.fr';
        break;
      default:
        userEmail = 'client@best-events.fr';
    }
    
    setEmail(userEmail);
    setPassword('password123');
  };
  
  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="email">Email</Label>
        <Input
          id="email"
          type="email"
          placeholder="votre@email.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          autoComplete="email"
          className="bg-white"
        />
      </div>
      
      <div className="space-y-2">
        <div className="flex justify-between items-center">
          <Label htmlFor="password">Mot de passe</Label>
          <button 
            type="button" 
            onClick={onForgotPassword}
            className="text-sm text-blue-600 hover:underline"
          >
            Mot de passe oublié?
          </button>
        </div>
        <Input
          id="password"
          type="password"
          placeholder="••••••••"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          autoComplete="current-password"
          className="bg-white"
        />
      </div>
      
      <div className="flex items-center space-x-2">
        <Checkbox 
          id="remember" 
          checked={rememberMe}
          onCheckedChange={(checked) => setRememberMe(!!checked)} 
        />
        <Label 
          htmlFor="remember" 
          className="text-sm font-normal cursor-pointer"
        >
          Se souvenir de moi
        </Label>
      </div>
      
      {error && (
        <div className="p-3 bg-red-50 border border-red-200 text-red-600 rounded-md text-sm">
          {error}
        </div>
      )}
      
      <Button 
        type="submit" 
        className="w-full bg-blue-600 hover:bg-blue-700" 
        disabled={isLoading}
      >
        {isLoading ? (
          <>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            Connexion en cours...
          </>
        ) : "Se connecter"}
      </Button>
      
      {/* En mode démo, ajout des liens de connexion rapide */}
      <div className="mt-4 pt-4 border-t border-gray-200">
        <p className="text-sm text-gray-500 mb-2">Comptes de démonstration :</p>
        <div className="flex flex-wrap gap-2">
          <button 
            type="button"
            onClick={() => loginAsUser('client')}
            className="text-xs px-2 py-1 bg-gray-100 hover:bg-gray-200 rounded"
          >
            Client
          </button>
          <button 
            type="button"
            onClick={() => loginAsUser('partner')}
            className="text-xs px-2 py-1 bg-gray-100 hover:bg-gray-200 rounded"
          >
            Partenaire
          </button>
          <button 
            type="button"
            onClick={() => loginAsUser('admin')}
            className="text-xs px-2 py-1 bg-gray-100 hover:bg-gray-200 rounded"
          >
            Admin
          </button>
        </div>
      </div>
    </form>
  );
};

export default LoginForm;
