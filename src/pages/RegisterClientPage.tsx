
import React from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { Loader2 } from "lucide-react";
import AuthLayout from "@/components/AuthLayout";
import { Form, FormControl, FormField, FormItem, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import GoldButton from "@/components/GoldButton";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/hooks/useAuth";
import { UserRole } from "@/utils/accessControl";
import { registerClientSchema, type RegisterClientFormValues } from "@/lib/validations/auth";

const RegisterClientPage = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const { register } = useAuth();

  const form = useForm<RegisterClientFormValues>({
    resolver: zodResolver(registerClientSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      password: "",
      confirmPassword: "",
    }
  });

  const isLoading = form.formState.isSubmitting;

  const onSubmit = async (values: RegisterClientFormValues) => {
    try {
      const result = await register({
        email: values.email,
        password: values.password,
        role: UserRole.CLIENT,
        name: `${values.firstName} ${values.lastName}`.trim()
      });
      
      if (result.success) {
        toast({
          title: "Inscription réussie!",
          description: result.message || "Bienvenue sur We Event!",
        });
        
        if (result.user) {
          navigate("/client/dashboard");
        } else {
          navigate("/login");
        }
      } else {
        toast({
          variant: "destructive",
          title: "Erreur d'inscription",
          description: result.message || "Une erreur est survenue lors de l'inscription. Veuillez réessayer.",
        });
      }
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Erreur d'inscription",
        description: "Une erreur est survenue lors de l'inscription. Veuillez réessayer.",
      });
    }
  };

  return (
    <AuthLayout
      title="Inscription Client"
      subtitle="Rejoignez notre plateforme et accédez à des services exclusifs"
    >
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <FormField
              control={form.control}
              name="firstName"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input placeholder="Prénom" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="lastName"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input placeholder="Nom" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input 
                    placeholder="votre@email.com" 
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
            name="phone"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input 
                    placeholder="06 12 34 56 78" 
                    type="tel"
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

          <FormField
            control={form.control}
            name="confirmPassword"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input 
                    placeholder="Confirmer le mot de passe" 
                    type="password"
                    {...field} 
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <GoldButton type="submit" className="w-full" disabled={isLoading}>
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Inscription en cours...
              </>
            ) : (
              "S'inscrire"
            )}
          </GoldButton>

          <div className="text-center text-sm text-we-gray-400">
            Déjà inscrit?{" "}
            <Link to="/login" className="text-we-gold hover:underline">
              Se connecter
            </Link>
          </div>
        </form>
      </Form>
    </AuthLayout>
  );
};

export default RegisterClientPage;
