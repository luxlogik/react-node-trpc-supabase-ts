export interface User {
    id: string;
    name: string;
    email: string;
    created_at: string;
    settings: {
        theme: 'light' | 'dark' | 'system';
        notifications: boolean;
    } | null;
} 