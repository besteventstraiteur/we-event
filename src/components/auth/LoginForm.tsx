
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
        
        <div className="text-center mt-4 text-xs text-gray-500">
          <p>Comptes disponibles dans Supabase:</p>
          <p>rdubois@best-events.fr</p>
          <p>contact@best-events.fr</p>
          <p>dubois.robin.9@gmail.com</p>
        </div>
      </form>
    </Form>
  );
};

export default LoginForm;
