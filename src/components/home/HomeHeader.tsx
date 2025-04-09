
import React from "react";
import { Link } from "react-router-dom";
import WeEventLogo from "@/components/WeEventLogo";
import WeEventButton from "@/components/WeEventButton";
import { Search } from "lucide-react";
import { useIsMobile } from "@/hooks/use-mobile";
import LanguageSelector from "@/components/LanguageSelector";
import { useLanguage } from "@/contexts/LanguageContext";

interface NavLinkProps {
  href: string;
  children: React.ReactNode;
  isActive?: boolean;
}

// Component for navigation links
const NavLink: React.FC<NavLinkProps> = ({ href, children, isActive = false }) => (
  <Link 
    to={href}
    className={`relative text-sm font-medium pb-1 ${
      isActive ? 'text-we-green' : 'text-we-gray-600 hover:text-we-green'
    }`}
  >
    {children}
    {isActive && (
      <span className="absolute bottom-0 left-0 w-full h-0.5 bg-we-gold"></span>
    )}
  </Link>
);

interface HomeHeaderProps {}

const HomeHeader: React.FC<HomeHeaderProps> = () => {
  const isMobile = useIsMobile();
  const { t } = useLanguage();
  
  return (
    <header className="border-b border-we-beige py-4">
      <div className="container flex items-center justify-between">
        <Link to="/">
          <WeEventLogo size={isMobile ? "small" : "medium"} />
        </Link>
        <div className="hidden md:flex items-center space-x-6">
          <NavLink href="/" isActive>{t('common.home')}</NavLink>
          <NavLink href="/partners">{t('common.partners')}</NavLink>
          <NavLink href="/contact">{t('common.contact')}</NavLink>
        </div>
        <div className="flex items-center space-x-2 sm:space-x-4">
          <LanguageSelector variant={isMobile ? 'minimal' : 'standard'} />
          <Link to="/login">
            <WeEventButton variant="outline" size={isMobile ? "xs" : "sm"}>
              {t('common.login')}
            </WeEventButton>
          </Link>
          <div className="md:hidden">
            <button className="text-we-green p-2">
              <Search size={20} />
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default HomeHeader;
