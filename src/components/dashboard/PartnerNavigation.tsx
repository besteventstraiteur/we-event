
import React from "react";
import { useLocation } from "react-router-dom";
import NavItem from "./NavItem";
import { User, FileText, BarChart, Headphones, Video, Share2, Image, Music, VideoIcon } from "lucide-react";

const PartnerNavigation = () => {
  const location = useLocation();
  
  return (
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
        href="/partner/photos"
        icon={<Image size={18} />}
        active={location.pathname === "/partner/photos"}
      >
        Photos
      </NavItem>
      <NavItem
        href="/partner/music"
        icon={<Music size={18} />}
        active={location.pathname === "/partner/music"}
      >
        Playlists Musicales
      </NavItem>
      <NavItem
        href="/partner/recommendations"
        icon={<Share2 size={18} />}
        active={location.pathname === "/partner/recommendations"}
      >
        Recommandations
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
      <NavItem
        href="/partner/live-streaming"
        icon={<VideoIcon size={18} />}
        active={location.pathname === "/partner/live-streaming"}
      >
        Visioconférences
      </NavItem>
    </>
  );
};

export default PartnerNavigation;
