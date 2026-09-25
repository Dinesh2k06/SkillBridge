import { GraduationCap, Building2, Landmark } from 'lucide-react';
import { cn } from '@/lib/utils';

interface OrgTypeStepProps {
  value: string;
  onChange: (type: string) => void;
}

export default function OrgTypeStep({ value, onChange }: OrgTypeStepProps) {
  const options = [
    {
      id: 'college',
      title: 'College / University',
      description: 'Join your campus network to connect with fellow students and alumni.',
      icon: GraduationCap,
    },
    {
      id: 'organization',
      title: 'Organization',
      description: 'Connect with colleagues in your company or professional group.',
      icon: Building2,
    },
    {
      id: 'other',
      title: 'Other Institution',
      description: 'Bootcamps, online communities, or other learning groups.',
      icon: Landmark,
    },
  ];

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="space-y-2 text-center sm:text-left">
        <h2 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
          What type of organization do you belong to?
        </h2>
        <p className="text-gray-500 dark:text-gray-400">
          This helps us tailor your network and find the right peers for you.
        </p>
      </div>

      <div className="grid gap-4 sm:grid-cols-1 md:grid-cols-3">
        {options.map((option) => (
          <div
            key={option.id}
            onClick={() => onChange(option.id)}
            className={cn(
              "relative flex flex-col gap-4 p-6 rounded-xl border-2 cursor-pointer transition-all hover:shadow-md",
              value === option.id
                ? "border-primary bg-primary/5 dark:bg-primary/10 ring-1 ring-primary ring-offset-2 dark:ring-offset-gray-900"
                : "border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 hover:border-primary/50"
            )}
          >
            <div className={cn(
              "p-3 rounded-full w-fit",
              value === option.id
                ? "bg-primary text-white"
                : "bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300"
            )}>
              <option.icon className="w-6 h-6" />
            </div>
            
            <div className="space-y-2">
              <h3 className={cn(
                "font-semibold text-lg",
                value === option.id ? "text-primary dark:text-primary" : "text-gray-900 dark:text-white"
              )}>
                {option.title}
              </h3>
              <p className="text-sm text-gray-500 dark:text-gray-400 leading-relaxed">
                {option.description}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
