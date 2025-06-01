import React from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { ArrowRight, Sparkles, Zap, Shield } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Navbar } from '@/components/landing/Navbar';
import { Footer } from '@/components/landing/Footer';
interface Feature {
  icon: React.ReactNode;
  title: string;
  description: string;
}

const FeatureCard: React.FC<Feature> = ({ icon, title, description }) => {
  return (
    <div className="bg-card rounded-lg p-6 shadow-sm border border-border hover:shadow-md transition-all hover:-translate-y-1">
      <div className="text-primary mb-4">{icon}</div>
      <h3 className="text-xl font-semibold mb-2">{title}</h3>
      <p className="text-muted-foreground">{description}</p>
    </div>
  );
};

export default function LandingPage() {
  const { t } = useTranslation();

  const features: Feature[] = [
    {
      icon: <Sparkles className="h-8 w-8" />,
      title: t('landing.features.feature1.title'),
      description: t('landing.features.feature1.description'),
    },
    {
      icon: <Zap className="h-8 w-8" />,
      title: t('landing.features.feature2.title'),
      description: t('landing.features.feature2.description'),
    },
    {
      icon: <Shield className="h-8 w-8" />,
      title: t('landing.features.feature3.title'),
      description: t('landing.features.feature3.description'),
    },
  ];

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />

      {/* Hero Section */}
      <section className="relative py-20 px-4 sm:px-6 lg:px-8 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-background to-secondary/10" />
        <div className="absolute inset-0 bg-grid-pattern opacity-5" />
        <div className="relative max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight">
                {t('landing.hero.title')}
              </h1>
              <p className="text-xl text-muted-foreground max-w-2xl">
                {t('landing.hero.subtitle')}
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button size="lg" asChild className="group">
                  <Link to="/signup">
                    {t('landing.hero.getStarted')}
                    <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </Link>
                </Button>
                <Button size="lg" variant="outline" asChild>
                  <Link to="/docs">{t('landing.hero.documentation')}</Link>
                </Button>
              </div>
            </div>
            <div className="rounded-lg overflow-hidden shadow-2xl border border-border">
              <div className="bg-card text-card-foreground rounded-t-md p-2 flex items-center gap-1.5">
                <div className="h-3 w-3 rounded-full bg-red-500" />
                <div className="h-3 w-3 rounded-full bg-yellow-500" />
                <div className="h-3 w-3 rounded-full bg-green-500" />
                <div className="ml-2 text-sm font-medium">
                  {t('landing.hero.preview')}
                </div>
              </div>
              <div className="aspect-video bg-muted/30 flex items-center justify-center">
                <div className="text-muted-foreground text-center p-8">
                  {t('landing.hero.previewPlaceholder')}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold">
              {t('landing.features.title')}
            </h2>
            <p className="mt-4 text-xl text-muted-foreground max-w-3xl mx-auto">
              {t('landing.features.subtitle')}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div key={index} className="transition-all duration-300">
                <FeatureCard {...feature} />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-primary/5">
        <div className="max-w-5xl mx-auto text-center">
          <h2 className="text-3xl font-bold">{t('landing.cta.title')}</h2>
          <p className="mt-4 text-xl text-muted-foreground max-w-3xl mx-auto mb-8">
            {t('landing.cta.subtitle')}
          </p>
          <Button size="lg" asChild className="group">
            <Link to="/signup">
              {t('landing.cta.button')}
              <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </Button>
        </div>
      </section>

      <Footer />
    </div>
  );
}
 
