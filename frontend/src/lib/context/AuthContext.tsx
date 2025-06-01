import { createContext, useContext } from 'react';

import { Session, User } from '@supabase/supabase-js';

const stub = (): never => {
  throw new Error('AuthContext not initialized');
};

type AuthContextType = {
  isAuthenticated: boolean;
  isInitialized: boolean;
  user: User | null;
  session: Session | null;

  signIn: (
    username: string,
    password: string
  ) => Promise<{ success: boolean; error?: any }>;
  signOut: () => Promise<{ success: boolean; error?: any }>;
  signUp: ({
    full_name,
    email,
    password,
  }: {
    full_name: string;
    email: string;
    password: string;
  }) => Promise<{ success: boolean; error?: any }>;
  resendConfirmationEmail: (
    email: string
  ) => Promise<{ success: boolean; error?: any }>;
  resetPassword: (
    email: string,
    redirectTo: string
  ) => Promise<{ success: boolean; error?: any }>;

  refreshSession: () => Promise<{ error: Error | null }>;
};

export const AuthContext = createContext<AuthContextType>({
  isAuthenticated: false,
  isInitialized: false,
  user: null,
  session: null,

  signIn: stub,
  signOut: stub,
  signUp: stub,
  resendConfirmationEmail: stub,
  resetPassword: stub,

  refreshSession: stub,
});

export const AuthConsumer = AuthContext.Consumer;

export const useAuth = () => useContext(AuthContext);
