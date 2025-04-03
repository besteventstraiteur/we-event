
import React from "react";
import { useLocation } from "react-router-dom";
import NavItem from "./NavItem";
import { 
  User, 
  Users, 
  FileText, 
  LayoutDashboard, 
  Headphones, 
  Video, 
  Image, 
  CheckSquare, 
  UtensilsCrossed, 
  ClipboardCheck, 
  GalleryHorizontal, 
  Music, 
  PiggyBank,
  Shield,
  CreditCard,
  VideoIcon,
  Globe
} from "lucide-react";

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
        href="/client/budget"
        icon={<PiggyBank size={18} />}
        active={location.pathname === "/client/budget"}
      >
        Budget
      </NavItem>
      <NavItem
        href="/client/payments"
        icon={<CreditCard size={18} />}
        active={location.pathname === "/client/payments"}
      >
        Paiements
      </NavItem>
      <NavItem
        href="/client/photos"
        icon={<Image size={18} />}
        active={location.pathname === "/client/photos"}
      >
        Mes Photos
      </NavItem>
      <NavItem
        href="/client/pinterbest"
        icon={<GalleryHorizontal size={18} />}
        active={location.pathname === "/client/pinterbest"}
      >
        Pinterbest
      </NavItem>
      <NavItem
        href="/client/floorplans"
        icon={<LayoutDashboard size={18} />}
        active={location.pathname === "/client/floorplans"}
      >
        Plan de salle & Invités
      </NavItem>
      <NavItem
        href="/client/guests"
        icon={<Users size={18} />}
        active={location.pathname === "/client/guests"}
      >
        Gestion des Invités
      </NavItem>
      <NavItem
        href="/client/music"
        icon={<Music size={18} />}
        active={location.pathname === "/client/music"}
      >
        Playlists Musicales
      </NavItem>
      <NavItem
        href="/client/menus"
        icon={<UtensilsCrossed size={18} />}
        active={location.pathname === "/client/menus"}
      >
        Gestion des Menus
      </NavItem>
      <NavItem
        href="/client/mini-site"
        icon={<Globe size={18} />}
        active={location.pathname === "/client/mini-site"}
      >
        Mini-Site Web
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
      <NavItem
        href="/client/live-streaming"
        icon={<VideoIcon size={18} />}
        active={location.pathname === "/client/live-streaming"}
      >
        Visioconférences
      </NavItem>
      <NavItem
        href="/client/security"
        icon={<Shield size={18} />}
        active={location.pathname === "/client/security"}
      >
        Sécurité
      </NavItem>
    </>
  );
};

export default ClientNavigation;
