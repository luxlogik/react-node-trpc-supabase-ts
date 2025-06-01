import { Footer } from '@/components/landing/Footer';
import { Navbar } from '@/components/landing/Navbar';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';

export default function TermsPage() {
  const { t } = useTranslation();

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <div className="container max-w-3xl py-12 px-4 md:px-6 md:py-16">
        <h1 className="text-3xl font-bold tracking-tight mb-6">
          {t('terms.title')}
        </h1>

        <p className="mb-8 text-muted-foreground">
          {t('terms.lastUpdated')}: {t('terms.date')}
        </p>

        <div className="space-y-8">
          <section>
            <h2 className="text-xl font-semibold mb-4">
              {t('terms.introduction.title')}
            </h2>
            <p>{t('terms.introduction.description')}</p>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-4">
              {t('terms.definitions.title')}
            </h2>
            <ul className="list-disc pl-6 space-y-2">
              <li>
                <strong>{t('terms.definitions.service.term')}:</strong>{' '}
                {t('terms.definitions.service.definition')}
              </li>
              <li>
                <strong>{t('terms.definitions.company.term')}:</strong>{' '}
                {t('terms.definitions.company.definition')}
              </li>
              <li>
                <strong>{t('terms.definitions.user.term')}:</strong>{' '}
                {t('terms.definitions.user.definition')}
              </li>
              <li>
                <strong>{t('terms.definitions.content.term')}:</strong>{' '}
                {t('terms.definitions.content.definition')}
              </li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-4">
              {t('terms.acceptance.title')}
            </h2>
            <p>{t('terms.acceptance.description')}</p>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-4">
              {t('terms.accountResponsibilities.title')}
            </h2>
            <p className="mb-4">
              {t('terms.accountResponsibilities.description')}
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li>{t('terms.accountResponsibilities.item1')}</li>
              <li>{t('terms.accountResponsibilities.item2')}</li>
              <li>{t('terms.accountResponsibilities.item3')}</li>
              <li>{t('terms.accountResponsibilities.item4')}</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-4">
              {t('terms.intellectualProperty.title')}
            </h2>
            <p className="mb-4">
              {t('terms.intellectualProperty.description')}
            </p>
            <h3 className="text-lg font-medium mb-2">
              {t('terms.intellectualProperty.userContent.title')}
            </h3>
            <p>{t('terms.intellectualProperty.userContent.description')}</p>
            <h3 className="text-lg font-medium mb-2 mt-4">
              {t('terms.intellectualProperty.serviceContent.title')}
            </h3>
            <p>{t('terms.intellectualProperty.serviceContent.description')}</p>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-4">
              {t('terms.prohibitedUses.title')}
            </h2>
            <p className="mb-4">{t('terms.prohibitedUses.description')}</p>
            <ul className="list-disc pl-6 space-y-2">
              <li>{t('terms.prohibitedUses.item1')}</li>
              <li>{t('terms.prohibitedUses.item2')}</li>
              <li>{t('terms.prohibitedUses.item3')}</li>
              <li>{t('terms.prohibitedUses.item4')}</li>
              <li>{t('terms.prohibitedUses.item5')}</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-4">
              {t('terms.termination.title')}
            </h2>
            <p>{t('terms.termination.description')}</p>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-4">
              {t('terms.disclaimer.title')}
            </h2>
            <p>{t('terms.disclaimer.description')}</p>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-4">
              {t('terms.limitation.title')}
            </h2>
            <p>{t('terms.limitation.description')}</p>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-4">
              {t('terms.governing.title')}
            </h2>
            <p>{t('terms.governing.description')}</p>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-4">
              {t('terms.changes.title')}
            </h2>
            <p>{t('terms.changes.description')}</p>
          </section>
        </div>

        <div className="border-t pt-6 mt-8">
          <p className="text-sm mt-2">
            <Link to="/privacy" className="text-primary hover:underline">
              {t('footer.privacyPolicy')}
            </Link>
          </p>
        </div>
      </div>
      <Footer />
    </div>
  );
}
