
import React from 'react';
import { ChevronRight } from 'lucide-react';

interface QuickMenuItemProps {
  icon: React.ReactNode;
  label: string;
  href: string;
}

export const QuickMenuItem: React.FC<QuickMenuItemProps> = ({ icon, label, href }) => {
  return (
    <a href={href} className="flex items-center justify-between p-3 hover:bg-gray-100 rounded-lg">
      <div className="flex items-center gap-3">
        {icon}
        <span className="font-medium">{label}</span>
      </div>
      <ChevronRight size={16} className="text-gray-400" />
    </a>
  );
};
