import React, { createContext, useContext, useEffect } from 'react';
import type { ReactNode } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import type { User } from 'firebase/auth';
import { auth } from '../firebaseConfig';

interface AuthContextType {
  user: User | null | undefined;
  loading: boolean;
  error: Error | undefined;
}

const AuthContext = createContext<AuthContextType>({
  user: undefined,
  loading: true,
  error: undefined,
});

export const AuthProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [user, loading, error] = useAuthState(auth);
  useEffect(() => {
    if (user) {
      localStorage.setItem('userLoggedIn', 'true');
    } else {
      localStorage.removeItem('userLoggedIn');
    }
  }, [user]);

  return (
    <AuthContext.Provider value={{ user, loading, error }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
