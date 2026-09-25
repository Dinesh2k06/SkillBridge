import { Input } from '@/components/ui/input';
import { Globe, User } from 'lucide-react';

interface CompleteStepProps {
  fullName: string;
  bio: string;
  githubUrl: string;
  linkedinUrl: string;
  portfolioUrl: string;
  onChange: (updates: {
    fullName?: string;
    bio?: string;
    githubUrl?: string;
    linkedinUrl?: string;
    portfolioUrl?: string;
  }) => void;
}

export default function CompleteStep({
  fullName,
  bio,
  githubUrl,
  linkedinUrl,
  portfolioUrl,
  onChange,
}: CompleteStepProps) {
  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="space-y-2 text-center sm:text-left">
        <h2 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
          Complete your profile
        </h2>
        <p className="text-gray-500 dark:text-gray-400">
          Almost there! Add a few more details to help people know you better.
          You can always update these later.
        </p>
      </div>

      <div className="space-y-6 max-w-xl mx-auto sm:mx-0">
        <div className="space-y-2">
          <label className="text-sm font-medium text-gray-900 dark:text-gray-200">
            Full Name <span className="text-red-500">*</span>
          </label>
          <Input
            value={fullName}
            onChange={(e) => onChange({ fullName: e.target.value })}
            placeholder="Jane Doe"
            className="h-11"
            required
          />
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium text-gray-900 dark:text-gray-200">
            Bio <span className="text-gray-400 text-xs font-normal">(Optional)</span>
          </label>
          <textarea
            value={bio}
            onChange={(e) => onChange({ bio: e.target.value })}
            placeholder="Tell us a little bit about yourself, your goals, and what you're working on..."
            className="flex min-h-[100px] w-full rounded-md border border-slate-200 bg-white px-3 py-2 text-sm ring-offset-white placeholder:text-slate-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-950 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 dark:border-slate-800 dark:bg-slate-950 dark:ring-offset-slate-950 dark:placeholder:text-slate-400 dark:focus-visible:ring-slate-300 resize-none"
          />
        </div>

        <div className="space-y-4 pt-4 border-t border-gray-100 dark:border-gray-800">
          <h3 className="text-sm font-semibold text-gray-900 dark:text-white">Social Links (Optional)</h3>
          
          <div className="space-y-3">
            <div className="relative">
              <Globe className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <Input
                value={githubUrl}
                onChange={(e) => onChange({ githubUrl: e.target.value })}
                placeholder="GitHub URL"
                className="pl-10 h-11"
              />
            </div>
            
            <div className="relative">
              <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <Input
                value={linkedinUrl}
                onChange={(e) => onChange({ linkedinUrl: e.target.value })}
                placeholder="LinkedIn URL"
                className="pl-10 h-11"
              />
            </div>
            
            <div className="relative">
              <Globe className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <Input
                value={portfolioUrl}
                onChange={(e) => onChange({ portfolioUrl: e.target.value })}
                placeholder="Portfolio or Website URL"
                className="pl-10 h-11"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
