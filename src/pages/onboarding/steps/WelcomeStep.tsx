import { Sparkles, BookOpen, PenTool, Wrench, Users, ShieldCheck, GraduationCap, ArrowRight } from 'lucide-react';

export default function WelcomeStep() {
  return (
    <div className="flex flex-col items-center text-center space-y-8 py-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <div className="p-4 bg-primary/10 rounded-full">
        <Sparkles className="w-16 h-16 text-primary" />
      </div>
      
      <div className="space-y-4 max-w-lg">
        <h1 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-white">
          Welcome to SkillBridge!
        </h1>
        <p className="text-lg text-gray-600 dark:text-gray-300">
          We're excited to have you join our community of learners, mentors, and builders. Connect with peers, share knowledge, and level up your skills together.
        </p>
      </div>

      <div className="w-full bg-gray-50 dark:bg-gray-900/50 p-6 rounded-2xl border border-gray-100 dark:border-gray-800">
        <h3 className="font-semibold text-gray-900 dark:text-white mb-6 uppercase tracking-wider text-sm">
          The Learning Philosophy
        </h3>
        
        <div className="flex flex-wrap justify-center gap-3">
          {[
            { icon: BookOpen, text: 'Learn' },
            { icon: ArrowRight, text: '', noBg: true },
            { icon: PenTool, text: 'Practice' },
            { icon: ArrowRight, text: '', noBg: true },
            { icon: Wrench, text: 'Build' },
            { icon: ArrowRight, text: '', noBg: true },
            { icon: Users, text: 'Get Help' },
            { icon: ArrowRight, text: '', noBg: true },
            { icon: ShieldCheck, text: 'Verify' },
            { icon: ArrowRight, text: '', noBg: true },
            { icon: GraduationCap, text: 'Teach' },
          ].map((item, i) => (
            <div key={i} className="flex items-center">
              {item.noBg ? (
                <item.icon className="w-4 h-4 text-gray-400 mx-1" />
              ) : (
                <div className="flex items-center gap-2 bg-white dark:bg-gray-800 px-3 py-1.5 rounded-full border border-gray-200 dark:border-gray-700 shadow-sm text-sm font-medium text-gray-700 dark:text-gray-200">
                  <item.icon className="w-4 h-4 text-primary" />
                  {item.text}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      <p className="text-xl font-medium text-primary mt-8">
        Let's set up your profile!
      </p>
    </div>
  );
}
