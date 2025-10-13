import React from 'react';
import { motion } from 'framer-motion';
import type { HTMLMotionProps } from 'framer-motion';

interface ButtonProps extends HTMLMotionProps<'button'> {
  children: React.ReactNode;
  variant?: 'primary' | 'secondary' | 'danger' | 'special' | 'view' | 'auth';
  size?: 'sm' | 'md' | 'lg' | 'xs';
}
const sizeClasses = {
  xs: 'w-8 h-8 p-1 text-sm',
  sm: 'w-24 h-8 px-3 py-1 text-sm',
  md: 'w-40 h-10 px-6 py-2 text-base',
  lg: 'w-56 h-12 px-8 py-3 text-lg',
};
const Button: React.FC<ButtonProps> = ({
  children,
  variant = 'primary',
  size = 'md',
  className,
  ...props
}) => {
  let baseClasses =
    'relative rounded-xl font-bold transition-all duration-300 overflow-hidden group text-center ';

  let bgClasses = '';
  let textClasses = 'text-white';
  let borderClasses = 'border border-gray-600';

  if (variant === 'primary') {
    bgClasses = 'bg-slate-700 hover:bg-slate-600';
    borderClasses = 'border border-cyan-600';
    textClasses = 'text-cyan-300';
  } else if (variant === 'secondary') {
    bgClasses = 'bg-slate-800 hover:bg-slate-700';
    borderClasses = 'border border-slate-600';
  } else if (variant === 'danger') {
    bgClasses = 'bg-slate-800 hover:bg-slate-700';
    borderClasses = 'border border-purple-600';
    textClasses = 'text-purple-300';
  } else if (variant === 'special') {
    bgClasses = 'bg-yellow-400 hover:bg-yellow-500';
    textClasses = 'text-gray-700';
    borderClasses = 'border-2 border-yellow-500';
  } else if (variant === 'view') {
    bgClasses = 'bg-cyan-700 hover:bg-cyan-500';
    borderClasses = 'border border-cyan-700';
    textClasses = 'text-white';
  } else if (variant === 'auth') {
    bgClasses =
      'bg-gradient-to-r from-violet-600 to-blue-600 hover:from-violet-500 hover:to-blue-500';
    borderClasses = 'border border-violet-500';
    textClasses = 'text-white';
  }

  const combinedClasses = `${baseClasses} ${bgClasses} ${borderClasses} ${
    sizeClasses[size]
  } ${textClasses} ${className || ''}`;

  return (
    <motion.button
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      {...props}
      className={combinedClasses}
    >
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-cyan-400 to-transparent opacity-0 group-hover:opacity-20 transition-opacity duration-300 pointer-events-none z-0"></div>
      <span className="relative z-10">{children}</span>
    </motion.button>
  );
};

export default Button;
