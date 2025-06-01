import { Link, useLocation } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Logo } from '@/components/landing/Logo';
import { useTranslation } from 'react-i18next';
import { Menu, X, Moon, Sun, Globe } from 'lucide-react';
import { useTheme } from 'next-themes';
import { useState } from 'react'; 

export function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();
  const { setTheme, theme } = useTheme();
  const { t, i18n } = useTranslation();
  const isDashboard = location.pathname?.startsWith('/dashboard');

  if (isDashboard) return null;

  const toggleLanguage = () => {
    i18n.changeLanguage(i18n.language === 'en' ? 'de' : 'en');
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <nav className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          {/* Logo and Brand */}
          <Link to="/" className="flex items-center space-x-2">
            <Logo className="h-8 w-8" />
            <span className="font-bold text-xl">{t('app.name')}</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <Link 
              to="/features" 
              className={cn(
                "text-sm font-medium transition-colors hover:text-primary",
                location.pathname === '/features' && "text-primary"
              )}
            >
              {t('nav.features')}
            </Link>
            <Link 
              to="/docs"
              className={cn(
                "text-sm font-medium transition-colors hover:text-primary",
                location.pathname === '/docs' && "text-primary"
              )}
            >
              {t('nav.docs')}
            </Link>
          </div>

          {/* Right Side Actions */}
          <div className="hidden md:flex items-center space-x-4">
            <Button
              variant="ghost"
              size="icon"
              onClick={toggleLanguage}
              aria-label="Toggle language"
            >
              <Globe className="h-5 w-5" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
              aria-label={t('common.toggleTheme')}
            >
              <Sun className="h-5 w-5 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
              <Moon className="absolute h-5 w-5 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
            </Button>
            <Link to="/login">
              <Button variant="ghost">{t('nav.login')}</Button>
            </Link>
            <Link to="/signup">
              <Button>{t('nav.signup')}</Button>
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Toggle menu"
          >
            {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden py-4 space-y-4">
            <Link 
              to="/features"
              className="block px-4 py-2 text-sm font-medium hover:bg-accent rounded-md"
              onClick={() => setIsMenuOpen(false)}
            >
              {t('nav.features')}
            </Link>
            <Link 
              to="/docs"
              className="block px-4 py-2 text-sm font-medium hover:bg-accent rounded-md"
              onClick={() => setIsMenuOpen(false)}
            >
              {t('nav.docs')}
            </Link>
            <div className="px-4 py-2 flex items-center justify-between">
              <Button
                variant="ghost"
                size="sm"
                onClick={toggleLanguage}
                className="w-full justify-start"
              >
                <Globe className="h-4 w-4 mr-2" />
                {i18n.language === 'en' ? 'Deutsch' : 'English'}
              </Button>
            </div>
            <div className="px-4 space-y-2">
              <Link to="/login" className="w-full">
                <Button variant="outline" className="w-full" onClick={() => setIsMenuOpen(false)}>
                  {t('nav.login')}
                </Button>
              </Link>
              <Link to="/signup" className="w-full">
                <Button className="w-full" onClick={() => setIsMenuOpen(false)}>
                  {t('nav.signup')}
                </Button>
              </Link>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
}
