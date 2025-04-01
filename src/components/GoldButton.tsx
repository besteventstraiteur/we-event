
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
        "bg-vip-gold text-vip-black hover:bg-vip-gold/90 transition-all",
        variant === "outline" && "bg-transparent border-vip-gold text-vip-gold hover:bg-vip-gold/10 hover:text-vip-gold",
        variant === "link" && "bg-transparent text-vip-gold hover:bg-transparent underline",
        className
      )}
      {...props}
    >
      {children}
    </Button>
  );
};

export default GoldButton;
