
import React from "react";
import { useLocation } from "react-router-dom";
import NavItem from "./NavItem";
import { BarChart, Users, User, Map, Headphones, Video, Share2, Download } from "lucide-react";

const AdminNavigation = () => {
  const location = useLocation();
  
  return (
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
        Prestataires
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
        href="/admin/recommendations"
        icon={<Share2 size={18} />}
        active={location.pathname === "/admin/recommendations"}
      >
        Recommandations
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
      <NavItem
        href="/admin/backup"
        icon={<Download size={18} />}
        active={location.pathname === "/admin/backup"}
      >
        Sauvegarde
      </NavItem>
    </>
  );
};

export default AdminNavigation;
