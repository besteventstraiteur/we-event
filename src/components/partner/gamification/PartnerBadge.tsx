
import React from "react";
import { Badge } from "@/components/ui/badge";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import * as LucideIcons from "lucide-react";
import { PartnerBadge as PartnerBadgeType } from "@/models/partnerGamification";
import { Award } from "lucide-react";

interface BadgeProps {
  badge: PartnerBadgeType;
  size?: "sm" | "md" | "lg";
}

const PartnerBadge = ({ badge, size = "md" }: BadgeProps) => {
  // Determine size values
  const sizeMap = {
    sm: { badge: "h-8 w-8", icon: 14 },
    md: { badge: "h-10 w-10", icon: 18 },
    lg: { badge: "h-14 w-14", icon: 24 },
  };
  
  const { badge: badgeSize, icon: iconSize } = sizeMap[size];
  
  // Get the icon component more safely
  let Icon = Award; // Default icon as fallback
  
  if (badge.iconName && typeof badge.iconName === 'string' && 
      badge.iconName in LucideIcons && 
      typeof LucideIcons[badge.iconName as keyof typeof LucideIcons] === 'function') {
    Icon = LucideIcons[badge.iconName as keyof typeof LucideIcons];
  }
  
  return (
    <TooltipProvider delayDuration={300}>
      <Tooltip>
        <TooltipTrigger asChild>
          <Badge 
            className={`rounded-full flex items-center justify-center p-0 bg-gradient-to-br from-vip-gold to-yellow-600 hover:from-yellow-500 hover:to-amber-700 cursor-help ${badgeSize}`}
          >
            <Icon size={iconSize} className="text-vip-black" />
          </Badge>
        </TooltipTrigger>
        <TooltipContent side="top" className="max-w-[250px]">
          <div className="space-y-1">
            <p className="font-bold text-sm">{badge.name}</p>
            <p className="text-xs text-gray-400">{badge.description}</p>
            <p className="text-xs text-vip-gold font-semibold">+{badge.points} points</p>
          </div>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};

export default PartnerBadge;
