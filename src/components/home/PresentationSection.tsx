import React, { useState } from "react";
import { ArrowRight } from "lucide-react";
import VideoPresentation from "@/components/video-presentation/VideoPresentation";
import { useIsMobile } from "@/hooks/use-mobile";
interface PresentationSectionProps {}
const PresentationSection: React.FC<PresentationSectionProps> = () => {
  const isMobile = useIsMobile();
  const [isOpen, setIsOpen] = useState<boolean>(false);
  return;
};
export default PresentationSection;