
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AuthLayout from '@/components/AuthLayout';
import RegisterForm from '@/components/auth/RegisterForm';
import { useAuth } from '@/hooks/useAuth';
import { UserRole } from '@/utils/accessControl';

const RegisterPage = () => {
  const [isLoading, setIsLoading] = useState(false);
  const { register } = useAuth();
  const navigate = useNavigate();

  const handleRegister = async (email: string, password: string, role: UserRole, name: string) => {
    try {
      setIsLoading(true);
      
      console.log("Registering with:", { email, role, name });
      
      const result = await register({
        email,
        password,
        role,
        name
      });
      
      if (result.success) {
        // Rediriger en fonction du rôle
        let redirectPath = '/client/dashboard';
        
        switch (role) {
          case UserRole.ADMIN:
            redirectPath = '/admin/dashboard';
            break;
          case UserRole.PARTNER:
            redirectPath = '/partner/dashboard';
            break;
          default:
            redirectPath = '/client/dashboard';
        }
        
        navigate(redirectPath, { replace: true });
      }
    } catch (error) {
      console.error("Registration error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <AuthLayout 
      title="Créer un compte" 
      subtitle="Inscrivez-vous pour accéder à votre espace personnel"
    >
      <RegisterForm 
        onSubmit={handleRegister}
        isLoading={isLoading}
      />
    </AuthLayout>
  );
};

export default RegisterPage;
