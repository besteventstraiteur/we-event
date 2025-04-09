
import React from "react";
import { useLocation } from "react-router-dom";
import NavItem from "./NavItem";
import { BarChart, MessageSquare, Calendar, CheckSquare, Image, Music, Video, Users, Trophy, Award, FileText, Grid3X3, HeadphonesIcon, CreditCard } from "lucide-react";
import { useAccessControl } from "@/hooks/useAccessControl";
import { PartnerType } from "@/utils/accessControl";
import { useLanguage } from "@/contexts/LanguageContext";

const PartnerNavigation = () => {
  const location = useLocation();
  const { currentUser } = useAccessControl();
  const { t } = useLanguage();
  
  // Get partner type from current user (default to general if not specified)
  const partnerType = currentUser?.partnerType || PartnerType.GENERAL;
  
  return (
    <>
      <NavItem
        href="/partner/dashboard"
        icon={<BarChart size={18} />}
        active={location.pathname === "/partner/dashboard"}
      >
        {t('common.dashboard')}
      </NavItem>
      <NavItem
        href="/partner/subscription"
        icon={<CreditCard size={18} />}
        active={location.pathname === "/partner/subscription"}
      >
        {t('partner.subscription')}
      </NavItem>
      <NavItem
        href="/partner/tasks"
        icon={<CheckSquare size={18} />}
        active={location.pathname === "/partner/tasks"}
      >
        {t('partner.tasks')}
      </NavItem>
      <NavItem
        href="/partner/requests"
        icon={<MessageSquare size={18} />}
        active={location.pathname === "/partner/requests"}
      >
        {t('partner.clientRequests')}
      </NavItem>
      <NavItem
        href="/partner/stats"
        icon={<BarChart size={18} />}
        active={location.pathname === "/partner/stats"}
      >
        {t('partner.statistics')}
      </NavItem>
      <NavItem
        href="/partner/recommendations"
        icon={<Users size={18} />}
        active={location.pathname === "/partner/recommendations"}
      >
        {t('partner.recommendations')}
      </NavItem>
      <NavItem
        href="/partner/gamification"
        icon={<Trophy size={18} />}
        active={location.pathname === "/partner/gamification"}
      >
        {t('partner.loyaltyProgram')}
      </NavItem>
      <NavItem
        href="/partner/best-awards"
        icon={<Award size={18} />}
        active={location.pathname === "/partner/best-awards"}
      >
        {t('partner.bestAwards')}
      </NavItem>
      <NavItem
        href="/partner/calendar"
        icon={<Calendar size={18} />}
        active={location.pathname === "/partner/calendar"}
      >
        {t('partner.calendar')}
      </NavItem>

      {/* Photo section - only for photographers */}
      {(partnerType === PartnerType.PHOTOGRAPHER || partnerType === PartnerType.GENERAL) && (
        <NavItem
          href="/partner/photos"
          icon={<Image size={18} />}
          active={location.pathname === "/partner/photos"}
        >
          {t('partner.photos')}
        </NavItem>
      )}

      {/* Music section - only for DJs */}
      {(partnerType === PartnerType.DJ || partnerType === PartnerType.GENERAL) && (
        <NavItem
          href="/partner/playlists"
          icon={<Music size={18} />}
          active={location.pathname === "/partner/playlists"}
        >
          {t('partner.playlists')}
        </NavItem>
      )}

      {/* Menu section - only for caterers */}
      {(partnerType === PartnerType.CATERER || partnerType === PartnerType.GENERAL) && (
        <NavItem
          href="/partner/menus"
          icon={<FileText size={18} />}
          active={location.pathname === "/partner/menus"}
        >
          {t('partner.menus')}
        </NavItem>
      )}
      
      {/* Floor Plans - only for venues */}
      {(partnerType === PartnerType.VENUE || partnerType === PartnerType.GENERAL) && (
        <NavItem
          href="/partner/floor-plans"
          icon={<Grid3X3 size={18} />}
          active={location.pathname === "/partner/floor-plans"}
        >
          {t('partner.floorPlans')}
        </NavItem>
      )}

      {/* Media content available to all partners */}
      <NavItem
        href="/partner/podcasts"
        icon={<HeadphonesIcon size={18} />}
        active={location.pathname === "/partner/podcasts"}
      >
        {t('partner.podcasts')}
      </NavItem>
      <NavItem
        href="/partner/talkshows"
        icon={<Video size={18} />}
        active={location.pathname === "/partner/talkshows"}
      >
        {t('partner.talkshows')}
      </NavItem>
    </>
  );
};

export default PartnerNavigation;
