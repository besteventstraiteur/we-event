
import React from "react";
import Logo from "./Logo";

interface AuthLayoutProps {
  children: React.ReactNode;
  title: string;
  subtitle?: string;
}

const AuthLayout = ({ children, title, subtitle }: AuthLayoutProps) => {
  return (
    <div className="flex min-h-screen w-full flex-col bg-white">
      <header className="border-b border-vip-gray-200 py-4">
        <div className="container flex items-center justify-between">
          <Logo />
        </div>
      </header>
      <main className="flex flex-col items-center justify-center flex-1 py-10 px-4">
        <div className="w-full max-w-md mx-auto space-y-6">
          <div className="text-center space-y-2">
            <h1 className="text-3xl font-bold gold-gradient">{title}</h1>
            {subtitle && <p className="text-vip-gray-600">{subtitle}</p>}
          </div>
          {children}
        </div>
      </main>
      <footer className="py-6 border-t border-vip-gray-200">
        <div className="container">
          <p className="text-center text-vip-gray-500 text-sm">
            © {new Date().getFullYear()} We Event. Tous droits réservés.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default AuthLayout;
