
import React, { useEffect } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import { Loader2 } from "lucide-react";
import { Form, FormControl, FormField, FormItem, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import GoldButton from "@/components/GoldButton";
import { loginFormSchema, type LoginFormValues } from "@/lib/validations/auth";

interface LoginFormProps {
  onSubmit: (email: string, password: string, rememberMe: boolean) => void;
  onForgotPassword: () => void;
  isLoading: boolean;
}

const LoginForm: React.FC<LoginFormProps> = ({ onSubmit, onForgotPassword, isLoading }) => {
  const form = useForm<LoginFormValues>({
    resolver: zodResolver(loginFormSchema),
    defaultValues: {
      email: "",
      password: "",
      rememberMe: false
    }
  });

  // Load saved credentials if available
  useEffect(() => {
    const savedEmail = localStorage.getItem("weddingPlannerEmail");
    const savedRememberMe = localStorage.getItem("weddingPlannerRememberMe") === "true";
    
    if (savedEmail && savedRememberMe) {
      form.setValue("email", savedEmail);
      form.setValue("rememberMe", true);
    }
  }, []);

  const handleSubmit = (values: LoginFormValues) => {
    onSubmit(values.email, values.password, values.rememberMe);
  };

  // Quick login helper for development
  const loginAsRole = (role: string) => {
    let email = "";
    
    switch (role.toLowerCase()) {
      case "admin":
        email = "admin@weevent.com";
        break;
      case "partner":
        email = "partner@weevent.com";
        break;
      case "client":
      default:
        email = "client@weevent.com";
        break;
    }
    
    form.setValue("email", email);
    form.setValue("password", "password123");
    form.setValue("rememberMe", true);
    
    onSubmit(email, "password123", true);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input 
                  placeholder="Email"
                  type="email"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input 
                  placeholder="Mot de passe"
                  type="password"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        
        <div className="flex items-center justify-between">
          <FormField
            control={form.control}
            name="rememberMe"
            render={({ field }) => (
              <FormItem className="flex items-center space-x-2">
                <FormControl>
                  <Checkbox 
                    checked={field.value}
                    onCheckedChange={field.onChange}
                  />
                </FormControl>
                <label 
                  htmlFor="remember-me" 
                  className="text-sm text-gray-600 cursor-pointer"
                >
                  Se souvenir de moi
                </label>
              </FormItem>
            )}
          />
          
          <button 
            type="button" 
            onClick={onForgotPassword}
            className="text-sm text-vip-gold hover:underline"
          >
            Mot de passe oublié?
          </button>
        </div>

        <GoldButton type="submit" className="w-full" disabled={isLoading}>
          {isLoading ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Connexion en cours...
            </>
          ) : (
            "Se connecter"
          )}
        </GoldButton>

        <div className="text-center text-sm text-vip-gray-400">
          Pas encore de compte?{" "}
          <Link to="/register-client" className="text-vip-gold hover:underline">
            Inscription Client
          </Link>{" "}
          ou{" "}
          <Link to="/register-partner" className="text-vip-gold hover:underline">
            Inscription Partenaire
          </Link>
        </div>

        {/* Debug login buttons */}
        <div className="pt-2 border-t border-gray-200 mt-4">
          <div className="text-xs text-gray-500 mb-2">Connexion rapide (pour test):</div>
          <div className="flex gap-2">
            <button 
              type="button" 
              onClick={() => loginAsRole("admin")} 
              className="text-xs bg-gray-200 hover:bg-gray-300 px-2 py-1 rounded">
              Admin
            </button>
            <button 
              type="button" 
              onClick={() => loginAsRole("partner")} 
              className="text-xs bg-gray-200 hover:bg-gray-300 px-2 py-1 rounded">
              Partenaire
            </button>
            <button 
              type="button" 
              onClick={() => loginAsRole("client")} 
              className="text-xs bg-gray-200 hover:bg-gray-300 px-2 py-1 rounded">
              Client
            </button>
          </div>
        </div>
      </form>
    </Form>
  );
};

export default LoginForm;
