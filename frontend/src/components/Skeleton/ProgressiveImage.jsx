import React, { useState, useEffect } from 'react';
import Skeleton from './Skeleton';
import './ProgressiveImage.css';

const ProgressiveImage = ({ src, alt, className = '', skeletonHeight = '300px' }) => {
    const [isLoaded, setIsLoaded] = useState(false);
    const [error, setError] = useState(false);

    // Transformation for small placeholder
    const placeholderSrc = src?.replace('/upload/', '/upload/c_scale,w_50,q_auto,f_auto,e_blur:1000/');
    const optimizedSrc = src?.replace('/upload/', '/upload/q_auto,f_auto,w_auto,c_scale/');

    return (
        <div className={`progressive-image-container ${className}`}>
            {!isLoaded && !error && (
                <Skeleton height={skeletonHeight} className="image-skeleton" />
            )}

            {placeholderSrc && !isLoaded && !error && (
                <img
                    src={placeholderSrc}
                    alt={alt}
                    className="image-placeholder"
                />
            )}

            {error ? (
                <div className="image-error-fallback">
                    <span>Failed to load image</span>
                </div>
            ) : (
                <img
                    src={optimizedSrc}
                    alt={alt}
                    className={`main-image ${isLoaded ? 'loaded' : 'unloaded'}`}
                    onLoad={() => setIsLoaded(true)}
                    onError={() => setError(true)}
                    loading="lazy"
                />
            )}
        </div>
    );
};

export default ProgressiveImage;
