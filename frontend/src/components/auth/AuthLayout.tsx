import { ReactNode } from 'react';
import { Logo } from '@/components/landing/Logo';

export function AuthLayout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-white">
      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-center mb-8">
          <Logo className="h-12" />
        </div>
        <div className="max-w-md mx-auto bg-white rounded-lg shadow-lg p-8">
          {children}
        </div>
      </div>
    </div>
  );
} 