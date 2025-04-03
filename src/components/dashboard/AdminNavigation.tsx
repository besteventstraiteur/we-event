
import React from "react";
import { NavItem } from "./NavItem";
import { 
  LayoutDashboard, 
  Users, 
  Building2, 
  Calendar, 
  PackageOpen, 
  MessageSquare, 
  Radio, 
  Star,
  Headphones
} from "lucide-react";

const AdminNavigation = () => {
  return (
    <div className="space-y-4">
      <NavItem
        icon={<LayoutDashboard size={20} />}
        title="Tableau de bord"
        href="/admin/dashboard"
      />
      <NavItem
        icon={<Users size={20} />}
        title="Clients"
        href="/admin/clients"
      />
      <NavItem
        icon={<Building2 size={20} />}
        title="Partenaires"
        href="/admin/partners"
      />
      <NavItem
        icon={<Users size={20} />}
        title="Invités"
        href="/admin/guests"
      />
      <NavItem
        icon={<Calendar size={20} />}
        title="Lieux"
        href="/admin/venues"
      />
      <NavItem
        icon={<PackageOpen size={20} />}
        title="Packs Mariage"
        href="/admin/wedding-packages"
      />
      <NavItem
        icon={<Star size={20} />}
        title="Avis & Évaluations"
        href="/admin/ratings"
      />
      <NavItem
        icon={<MessageSquare size={20} />}
        title="Recommandations"
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
    </div>
  );
};

export default AdminNavigation;
