import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

interface ComingSoonPageProps {
  pageName: string;
}

const ComingSoonPage: React.FC<ComingSoonPageProps> = ({ pageName }) => {
  const { t } = useTranslation();

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900 dark:text-white">
            {pageName}
          </h2>
        </div>

        <Card className="p-6">
          <div className="text-center space-y-4">
            <h3 className="text-xl font-bold">{t('common.comingSoon')}</h3>
            <p className="text-gray-600 dark:text-gray-400">
              {t('common.comingSoonMessage')}
            </p>
            <div className="pt-4">
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

export default ComingSoonPage;
