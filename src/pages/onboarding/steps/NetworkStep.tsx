import { Users, Building2, Globe } from 'lucide-react';
import { cn } from '@/lib/utils';

interface NetworkStepProps {
  value: string;
  onChange: (pref: string) => void;
}

export default function NetworkStep({ value, onChange }: NetworkStepProps) {
  const options = [
    {
      id: 'My Organization',
      title: 'My Organization Only',
      description: 'Connect exclusively with verified students from your own institution.',
      icon: Users,
      recommended: true,
    },
    {
      id: 'Selected Organizations',
      title: 'Partner Organizations',
      description: 'Connect with your institution and other approved partner schools.',
      icon: Building2,
      recommended: false,
    },
    {
      id: 'Open Network',
      title: 'Open Network',
      description: 'Connect with anyone from any verified organization on SkillBridge.',
      icon: Globe,
      recommended: false,
    },
  ];

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="space-y-2 text-center sm:text-left">
        <h2 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
          Choose your network
        </h2>
        <p className="text-gray-500 dark:text-gray-400">
          How would you like to connect with other students? You can change this later.
        </p>
      </div>

      <div className="grid gap-4 max-w-2xl">
        {options.map((option) => (
          <div
            key={option.id}
            onClick={() => onChange(option.id)}
            className={cn(
              "relative flex items-center gap-4 p-5 rounded-xl border-2 cursor-pointer transition-all",
              value === option.id
                ? "border-primary bg-primary/5 dark:bg-primary/10"
                : "border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 hover:border-primary/50"
            )}
          >
            <div className={cn(
              "p-3 rounded-full flex-shrink-0",
              value === option.id
                ? "bg-primary text-white"
                : "bg-gray-100 dark:bg-gray-700 text-gray-500 dark:text-gray-400"
            )}>
              <option.icon className="w-6 h-6" />
            </div>
            
            <div className="flex-1">
              <div className="flex items-center gap-3">
                <h3 className={cn(
                  "font-semibold text-lg",
                  value === option.id ? "text-primary dark:text-primary" : "text-gray-900 dark:text-white"
                )}>
                  {option.title}
                </h3>
                {option.recommended && (
                  <span className="px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400">
                    Recommended
                  </span>
                )}
              </div>
              <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                {option.description}
              </p>
            </div>

            <div className={cn(
              "w-5 h-5 rounded-full border-2 flex items-center justify-center flex-shrink-0",
              value === option.id
                ? "border-primary bg-primary"
                : "border-gray-300 dark:border-gray-600"
            )}>
              {value === option.id && <div className="w-2 h-2 rounded-full bg-white" />}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
