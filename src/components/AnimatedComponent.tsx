import React from 'react';
import { motion } from 'framer-motion';

interface AnimatedComponentProps {
  children: React.ReactNode;
  delay?: number;
  className?: string;
}

const AnimatedComponent: React.FC<AnimatedComponentProps> = ({
  children,
  delay = 0,
  className = '',
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay }}
      className={className}
    >
      {children}
    </motion.div>
  );
};

export default AnimatedComponent;
