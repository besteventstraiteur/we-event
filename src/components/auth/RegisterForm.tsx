
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Loader2 } from "lucide-react";
import { UserRole } from "@/utils/accessControl";

interface RegisterFormProps {
  onSubmit: (email: string, password: string, role: UserRole, name: string) => Promise<void>;
  isLoading: boolean;
}

const RegisterForm: React.FC<RegisterFormProps> = ({ onSubmit, isLoading }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [role, setRole] = useState<UserRole>(UserRole.CLIENT);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await onSubmit(email, password, role, name);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <Label htmlFor="name">Nom</Label>
        <Input
          id="name"
          type="text"
          placeholder="Votre nom"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="mt-1"
          required
        />
      </div>
      
      <div>
        <Label htmlFor="email">Email</Label>
        <Input
          id="email"
          type="email"
          placeholder="votre@email.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="mt-1"
          required
        />
      </div>
      
      <div>
        <Label htmlFor="password">Mot de passe</Label>
        <Input
          id="password"
          type="password"
          placeholder="********"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="mt-1"
          required
          minLength={6}
        />
      </div>
      
      <div>
        <Label htmlFor="role">Rôle</Label>
        <Select 
          value={role} 
          onValueChange={(value) => setRole(value as UserRole)}
        >
          <SelectTrigger id="role" className="mt-1">
            <SelectValue placeholder="Sélectionnez votre rôle" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value={UserRole.CLIENT}>Client</SelectItem>
            <SelectItem value={UserRole.PARTNER}>Partenaire</SelectItem>
            <SelectItem value={UserRole.ADMIN}>Administrateur</SelectItem>
          </SelectContent>
        </Select>
        <p className="text-xs text-gray-500 mt-1">
          Choisissez le rôle qui correspond à votre utilisation de l'application
        </p>
      </div>
      
      <Button type="submit" className="w-full" disabled={isLoading}>
        {isLoading ? (
          <>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            Inscription en cours...
          </>
        ) : (
          "S'inscrire"
        )}
      </Button>
      
      <div className="text-center text-sm">
        Vous avez déjà un compte?{" "}
        <Link to="/login" className="text-primary hover:underline">
          Connexion
        </Link>
      </div>
    </form>
  );
};

export default RegisterForm;
