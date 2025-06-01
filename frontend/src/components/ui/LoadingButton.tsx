import React from 'react';

import { IconLoader } from '@tabler/icons-react';

import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';

interface LoadingButtonProps extends React.ComponentProps<typeof Button> {
  loading?: boolean;
  isIconButton?: boolean;
}

const LoadingButton = React.forwardRef<HTMLButtonElement, LoadingButtonProps>(
  (
    {
      loading,
      variant = 'default',
      children,
      isIconButton = false,
      className,
      ...props
    }: LoadingButtonProps,
    ref
  ) => {
    return (
      <Button
        ref={ref}
        size={isIconButton ? 'icon' : props.size}
        disabled={loading || props.disabled}
        variant={variant}
        className={cn(className)}
        {...props}
      >
        {loading && (
          <IconLoader
            className={cn('animate-spin', !isIconButton && '-ms-1 me-2')}
            size={16}
            strokeWidth={2}
            aria-hidden="true"
          />
        )}

        {(!isIconButton || !loading) && children}
      </Button>
    );
  }
);

LoadingButton.displayName = 'LoadingButton';

export default LoadingButton;
