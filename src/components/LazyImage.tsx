import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Image as ImageIcon } from 'lucide-react';

interface LazyImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  src: string;
  alt: string;
  className?: string;
  aspectRatio?: string;
  referrerPolicy?: React.HTMLAttributeReferrerPolicy;
}

export default function LazyImage({ 
  src, 
  alt, 
  className = "", 
  aspectRatio,
  ...props 
}: LazyImageProps) {
  const [isInView, setIsInView] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const [hasError, setHasError] = useState(false);
  const imgRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    // Fallback if IntersectionObserver is not supported on archaic browsers
    if (typeof window === 'undefined' || !window.IntersectionObserver) {
      setIsInView(true);
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsInView(true);
            // Once the image is requested/in-view, we don't need to observe it anymore
            if (imgRef.current) {
              observer.unobserve(imgRef.current);
            }
          }
        });
      },
      {
        rootMargin: '200px', // Trigger fetch 200px before image enters viewport for premium perceived speed
        threshold: 0.01,
      }
    );

    const currentRef = imgRef.current;
    if (currentRef) {
      observer.observe(currentRef);
    }

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef);
      }
    };
  }, []);

  return (
    <div 
      ref={imgRef} 
      className={`relative overflow-hidden bg-white/[0.03] rounded-[inherit] ${aspectRatio ? aspectRatio : 'w-full h-full'}`}
    >
      {/* Skeleton Loading State Shimmering Overlay */}
      <AnimatePresence>
        {!isLoaded && !hasError && (
          <motion.div 
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
            className="absolute inset-0 z-10 bg-gradient-to-r from-white/5 via-white/10 to-white/5 bg-[length:200%_100%] animate-pulse flex items-center justify-center rounded-[inherit]"
          >
            {/* Subtle icon placeholder */}
            <ImageIcon className="w-5 h-5 text-white/15 animate-pulse" />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Error Fallback Icon Block */}
      {hasError && (
        <div className="absolute inset-0 z-15 bg-white/[0.02] flex flex-col items-center justify-center text-white/30 rounded-[inherit] p-2">
          <ImageIcon className="w-5 h-5 stroke-[1.5] mb-1 text-[#D4AF37]/50" />
          <span className="text-[9px] font-mono uppercase tracking-wider text-white/30">Failed to load</span>
        </div>
      )}

      {/* Loaded image with smooth scale and fade transition */}
      {isInView && !hasError && (
        <img
          src={src}
          alt={alt}
          onLoad={() => setIsLoaded(true)}
          onError={() => setHasError(true)}
          className={`
            transition-all duration-700 ease-out object-cover rounded-[inherit]
            ${isLoaded ? 'opacity-100 scale-100 blur-0' : 'opacity-0 scale-95 blur-md'}
            ${className}
          `}
          {...props}
        />
      )}
    </div>
  );
}
