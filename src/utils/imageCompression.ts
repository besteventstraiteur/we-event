
import imageCompression from 'browser-image-compression';

export interface CompressionResult {
  compressedFile: File;
  compressionRate: number;
}

export const compressImage = async (file: File): Promise<CompressionResult> => {
  const options = {
    maxSizeMB: 1,
    maxWidthOrHeight: 1920,
    useWebWorker: true,
    initialQuality: 0.8,
  };

  try {
    const compressedFile = await imageCompression(file, options);
    const compressionRate = Math.round((1 - (compressedFile.size / file.size)) * 100);
    
    return {
      compressedFile,
      compressionRate
    };
  } catch (error) {
    console.error('Error compressing image:', error);
    throw error;
  }
};
