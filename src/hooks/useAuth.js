import { useCallback, useEffect, useState } from 'react';
import { clearCurrentUser, getCurrentUser } from '../utils/storage';

export function useAuth() {
  const [user, setUser] = useState(() => getCurrentUser());

  const refreshUser = useCallback(() => {
    setUser(getCurrentUser());
  }, []);

  useEffect(() => {
    window.addEventListener('storage', refreshUser);
    window.addEventListener('propert-storage', refreshUser);

    return () => {
      window.removeEventListener('storage', refreshUser);
      window.removeEventListener('propert-storage', refreshUser);
    };
  }, [refreshUser]);

  const logout = useCallback(() => {
    clearCurrentUser();
    setUser(null);
  }, []);

  return {
    user,
    isAuthenticated: Boolean(user),
    logout,
    refreshUser,
  };
}
