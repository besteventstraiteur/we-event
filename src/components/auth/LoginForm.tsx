
import React, { useState, useEffect } from "react";
import InputField from "@/components/InputField";
import GoldButton from "@/components/GoldButton";
import { Checkbox } from "@/components/ui/checkbox";
import { Link } from "react-router-dom";
import { UserRole } from "@/utils/accessControl";

interface LoginFormProps {
  onSubmit: (email: string, password: string, rememberMe: boolean) => void;
  onForgotPassword: () => void;
  isLoading: boolean;
}

const LoginForm: React.FC<LoginFormProps> = ({ 
  onSubmit, 
  onForgotPassword, 
  isLoading 
}) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const [error, setError] = useState("");

  // Load saved credentials if available
  useEffect(() => {
    const savedEmail = localStorage.getItem("weddingPlannerEmail");
    const savedRememberMe = localStorage.getItem("weddingPlannerRememberMe") === "true";
    
    if (savedEmail && savedRememberMe) {
      setEmail(savedEmail);
      setRememberMe(true);
    }
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    
    if (!email || !password) {
      setError("Veuillez remplir tous les champs");
      return;
    }
    
    console.log("Login submission:", { email, password: "***", rememberMe });
    onSubmit(email, password, rememberMe);
  };

  // Boutons de connexion rapide pour les différents rôles
  const loginAsRole = (role: string) => {
    let roleEmail;
    
    // Utiliser des adresses email distinctes pour chaque rôle
    switch (role.toLowerCase()) {
      case 'admin':
        roleEmail = "admin@weevent.com";
        break;
      case 'partner':
        roleEmail = "partner@weevent.com";
        break;
      case 'client':
      default:
        roleEmail = "client@weevent.com";
        break;
    }
    
    // Définir l'email et le mot de passe
    setEmail(roleEmail);
    setPassword("password123");
    setRememberMe(true);
    
    console.log(`Quick login as ${role} with email: ${roleEmail}`);
    
    // Déclencher la soumission du formulaire avec les nouveaux identifiants
    onSubmit(roleEmail, "password123", true);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {error && (
        <div className="bg-red-50 border border-red-200 text-red-600 p-3 rounded">
          {error}
        </div>
      )}
      
      <InputField
        label="Email"
        id="email"
        type="email"
        placeholder="votre@email.com"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
      />
      <InputField
        label="Mot de passe"
        id="password"
        type="password"
        placeholder="••••••••"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
      />
      
      <div className="flex items-center space-x-2">
        <Checkbox 
          id="remember-me" 
          checked={rememberMe}
          onCheckedChange={(checked) => setRememberMe(checked === true)}
        />
        <label 
          htmlFor="remember-me" 
          className="text-sm text-gray-600 cursor-pointer"
        >
          Se souvenir de moi
        </label>
        <div className="flex-1 text-right">
          <button 
            type="button" 
            onClick={onForgotPassword}
            className="text-sm text-vip-gold hover:underline"
          >
            Mot de passe oublié?
          </button>
        </div>
      </div>
      
      <GoldButton type="submit" className="w-full" disabled={isLoading}>
        {isLoading ? "Connexion en cours..." : "Se connecter"}
      </GoldButton>
      
      <div className="text-center text-sm text-vip-gray-400">
        Pas encore de compte?{" "}
        <Link to="/register-client" className="text-vip-gold hover:underline">
          Inscription Client
        </Link>{" "}
        ou{" "}
        <Link to="/register-partner" className="text-vip-gold hover:underline">
          Inscription Partenaire
        </Link>
      </div>

      {/* Section de débogage pour connexion rapide */}
      <div className="pt-2 border-t border-gray-200 mt-4">
        <div className="text-xs text-gray-500 mb-2">Connexion rapide (pour test):</div>
        <div className="flex gap-2">
          <button 
            type="button" 
            onClick={() => loginAsRole('admin')} 
            className="text-xs bg-gray-200 hover:bg-gray-300 px-2 py-1 rounded">
            Admin
          </button>
          <button 
            type="button" 
            onClick={() => loginAsRole('partner')} 
            className="text-xs bg-gray-200 hover:bg-gray-300 px-2 py-1 rounded">
            Partenaire
          </button>
          <button 
            type="button" 
            onClick={() => loginAsRole('client')} 
            className="text-xs bg-gray-200 hover:bg-gray-300 px-2 py-1 rounded">
            Client
          </button>
        </div>
      </div>
    </form>
  );
};

export default LoginForm;
