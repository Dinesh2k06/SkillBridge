import type { FC } from 'react';
import { Outlet, Link, useNavigate } from 'react-router-dom';
import { LogOut } from 'lucide-react';
import { Logo } from '@/components/Logo';
import { useAuth } from '@/contexts/AuthContext';

export const OnboardingLayout: FC = () => {
  const { signOut } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await signOut();
      navigate('/login');
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  return (
    <div className="relative min-h-screen flex flex-col items-center bg-gradient-to-b from-background to-muted/50 p-4 sm:p-6 md:p-8">
      {/* Subtle Log out link in top right corner */}
      <div className="absolute top-4 right-4 sm:top-6 sm:right-6">
        <button
          type="button"
          onClick={handleLogout}
          className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-medium text-muted-foreground hover:text-foreground transition-colors px-3 py-1.5 rounded-md hover:bg-accent"
        >
          <LogOut className="h-4 w-4" />
          <span>Log out</span>
        </button>
      </div>

      {/* Centered layout container */}
      <div className="w-full max-w-2xl flex flex-col items-center my-auto py-8">
        {/* Logo at top center */}
        <div className="mb-8">
          <Link to="/" aria-label="SkillBridge">
            <Logo size="lg" />
          </Link>
        </div>

        {/* max-w-2xl container for content */}
        <div className="w-full">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default OnboardingLayout;
