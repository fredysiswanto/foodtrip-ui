import { createContext, useState, useCallback, ReactNode } from 'react';
import { AuthState } from '@foodtrip/types';

interface AuthContextType extends AuthState {
  setAuth: (state: AuthState) => void;
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [authState, setAuthState] = useState<AuthState>(() => {
    // Initialize from localStorage
    const token = localStorage.getItem('auth_token');
    const userJson = localStorage.getItem('auth_user');
    const user = userJson ? JSON.parse(userJson) : null;

    return {
      user,
      token,
      isAuthenticated: !!token && !!user,
      isLoading: false,
    };
  });

  const setAuth = useCallback((state: AuthState) => {
    setAuthState(state);
    
    // Persist to localStorage
    if (state.token && state.user) {
      localStorage.setItem('auth_token', state.token);
      localStorage.setItem('auth_user', JSON.stringify(state.user));
    } else {
      localStorage.removeItem('auth_token');
      localStorage.removeItem('auth_user');
    }
  }, []);

  const value: AuthContextType = {
    ...authState,
    setAuth,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
