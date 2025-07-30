import { createContext, useContext } from 'react';
import type { UserProfile } from '../models/DashboardData';

export const UserContext = createContext<{
  userInfo: UserProfile | null;
  setUserInfo: React.Dispatch<React.SetStateAction<UserProfile | null>>;
} | null>(null);

export const useUserContext = () => {
  const ctx = useContext(UserContext);
  if (!ctx) throw new Error("useUserContext must be used within UserContext.Provider");
  return ctx;
};
