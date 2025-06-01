import { Card } from '@/components/ui/card';
import { motion } from 'framer-motion';
import { 
  Sparkles,  
  Settings, 
  Bell, 
  Palette,
  Clock
} from 'lucide-react';

const activities = [
  {
    id: 1,
    type: 'welcome',
    title: 'Welcome to Your Dashboard!',
    description: 'This is your personal space. Customize it to your liking.',
    icon: Sparkles,
    color: 'bg-purple-100 text-purple-600',
    time: 'Just now',
  },
  {
    id: 2,
    type: 'theme',
    title: 'Theme Customization',
    description: 'Try switching between light and dark mode for a better experience.',
    icon: Palette,
    color: 'bg-blue-100 text-blue-600',
    time: 'Available now',
  },
  {
    id: 3,
    type: 'notifications',
    title: 'Notification Settings',
    description: 'Configure your notification preferences to stay updated.',
    icon: Bell,
    color: 'bg-green-100 text-green-600',
    time: 'Available now',
  },
  {
    id: 4,
    type: 'profile',
    title: 'Profile Setup',
    description: 'Your profile is ready to be personalized. Click the edit button to get started!',
    icon: Settings,
    color: 'bg-amber-100 text-amber-600',
    time: 'Available now',
  }
];

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
};

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 }
};

export function ActivityFeed() {
  return (
    <Card className="p-6 bg-gradient-to-br from-white to-gray-50/50 dark:from-gray-900 dark:to-gray-800/50 border-none shadow-lg">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-semibold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
          Getting Started
        </h2>
        <Clock className="h-5 w-5 text-gray-400" />
      </div>
      
      <motion.div 
        className="space-y-4"
        variants={container}
        initial="hidden"
        animate="show"
      >
        {activities.map((activity) => (
          <motion.div
            key={activity.id}
            variants={item}
            className="group relative"
          >
            <div className="flex items-start space-x-4 p-4 rounded-xl bg-white dark:bg-gray-800/50 shadow-sm hover:shadow-md transition-all duration-200 border border-gray-100 dark:border-gray-700/50">
              <div className={`p-2 rounded-lg ${activity.color} group-hover:scale-110 transition-transform duration-200`}>
                <activity.icon className="h-5 w-5" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-gray-900 dark:text-gray-100">
                  {activity.title}
                </p>
                <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                  {activity.description}
                </p>
                <div className="mt-2 flex items-center text-xs text-gray-400 dark:text-gray-500">
                  <Clock className="h-3 w-3 mr-1" />
                  {activity.time}
                </div>
              </div>
              {activity.type === 'welcome' && (
                <div className="absolute -top-2 -right-2">
                  <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-300">
                    New
                  </span>
                </div>
              )}
            </div>
          </motion.div>
        ))}
      </motion.div>

      <div className="mt-6 pt-6 border-t border-gray-100 dark:border-gray-700/50">
        <p className="text-sm text-gray-500 dark:text-gray-400 text-center">
          More features coming soon! Stay tuned for updates.
        </p>
      </div>
    </Card>
  );
} 