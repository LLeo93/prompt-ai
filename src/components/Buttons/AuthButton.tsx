import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { auth } from '../../firebaseConfig';
import { GoogleAuthProvider, signInWithPopup, signOut } from 'firebase/auth';
import { useAuth } from '../../context/AuthContext';
import Button from './Button';
import { FaRobot } from 'react-icons/fa';

export const AuthButton: React.FC = () => {
  const { user } = useAuth();
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const loginWithGoogle = async () => {
    const provider = new GoogleAuthProvider();
    try {
      await signInWithPopup(auth, provider);
    } catch (err) {
      console.error('Errore durante il login:', err);
    }
  };

  const logout = async () => {
    try {
      await signOut(auth);
      setOpen(false);
    } catch (err) {
      console.error('Errore durante il logout:', err);
    }
  };

  // Chiudi il menu cliccando fuori
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(e.target as Node)
      ) {
        setOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  //posizione del dropdown in base al breakpoint
  const getDropdownPosition = () => {
    if (window.innerWidth < 768) {
      // Mobile
      return 'bottom-full right-0 mb-3';
    } else if (window.innerWidth < 1024) {
      // Tablet
      return 'left-full ml-3 top-1/2 -translate-y-1/2';
    } else {
      // Desktop
      return 'top-full right-0 mt-3';
    }
  };

  const [positionClass, setPositionClass] = useState(getDropdownPosition());

  useEffect(() => {
    const handleResize = () => setPositionClass(getDropdownPosition());
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <div className="relative z-[9999] " ref={dropdownRef}>
      {/* ROBOT */}
      <motion.div
        className="relative"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
      >
        <FaRobot
          onClick={() => setOpen(!open)}
          className={`text-2xl cursor-pointer transition-colors ${
            user
              ? 'text-cyan-300 hover:text-cyan-400'
              : 'text-gray-400 hover:text-cyan-300'
          }`}
        />
        {/* Badge stato */}
        <span
          className={`absolute -top-1 -right-1 w-2.5 h-2.5 rounded-full ${
            user
              ? 'bg-cyan-400 shadow-[0_0_6px_#22d3ee]'
              : 'bg-gray-500 shadow-[0_0_4px_#6b7280]'
          }`}
        />
      </motion.div>

      {/* DROPDOWN */}
      <AnimatePresence>
        {open && (
          <motion.div
            key="dropdown"
            initial={{ opacity: 0, scale: 0.95, y: -5 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: -5 }}
            transition={{ duration: 0.2 }}
            className={`absolute ${positionClass} min-w-[13rem] bg-slate-800/90 backdrop-blur-md border border-slate-700 rounded-xl shadow-xl p-4 z-[9999]`}
          >
            {user ? (
              <div className="flex flex-col items-center gap-3">
                {/* FOTO E NOME */}
                <div className="flex items-center gap-2">
                  {user.photoURL && (
                    <img
                      src={user.photoURL}
                      alt="user"
                      className="w-8 h-8 rounded-full border border-cyan-400"
                    />
                  )}
                  <p className="text-sm text-cyan-200 font-medium truncate max-w-[100px]">
                    {user.displayName}
                  </p>
                </div>

                {/* Logout */}
                <Button
                  variant="auth"
                  size="xs"
                  onClick={logout}
                  className="w-full hover:scale-[1.03] transition-transform"
                >
                  Logout
                </Button>
              </div>
            ) : (
              <div className="flex flex-col items-center gap-3">
                <p className="text-sm text-gray-300">
                  Accedi per salvare i tuoi prompt
                </p>
                <Button
                  variant="auth"
                  size="xs"
                  onClick={loginWithGoogle}
                  className="w-full hover:scale-[1.03] transition-transform"
                >
                  Login con Google
                </Button>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default AuthButton;
