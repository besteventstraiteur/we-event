
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";
import React from "react";

interface InputFieldProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  id: string;
  error?: string;
}

const InputField = ({ label, id, error, className, ...props }: InputFieldProps) => {
  return (
    <div className="space-y-2">
      <Label htmlFor={id} className="text-vip-gray-700">
        {label}
      </Label>
      <Input
        id={id}
        className={cn(
          "bg-white border-vip-gray-300 text-vip-gray-900 placeholder:text-vip-gray-500 focus:border-vip-gold focus:ring-vip-gold/20 h-11",
          error && "border-red-500",
          className
        )}
        {...props}
      />
      {error && <p className="text-red-500 text-sm">{error}</p>}
    </div>
  );
};

export default InputField;
