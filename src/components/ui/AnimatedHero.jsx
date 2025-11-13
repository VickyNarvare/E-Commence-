import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';

/**
 * Animated Hero Banner Component with GSAP
 * Features: Floating particles, smooth transitions, parallax effects
 */
const AnimatedHero = ({ children, className = '' }) => {
  const containerRef = useRef(null);
  const particlesRef = useRef([]);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // Create floating particles
    const particleCount = 20;
    const particles = [];

    for (let i = 0; i < particleCount; i++) {
      const particle = document.createElement('div');
      particle.className = 'absolute w-2 h-2 bg-white/20 rounded-full';
      particle.style.left = `${Math.random() * 100}%`;
      particle.style.top = `${Math.random() * 100}%`;
      container.appendChild(particle);
      particles.push(particle);
      particlesRef.current.push(particle);
    }

    // Animate particles
    particles.forEach((particle, index) => {
      gsap.to(particle, {
        y: `random(-100, 100)`,
        x: `random(-50, 50)`,
        opacity: 'random(0.2, 0.6)',
        duration: `random(3, 6)`,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut',
        delay: index * 0.1,
      });
    });

    // Cleanup
    return () => {
      particles.forEach(particle => particle.remove());
      particlesRef.current = [];
    };
  }, []);

  return (
    <div ref={containerRef} className={`relative overflow-hidden ${className}`}>
      {children}
    </div>
  );
};

export default AnimatedHero;
