
import React from "react";
import { useLocation } from "react-router-dom";
import NavItem from "./NavItem";
import Logo from "../Logo";
import { Button } from "@/components/ui/button";
import { LogOut } from "lucide-react";
import { 
  User, Users, FileText, Headphones, BarChart, 
  Video, LayoutDashboard, Map 
} from "lucide-react";

interface SidebarProps {
  type: "client" | "partner" | "admin";
  onLogout: () => void;
}

const Sidebar = ({ type, onLogout }: SidebarProps) => {
  const location = useLocation();

  return (
    <div className="hidden md:flex flex-col w-64 border-r border-vip-gray-200 bg-white p-4">
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
              href="/client/floorplans"
              icon={<LayoutDashboard size={18} />}
              active={location.pathname === "/client/floorplans"}
            >
              Plan de salle & Invités
            </NavItem>
            <NavItem
              href="/client/podcasts"
              icon={<Headphones size={18} />}
              active={location.pathname === "/client/podcasts"}
            >
              Podcasts
            </NavItem>
            <NavItem
              href="/client/talkshows"
              icon={<Video size={18} />}
              active={location.pathname === "/client/talkshows"}
            >
              Talkshows
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
            <NavItem
              href="/partner/talkshows"
              icon={<Video size={18} />}
              active={location.pathname === "/partner/talkshows"}
            >
              Mes Talkshows
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
              href="/admin/venues"
              icon={<Map size={18} />}
              active={location.pathname === "/admin/venues"}
            >
              Salles de réception
            </NavItem>
            <NavItem
              href="/admin/podcasts"
              icon={<Headphones size={18} />}
              active={location.pathname === "/admin/podcasts"}
            >
              Podcasts
            </NavItem>
            <NavItem
              href="/admin/talkshows"
              icon={<Video size={18} />}
              active={location.pathname === "/admin/talkshows"}
            >
              Talkshows
            </NavItem>
          </>
        )}
      </nav>

      <Button
        variant="outline"
        className="text-vip-gray-700 hover:text-vip-black hover:bg-vip-gray-100 w-full justify-start mt-auto border-vip-gray-200"
        onClick={onLogout}
      >
        <LogOut size={18} className="mr-2" />
        Déconnexion
      </Button>
    </div>
  );
};

export default Sidebar;
