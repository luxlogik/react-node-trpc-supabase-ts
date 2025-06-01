import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { I18nextProvider } from 'react-i18next';
import i18n from '@/i18n/i18n';
import { ThemeProvider } from '@/lib/context/ThemeContext';
import { Toaster } from '@/components/ui/toaster';
import { AuthProvider } from './lib/context/AuthProvider';
import { supabase } from './lib/supabase';
import { trpc, trpcClient } from '@/lib/trpc';

import LandingPage from '@/pages/landing/LandingPage';
import LoginPage from '@/pages/dashboard/login/LoginPage';
import LogoutPage from '@/pages/dashboard/login/LogoutPage';
import SignupPage from '@/pages/dashboard/login/SignupPage';
import PricingPage from '@/pages/landing/PricingPage';
import PrivacyPage from '@/pages/landing/PrivacyPage';
import TermsPage from '@/pages/landing/TermsPage';
import AboutPage from '@/pages/landing/AboutPage';
import ContactPage from '@/pages/landing/ContactPage';
import CareersPage from '@/pages/landing/CareersPage';
import CookiesPage from '@/components/landing/CookiesPage';
import FeaturesPage from '@/pages/landing/FeaturesPage';
import BlogPage from '@/pages/landing/BlogPage';
import ForgotPasswordPage from '@/pages/dashboard/login/ForgotPasswordPage'; 
import { DashboardPage } from '@/pages/dashboard/DashboardPage';
import { useAuth } from '@/lib/context/AuthContext';
import DocsPage from './pages/landing/DocsPage';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 5 * 60 * 1000,
      refetchOnWindowFocus: false,
    },
  },
});

// Protected Route component
const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const { user } = useAuth();
  console.log(user);
  if (!user) return <Navigate to="/login" />;
  return <>{children}</>;
};

export default function App() {
  return (
    <trpc.Provider client={trpcClient} queryClient={queryClient}>
      <QueryClientProvider client={queryClient}>
        <I18nextProvider i18n={i18n}>
          <ThemeProvider>
            <AuthProvider supabaseProvider={() => Promise.resolve(supabase)}>
              <Router>
                <Routes>
                  <Route path="/" element={<LandingPage />} />
                  <Route path="/login" element={<LoginPage />} />
                  <Route path="/logout" element={<LogoutPage />} />
                  <Route path="/forgot-password" element={<ForgotPasswordPage />} />
                  <Route path="/signup" element={<SignupPage />} />
                  <Route path="/pricing" element={<PricingPage />} />
                  <Route path="/privacy" element={<PrivacyPage />} />
                  <Route path="/terms" element={<TermsPage />} />
                  <Route path="/docs" element={<DocsPage />} />
                  <Route
                    path="/dashboard"
                    element={
                      <ProtectedRoute>
                        <DashboardPage />
                      </ProtectedRoute>
                    }
                  />  
                  <Route path="/about" element={<AboutPage />} />
                  <Route path="/contact" element={<ContactPage />} />
                  <Route path="/careers" element={<CareersPage />} />
                  <Route path="/cookies" element={<CookiesPage />} />
                  <Route path="/features" element={<FeaturesPage />} />
                  <Route path="/blog" element={<BlogPage />} />
                </Routes>
                <Toaster />
              </Router>
            </AuthProvider>
          </ThemeProvider>
        </I18nextProvider>
      </QueryClientProvider>
    </trpc.Provider>
  );
}
