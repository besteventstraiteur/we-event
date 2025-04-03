
import { toast } from "@/components/ui/use-toast";

/**
 * Clé de chiffrement par défaut
 * Dans une implémentation réelle, cette clé serait stockée de manière sécurisée
 * et différente pour chaque utilisateur
 */
const DEFAULT_ENCRYPTION_KEY = "VIP_DEFAULT_ENCRYPTION_KEY_2025";

/**
 * Initialise l'algorithme de chiffrement avec une clé spécifique
 * @param key Clé de chiffrement (optionnelle, utilise la clé par défaut si non fournie)
 * @returns Une promesse contenant l'objet CryptoKey
 */
export const initEncryption = async (key?: string): Promise<CryptoKey> => {
  try {
    // Utiliser la clé fournie ou celle par défaut
    const keyMaterial = key || DEFAULT_ENCRYPTION_KEY;
    
    // Convertir la clé en format utilisable par l'API Web Crypto
    const encoder = new TextEncoder();
    const keyData = encoder.encode(keyMaterial);
    
    // Dériver une clé cryptographique à partir des données
    const cryptoKey = await window.crypto.subtle.importKey(
      "raw",
      keyData,
      { name: "PBKDF2" },
      false,
      ["deriveKey"]
    );
    
    // Générer sel aléatoire pour PBKDF2
    const salt = window.crypto.getRandomValues(new Uint8Array(16));
    
    // Dériver la clé finale avec PBKDF2
    const derivedKey = await window.crypto.subtle.deriveKey(
      {
        name: "PBKDF2",
        salt,
        iterations: 100000,
        hash: "SHA-256"
      },
      cryptoKey,
      { name: "AES-GCM", length: 256 },
      true,
      ["encrypt", "decrypt"]
    );
    
    return derivedKey;
  } catch (error) {
    console.error("Erreur lors de l'initialisation du chiffrement:", error);
    toast({
      variant: "destructive",
      title: "Erreur de sécurité",
      description: "Impossible d'initialiser le chiffrement sécurisé",
    });
    throw error;
  }
};

/**
 * Chiffre des données en utilisant AES-GCM (AES-256)
 * @param data Données à chiffrer (objet ou chaîne)
 * @param userKey Clé optionnelle spécifique à l'utilisateur
 * @returns Données chiffrées en Base64 avec vecteur d'initialisation
 */
export const encryptData = async (data: any, userKey?: string): Promise<string> => {
  try {
    // Convertir les données en chaîne JSON si nécessaire
    const plaintext = typeof data === 'string' ? data : JSON.stringify(data);
    const encoder = new TextEncoder();
    const dataToEncrypt = encoder.encode(plaintext);
    
    // Obtenir la clé de chiffrement
    const key = await initEncryption(userKey);
    
    // Créer un vecteur d'initialisation aléatoire pour AES-GCM
    const iv = window.crypto.getRandomValues(new Uint8Array(12));
    
    // Chiffrer les données
    const encryptedData = await window.crypto.subtle.encrypt(
      {
        name: "AES-GCM",
        iv,
      },
      key,
      dataToEncrypt
    );
    
    // Combiner IV et données chiffrées pour stockage/transmission
    const encryptedArray = new Uint8Array(iv.length + encryptedData.byteLength);
    encryptedArray.set(iv, 0);
    encryptedArray.set(new Uint8Array(encryptedData), iv.length);
    
    // Convertir en Base64 pour stockage
    return btoa(String.fromCharCode(...encryptedArray));
  } catch (error) {
    console.error("Erreur lors du chiffrement des données:", error);
    toast({
      variant: "destructive",
      title: "Erreur de chiffrement",
      description: "Impossible de chiffrer les données sensibles",
    });
    throw error;
  }
};

/**
 * Déchiffre des données chiffrées avec AES-GCM
 * @param encryptedData Données chiffrées en Base64
 * @param userKey Clé optionnelle spécifique à l'utilisateur
 * @returns Données déchiffrées (objet ou chaîne)
 */
export const decryptData = async (encryptedData: string, userKey?: string): Promise<any> => {
  try {
    // Convertir les données Base64 en tableau d'octets
    const encryptedBytes = Uint8Array.from(atob(encryptedData), c => c.charCodeAt(0));
    
    // Extraire le vecteur d'initialisation (12 premiers octets)
    const iv = encryptedBytes.slice(0, 12);
    const data = encryptedBytes.slice(12);
    
    // Obtenir la clé de déchiffrement
    const key = await initEncryption(userKey);
    
    // Déchiffrer les données
    const decryptedBuffer = await window.crypto.subtle.decrypt(
      {
        name: "AES-GCM",
        iv,
      },
      key,
      data
    );
    
    // Convertir le buffer en chaîne
    const decoder = new TextDecoder();
    const decryptedText = decoder.decode(decryptedBuffer);
    
    // Tenter de parser en JSON si possible
    try {
      return JSON.parse(decryptedText);
    } catch {
      // Retourner en tant que chaîne si ce n'est pas du JSON
      return decryptedText;
    }
  } catch (error) {
    console.error("Erreur lors du déchiffrement des données:", error);
    toast({
      variant: "destructive",
      title: "Erreur de déchiffrement",
      description: "Impossible de déchiffrer les données sensibles",
    });
    throw error;
  }
};

/**
 * Stocke des données sensibles chiffrées dans le localStorage
 * @param key Clé de stockage
 * @param data Données à stocker
 * @param userKey Clé optionnelle spécifique à l'utilisateur
 */
export const setEncryptedData = async (key: string, data: any, userKey?: string): Promise<void> => {
  try {
    const encryptedData = await encryptData(data, userKey);
    localStorage.setItem(key, encryptedData);
  } catch (error) {
    console.error("Erreur lors du stockage des données chiffrées:", error);
    throw error;
  }
};

/**
 * Récupère et déchiffre des données depuis le localStorage
 * @param key Clé de stockage
 * @param userKey Clé optionnelle spécifique à l'utilisateur
 * @returns Données déchiffrées ou null si inexistantes
 */
export const getEncryptedData = async (key: string, userKey?: string): Promise<any> => {
  try {
    const encryptedData = localStorage.getItem(key);
    if (!encryptedData) return null;
    return await decryptData(encryptedData, userKey);
  } catch (error) {
    console.error("Erreur lors de la récupération des données chiffrées:", error);
    return null;
  }
};
