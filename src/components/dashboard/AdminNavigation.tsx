
import React from "react";
import NavItem from "./NavItem";
import { 
  LayoutDashboard, 
  Users, 
  Building2, 
  Calendar, 
  PackageOpen, 
  MessageSquare, 
  Radio, 
  Star,
  Headphones,
  Presentation,
  UserCog,
  BarChart,
  CreditCard,
  Network
} from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

const AdminNavigation = () => {
  const { t } = useLanguage();
  
  return (
    <div className="space-y-4">
      <NavItem
        icon={<LayoutDashboard size={20} />}
        title="Dashboard"
        href="/admin/dashboard"
      />
      <NavItem
        icon={<BarChart size={20} />}
        title="Statistics"
        href="/admin/statistics"
      />
      <NavItem
        icon={<Users size={20} />}
        title="Clients"
        href="/admin/clients"
      />
      <NavItem
        icon={<Building2 size={20} />}
        title="Partners"
        href="/admin/partners"
      />
      <NavItem
        icon={<UserCog size={20} />}
        title="Partner Types"
        href="/admin/partner-types"
      />
      <NavItem
        icon={<CreditCard size={20} />}
        title="Subscriptions"
        href="/admin/subscriptions"
      />
      <NavItem
        icon={<Network size={20} />}
        title="MLM Network"
        href="/admin/mlm"
      />
      <NavItem
        icon={<Users size={20} />}
        title="Guests"
        href="/admin/guests"
      />
      <NavItem
        icon={<Calendar size={20} />}
        title="Venues"
        href="/admin/venues"
      />
      <NavItem
        icon={<PackageOpen size={20} />}
        title="Wedding Packages"
        href="/admin/wedding-packages"
      />
      <NavItem
        icon={<Star size={20} />}
        title="Ratings & Reviews"
        href="/admin/ratings"
      />
      <NavItem
        icon={<MessageSquare size={20} />}
        title="Recommendations"
        href="/admin/recommendations"
      />
      <NavItem
        icon={<Radio size={20} />}
        title="Talkshows"
        href="/admin/talkshows"
      />
      <NavItem
        icon={<Headphones size={20} />}
        title="Podcasts"
        href="/admin/podcasts"
      />
      <NavItem
        icon={<Presentation size={20} />}
        title="Presentation"
        href="/admin/presentation"
      />
    </div>
  );
};

export default AdminNavigation;
