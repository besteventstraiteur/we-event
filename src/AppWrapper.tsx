
import React, { ReactNode } from 'react';
import { BrowserRouter as Router } from "react-router-dom";
import { LanguageProvider } from "@/contexts/LanguageContext";
import { Toaster } from "@/components/ui/toaster";
import { CartProvider } from "@/contexts/CartContext";
import { ThemeProvider } from "@/components/ui/theme-provider";
import { AuthProvider } from "@/hooks/auth/useAuth"; // Using named import from useAuth.tsx
import TokenRefresher from "@/components/security/TokenRefresher";
import SessionTimeout from "@/components/security/SessionTimeout";
import { NetworkStatus } from "./components/app/NetworkStatus";

// Define the props interface with ReactNode for children
interface AppWrapperProps {
  children: ReactNode;
}

const AppWrapper: React.FC<AppWrapperProps> = ({ children }) => {
  return (
    <Router>
      <ThemeProvider defaultTheme="light" storageKey="vite-ui-theme">
        <LanguageProvider>
          <AuthProvider>
            <TokenRefresher>
              <SessionTimeout>
                <CartProvider>
                  {children}
                  <Toaster />
                  <NetworkStatus />
                </CartProvider>
              </SessionTimeout>
            </TokenRefresher>
          </AuthProvider>
        </LanguageProvider>
      </ThemeProvider>
    </Router>
  );
};

export default AppWrapper;
