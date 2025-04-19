
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";
import React, { forwardRef } from "react";

interface InputFieldProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  id: string;
  error?: string;
}

const InputField = forwardRef<HTMLInputElement, InputFieldProps>(
  ({ label, id, error, className, ...props }, ref) => {
    return (
      <div className="space-y-2">
        <Label htmlFor={id} className="text-we-gray-700">
          {label}
        </Label>
        <Input
          id={id}
          ref={ref}
          className={cn(
            "bg-white border-we-gray-300 text-we-gray-900 placeholder:text-we-gray-500 focus:border-we-gold focus:ring-we-gold/20 h-11",
            error && "border-red-500",
            className
          )}
          {...props}
        />
        {error && <p className="text-red-500 text-sm">{error}</p>}
      </div>
    );
  }
);

InputField.displayName = "InputField";

export default InputField;
