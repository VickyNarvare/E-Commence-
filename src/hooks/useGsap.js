import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Register GSAP plugins
gsap.registerPlugin(ScrollTrigger);

/**
 * Custom hook for GSAP animations with automatic cleanup
 * @param {Function} animationCallback - Function containing GSAP animation code
 * @param {Array} dependencies - Dependencies array for useEffect
 */
export const useGsap = (animationCallback, dependencies = []) => {
  useEffect(() => {
    const context = gsap.context(() => {
      animationCallback();
    });

    return () => context.revert(); // Cleanup
  }, dependencies);
};

/**
 * Hook for fade-in animation on mount
 * @param {Object} options - Animation options (duration, delay, etc.)
 */
export const useFadeIn = (options = {}) => {
  const elementRef = useRef(null);

  useEffect(() => {
    if (elementRef.current) {
      gsap.fromTo(
        elementRef.current,
        { opacity: 0, y: options.y || 20 },
        {
          opacity: 1,
          y: 0,
          duration: options.duration || 0.8,
          delay: options.delay || 0,
          ease: options.ease || 'power2.out',
        }
      );
    }
  }, [options.duration, options.delay, options.ease, options.y]);

  return elementRef;
};

/**
 * Hook for scroll-triggered animations
 * @param {Object} options - ScrollTrigger options
 */
export const useScrollAnimation = (options = {}) => {
  const elementRef = useRef(null);

  useEffect(() => {
    if (elementRef.current) {
      gsap.fromTo(
        elementRef.current,
        { 
          opacity: 0, 
          y: options.y || 50,
          scale: options.scale || 1
        },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: options.duration || 1,
          ease: options.ease || 'power3.out',
          scrollTrigger: {
            trigger: elementRef.current,
            start: options.start || 'top 80%',
            end: options.end || 'bottom 20%',
            toggleActions: options.toggleActions || 'play none none reverse',
            markers: options.markers || false,
          },
        }
      );
    }

    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, [options.y, options.scale, options.duration, options.ease, options.start, options.end, options.toggleActions, options.markers]);

  return elementRef;
};

/**
 * Hook for stagger animation (animating multiple elements sequentially)
 * @param {Object} options - Stagger animation options
 */
export const useStagger = (options = {}) => {
  const containerRef = useRef(null);

  useEffect(() => {
    if (containerRef.current) {
      const children = containerRef.current.children;
      
      gsap.fromTo(
        children,
        { 
          opacity: 0, 
          y: options.y || 30,
          scale: options.scale || 0.95
        },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: options.duration || 0.6,
          stagger: options.stagger || 0.1,
          ease: options.ease || 'power2.out',
          delay: options.delay || 0,
        }
      );
    }
  }, [options.y, options.scale, options.duration, options.stagger, options.ease, options.delay]);

  return containerRef;
};

/**
 * Hook for hover scale animation
 * @param {Object} options - Scale options
 */
export const useHoverScale = (options = {}) => {
  const elementRef = useRef(null);

  useEffect(() => {
    const element = elementRef.current;
    if (!element) return;

    const handleMouseEnter = () => {
      gsap.to(element, {
        scale: options.scale || 1.05,
        duration: options.duration || 0.3,
        ease: options.ease || 'power2.out',
      });
    };

    const handleMouseLeave = () => {
      gsap.to(element, {
        scale: 1,
        duration: options.duration || 0.3,
        ease: options.ease || 'power2.out',
      });
    };

    element.addEventListener('mouseenter', handleMouseEnter);
    element.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      element.removeEventListener('mouseenter', handleMouseEnter);
      element.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, [options.scale, options.duration, options.ease]);

  return elementRef;
};

/**
 * Hook for parallax scroll effect
 * @param {Object} options - Parallax options
 */
export const useParallax = (options = {}) => {
  const elementRef = useRef(null);

  useEffect(() => {
    if (elementRef.current) {
      gsap.to(elementRef.current, {
        y: options.y || -100,
        ease: 'none',
        scrollTrigger: {
          trigger: elementRef.current,
          start: options.start || 'top bottom',
          end: options.end || 'bottom top',
          scrub: options.scrub || true,
          markers: options.markers || false,
        },
      });
    }

    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, [options.y, options.start, options.end, options.scrub, options.markers]);

  return elementRef;
};

/**
 * Hook for rotating animation
 * @param {Object} options - Rotation options
 */
export const useRotate = (options = {}) => {
  const elementRef = useRef(null);

  useEffect(() => {
    if (elementRef.current) {
      gsap.to(elementRef.current, {
        rotation: options.rotation || 360,
        duration: options.duration || 2,
        repeat: options.repeat !== undefined ? options.repeat : -1,
        ease: options.ease || 'linear',
      });
    }
  }, [options.rotation, options.duration, options.repeat, options.ease]);

  return elementRef;
};

/**
 * Hook for counter animation (numbers counting up)
 * @param {Number} endValue - Target number
 * @param {Object} options - Counter options
 */
export const useCounter = (endValue, options = {}) => {
  const elementRef = useRef(null);
  const counterRef = useRef({ value: 0 });

  useEffect(() => {
    if (elementRef.current) {
      gsap.to(counterRef.current, {
        value: endValue,
        duration: options.duration || 2,
        ease: options.ease || 'power1.out',
        onUpdate: () => {
          if (elementRef.current) {
            const formatted = options.formatter 
              ? options.formatter(counterRef.current.value)
              : Math.floor(counterRef.current.value);
            elementRef.current.textContent = formatted;
          }
        },
      });
    }
  }, [endValue, options.duration, options.ease, options.formatter]);

  return elementRef;
};

export default useGsap;
