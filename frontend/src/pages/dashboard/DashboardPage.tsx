 
import { trpc } from '@/lib/trpc';
import { useToast } from '@/hooks/use-toast';
import { initializeGlobalSingleton } from '@/lib/data/data';
import { useEffect } from 'react';
import WaveLoader from '@/components/ui/loaders/wave-loader';
import { ProfileCard } from '@/components/dashboard/ProfileCard';
import { ActivityFeed } from '@/components/dashboard/ActivityFeed';
import { motion } from 'framer-motion';

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
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800"
    >
      {/* Header */}
      <header className="bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm shadow-sm sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <motion.div 
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="flex justify-between items-center"
          >
            <div>
              <h1 className="text-3xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                Dashboard
              </h1>
              <p className="mt-2 text-base text-gray-600 dark:text-gray-300">
                Welcome back, {profile.name}! 👋 Let's make today amazing.
              </p>
            </div>
          </motion.div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <motion.div 
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="grid grid-cols-1 gap-8 lg:grid-cols-3"
        >
          {/* Profile Card */}
          <div className="lg:col-span-1">
            <ProfileCard profile={profile} />
          </div>

          {/* Activity Feed */}
          <div className="lg:col-span-2">
            <ActivityFeed />
          </div>
        </motion.div>
      </main>
    </motion.div>
  );
} 