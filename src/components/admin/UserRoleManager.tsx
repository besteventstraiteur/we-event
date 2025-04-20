
import React, { useState, useEffect } from 'react';
import { useToast } from '@/hooks/use-toast';
import { UserRole } from '@/utils/accessControl';
import { supabase } from '@/lib/supabase';
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle 
} from '@/components/ui/card';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Loader2 } from 'lucide-react';

interface UserInfo {
  id: string;
  email: string;
  role: string;
}

const UserRoleManager = () => {
  const [users, setUsers] = useState<UserInfo[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedUserId, setSelectedUserId] = useState<string>('');
  const [selectedRole, setSelectedRole] = useState<UserRole>(UserRole.CLIENT);
  const [searchQuery, setSearchQuery] = useState('');
  const { toast } = useToast();

  // Charger la liste des utilisateurs
  useEffect(() => {
    const loadUsers = async () => {
      try {
        setIsLoading(true);
        const { data, error } = await supabase
          .from('profiles')
          .select('id, email, role')
          .order('created_at', { ascending: false });

        if (error) throw error;
        
        setUsers(data || []);
      } catch (error) {
        console.error('Error loading users:', error);
        toast({
          title: "Erreur",
          description: "Impossible de charger les utilisateurs",
          variant: "destructive",
        });
      } finally {
        setIsLoading(false);
      }
    };

    loadUsers();
  }, [toast]);

  // Mettre à jour le rôle d'un utilisateur
  const updateUserRole = async () => {
    try {
      if (!selectedUserId) {
        toast({
          title: "Erreur",
          description: "Veuillez sélectionner un utilisateur",
          variant: "destructive",
        });
        return;
      }

      setIsLoading(true);
      
      // Mettre à jour le rôle dans la table profiles
      const { error } = await supabase
        .from('profiles')
        .update({ role: selectedRole })
        .eq('id', selectedUserId);

      if (error) throw error;
      
      // Mettre à jour la liste locale des utilisateurs
      setUsers(prevUsers => 
        prevUsers.map(user => 
          user.id === selectedUserId ? { ...user, role: selectedRole } : user
        )
      );

      toast({
        title: "Succès",
        description: "Le rôle de l'utilisateur a été mis à jour",
      });
    } catch (error) {
      console.error('Error updating user role:', error);
      toast({
        title: "Erreur",
        description: "Impossible de mettre à jour le rôle de l'utilisateur",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  // Filtrer les utilisateurs en fonction de la recherche
  const filteredUsers = searchQuery 
    ? users.filter(user => user.email.toLowerCase().includes(searchQuery.toLowerCase()))
    : users;

  return (
    <Card>
      <CardHeader>
        <CardTitle>Gestion des Rôles Utilisateurs</CardTitle>
        <CardDescription>
          Attribuez et modifiez les rôles des utilisateurs dans le système
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {/* Recherche d'utilisateur */}
          <div>
            <Label htmlFor="searchQuery">Rechercher un utilisateur</Label>
            <Input
              id="searchQuery"
              placeholder="Rechercher par email..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="mt-1"
            />
          </div>

          {/* Sélection d'utilisateur */}
          <div>
            <Label htmlFor="userId">Utilisateur</Label>
            <Select
              value={selectedUserId}
              onValueChange={setSelectedUserId}
              disabled={isLoading}
            >
              <SelectTrigger id="userId" className="mt-1">
                <SelectValue placeholder="Sélectionnez un utilisateur" />
              </SelectTrigger>
              <SelectContent>
                {filteredUsers.map((user) => (
                  <SelectItem key={user.id} value={user.id}>
                    {user.email} ({user.role})
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Sélection de rôle */}
          <div>
            <Label htmlFor="role">Nouveau rôle</Label>
            <Select
              value={selectedRole}
              onValueChange={(value) => setSelectedRole(value as UserRole)}
              disabled={isLoading || !selectedUserId}
            >
              <SelectTrigger id="role" className="mt-1">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value={UserRole.CLIENT}>Client</SelectItem>
                <SelectItem value={UserRole.PARTNER}>Partenaire</SelectItem>
                <SelectItem value={UserRole.ADMIN}>Administrateur</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Bouton de mise à jour */}
          <Button 
            onClick={updateUserRole} 
            disabled={isLoading || !selectedUserId}
            className="w-full mt-4"
          >
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Traitement en cours...
              </>
            ) : (
              "Mettre à jour le rôle"
            )}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default UserRoleManager;
