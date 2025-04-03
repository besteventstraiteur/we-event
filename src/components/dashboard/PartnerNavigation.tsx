
import React from "react";
import { useLocation } from "react-router-dom";
import NavItem from "./NavItem";
import { BarChart, Map, MessageSquare, Calendar, CheckSquare, Receipt, Image, HeadphonesIcon, Video, Users, Trophy, Award } from "lucide-react";

const PartnerNavigation = () => {
  const location = useLocation();
  
  return (
    <>
      <NavItem
        href="/partner/dashboard"
        icon={<BarChart size={18} />}
        active={location.pathname === "/partner/dashboard"}
      >
        Tableau de bord
      </NavItem>
      <NavItem
        href="/partner/tasks"
        icon={<CheckSquare size={18} />}
        active={location.pathname === "/partner/tasks"}
      >
        Tâches
      </NavItem>
      <NavItem
        href="/partner/requests"
        icon={<MessageSquare size={18} />}
        active={location.pathname === "/partner/requests"}
      >
        Demandes clients
      </NavItem>
      <NavItem
        href="/partner/stats"
        icon={<BarChart size={18} />}
        active={location.pathname === "/partner/stats"}
      >
        Statistiques
      </NavItem>
      <NavItem
        href="/partner/recommendations"
        icon={<Users size={18} />}
        active={location.pathname === "/partner/recommendations"}
      >
        Recommandations
      </NavItem>
      <NavItem
        href="/partner/gamification"
        icon={<Trophy size={18} />}
        active={location.pathname === "/partner/gamification"}
      >
        Programme Fidélité
      </NavItem>
      <NavItem
        href="/partner/best-awards"
        icon={<Award size={18} />}
        active={location.pathname === "/partner/best-awards"}
      >
        Best Awards 2025
      </NavItem>
      <NavItem
        href="/partner/venues"
        icon={<Map size={18} />}
        active={location.pathname === "/partner/venues"}
      >
        Lieux
      </NavItem>
      <NavItem
        href="/partner/calendar"
        icon={<Calendar size={18} />}
        active={location.pathname === "/partner/calendar"}
      >
        Calendrier
      </NavItem>
      <NavItem
        href="/partner/payments"
        icon={<Receipt size={18} />}
        active={location.pathname === "/partner/payments"}
      >
        Paiements
      </NavItem>
      <NavItem
        href="/partner/photos"
        icon={<Image size={18} />}
        active={location.pathname === "/partner/photos"}
      >
        Photos
      </NavItem>
      <NavItem
        href="/partner/podcasts"
        icon={<HeadphonesIcon size={18} />}
        active={location.pathname === "/partner/podcasts"}
      >
        Podcasts
      </NavItem>
      <NavItem
        href="/partner/talkshows"
        icon={<Video size={18} />}
        active={location.pathname === "/partner/talkshows"}
      >
        Talkshows
      </NavItem>
    </>
  );
};

export default PartnerNavigation;
