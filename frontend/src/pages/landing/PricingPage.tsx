import React from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { Navbar } from '@/components/landing/Navbar';
import { PricingCard } from '@/components/landing/PricingCard';
import { Button } from '@/components/ui/button';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { Footer } from '@/components/landing/Footer';
import ComingSoonPage from '@/components/landing/ComingSoonPage';

interface FAQ {
  question: string;
  answer: string;
}

const PricingPage: React.FC = () => {
  return <ComingSoonPage pageName="Pricing" />;

  const { t } = useTranslation();

  const pricingTiers = [
    {
      name: t('pricing.tiers.hobby.name'),
      price: t('pricing.tiers.hobby.price'),
      description: t('pricing.tiers.hobby.description'),
      features: t('pricing.tiers.hobby.features', {
        returnObjects: true,
      }) as string[],
      cta: t('pricing.tiers.hobby.cta'),
      variant: 'outline' as const,
    },
    {
      name: t('pricing.tiers.pro.name'),
      price: t('pricing.tiers.pro.price'),
      period: t('pricing.tiers.pro.period'),
      description: t('pricing.tiers.pro.description'),
      features: t('pricing.tiers.pro.features', {
        returnObjects: true,
      }) as string[],
      cta: t('pricing.tiers.pro.cta'),
      variant: 'default' as const,
      popular: true,
    },
    {
      name: t('pricing.tiers.team.name'),
      price: t('pricing.tiers.team.price'),
      period: t('pricing.tiers.team.period'),
      description: t('pricing.tiers.team.description'),
      features: t('pricing.tiers.team.features', {
        returnObjects: true,
      }) as string[],
      cta: t('pricing.tiers.team.cta'),
      variant: 'outline' as const,
    },
  ];

  const faqs = t('pricing.faq.questions', { returnObjects: true }) as FAQ[];

  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <main className="flex-1">
        <section className="bg-gradient-to-b from-background to-background/80 py-16">
          <div className="container px-4 md:px-6">
            <div className="text-center">
              <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl">
                {t('pricing.title')}
              </h1>
              <p className="mt-4 text-muted-foreground md:text-xl">
                {t('pricing.subtitle')}
              </p>
            </div>
          </div>
        </section>

        <section className="py-16">
          <div className="container px-4 md:px-6">
            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
              {pricingTiers.map((tier, index) => (
                <PricingCard
                  key={index}
                  name={tier.name}
                  price={tier.price}
                  period={tier.period}
                  description={tier.description}
                  features={tier.features}
                  cta={tier.cta}
                  variant={tier.variant}
                  popular={tier.popular}
                />
              ))}
            </div>
          </div>
        </section>

        <section className="bg-muted/40 py-16">
          <div className="container px-4 md:px-6">
            <div className="mx-auto max-w-3xl">
              <h2 className="text-center text-3xl font-bold tracking-tighter">
                {t('pricing.faq.title')}
              </h2>
              <div className="mt-8">
                <Accordion type="single" collapsible className="w-full">
                  {faqs.map((faq, index) => (
                    <AccordionItem key={index} value={`item-${index}`}>
                      <AccordionTrigger>{faq.question}</AccordionTrigger>
                      <AccordionContent>{faq.answer}</AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
              </div>
              <div className="mt-8 text-center">
                <p className="text-muted-foreground">
                  {t('pricing.faq.moreQuestions')}
                </p>
                <Link to="/contact">
                  <Button variant="link" className="mt-2">
                    {t('pricing.faq.contactSupport')}
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default PricingPage;
