
import { useState } from "react";

export function useEncryption() {
  const [encryptionEnabled, setEncryptionEnabled] = useState(true);
  const [showEncryptionDetails, setShowEncryptionDetails] = useState(false);

  return {
    encryptionEnabled,
    setEncryptionEnabled,
    showEncryptionDetails,
    setShowEncryptionDetails
  };
}
