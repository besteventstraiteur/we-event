
import React from "react";
import { useAccessControl } from "@/hooks/useAccessControl";
import { PartnerType } from "@/utils/accessControl";
import { useFeatureFlags } from "@/hooks/useFeatureFlags";
import CoreNavigation from "./partner-navigation/CoreNavigation";
import PartnerTypeNavigation from "./partner-navigation/PartnerTypeNavigation";
import MediaNavigation from "./partner-navigation/MediaNavigation";

const PartnerNavigation = () => {
  const { currentUser } = useAccessControl();
  const { features } = useFeatureFlags();
  
  const partnerType = currentUser?.partnerType || PartnerType.GENERAL;
  
  return (
    <>
      <CoreNavigation 
        showStats={features.stats}
        showGamification={features.gamification}
        showTraining={features.training}
      />
      
      <PartnerTypeNavigation
        partnerType={partnerType}
        showPhotos={features.photos}
        showPlaylists={features.playlists}
        showMenus={features.menus}
        showFloorPlan={features.floorPlan}
      />
      
      <MediaNavigation
        showTalkshows={features.talkshows}
        showPodcasts={features.podcasts}
      />
    </>
  );
};

export default PartnerNavigation;
