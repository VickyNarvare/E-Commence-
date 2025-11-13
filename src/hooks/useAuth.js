import { useState } from 'react';
import { useLocalStorage } from './useLocalStorage';

export const useAuth = () => {
  const [user, setUser] = useLocalStorage('user', null);
  const [isLoading, setIsLoading] = useState(false);

  const login = async (email, password) => {
    setIsLoading(true);
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000));
      
      const mockUser = {
        id: 1,
        email,
        name: 'John Doe',
        avatar: 'https://ui-avatars.com/api/?name=John+Doe',
      };
      
      setUser(mockUser);
      return { success: true, user: mockUser };
    } catch (error) {
      return { success: false, error: error.message };
    } finally {
      setIsLoading(false);
    }
  };

  const register = async (name, email, password) => {
    setIsLoading(true);
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000));
      
      const mockUser = {
        id: Date.now(),
        email,
        name,
        avatar: `https://ui-avatars.com/api/?name=${encodeURIComponent(name)}`,
      };
      
      setUser(mockUser);
      return { success: true, user: mockUser };
    } catch (error) {
      return { success: false, error: error.message };
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
    setUser(null);
  };

  const updateProfile = (updates) => {
    setUser((prev) => ({ ...prev, ...updates }));
  };

  return {
    user,
    isAuthenticated: !!user,
    isLoading,
    login,
    register,
    logout,
    updateProfile,
  };
};
