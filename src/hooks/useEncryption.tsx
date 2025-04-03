
import { useState, useCallback, useEffect } from "react";
import { encryptData, decryptData, setEncryptedData, getEncryptedData } from "@/utils/encryption";
import { useToast } from "@/components/ui/use-toast";

export function useEncryption() {
  const [encryptionEnabled, setEncryptionEnabled] = useState(true);
  const [showEncryptionDetails, setShowEncryptionDetails] = useState(false);
  const [isEncrypting, setIsEncrypting] = useState(false);
  const [lastEncryptionTest, setLastEncryptionTest] = useState<Date | null>(null);
  const { toast } = useToast();

  // Vérifier que le chiffrement fonctionne au chargement du hook
  useEffect(() => {
    const testEncryption = async () => {
      try {
        const testData = { message: "Test de chiffrement" };
        const encrypted = await encryptData(testData);
        const decrypted = await decryptData(encrypted);
        
        if (JSON.stringify(decrypted) === JSON.stringify(testData)) {
          console.log("Système de chiffrement fonctionnel");
          setLastEncryptionTest(new Date());
        } else {
          console.error("Échec du test de chiffrement");
          toast({
            variant: "destructive",
            title: "Problème de sécurité",
            description: "Le test du système de chiffrement a échoué",
          });
        }
      } catch (error) {
        console.error("Erreur lors du test de chiffrement:", error);
      }
    };

    testEncryption();
  }, [toast]);

  // Fonction pour chiffrer et stocker des données
  const encryptAndStore = useCallback(async (key: string, data: any): Promise<boolean> => {
    setIsEncrypting(true);
    try {
      await setEncryptedData(key, data);
      return true;
    } catch (error) {
      console.error("Erreur de chiffrement:", error);
      toast({
        variant: "destructive",
        title: "Échec du chiffrement",
        description: "Impossible de chiffrer et stocker les données",
      });
      return false;
    } finally {
      setIsEncrypting(false);
    }
  }, [toast]);

  // Fonction pour récupérer et déchiffrer des données
  const retrieveAndDecrypt = useCallback(async (key: string): Promise<any> => {
    try {
      return await getEncryptedData(key);
    } catch (error) {
      console.error("Erreur de déchiffrement:", error);
      toast({
        variant: "destructive",
        title: "Échec du déchiffrement",
        description: "Impossible de récupérer les données chiffrées",
      });
      return null;
    }
  }, [toast]);

  return {
    encryptionEnabled,
    setEncryptionEnabled,
    showEncryptionDetails,
    setShowEncryptionDetails,
    isEncrypting,
    lastEncryptionTest,
    encryptAndStore,
    retrieveAndDecrypt
  };
}
