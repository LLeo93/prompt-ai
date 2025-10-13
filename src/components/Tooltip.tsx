import React from 'react';

interface TooltipProps {
  text: string;
  children: React.ReactNode;
  position?: 'top' | 'bottom' | 'left' | 'right';
  variant?: 'default' | 'glow' | 'info' | 'warning';
  delay?: number;
  icon?: string;
}

// Config stili
const variantClasses = {
  default: 'bg-gray-700 text-white',
  glow: 'bg-gray-800 text-cyan-300 shadow-lg shadow-cyan-500/50',
  info: 'bg-blue-600 text-white',
  warning: 'bg-yellow-500 text-black',
};

const Tooltip: React.FC<TooltipProps> = ({
  text,
  children,
  position = 'top',
  variant = 'default',
  delay = 0,
  icon,
}) => {
  const positionClasses = {
    top: 'bottom-full left-1/2 -translate-x-1/2 mb-2',
    bottom: 'top-full left-1/2 -translate-x-1/2 mt-2',
    left: 'right-full top-1/2 -translate-y-1/2 mr-2',
    right: 'left-full top-1/2 -translate-y-1/2 ml-2',
  };

  return (
    <div className="relative inline-block group">
      {children}
      <div
        style={{ transitionDelay: `${delay}ms` }}
        className={`absolute ${positionClasses[position]} 
          px-3 py-1 text-xs rounded-md opacity-0 group-hover:opacity-100 
          transition-opacity duration-300 pointer-events-none z-50 whitespace-nowrap
          ${variantClasses[variant]}`}
      >
        {icon && <span className="mr-1">{icon}</span>}
        {text}
      </div>
    </div>
  );
};

export default Tooltip;
