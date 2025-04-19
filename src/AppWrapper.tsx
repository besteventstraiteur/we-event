
import React from 'react';
import { BrowserRouter as Router } from "react-router-dom";
import { LanguageProvider } from "@/contexts/LanguageContext";
import { Toaster } from "@/components/ui/toaster";
import { CartProvider } from "@/contexts/CartContext";
import { ThemeProvider } from "@/components/ui/theme-provider";
import { AuthProvider } from "@/hooks/auth/useAuth";
import TokenRefresher from "@/components/security/TokenRefresher";
import SessionTimeout from "@/components/security/SessionTimeout";
import { NetworkStatus } from "./components/app/NetworkStatus";

type AppWrapperProps = {
  children: React.ReactNode;
};

const AppWrapper = ({ children }: AppWrapperProps) => {
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

