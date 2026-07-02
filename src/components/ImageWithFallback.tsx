import React, { useState, useEffect } from 'react';

interface ImageWithFallbackProps {
  src: string;
  fallbackSrc?: string;
  alt: string;
  className?: string;
  style?: React.CSSProperties;
  aspectRatio?: 'square' | 'portrait' | 'landscape' | 'wide' | 'auto';
  onClick?: () => void;
}

export const ImageWithFallback: React.FC<ImageWithFallbackProps> = ({
  src,
  fallbackSrc,
  alt,
  className = '',
  style = {},
  aspectRatio = 'auto',
  onClick
}) => {
  const [imgSrc, setImgSrc] = useState<string>(src);
  const [hasError, setHasError] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    setImgSrc(src);
    setHasError(false);
    setIsLoading(true);
  }, [src]);

  const handleError = () => {
    if (!hasError && fallbackSrc) {
      setImgSrc(fallbackSrc);
      setHasError(true);
      setIsLoading(false);
    } else {
      setIsLoading(false);
    }
  };

  const handleLoad = () => {
    setIsLoading(false);
  };

  // Determine aspect ratio CSS class or inline padding
  const getAspectClass = () => {
    switch (aspectRatio) {
      case 'square': return 'ratio ratio-1x1';
      case 'portrait': return 'ratio ratio-3x4';
      case 'landscape': return 'ratio ratio-4x3';
      case 'wide': return 'ratio ratio-16x9';
      default: return '';
    }
  };

  return (
    <div 
      className={`position-relative overflow-hidden bg-gourmet-alt ${getAspectClass()} ${onClick ? 'cursor-pointer' : ''}`}
      style={{
        borderRadius: '16px',
        border: '1px solid var(--border-color)',
        ...style
      }}
      onClick={onClick}
    >
      {isLoading && (
        <div className="position-absolute top-0 start-0 w-100 h-100 d-flex align-items-center justify-content-center bg-gourmet-alt z-1">
          <div className="spinner-border text-gold spinner-border-sm opacity-75" role="status">
            <span className="visually-hidden">Carregando...</span>
          </div>
        </div>
      )}
      
      <img
        src={imgSrc}
        alt={alt}
        onError={handleError}
        onLoad={handleLoad}
        className={`w-100 h-100 object-fit-cover transition-transform duration-500 ${className} ${isLoading ? 'opacity-0' : 'opacity-100'}`}
        style={{
          transition: 'transform 0.6s cubic-bezier(0.16, 1, 0.3, 1), opacity 0.4s ease',
          objectFit: 'cover',
          width: '100%',
          height: '100%'
        }}
      />
      
      {/* Subtle warm shadow gradient overlay on hover */}
      <div 
        className="position-absolute top-0 start-0 w-100 h-100 pointer-events-none hover-overlay"
        style={{
          background: 'linear-gradient(to top, rgba(28,27,24,0.65) 0%, rgba(28,27,24,0) 40%, rgba(28,27,24,0) 100%)',
          opacity: 0,
          transition: 'opacity 0.4s ease'
        }}
      />
    </div>
  );
};
