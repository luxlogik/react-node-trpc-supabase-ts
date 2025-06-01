import React from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { Search, Book, Code, Lightbulb, HelpCircle, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Navbar } from '@/components/landing/Navbar';
import { Footer } from '@/components/landing/Footer';

interface DocSection {
  icon: React.ReactNode;
  title: string;
  description: string;
  items: string[];
}

export default function DocsPage() {
  const { t } = useTranslation();
  const [searchQuery, setSearchQuery] = React.useState('');

  const sections: DocSection[] = [
    {
      icon: <Book className="h-6 w-6" />,
      title: t('docs.gettingStarted.title'),
      description: t('docs.gettingStarted.description'),
      items: [
        t('docs.gettingStarted.quickStart'),
        t('docs.gettingStarted.installation'),
        t('docs.gettingStarted.configuration'),
        t('docs.gettingStarted.firstSteps')
      ]
    },
    {
      icon: <Code className="h-6 w-6" />,
      title: t('docs.features.title'),
      description: t('docs.features.description'),
      items: [
        t('docs.features.coreFeatures'),
        t('docs.features.advancedFeatures'),
        t('docs.features.api'),
        t('docs.features.integrations')
      ]
    },
    {
      icon: <Lightbulb className="h-6 w-6" />,
      title: t('docs.guides.title'),
      description: t('docs.guides.description'),
      items: [
        t('docs.guides.tutorials'),
        t('docs.guides.bestPractices'),
        t('docs.guides.examples'),
        t('docs.guides.faq')
      ]
    }
  ];

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      
      <main className="flex-1">
        {/* Hero Section */}
        <section className="bg-primary/5 py-20">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center">
              <h1 className="text-4xl font-bold mb-4">{t('docs.title')}</h1>
              <p className="text-xl text-muted-foreground mb-8">
                {t('docs.description')}
              </p>
              <div className="relative max-w-xl mx-auto">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-5 w-5" />
                <Input
                  type="search"
                  placeholder={t('docs.search.placeholder')}
                  className="pl-10"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
            </div>
          </div>
        </section>

        {/* Documentation Sections */}
        <section className="py-20">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {sections.map((section, index) => (
                <div
                  key={index}
                  className="bg-card rounded-lg p-6 shadow-sm border border-border hover:shadow-md transition-all"
                >
                  <div className="text-primary mb-4">{section.icon}</div>
                  <h2 className="text-2xl font-semibold mb-2">{section.title}</h2>
                  <p className="text-muted-foreground mb-6">{section.description}</p>
                  <ul className="space-y-3">
                    {section.items.map((item, itemIndex) => (
                      <li key={itemIndex}>
                        <Link
                          to="#"
                          className="flex items-center text-primary hover:text-primary/80 transition-colors"
                        >
                          <ChevronRight className="h-4 w-4 mr-2" />
                          {item}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Feedback Section */}
        <section className="bg-primary/5 py-12">
          <div className="container mx-auto px-4 text-center">
            <h3 className="text-lg font-semibold mb-4">{t('docs.feedback.title')}</h3>
            <div className="flex justify-center gap-4">
              <Button variant="outline" size="sm">
                {t('docs.feedback.yes')}
              </Button>
              <Button variant="outline" size="sm">
                {t('docs.feedback.no')}
              </Button>
            </div>
            <p className="mt-4 text-sm text-muted-foreground">
              {t('docs.feedback.improve')}
            </p>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
} 