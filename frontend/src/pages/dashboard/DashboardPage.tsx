import { trpc } from '@/lib/trpc';
import { useToast } from '@/hooks/use-toast';
import { initializeGlobalSingleton } from '@/lib/data/data';
import { useEffect } from 'react';
import WaveLoader from '@/components/ui/loaders/wave-loader';
import { ProfileCard } from '@/components/dashboard/ProfileCard';
import { ActivityFeed } from '@/components/dashboard/ActivityFeed';

export function DashboardPage() {
  const { toast } = useToast();
  const { data: profile, error, isLoading } = trpc.user.getUser.useQuery();

  useEffect(() => {
    if (profile) {
      initializeGlobalSingleton(profile);
    }
  }, [profile]);

  if (error) {
    toast({
      title: 'Error',
      description: 'Failed to load profile',
      variant: 'destructive',
    });
  }

  if (isLoading) {
    return <WaveLoader />;
  }

  if (!profile) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 animate-in fade-in duration-500">
      {/* Header */}
      <header className="bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm shadow-sm sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex justify-between items-center animate-in slide-in-from-top-4 fade-in duration-700 delay-200">
            <div>
              <h1 className="text-3xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                Dashboard
              </h1>
              <p className="mt-2 text-base text-gray-600 dark:text-gray-300">
                Welcome back, {profile.name}! 👋 Let's make today amazing.
              </p>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-3 animate-in slide-in-from-bottom-4 fade-in duration-700 delay-300">
          {/* Profile Card */}
          <div className="lg:col-span-1">
            <ProfileCard profile={profile} />
          </div>

          {/* Activity Feed */}
          <div className="lg:col-span-2">
            <ActivityFeed />
          </div>
        </div>
      </main>
    </div>
  );
} 