import { ReactNode, useCallback, useEffect, useMemo, useState } from 'react';

import { Session, SupabaseClient } from '@supabase/supabase-js';

import { AuthContext } from './AuthContext';
import { randomNumberInRangeInt } from '@/lib/random_functions';

const FIVE_TO_TEN_MINUTES_MS_RANGE = {
  min: 5 * 60 * 1000,
  max: 10 * 60 * 1000,
};

interface AuthProviderProps {
  supabaseProvider: () => Promise<SupabaseClient>;
  sessionUpdateCallback?: (session: Session | null) => void;
  children: ReactNode;
}

export const AuthProvider = ({
  supabaseProvider: getSupabase,
  sessionUpdateCallback,
  children,
}: AuthProviderProps) => {
  const [session, setSession] = useState<Session | null>(null);
  const [isInitialized, setIsInitialized] = useState(false);

  useEffect(() => {
    let ondismountCallThis: () => void;

    // get the supabase client and initialize the session state
    getSupabase().then(async (supabase) => {
      const { data: { session: initialSession } } = await supabase.auth.getSession();
      console.log('Initial session:', initialSession ? 'present' : 'null');
      if (initialSession?.access_token) {
        console.log('Access token present:', initialSession.access_token.substring(0, 10) + '...');
      }
      setSession(initialSession);
      setIsInitialized(true);

      // no matter who updates the session, we want to update the session state.
      const { data: authListener } = supabase.auth.onAuthStateChange(
        async (event, newSession) => {
          console.log('Auth state changed:', event, newSession ? 'session present' : 'no session');
          setSession(newSession);
        }
      );

      ondismountCallThis = () => {
        authListener?.subscription?.unsubscribe();
      };
    });

    // if the component unmounts, we want to unsubscribe from the auth listener
    return () => {
      ondismountCallThis?.();
    };
  }, []);

  const signOut = useCallback(async () => {
    const supabase = await getSupabase();
    const { error } = await supabase.auth.signOut();

    if (error) {
      return { success: false, error: error };
    }

    return { success: true };
  }, []);

  const signIn = useCallback(async (email: string, password: string) => {
    const supabase = await getSupabase();
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      console.error('Sign in error:', error);
      return { success: false, error: error };
    }

    console.log('Sign in successful, session:', data.session ? 'present' : 'null');
    if (data.session?.access_token) {
      console.log('New access token:', data.session.access_token.substring(0, 10) + '...');
    }

    setSession(data.session);
    sessionUpdateCallback?.(data.session);

    return { success: true };
  }, []);

  const resendConfirmationEmail = useCallback(async (email: string) => {
    const supabase = await getSupabase();
    const { error } = await supabase.auth.resend({
      type: 'signup',
      email: email,
    });

    if (error) {
      return { success: false, error: error };
    }

    return { success: true };
  }, []);

  const signUp = useCallback(
    async ({
      full_name,
      email,
      password,
    }: {
      full_name: string;
      email: string;
      password: string;
    }) => {
      const supabase = await getSupabase();
      const { error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          emailRedirectTo: window.location.href, // redirect to the same page
          data: {
            display_name: full_name,
          },
        },
      });

      if (error) {
        return { success: false, error: error };
      }

      return { success: true };
    },
    []
  );

  const resetPassword = useCallback(
    async (email: string, redirectTo: string) => {
      const supabase = await getSupabase();
      const { error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo,
      });

      if (error) {
        return { success: false, error: error };
      }

      return { success: true };
    },
    []
  );

  const refreshSession = useCallback(async () => {
    const supabase = await getSupabase();
    return await supabase.auth.refreshSession();
  }, []);

  const value = useMemo(
    () => ({
      isAuthenticated: session?.access_token != null,
      isInitialized,
      session,
      user: session?.user ?? null,
      signIn,
      signUp,
      signOut,
      resetPassword,
      refreshSession,
      resendConfirmationEmail,
    }),
    [session, isInitialized]
  );

  // Set up a timer to refresh the session when it's about to expire.
  useEffect(() => {
    let timeoutId: NodeJS.Timeout | undefined;
    if (session) {
      sessionUpdateCallback?.(session);

      const justBeforeExpirationMs =
        session.expires_in * 1000 -
        randomNumberInRangeInt(
          FIVE_TO_TEN_MINUTES_MS_RANGE.min,
          FIVE_TO_TEN_MINUTES_MS_RANGE.max
        );

      // Don't set up a timer if the session is already expired or about to expire
      if (justBeforeExpirationMs <= 0) {
        refreshSession();
        return;
      }
      timeoutId = setTimeout(() => {
        refreshSession();
      }, justBeforeExpirationMs);

      return () => {
        clearTimeout(timeoutId);
      };
    }
  }, [session, sessionUpdateCallback, isInitialized, refreshSession]);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
