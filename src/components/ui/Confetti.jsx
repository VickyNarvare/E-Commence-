import React, { useEffect } from 'react';
import { motion } from 'framer-motion';

const Confetti = () => {
  const colors = ['#0ea5e9', '#d946ef', '#f97316', '#10b981', '#f59e0b'];
  const confettiPieces = Array.from({ length: 50 }, (_, i) => ({
    id: i,
    left: Math.random() * 100,
    delay: Math.random() * 0.5,
    duration: 2 + Math.random() * 2,
    color: colors[Math.floor(Math.random() * colors.length)],
  }));

  return (
    <div className="fixed inset-0 pointer-events-none z-[999] overflow-hidden">
      {confettiPieces.map((piece) => (
        <motion.div
          key={piece.id}
          initial={{ y: -20, opacity: 1, rotate: 0 }}
          animate={{
            y: window.innerHeight + 20,
            opacity: 0,
            rotate: 360,
          }}
          transition={{
            duration: piece.duration,
            delay: piece.delay,
            ease: 'linear',
          }}
          style={{
            position: 'absolute',
            left: `${piece.left}%`,
            width: '10px',
            height: '10px',
            backgroundColor: piece.color,
          }}
          className="rounded-full"
        />
      ))}
    </div>
  );
};

export default Confetti;
