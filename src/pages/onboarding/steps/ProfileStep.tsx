import { Input } from '@/components/ui/input';

interface ProfileStepProps {
  department: string;
  yearOfStudy: string;
  section: string;
  onChange: (updates: { department?: string; yearOfStudy?: string; section?: string }) => void;
}

export default function ProfileStep({ department, yearOfStudy, section, onChange }: ProfileStepProps) {
  const yearOptions = [
    '1st Year',
    '2nd Year',
    '3rd Year',
    '4th Year',
    '5th Year',
    'Graduate',
    'Post-Graduate',
    'Other'
  ];

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="space-y-2 text-center sm:text-left">
        <h2 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
          Tell us about yourself
        </h2>
        <p className="text-gray-500 dark:text-gray-400">
          Add your academic details to help others find you.
        </p>
      </div>

      <div className="space-y-6 max-w-lg mx-auto sm:mx-0">
        <div className="space-y-2">
          <label className="text-sm font-medium text-gray-900 dark:text-gray-200">
            Department / Major <span className="text-red-500">*</span>
          </label>
          <Input
            value={department}
            onChange={(e) => onChange({ department: e.target.value })}
            placeholder="e.g. Computer Science, Business Administration"
            className="h-11"
            required
          />
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium text-gray-900 dark:text-gray-200">
            Year of Study <span className="text-red-500">*</span>
          </label>
          <select
            value={yearOfStudy}
            onChange={(e) => onChange({ yearOfStudy: e.target.value })}
            className="flex h-11 w-full rounded-md border border-slate-200 bg-white px-3 py-2 text-sm ring-offset-white file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-slate-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-950 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 dark:border-slate-800 dark:bg-slate-950 dark:ring-offset-slate-950 dark:placeholder:text-slate-400 dark:focus-visible:ring-slate-300"
            required
          >
            <option value="" disabled>Select your year</option>
            {yearOptions.map(year => (
              <option key={year} value={year}>{year}</option>
            ))}
          </select>
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium text-gray-900 dark:text-gray-200">
            Section / Class Group <span className="text-gray-400 text-xs font-normal">(Optional)</span>
          </label>
          <Input
            value={section}
            onChange={(e) => onChange({ section: e.target.value })}
            placeholder="e.g. A, B, CS-1"
            className="h-11"
          />
        </div>
      </div>
    </div>
  );
}
