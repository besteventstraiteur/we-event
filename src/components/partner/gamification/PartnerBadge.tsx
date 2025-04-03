
import React from "react";
import { Badge } from "@/components/ui/badge";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { PartnerBadge as PartnerBadgeType } from "@/models/partnerGamification";
import { Award, Star, Shield, Zap, TrendingUp, Users, ThumbsUp, Gift, CheckCircle, Crown } from "lucide-react";

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
  
  // Get the correct icon component based on the badge iconName
  // Instead of dynamic imports, use a map of pre-imported components
  const getIconComponent = () => {
    switch (badge.iconName) {
      case 'Zap':
        return Zap;
      case 'Star':
        return Star;
      case 'TrendingUp':
        return TrendingUp;
      case 'Shield':
        return Shield;
      case 'Award':
        return Award;
      case 'Users':
        return Users;
      case 'ThumbsUp':
        return ThumbsUp;
      case 'Gift':
        return Gift;
      case 'CheckCircle':
        return CheckCircle;
      case 'Crown':
        return Crown;
      default:
        return Award; // Default fallback icon
    }
  };
  
  const IconComponent = getIconComponent();
  
  return (
    <TooltipProvider delayDuration={300}>
      <Tooltip>
        <TooltipTrigger asChild>
          <Badge 
            className={`rounded-full flex items-center justify-center p-0 bg-gradient-to-br from-vip-gold to-yellow-600 hover:from-yellow-500 hover:to-amber-700 cursor-help ${badgeSize}`}
          >
            <IconComponent size={iconSize} className="text-vip-black" />
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
