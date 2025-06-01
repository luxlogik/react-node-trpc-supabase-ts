export interface User {
  id: string;
  email: string;
  name: string;
  createdAt: Date;
  updatedAt: Date; 
  settings: UserSettings;
}

export interface UserSettings {
  theme: 'light' | 'dark' | 'system';
  notifications: boolean; 
}

export type ApiResponse<T> = {
  data: T;
  error?: never;
} | {
  data?: never;
  error: {
    code: string;
    message: string;
  };
};

export interface AuthUser {
  id: string;
  email: string;
  user_metadata: {
    name?: string;
  };
}

export interface UpdateProfileInput {
  name?: string;
  email?: string;
  settings?: {
    theme?: 'light' | 'dark' | 'system';
    notifications?: boolean;
  };
}

