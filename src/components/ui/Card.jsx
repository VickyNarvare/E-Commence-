import React from 'react';
import { motion } from 'framer-motion';
import { cn } from '../../utils/helpers';

const Card = ({ 
  children, 
  className = '', 
  hover = true,
  glass = false,
  padding = 'md',
  ...props 
}) => {
  const baseStyles = 'rounded-2xl transition-all duration-300';
  
  const paddings = {
    none: '',
    sm: 'p-4',
    md: 'p-6',
    lg: 'p-8',
  };
  
  const cardStyles = glass
    ? 'bg-white/10 backdrop-blur-md border border-white/20 shadow-glass'
    : 'bg-white shadow-lg';
  
  const hoverStyles = hover ? 'hover:shadow-2xl hover:transform hover:scale-[1.02]' : '';
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      className={cn(baseStyles, cardStyles, hoverStyles, paddings[padding], className)}
      {...props}
    >
      {children}
    </motion.div>
  );
};

export default Card;
