import { Footer } from '@/components/landing/Footer';
import { Navbar } from '@/components/landing/Navbar';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';

export default function PrivacyPage() {
  const { t } = useTranslation();

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <div className="container max-w-3xl py-12 px-4 md:px-6 md:py-16">
        <h1 className="text-3xl font-bold tracking-tight mb-6">
          {t('privacy.title')}
        </h1>

        <p className="mb-8 text-muted-foreground">
          {t('privacy.contact')}{' '}
          <a
            href="mailto:awdawda@adwadwar22amdodwadaw.com"
            className="text-primary hover:underline"
          >
            awdawda@adwadwar22amdodwadaw.com
          </a>
        </p>

        <h2 className="text-xl font-semibold mb-4">
          {t('privacy.tldr.title')}
        </h2>
        <div className="space-y-4 mb-8">
          <p>{t('privacy.tldr.privacyModeOn')}</p>
          <p>{t('privacy.tldr.privacyModeOff')}</p>
          <p>{t('privacy.tldr.autocomplete')}</p>
        </div>

        <h2 className="text-xl font-semibold mb-4">
          {t('privacy.otherNotes.title')}
        </h2>
        <div className="space-y-4 mb-8">
          <p>{t('privacy.otherNotes.apiKey')}</p>
          <p>{t('privacy.otherNotes.codebaseIndex')}</p>
          <p>{t('privacy.otherNotes.caching')}</p>
        </div>

        <h2 className="text-xl font-semibold mb-4">
          {t('privacy.dataCollection.title')}
        </h2>
        <div className="space-y-4 mb-8">
          <p>{t('privacy.dataCollection.description')}</p>
          <ul className="list-disc pl-6 space-y-2">
            <li>{t('privacy.dataCollection.item1')}</li>
            <li>{t('privacy.dataCollection.item2')}</li>
            <li>{t('privacy.dataCollection.item3')}</li>
            <li>{t('privacy.dataCollection.item4')}</li>
            <li>{t('privacy.dataCollection.item5')}</li>
          </ul>
        </div>

        <h2 className="text-xl font-semibold mb-4">
          {t('privacy.dataUsage.title')}
        </h2>
        <div className="space-y-4 mb-8">
          <p>{t('privacy.dataUsage.description')}</p>
          <ul className="list-disc pl-6 space-y-2">
            <li>{t('privacy.dataUsage.item1')}</li>
            <li>{t('privacy.dataUsage.item2')}</li>
            <li>{t('privacy.dataUsage.item3')}</li>
          </ul>
        </div>

        <h2 className="text-xl font-semibold mb-4">
          {t('privacy.userRights.title')}
        </h2>
        <div className="space-y-4 mb-8">
          <p>{t('privacy.userRights.description')}</p>
          <ul className="list-disc pl-6 space-y-2">
            <li>{t('privacy.userRights.item1')}</li>
            <li>{t('privacy.userRights.item2')}</li>
            <li>{t('privacy.userRights.item3')}</li>
          </ul>
        </div>

        <div className="border-t pt-6 mt-8">
          <p className="text-sm text-muted-foreground">
            {t('privacy.lastUpdated')}: {t('privacy.date')}
          </p>
          <p className="text-sm mt-2">
            <Link to="/terms" className="text-primary hover:underline">
              {t('footer.termsOfService')}
            </Link>
          </p>
        </div>
      </div>
      <Footer />
    </div>
  );
}
