
import React from "react";
import { useLocation } from "react-router-dom";
import NavItem from "./NavItem";
import { BarChart, MessageSquare, Calendar, CheckSquare, Image, HeadphonesIcon, Video, Users, Trophy, Award, SquareStack, Grid3X3 } from "lucide-react";
import { useAccessControl } from "@/hooks/useAccessControl";

// Define partner types
export enum PartnerType {
  PHOTOGRAPHER = "photographer",
  DJ = "dj",
  CATERER = "caterer",
  VENUE = "venue",
  DECORATOR = "decorator",
  VIDEOGRAPHER = "videographer",
  ARTIST = "artist",
  FLORIST = "florist",
  WEDDING_PLANNER = "wedding_planner",
  GENERAL = "general",
}

const PartnerNavigation = () => {
  const location = useLocation();
  const { currentUser } = useAccessControl();
  
  // Get partner type from current user (default to general if not specified)
  const partnerType = currentUser?.partnerType || PartnerType.GENERAL;
  
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
        href="/partner/calendar"
        icon={<Calendar size={18} />}
        active={location.pathname === "/partner/calendar"}
      >
        Calendrier
      </NavItem>

      {/* Photo section - only for photographers */}
      {(partnerType === PartnerType.PHOTOGRAPHER || partnerType === PartnerType.GENERAL) && (
        <NavItem
          href="/partner/photos"
          icon={<Image size={18} />}
          active={location.pathname === "/partner/photos"}
        >
          Photos
        </NavItem>
      )}

      {/* Music section - only for DJs */}
      {(partnerType === PartnerType.DJ || partnerType === PartnerType.GENERAL) && (
        <NavItem
          href="/partner/playlists"
          icon={<SquareStack size={18} />}
          active={location.pathname === "/partner/playlists"}
        >
          Playlists
        </NavItem>
      )}

      {/* Menu section - only for caterers */}
      {(partnerType === PartnerType.CATERER || partnerType === PartnerType.VENUE || partnerType === PartnerType.GENERAL) && (
        <NavItem
          href="/partner/menus"
          icon={<CheckSquare size={18} />}
          active={location.pathname === "/partner/menus"}
        >
          Menus & Plans
        </NavItem>
      )}

      {/* Media content available to all partners */}
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
