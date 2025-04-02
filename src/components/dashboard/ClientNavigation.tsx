
import React from "react";
import { useLocation } from "react-router-dom";
import NavItem from "./NavItem";
import { User, Users, FileText, LayoutDashboard, Headphones, Video, Image, CheckSquare, UtensilsCrossed, ClipboardCheck } from "lucide-react";

const ClientNavigation = () => {
  const location = useLocation();
  
  return (
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
        Prestataires
      </NavItem>
      <NavItem
        href="/client/requests"
        icon={<FileText size={18} />}
        active={location.pathname === "/client/requests"}
      >
        Mes Demandes
      </NavItem>
      <NavItem
        href="/client/photos"
        icon={<Image size={18} />}
        active={location.pathname === "/client/photos"}
      >
        Mes Photos
      </NavItem>
      <NavItem
        href="/client/floorplans"
        icon={<LayoutDashboard size={18} />}
        active={location.pathname === "/client/floorplans"}
      >
        Plan de salle & Invités
      </NavItem>
      <NavItem
        href="/client/menus"
        icon={<UtensilsCrossed size={18} />}
        active={location.pathname === "/client/menus"}
      >
        Gestion des Menus
      </NavItem>
      <NavItem
        href="/client/todolist"
        icon={<ClipboardCheck size={18} />}
        active={location.pathname === "/client/todolist"}
      >
        Checklist
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
  );
};

export default ClientNavigation;
