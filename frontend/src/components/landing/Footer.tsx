import { Link } from 'react-router-dom';
import { Logo } from '@/components/landing/Logo';
import { useTranslation } from 'react-i18next';

export function Footer() {
  const { t } = useTranslation();

  return (
    <footer className="border-t bg-muted/40">
      <div className="container px-4 py-12 md:px-6">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
          <div className="space-y-4">
            <Link to="/" className="flex items-center space-x-2">
              <Logo className="h-8 w-8" />
              <span className="font-bold">{t('app.name')}</span>
            </Link>
            <p className="text-sm text-muted-foreground">{t('app.tagline')}</p>
          </div>
          <div className="space-y-4">
            <h3 className="text-sm font-bold uppercase tracking-wider">
              {t('footer.product')}
            </h3>
            <ul className="space-y-2">
              <li>
                <Link
                  to="/features"
                  className="text-sm text-muted-foreground hover:text-foreground"
                >
                  {t('nav.features')}
                </Link>
              </li>
              <li>
                <Link
                  to="/pricing"
                  className="text-sm text-muted-foreground hover:text-foreground"
                >
                  {t('nav.pricing')}
                </Link>
              </li>
              <li>
                <Link
                  to="/docs"
                  className="text-sm text-muted-foreground hover:text-foreground"
                >
                  {t('nav.docs')}
                </Link>
              </li>
              <li>
                <Link
                  to="/changelog"
                  className="text-sm text-muted-foreground hover:text-foreground"
                >
                  {t('footer.changelog')}
                </Link>
              </li>
            </ul>
          </div>
          <div className="space-y-4">
            <h3 className="text-sm font-bold uppercase tracking-wider">
              {t('footer.company')}
            </h3>
            <ul className="space-y-2">
              <li>
                <Link
                  to="/about"
                  className="text-sm text-muted-foreground hover:text-foreground"
                >
                  {t('footer.about')}
                </Link>
              </li>
              <li>
                <Link
                  to="/blog"
                  className="text-sm text-muted-foreground hover:text-foreground"
                >
                  {t('footer.blog')}
                </Link>
              </li>
              <li>
                <Link
                  to="/careers"
                  className="text-sm text-muted-foreground hover:text-foreground"
                >
                  {t('footer.careers')}
                </Link>
              </li>
              <li>
                <Link
                  to="/contact"
                  className="text-sm text-muted-foreground hover:text-foreground"
                >
                  {t('footer.contact')}
                </Link>
              </li>
            </ul>
          </div>
          <div className="space-y-4">
            <h3 className="text-sm font-bold uppercase tracking-wider">
              {t('footer.legal')}
            </h3>
            <ul className="space-y-2">
              <li>
                <Link
                  to="/privacy"
                  className="text-sm text-muted-foreground hover:text-foreground"
                >
                  {t('footer.privacyPolicy')}
                </Link>
              </li>
              <li>
                <Link
                  to="/terms"
                  className="text-sm text-muted-foreground hover:text-foreground"
                >
                  {t('footer.termsOfService')}
                </Link>
              </li>
              <li>
                <Link
                  to="/cookies"
                  className="text-sm text-muted-foreground hover:text-foreground"
                >
                  {t('footer.cookiePolicy')}
                </Link>
              </li>
            </ul>
          </div>
        </div>
        <div className="mt-12 border-t pt-8">
          <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
            <p className="text-sm text-muted-foreground">
              &copy; {new Date().getFullYear()} {t('app.name')}.{' '}
              {t('footer.allRightsReserved')}
            </p>
            <div className="flex space-x-4">
              <Link
                to="https://twitter.com"
                className="text-muted-foreground hover:text-foreground"
                target="_blank"
                rel="noreferrer"
              >
                {t('footer.twitter')}
              </Link>
              <Link
                to="https://github.com"
                className="text-muted-foreground hover:text-foreground"
                target="_blank"
                rel="noreferrer"
              >
                {t('footer.github')}
              </Link>
              <Link
                to="https://discord.com"
                className="text-muted-foreground hover:text-foreground"
                target="_blank"
                rel="noreferrer"
              >
                {t('footer.discord')}
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
