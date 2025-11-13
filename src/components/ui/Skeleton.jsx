import React from 'react';

const Skeleton = ({ 
  variant = 'rectangular', 
  width = '100%', 
  height, 
  className = '',
  animation = 'pulse'
}) => {
  const baseStyles = 'bg-gray-200 overflow-hidden';
  
  const variants = {
    circular: 'rounded-full',
    rectangular: 'rounded-lg',
    text: 'rounded',
  };
  
  const animations = {
    pulse: 'animate-pulse',
    wave: 'shimmer',
    none: '',
  };
  
  const variantHeight = {
    text: '1rem',
    circular: width,
    rectangular: height || '4rem',
  };
  
  return (
    <div
      className={`${baseStyles} ${variants[variant]} ${animations[animation]} ${className}`}
      style={{
        width,
        height: variantHeight[variant],
      }}
      aria-label="Loading..."
      role="status"
    />
  );
};

export const ProductCardSkeleton = () => {
  return (
    <div className="bg-white rounded-2xl shadow-md overflow-hidden animate-pulse">
      <Skeleton variant="rectangular" height="16rem" className="rounded-none" />
      <div className="p-4 space-y-3">
        <Skeleton variant="text" width="60%" />
        <Skeleton variant="text" width="90%" />
        <Skeleton variant="text" width="40%" />
        <div className="flex justify-between items-center mt-4">
          <Skeleton variant="text" width="30%" height="2rem" />
          <Skeleton variant="rectangular" width="6rem" height="2.5rem" />
        </div>
      </div>
    </div>
  );
};

export const ProductGridSkeleton = ({ count = 8 }) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
      {Array.from({ length: count }).map((_, index) => (
        <ProductCardSkeleton key={index} />
      ))}
    </div>
  );
};

export default Skeleton;
