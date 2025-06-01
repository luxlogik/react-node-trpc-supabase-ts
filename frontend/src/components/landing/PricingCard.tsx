import React from 'react';
import { Check } from 'lucide-react';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { useTranslation } from 'react-i18next';

// Separate types for better maintainability
type PricingVariant = 'default' | 'outline' | 'ghost';
type HighlightColor = 'primary' | 'secondary' | 'accent' | 'success' | 'warning' | 'error';

interface PricingFeature {
  text: string;
  included: boolean;
  tooltip?: string;
}

interface PricingCardProps {
  name: string;
  price: string;
  period?: string;
  description: string;
  features: PricingFeature[];
  cta: {
    text: string;
    link: string;
    external?: boolean;
  };
  variant?: PricingVariant;
  popular?: boolean;
  highlightColor?: HighlightColor;
  className?: string;
  onCtaClick?: () => void;
}

export function PricingCard({
  name,
  price,
  period,
  description,
  features,
  cta,
  variant = 'outline',
  popular = false,
  highlightColor = 'primary',
  className,
  onCtaClick,
}: PricingCardProps) {
  const { t } = useTranslation();

  const handleCtaClick = (e: React.MouseEvent) => {
    onCtaClick?.();
  };

  const CtaButton = () => (
    <Button 
      variant={variant} 
      className="w-full"
      onClick={handleCtaClick}
    >
      {cta.text}
    </Button>
  );

  return (
    <Card
      className={cn(
        'flex h-full flex-col transition-all duration-200 hover:shadow-lg',
        popular && `border-${highlightColor} shadow-md`,
        className
      )}
    >
      {popular && (
        <div 
          className={cn(
            "absolute right-0 top-0 rounded-bl-lg rounded-tr-lg px-3 py-1 text-xs font-medium",
            `bg-${highlightColor} text-${highlightColor}-foreground`
          )}
          role="status"
          aria-label={t('pricing.popular')}
        >
          {t('pricing.popular')}
        </div>
      )}
      <CardHeader>
        <h3 className="text-xl font-bold tracking-tight">{name}</h3>
        <div className="mt-2 flex items-baseline">
          <span className="text-3xl font-bold tracking-tight">{price}</span>
          {period && (
            <span className="ml-1 text-sm text-muted-foreground">/{period}</span>
          )}
        </div>
        <p className="mt-2 text-sm text-muted-foreground">{description}</p>
      </CardHeader>
      <CardContent className="flex-1">
        <ul className="space-y-3" role="list">
          {features.map((feature, index) => (
            <li 
              key={index} 
              className={cn(
                "flex items-center",
                !feature.included && "opacity-50"
              )}
              title={feature.tooltip}
            >
              <Check 
                className={cn(
                  "mr-2 h-4 w-4 flex-shrink-0",
                  feature.included ? `text-${highlightColor}` : "text-muted-foreground"
                )} 
              />
              <span className="text-sm">{feature.text}</span>
            </li>
          ))}
        </ul>
      </CardContent>
      <CardFooter>
        {cta.external ? (
          <a 
            href={cta.link} 
            target="_blank" 
            rel="noopener noreferrer" 
            className="w-full"
          >
            <CtaButton />
          </a>
        ) : (
          <Link to={cta.link} className="w-full">
            <CtaButton />
          </Link>
        )}
      </CardFooter>
    </Card>
  );
}
