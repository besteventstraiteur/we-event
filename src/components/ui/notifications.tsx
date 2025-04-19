
import { toast } from "@/hooks/use-toast";
import { CheckCircle, XCircle, AlertTriangle, Info } from "lucide-react";

export const notify = {
  success: (title: string, description?: string) => {
    toast({
      title,
      description,
      variant: "default",
      icon: <CheckCircle className="h-5 w-5 text-green-500" />
    });
  },

  error: (title: string, description?: string) => {
    toast({
      title,
      description,
      variant: "destructive",
      icon: <XCircle className="h-5 w-5" />
    });
  },

  warning: (title: string, description?: string) => {
    toast({
      title,
      description,
      variant: "default",
      icon: <AlertTriangle className="h-5 w-5 text-yellow-500" />
    });
  },

  info: (title: string, description?: string) => {
    toast({
      title,
      description,
      variant: "default",
      icon: <Info className="h-5 w-5 text-blue-500" />
    });
  }
};
