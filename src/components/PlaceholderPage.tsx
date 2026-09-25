import type { FC } from 'react';
import { type LucideIcon } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';

export interface PlaceholderPageProps {
  title: string;
  description: string;
  icon: LucideIcon;
  className?: string;
}

export const PlaceholderPage: FC<PlaceholderPageProps> = ({
  title,
  description,
  icon: Icon,
  className,
}) => {
  return (
    <div className={cn('min-h-[60vh] flex items-center justify-center p-6', className)}>
      <Card className="max-w-md w-full text-center border-dashed">
        <CardContent className="pt-8 pb-8 px-6 flex flex-col items-center text-center">
          <Badge variant="secondary" className="mb-6">
            Coming Soon
          </Badge>

          <div className="w-20 h-20 rounded-full bg-muted flex items-center justify-center mb-6 text-muted-foreground">
            <Icon className="w-10 h-10" />
          </div>

          <h2 className="text-2xl font-bold tracking-tight mb-2">
            {title}
          </h2>

          <p className="text-muted-foreground text-sm max-w-sm">
            {description}
          </p>
        </CardContent>
      </Card>
    </div>
  );
};

export default PlaceholderPage;
