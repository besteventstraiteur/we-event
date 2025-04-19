
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import React from "react";

interface GoldButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  variant?: "default" | "outline" | "link";
  size?: "default" | "sm" | "lg" | "icon";
  className?: string;
}

const GoldButton = ({
  children,
  variant = "default",
  size = "default",
  className,
  ...props
}: GoldButtonProps) => {
  return (
    <Button
      variant={variant}
      size={size}
      className={cn(
        "bg-we-gold text-we-black hover:bg-we-gold/90 transition-all",
        variant === "outline" && "bg-transparent border-we-gold text-we-gold hover:bg-we-gold/10 hover:text-we-gold",
        variant === "link" && "bg-transparent text-we-gold hover:bg-transparent underline",
        className
      )}
      {...props}
    >
      {children}
    </Button>
  );
};

export default GoldButton;
