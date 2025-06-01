import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

const CookiesPage: React.FC = () => {
  const { t } = useTranslation();

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-2xl w-full space-y-8">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900 dark:text-white">
            {t('cookies.title')}
          </h2>
        </div>

        <Card className="p-6">
          <div className="space-y-4">
            <h3 className="text-xl font-bold">{t('cookies.aboutCookies')}</h3>
            <p className="text-gray-600 dark:text-gray-400">
              {t('cookies.description')}
            </p>

            <h3 className="text-xl font-bold mt-6">
              {t('cookies.typesTitle')}
            </h3>
            <ul className="list-disc pl-5 space-y-2">
              <li className="text-gray-600 dark:text-gray-400">
                {t('cookies.essential')}
              </li>
              <li className="text-gray-600 dark:text-gray-400">
                {t('cookies.preferences')}
              </li>
              <li className="text-gray-600 dark:text-gray-400">
                {t('cookies.statistics')}
              </li>
            </ul>

            <h3 className="text-xl font-bold mt-6">
              {t('cookies.managingTitle')}
            </h3>
            <p className="text-gray-600 dark:text-gray-400">
              {t('cookies.managingDescription')}
            </p>

            <div className="pt-6 text-center">
              <Link to="/">
                <Button>{t('common.backToHome')}</Button>
              </Link>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default CookiesPage;
