import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

/**
 * GSAP Animation Presets - Only used animations kept
 */
export const animations = {
  // Used in HomePage for stagger animations
  staggerFadeIn: (elements, options = {}) => {
    return gsap.fromTo(
      elements,
      { opacity: 0, y: 30 },
      {
        opacity: 1,
        y: 0,
        duration: options.duration || 0.6,
        stagger: options.stagger || 0.1,
        ease: options.ease || 'power2.out',
        ...options,
      }
    );
  },
};

export default animations;
