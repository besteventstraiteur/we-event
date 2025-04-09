
import React from "react";
import NavItem from "./NavItem";
import { 
  LayoutDashboard, 
  ListTodo, 
  Users, 
  Calendar, 
  SquareStack, 
  CreditCard, 
  MessageSquare, 
  Image, 
  Package, 
  Radio, 
  Heart,
  User,
  Headphones,
  PanelLeft,
  Star,
  Building2
} from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

const ClientNavigation = () => {
  const { t } = useLanguage();
  
  return (
    <div className="space-y-4">
      {/* Main Planning & Dashboard */}
      <NavItem
        icon={<LayoutDashboard size={20} />}
        title="Dashboard"
        href="/client/dashboard"
      />
      <NavItem
        icon={<ListTodo size={20} />}
        title="To-do list"
        href="/client/todo"
      />
      
      {/* Budget & Vendors */}
      <NavItem
        icon={<CreditCard size={20} />}
        title="Budget"
        href="/client/budget"
      />
      <NavItem
        icon={<Building2 size={20} />}
        title="Vendors"
        href="/client/partners"
      />
      <NavItem
        icon={<Package size={20} />}
        title="Marketplace"
        href="/client/wedding-packages"
      />
      <NavItem
        icon={<Star size={20} />}
        title="Ratings"
        href="/client/ratings"
      />
      
      {/* Guests & Floor Plans */}
      <NavItem
        icon={<Users size={20} />}
        title="Guests"
        href="/client/guests"
      />
      <NavItem
        icon={<Calendar size={20} />}
        title="Floor Plan"
        href="/client/floor-plans"
      />
      <NavItem
        icon={<Package size={20} />}
        title="Menus"
        href="/client/menus"
      />
      
      {/* Media & Content */}
      <NavItem
        icon={<Heart size={20} />}
        title="Inspiration"
        href="/client/pinterbest"
      />
      <NavItem
        icon={<Image size={20} />}
        title="Photos"
        href="/client/photos"
      />
      <NavItem
        icon={<SquareStack size={20} />}
        title="Playlists"
        href="/client/music"
      />
      <NavItem
        icon={<Radio size={20} />}
        title="Talkshows"
        href="/client/talkshows"
      />
      <NavItem
        icon={<Headphones size={20} />}
        title="Podcasts"
        href="/client/podcasts"
      />
      
      {/* Communication & Mini-site */}
      <NavItem
        icon={<MessageSquare size={20} />}
        title="Requests"
        href="/client/requests"
      />
      <NavItem
        icon={<PanelLeft size={20} />}
        title="Mini-site"
        href="/client/mini-site"
      />
      
      {/* Account */}
      <NavItem
        icon={<User size={20} />}
        title="Account"
        href="/client/account"
      />
    </div>
  );
};

export default ClientNavigation;
