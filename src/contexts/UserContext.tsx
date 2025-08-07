import React, { createContext, useContext } from 'react';
import type { ReactNode } from 'react';
import type { UserProfile } from '../types/DashboardData';

/**
 * User context interface defining the shape of user context data
 */
interface UserContextType {
  userInfo: UserProfile | null;
  setUserInfo: (user: UserProfile | null) => void;
}

/**
 * User context for managing global user state
 * Provides user authentication and profile data throughout the application
 */
const UserContext = createContext<UserContextType | undefined>(undefined);

/**
 * User context provider props interface
 */
interface UserContextProviderProps {
  children: ReactNode;
  value: UserContextType;
}

/**
 * User context provider component
 * Wraps the application to provide user context to all child components
 * 
 * @param children - React children components
 * @param value - User context value object
 */
export const UserContextProvider: React.FC<UserContextProviderProps> = ({ children, value }) => {
  return (
    <UserContext.Provider value={value}>
      {children}
    </UserContext.Provider>
  );
};

/**
 * Custom hook to use user context
 * Provides type-safe access to user context data
 * 
 * @returns User context value
 * @throws Error if used outside of UserContextProvider
 * 
 * @example
 * const { userInfo, setUserInfo } = useUserContext();
 */
export const useUserContext = (): UserContextType => {
  const context = useContext(UserContext);
  
  if (context === undefined) {
    throw new Error('useUserContext must be used within a UserContextProvider');
  }
  
  return context;
};

export { UserContext };
