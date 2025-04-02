
import React from "react";
import { useNavigate } from "react-router-dom";
import Sidebar from "./dashboard/Sidebar";
import Header from "./dashboard/Header";

interface DashboardLayoutProps {
  children: React.ReactNode;
  type: "client" | "partner" | "admin";
}

const DashboardLayout = ({ children, type }: DashboardLayoutProps) => {
  const navigate = useNavigate();
  
  const handleLogout = () => {
    // Logique de déconnexion ici
    navigate("/login");
  };

  return (
    <div className="flex min-h-screen w-full bg-white">
      {/* Sidebar */}
      <Sidebar type={type} onLogout={handleLogout} />

      {/* Main content */}
      <div className="flex-1 flex flex-col">
        <Header type={type} />
        <main className="flex-1 overflow-auto p-6 bg-white">{children}</main>
      </div>
    </div>
  );
};

export default DashboardLayout;
