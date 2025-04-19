import React from 'react';

interface OptimizedImageProps {
  src: string;
  alt: string;
  className?: string;
  width?: number;
  height?: number;
}

const OptimizedImage = ({ src, alt, className, width, height }: OptimizedImageProps) => {
  // Convert image URL to WebP if it's not already
  const getWebPUrl = (url: string) => {
    if (url.includes('.webp')) return url;
    // For uploaded images through Supabase storage, we keep the original format
    if (url.includes('storage.googleapis')) return url;
    return url.replace(/\.(jpe?g|png)$/i, '.webp');
  };

  return (
    <img
      src={getWebPUrl(src)}
      alt={alt}
      className={className}
      loading="lazy"
      width={width}
      height={height}
      decoding="async"
    />
  );
};

export default OptimizedImage;
