
import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';
import { Button } from '@/components/ui/button';
import { supabase } from '@/lib/supabase';
import { UserRole } from '@/utils/accessControl';

const HomePage: React.FC = () => {
  const { user, isAuthenticated, hasRole } = useAuth();

  // Role-based dashboard redirection
  const getDashboardPath = () => {
    if (!user) return '/login';
    if (hasRole(UserRole.ADMIN)) return '/admin/dashboard';
    if (hasRole(UserRole.PARTNER)) return '/partner/dashboard';
    if (hasRole(UserRole.CLIENT)) return '/client/dashboard';
    return '/unauthorized';
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="text-center space-y-6">
        <h1 className="text-4xl font-bold text-primary">WeEvent</h1>
        <p className="text-xl text-muted-foreground">
          Your comprehensive wedding planning and management platform
        </p>

        {!isAuthenticated ? (
          <div className="flex justify-center space-x-4">
            <Button asChild>
              <Link to="/login">Login</Link>
            </Button>
            <Button variant="outline" asChild>
              <Link to="/register">Register</Link>
            </Button>
          </div>
        ) : (
          <div className="space-y-4">
            <p>Welcome, {user.user_metadata?.name || user.email}!</p>
            <Button asChild>
              <Link to={getDashboardPath()}>
                Go to Dashboard
              </Link>
            </Button>
            <Button 
              variant="destructive" 
              onClick={async () => {
                await supabase.auth.signOut();
              }}
            >
              Logout
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default HomePage;
