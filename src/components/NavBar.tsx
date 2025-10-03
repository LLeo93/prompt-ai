import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { FaHome, FaStar, FaInfoCircle } from 'react-icons/fa';
import AnimatedComponent from './AnimatedComponent';
import { motion } from 'framer-motion';

const NavBar: React.FC = () => {
  const location = useLocation();

  const links = [
    { name: 'Home', path: '/home', icon: <FaHome /> },
    { name: 'Preferiti', path: '/favorites', icon: <FaStar /> },
    { name: 'Guida', path: '/', icon: <FaInfoCircle /> },
  ];

  return (
    <>
      {/* Desktop*/}
      <nav className="hidden lg:flex fixed top-0 left-0 w-full z-50 backdrop-blur-lg bg-slate-900/40 shadow-lg py-4">
        <div className="max-w-6xl mx-auto flex justify-between items-center px-6">
          <AnimatedComponent delay={0.1}>
            <Link
              to="/"
              className="text-3xl font-extrabold text-cyan-400 hover:text-cyan-300 transition-colors duration-300 flex items-center gap-2 flex-grow mr-15"
            >
              {/* ✨  */}
              <motion.span
                animate={{ scale: [1, 1.1, 1, 1.1, 1] }}
                transition={{
                  repeat: Infinity,
                  duration: 20,
                  ease: 'easeInOut',
                }}
              >
                ✨
              </motion.span>
              PromptLab
            </Link>
          </AnimatedComponent>

          <div className="flex gap-8 items-center lg:ml-10">
            {links.map((link) => {
              const isActive = location.pathname === link.path;
              return (
                <Link
                  key={link.name}
                  to={link.path}
                  className={`relative px-3 py-2 font-semibold text-sm group overflow-hidden
                    ${
                      isActive
                        ? 'text-cyan-300'
                        : 'text-gray-400 hover:text-cyan-400'
                    }`}
                >
                  <span className="relative z-10 flex items-center gap-2 transition-transform duration-300 group-hover:-translate-y-1">
                    {link.icon}
                    <span>{link.name}</span>
                  </span>
                  <span className="absolute inset-0 bg-gradient-to-r from-cyan-400 via-purple-500 to-pink-400 opacity-0 group-hover:opacity-30 transition-all duration-500 blur-xl rounded-lg"></span>
                </Link>
              );
            })}

            {/* Icona  animata Desktop */}
            <motion.span
              className="text-yellow-400 text-2xl ml-4"
              animate={{ rotate: [0, 5, -5, 0], scale: [1, 1.05, 1, 1.05, 1] }}
              transition={{ repeat: Infinity, duration: 25, ease: 'easeInOut' }}
            >
              ✨
            </motion.span>
          </div>
        </div>
      </nav>

      {/* Tablet Vertical */}
      <nav className="hidden md:flex lg:hidden fixed top-0 left-0 h-full w-28 bg-slate-900/40 shadow-inner flex flex-col items-center py-6 gap-12 backdrop-blur-lg">
        {/* Logo  */}
        <div className="flex flex-col items-center mb-4">
          <motion.span
            className="text-4xl font-extrabold text-cyan-400"
            animate={{ scale: [1, 1.1, 1, 1.1, 1] }}
            transition={{ repeat: Infinity, duration: 20, ease: 'easeInOut' }}
          >
            ✨
          </motion.span>
          <span className="text-xs text-cyan-300 mt-1 font-semibold">
            PromptLab
          </span>
        </div>

        {/* Link centrali */}
        <div className="flex flex-col flex-grow justify-center items-center gap-10">
          {links.map((link) => {
            const isActive = location.pathname === link.path;
            return (
              <Link
                key={link.name}
                to={link.path}
                className={`relative flex flex-col items-center text-lg group transition-colors duration-300
                  ${
                    isActive
                      ? 'text-cyan-300'
                      : 'text-gray-400 hover:text-cyan-400'
                  }`}
              >
                {link.icon}
                <span className="mt-2 text-sm">{link.name}</span>

                <span className="absolute inset-0 bg-gradient-to-b from-cyan-400 via-purple-500 to-pink-400 opacity-0 group-hover:opacity-30 transition-all duration-500 blur-xl rounded-lg"></span>
              </Link>
            );
          })}
        </div>

        {/*✨ in basso */}
        <motion.span
          className="text-yellow-400 text-3xl mb-4"
          animate={{ rotate: [0, 5, -5, 0], scale: [1, 1.1, 1, 1.1, 1] }}
          transition={{ repeat: Infinity, duration: 25, ease: 'easeInOut' }}
        >
          ✨
        </motion.span>
      </nav>

      {/* Mobile Bottom */}
      <nav className="md:hidden fixed bottom-0 left-0 w-full z-50 backdrop-blur-lg bg-slate-900/40 shadow-inner flex justify-around py-3">
        {links.map((link) => {
          const isActive = location.pathname === link.path;
          return (
            <Link
              key={link.name}
              to={link.path}
              className={`relative flex flex-col items-center text-sm group transition-colors duration-300
                ${
                  isActive
                    ? 'text-cyan-300'
                    : 'text-gray-400 hover:text-cyan-400'
                }`}
            >
              {link.icon}
              <span className="mt-1">{link.name}</span>

              <span className="absolute inset-0 bg-gradient-to-r from-cyan-400 via-purple-500 to-pink-400 opacity-0 group-hover:opacity-30 transition-all duration-500 blur-xl rounded-lg"></span>
            </Link>
          );
        })}
      </nav>
      <div className="lg:mt-20 md:ml-28 mb-16 md:mb-0" />
    </>
  );
};

export default NavBar;
