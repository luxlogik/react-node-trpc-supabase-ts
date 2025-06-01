import { useEffect } from 'react';
import { useTheme } from 'next-themes';
import { trpc } from '@/lib/trpc';

export function ThemeSync() {
  const { setTheme, theme } = useTheme();
  const { data: profile } = trpc.user.getUser.useQuery();
  const updateProfile = trpc.user.updateProfile.useMutation();

  useEffect(() => {
    if (profile?.settings?.theme && profile.settings.theme !== theme) {
      setTheme(profile.settings.theme);
    }
  }, [profile?.settings?.theme, setTheme, theme]);

  useEffect(() => {
    if (theme && profile?.settings?.theme !== theme) {
      updateProfile.mutate({
        settings: {
          theme: theme as 'light' | 'dark' | 'system',
        },
      });
    }
  }, [theme, profile?.settings?.theme, updateProfile]);

  return null;
} 