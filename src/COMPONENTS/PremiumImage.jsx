import { useEffect, useState } from 'react';
import { fallbackBuildingImage } from '../services/api';

export default function PremiumImage({
  src,
  alt,
  className = '',
  wrapperClassName = '',
  imageClassName = '',
  rounded = false,
}) {
  const [currentSrc, setCurrentSrc] = useState(src || fallbackBuildingImage);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setCurrentSrc(src || fallbackBuildingImage);
    setIsLoaded(false);
  }, [src]);

  const handleError = () => {
    if (currentSrc !== fallbackBuildingImage) {
      setCurrentSrc(fallbackBuildingImage);
      setIsLoaded(false);
      return;
    }

    setIsLoaded(true);
  };

  return (
    <div className={`relative overflow-hidden bg-white/[0.04] ${rounded ? 'rounded-lg' : ''} ${wrapperClassName}`}>
      {!isLoaded && (
        <div className="absolute inset-0 animate-pulse bg-gradient-to-r from-white/[0.04] via-white/[0.09] to-white/[0.04]" />
      )}
      <img
        src={currentSrc}
        alt={alt}
        loading="lazy"
        onLoad={() => setIsLoaded(true)}
        onError={handleError}
        className={`${className} ${imageClassName} transition duration-700 ${isLoaded ? 'opacity-100' : 'opacity-0'}`}
      />
    </div>
  );
}
