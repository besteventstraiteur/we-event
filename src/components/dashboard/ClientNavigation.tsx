
import React from "react";
import { useLocation } from "react-router-dom";
import NavItem from "./NavItem";
import { Calendar, CheckSquare, Users, ListMusic, Camera, Video, Receipt, FileText, Home, Map, Utensils, Broadcast, Package } from "lucide-react";

const ClientNavigation = () => {
  const location = useLocation();
  
  return (
    <>
      <NavItem
        href="/client/dashboard"
        icon={<Home size={18} />}
        active={location.pathname === "/client/dashboard"}
      >
        Tableau de bord
      </NavItem>
      <NavItem
        href="/client/tasks"
        icon={<CheckSquare size={18} />}
        active={location.pathname === "/client/tasks"}
      >
        Tâches
      </NavItem>
      <NavItem
        href="/client/requests"
        icon={<FileText size={18} />}
        active={location.pathname === "/client/requests"}
      >
        Demandes
      </NavItem>
      <NavItem
        href="/client/guests"
        icon={<Users size={18} />}
        active={location.pathname === "/client/guests"}
      >
        Invités
      </NavItem>
      <NavItem
        href="/client/partners"
        icon={<Map size={18} />}
        active={location.pathname === "/client/partners"}
      >
        Prestataires
      </NavItem>
      <NavItem
        href="/client/wedding-packages"
        icon={<Package size={18} />}
        active={location.pathname === "/client/wedding-packages"}
      >
        Packs Mariage
      </NavItem>
      <NavItem
        href="/client/payments"
        icon={<Receipt size={18} />}
        active={location.pathname === "/client/payments"}
      >
        Paiements
      </NavItem>
      <NavItem
        href="/client/floor-plans"
        icon={<Calendar size={18} />}
        active={location.pathname === "/client/floor-plans"}
      >
        Plans de table
      </NavItem>
      <NavItem
        href="/client/menus"
        icon={<Utensils size={18} />}
        active={location.pathname === "/client/menus"}
      >
        Menus
      </NavItem>
      <NavItem
        href="/client/music"
        icon={<ListMusic size={18} />}
        active={location.pathname === "/client/music"}
      >
        Musique
      </NavItem>
      <NavItem
        href="/client/photos"
        icon={<Camera size={18} />}
        active={location.pathname === "/client/photos"}
      >
        Photos
      </NavItem>
      <NavItem
        href="/client/live"
        icon={<Broadcast size={18} />}
        active={location.pathname === "/client/live"}
      >
        Diffusion en direct
      </NavItem>
      <NavItem
        href="/client/videos"
        icon={<Video size={18} />}
        active={location.pathname === "/client/videos"}
      >
        Vidéos
      </NavItem>
    </>
  );
};

export default ClientNavigation;
