import type { FC } from 'react';
import { Zap } from 'lucide-react';
import { cn } from '@/lib/utils';

export interface LogoProps {
  size?: 'sm' | 'md' | 'lg';
  showText?: boolean;
  className?: string;
  iconClassName?: string;
  textClassName?: string;
}

const sizeConfig = {
  sm: {
    icon: 'w-5 h-5',
    text: 'text-lg',
    container: 'p-1.5 rounded-lg',
  },
  md: {
    icon: 'w-7 h-7',
    text: 'text-xl',
    container: 'p-1.5 rounded-lg',
  },
  lg: {
    icon: 'w-9 h-9',
    text: 'text-2xl',
    container: 'p-2 rounded-lg',
  },
};

export const Logo: FC<LogoProps> = ({
  size = 'md',
  showText = true,
  className,
  iconClassName,
  textClassName,
}) => {
  const config = sizeConfig[size] || sizeConfig.md;

  return (
    <div className={cn('flex items-center gap-2 select-none', className)}>
      <div
        className={cn(
          'flex items-center justify-center bg-gradient-to-br from-purple-600 to-indigo-600 text-white shadow-sm shrink-0',
          config.container,
          iconClassName
        )}
      >
        <Zap className={cn(config.icon, 'fill-current text-white')} />
      </div>
      {showText && (
        <span className={cn('font-bold text-primary tracking-tight', config.text, textClassName)}>
          SkillBridge
        </span>
      )}
    </div>
  );
};

export default Logo;
