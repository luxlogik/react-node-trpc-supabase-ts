export interface User {
  id: string;
  name: string;
  email: string;
  createdAt: Date;
  updatedAt: Date;
  settings?: {
    id: string;
    userId: string;
    theme: 'light' | 'dark' | 'system';
    notifications: boolean;
    createdAt: Date;
    updatedAt: Date;
  } | null;
} 