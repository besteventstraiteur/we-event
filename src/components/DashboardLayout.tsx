
import React from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Logo from "./Logo";
import { Button } from "@/components/ui/button";
import { LogOut, User, Users, FileText, Headphones, BarChart, CreditCard } from "lucide-react";

interface NavItemProps {
  href: string;
  icon: React.ReactNode;
  children: React.ReactNode;
  active?: boolean;
}

const NavItem = ({ href, icon, children, active }: NavItemProps) => {
  return (
    <Link
      to={href}
      className={`flex items-center gap-3 px-3 py-2 rounded-md transition-colors ${
        active
          ? "bg-vip-gray-800 text-vip-gold"
          : "text-vip-gray-400 hover:text-vip-white hover:bg-vip-gray-800"
      }`}
    >
      {icon}
      <span>{children}</span>
    </Link>
  );
};

interface DashboardLayoutProps {
  children: React.ReactNode;
  type: "client" | "partner" | "admin";
}

const DashboardLayout = ({ children, type }: DashboardLayoutProps) => {
  const location = useLocation();
  const navigate = useNavigate();
  
  const handleLogout = () => {
    // Logique de déconnexion ici
    navigate("/login");
  };

  return (
    <div className="flex min-h-screen w-full bg-vip-black">
      {/* Sidebar */}
      <div className="hidden md:flex flex-col w-64 border-r border-vip-gray-800 bg-vip-gray-900 p-4">
        <div className="mb-8 pl-3">
          <Logo />
        </div>

        <nav className="space-y-1 flex-1">
          {type === "client" && (
            <>
              <NavItem
                href="/client/dashboard"
                icon={<User size={18} />}
                active={location.pathname === "/client/dashboard"}
              >
                Mon Profil
              </NavItem>
              <NavItem
                href="/client/partners"
                icon={<Users size={18} />}
                active={location.pathname === "/client/partners"}
              >
                Partenaires
              </NavItem>
              <NavItem
                href="/client/requests"
                icon={<FileText size={18} />}
                active={location.pathname === "/client/requests"}
              >
                Mes Demandes
              </NavItem>
              <NavItem
                href="/client/podcasts"
                icon={<Headphones size={18} />}
                active={location.pathname === "/client/podcasts"}
              >
                Podcasts
              </NavItem>
            </>
          )}

          {type === "partner" && (
            <>
              <NavItem
                href="/partner/dashboard"
                icon={<User size={18} />}
                active={location.pathname === "/partner/dashboard"}
              >
                Mon Profil
              </NavItem>
              <NavItem
                href="/partner/requests"
                icon={<FileText size={18} />}
                active={location.pathname === "/partner/requests"}
              >
                Demandes Clients
              </NavItem>
              <NavItem
                href="/partner/stats"
                icon={<BarChart size={18} />}
                active={location.pathname === "/partner/stats"}
              >
                Statistiques
              </NavItem>
              <NavItem
                href="/partner/podcasts"
                icon={<Headphones size={18} />}
                active={location.pathname === "/partner/podcasts"}
              >
                Mes Podcasts
              </NavItem>
            </>
          )}

          {type === "admin" && (
            <>
              <NavItem
                href="/admin/dashboard"
                icon={<BarChart size={18} />}
                active={location.pathname === "/admin/dashboard"}
              >
                Tableau de bord
              </NavItem>
              <NavItem
                href="/admin/partners"
                icon={<Users size={18} />}
                active={location.pathname === "/admin/partners"}
              >
                Partenaires
              </NavItem>
              <NavItem
                href="/admin/clients"
                icon={<User size={18} />}
                active={location.pathname === "/admin/clients"}
              >
                Clients
              </NavItem>
              <NavItem
                href="/admin/podcasts"
                icon={<Headphones size={18} />}
                active={location.pathname === "/admin/podcasts"}
              >
                Podcasts
              </NavItem>
            </>
          )}
        </nav>

        <Button
          variant="ghost"
          className="text-vip-gray-400 hover:text-vip-white w-full justify-start mt-auto"
          onClick={handleLogout}
        >
          <LogOut size={18} className="mr-2" />
          Déconnexion
        </Button>
      </div>

      {/* Main content */}
      <div className="flex-1 flex flex-col">
        <header className="border-b border-vip-gray-800 py-4 px-6">
          <div className="flex items-center justify-between">
            <div className="md:hidden">
              <Logo />
            </div>
            <div className="flex items-center gap-4">
              <div className="text-sm text-vip-gray-400">
                {type === "client" && "Espace Client VIP"}
                {type === "partner" && "Espace Partenaire VIP"}
                {type === "admin" && "Administration"}
              </div>
            </div>
          </div>
        </header>

        <main className="flex-1 overflow-auto p-6">{children}</main>
      </div>
    </div>
  );
};

export default DashboardLayout;
