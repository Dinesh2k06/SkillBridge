import type { FC } from 'react';
import { Logo } from '@/components/Logo';
import { cn } from '@/lib/utils';

export interface LoadingScreenProps {
  className?: string;
  message?: string;
}

export const LoadingScreen: FC<LoadingScreenProps> = ({
  className,
  message = 'Loading...',
}) => {
  return (
    <div
      className={cn(
        'min-h-screen w-full flex flex-col items-center justify-center bg-background p-4',
        className
      )}
    >
      <div className="flex flex-col items-center gap-6">
        <Logo size="lg" />
        <div className="flex flex-col items-center gap-3">
          <div className="w-48 h-1.5 bg-muted rounded-full overflow-hidden">
            <div className="h-full w-full bg-gradient-to-r from-purple-600 to-indigo-600 rounded-full animate-pulse" />
          </div>
          <p className="text-sm font-medium text-muted-foreground animate-pulse">
            {message}
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoadingScreen;
