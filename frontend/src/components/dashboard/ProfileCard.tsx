import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Switch } from '@/components/ui/switch';
import { useToast } from '@/hooks/use-toast';
import { trpc } from '@/lib/trpc';
import { Pencil, Check, X, Moon, Sun, Bell } from 'lucide-react';
import type { User } from '@/shared/types';
import { useTheme } from '@/lib/context/ThemeContext';

interface ProfileCardProps {
  profile: User;
}

export function ProfileCard({ profile }: ProfileCardProps) {
  const { toast } = useToast();
  const { toggleTheme } = useTheme();
  const [isEditing, setIsEditing] = useState(false);
  const [name, setName] = useState(profile.name);
  const utils = trpc.useUtils();
  
 

  const updateProfile = trpc.user.updateProfile.useMutation({
    onSuccess: (data) => {
      utils.user.getUser.invalidate();
      if (data.settings?.theme) {
        toggleTheme(data.settings.theme === 'dark');
      }
      toast({
        title: 'Success',
        description: 'Profile updated successfully',
      });
      setIsEditing(false);
    },
    onError: (error) => {
      toast({
        title: 'Error',
        description: error.message || 'Failed to update profile',
        variant: 'destructive',
      });
    },
  });

  const handleSave = async () => {
    if (name === profile.name) {
      setIsEditing(false);
      return;
    }
    updateProfile.mutate({ name });
  };

  const handleCancel = () => {
    setName(profile.name);
    setIsEditing(false);
  };

  const handleThemeToggle = () => {
    const newTheme = profile.settings?.theme === 'dark' ? 'light' : 'dark';
    updateProfile.mutate({ 
      settings: { 
        ...profile.settings, 
        theme: newTheme 
      } 
    });
  };

  const handleNotificationsToggle = () => {
    updateProfile.mutate({ 
      settings: { 
        ...profile.settings, 
        notifications: !profile.settings?.notifications 
      } 
    });
  };

  return (
    <Card className="p-6 bg-white dark:bg-gray-800 shadow-lg border border-gray-200 dark:border-gray-700">
      <div className="space-y-6">
        <div className="flex items-center space-x-4">
          <div className="h-16 w-16 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-white">
            <span className="text-2xl font-semibold">
              {profile.name?.[0]?.toUpperCase()}
            </span>
          </div>
          <div className="flex-1">
            {isEditing ? (
              <div className="flex items-center space-x-2">
                <Input
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="max-w-[200px] bg-gray-50 dark:bg-gray-700 border-gray-300 dark:border-gray-600"
                  placeholder="Enter your name"
                />
                <Button
                  size="icon"
                  variant="ghost"
                  onClick={handleSave}
                  disabled={updateProfile.isPending}
                  className="text-green-600 hover:text-green-700 dark:text-green-400 dark:hover:text-green-300"
                >
                  <Check className="h-4 w-4" />
                </Button>
                <Button
                  size="icon"
                  variant="ghost"
                  onClick={handleCancel}
                  disabled={updateProfile.isPending}
                  className="text-red-600 hover:text-red-700 dark:text-red-400 dark:hover:text-red-300"
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
            ) : (
              <div className="flex items-center space-x-2">
                <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
                  {profile.name}
                </h2>
                <Button
                  size="icon"
                  variant="ghost"
                  onClick={() => setIsEditing(true)}
                  className="text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white"
                >
                  <Pencil className="h-4 w-4" />
                </Button>
              </div>
            )}
            <p className="text-gray-600 dark:text-gray-300">{profile.email}</p>
          </div>
        </div>
        
        <div className="space-y-4 pt-4 border-t border-gray-200 dark:border-gray-700">
          <div className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700/50 rounded-lg">
            <div className="flex items-center space-x-3">
              {profile.settings?.theme === 'dark' ? (
                <Moon className="h-5 w-5 text-indigo-600 dark:text-indigo-400" />
              ) : (
                <Sun className="h-5 w-5 text-amber-600 dark:text-amber-400" />
              )}
              <div>
                <h3 className="text-sm font-medium text-gray-900 dark:text-white">Theme</h3>
                <p className="text-sm text-gray-600 dark:text-gray-300 capitalize">
                  {profile.settings?.theme || 'system'}
                </p>
              </div>
            </div>
            <Switch
              checked={profile.settings?.theme === 'dark'}
              onCheckedChange={handleThemeToggle}
              disabled={updateProfile.isPending}
            />
          </div>

          <div className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700/50 rounded-lg">
            <div className="flex items-center space-x-3">
              <Bell className={`h-5 w-5 ${profile.settings?.notifications ? 'text-green-600 dark:text-green-400' : 'text-gray-400 dark:text-gray-500'}`} />
              <div>
                <h3 className="text-sm font-medium text-gray-900 dark:text-white">Notifications</h3>
                <p className="text-sm text-gray-600 dark:text-gray-300">
                  {profile.settings?.notifications ? 'Enabled' : 'Disabled'}
                </p>
              </div>
            </div>
            <Switch
              checked={profile.settings?.notifications}
              onCheckedChange={handleNotificationsToggle}
              disabled={updateProfile.isPending}
            />
          </div>
        </div>
      </div>
    </Card>
  );
} 