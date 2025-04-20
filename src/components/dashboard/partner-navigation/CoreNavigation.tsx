
import React from "react";
import { 
  BarChart, UserSquare, CreditCard, Briefcase, Network,
  CheckSquare, MessageSquare, Calendar, Trophy, Award,
  GraduationCap
} from "lucide-react";
import NavigationSection from "./NavigationSection";
import { useLocation } from "react-router-dom";
import { useLanguage } from "@/contexts/LanguageContext";

interface CoreNavigationProps {
  showStats: boolean;
  showGamification: boolean;
  showTraining: boolean;
}

const CoreNavigation = ({ showStats, showGamification, showTraining }: CoreNavigationProps) => {
  const location = useLocation();
  const { t } = useLanguage();

  return (
    <>
      <NavigationSection
        href="/partner/dashboard"
        icon={<BarChart size={18} />}
        isActive={location.pathname === "/partner/dashboard"}
      >
        {t('common.dashboard')}
      </NavigationSection>

      <NavigationSection
        href="/partner/profile"
        icon={<UserSquare size={18} />}
        isActive={location.pathname === "/partner/profile"}
      >
        {t('partner.profile')}
      </NavigationSection>

      <NavigationSection
        href="/partner/subscription"
        icon={<CreditCard size={18} />}
        isActive={location.pathname === "/partner/subscription"}
      >
        {t('partner.subscription')}
      </NavigationSection>

      <NavigationSection
        href="/partner/crm"
        icon={<Briefcase size={18} />}
        isActive={location.pathname.startsWith("/partner/crm")}
      >
        {t('partner.crm')}
      </NavigationSection>

      <NavigationSection
        href="/partner/mlm"
        icon={<Network size={18} />}
        isActive={location.pathname === "/partner/mlm"}
      >
        {t('partner.network')}
      </NavigationSection>

      <NavigationSection
        href="/partner/tasks"
        icon={<CheckSquare size={18} />}
        isActive={location.pathname === "/partner/tasks"}
      >
        {t('partner.tasks')}
      </NavigationSection>

      <NavigationSection
        href="/partner/requests"
        icon={<MessageSquare size={18} />}
        isActive={location.pathname === "/partner/requests"}
      >
        {t('partner.clientRequests')}
      </NavigationSection>

      {showStats && (
        <NavigationSection
          href="/partner/stats"
          icon={<BarChart size={18} />}
          isActive={location.pathname === "/partner/stats"}
        >
          {t('partner.statistics')}
        </NavigationSection>
      )}

      {showGamification && (
        <>
          <NavigationSection
            href="/partner/gamification"
            icon={<Trophy size={18} />}
            isActive={location.pathname === "/partner/gamification"}
          >
            {t('partner.loyaltyProgram')}
          </NavigationSection>
          
          <NavigationSection
            href="/partner/best-awards"
            icon={<Award size={18} />}
            isActive={location.pathname === "/partner/best-awards"}
          >
            {t('partner.bestAwards')}
          </NavigationSection>
        </>
      )}

      <NavigationSection
        href="/partner/calendar"
        icon={<Calendar size={18} />}
        isActive={location.pathname === "/partner/calendar"}
      >
        {t('partner.calendar')}
      </NavigationSection>

      {showTraining && (
        <NavigationSection
          href="/partner/training"
          icon={<GraduationCap size={18} />}
          isActive={location.pathname === "/partner/training"}
        >
          {t('partner.training')}
        </NavigationSection>
      )}
    </>
  );
};

export default CoreNavigation;
