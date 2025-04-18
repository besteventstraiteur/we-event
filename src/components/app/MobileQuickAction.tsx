
import React from 'react';
import { 
  Home, CheckSquare, MessageSquare, Image, Settings,
  ShoppingCart, Calendar 
} from 'lucide-react';

interface MobileQuickActionProps {
  icon: string;
  label: string;
  href: string;
}

export const MobileQuickAction: React.FC<MobileQuickActionProps> = ({ icon, label, href }) => {
  const IconComponent = () => {
    switch (icon) {
      case 'home': 
        return <Home size={20} />;
      case 'check-square':
        return <CheckSquare size={20} />;
      case 'shopping-cart':
        return <ShoppingCart size={20} />;
      case 'calendar':
        return <Calendar size={20} />;
      case 'message-square':
        return <MessageSquare size={20} />;
      case 'image':
        return <Image size={20} />;
      case 'settings':
        return <Settings size={20} />;
      default:
        return <Home size={20} />;
    }
  };

  return (
    <a href={href} className="flex flex-col items-center justify-center space-y-2 p-3 hover:bg-gray-100 rounded-lg">
      <div className="w-12 h-12 rounded-full bg-gray-100 flex items-center justify-center">
        <IconComponent />
      </div>
      <span className="text-xs text-center font-medium">{label}</span>
    </a>
  );
};
