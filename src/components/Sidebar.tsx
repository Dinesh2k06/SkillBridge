import type { FC, ComponentType } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import {
  LayoutDashboard,
  ArrowLeftRight,
  Users,
  FolderKanban,
  BookOpen,
  Trophy,
  UserCircle,
  Bell,
  Settings,
  Building2,
  GraduationCap,
  Wrench,
  BarChart3,
  LogOut,
  Menu,
} from 'lucide-react';
import type { LucideProps } from 'lucide-react';
import Logo from '@/components/Logo';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';
import { cn } from '@/lib/utils';

interface NavItem {
  title: string;
  href: string;
  icon: ComponentType<LucideProps>;
}

const studentNavItems: NavItem[] = [
  { title: 'Dashboard', href: '/dashboard', icon: LayoutDashboard },
  { title: 'Skill Exchange', href: '/exchange', icon: ArrowLeftRight },
  { title: 'Mentors', href: '/mentors', icon: Users },
  { title: 'Projects', href: '/projects', icon: FolderKanban },
  { title: 'Learning', href: '/learning', icon: BookOpen },
  { title: 'Leaderboard', href: '/leaderboard', icon: Trophy },
  { title: 'Profile', href: '/profile', icon: UserCircle },
  { title: 'Notifications', href: '/notifications', icon: Bell },
  { title: 'Settings', href: '/settings', icon: Settings },
];

const orgNavItems: NavItem[] = [
  { title: 'Overview', href: '/organization', icon: Building2 },
  { title: 'Students', href: '/organization/students', icon: Users },
  { title: 'Mentors', href: '/organization/mentors', icon: GraduationCap },
  { title: 'Skills Matrix', href: '/organization/skills', icon: Wrench },
  { title: 'Projects', href: '/organization/projects', icon: FolderKanban },
  { title: 'Analytics', href: '/organization/analytics', icon: BarChart3 },
  { title: 'Org Settings', href: '/organization/settings', icon: Settings },
];

export interface SidebarProps {
  isOrgAdmin?: boolean;
  userName?: string;
  userEmail?: string;
  userAvatar?: string | null;
  onLogout?: () => void;
  isMobileOpen?: boolean;
  onMobileClose?: () => void;
  className?: string;
}

export const Sidebar: FC<SidebarProps> = ({
  isOrgAdmin: _isOrgAdmin = false,
  userName,
  userEmail,
  userAvatar,
  onLogout,
  isMobileOpen = false,
  onMobileClose,
  className,
}) => {
  const location = useLocation();

  const isItemActive = (href: string) => {
    if (location.pathname === href) {
      return true;
    }
    if (
      href !== '/dashboard' &&
      href !== '/organization' &&
      location.pathname.startsWith(`${href}/`)
    ) {
      return true;
    }
    return false;
  };

  const renderContent = (onItemClick?: () => void) => (
    <div className="flex h-full flex-col bg-background">
      {/* Logo at top */}
      <div className="flex h-16 items-center px-6 border-b border-border shrink-0">
        <Link to="/dashboard" className="flex items-center" onClick={onItemClick}>
          <Logo />
        </Link>
      </div>

      {/* Navigation items list */}
      <div className="flex-1 overflow-y-auto px-4 py-4 space-y-1">
        <nav className="space-y-1">
          {studentNavItems.map((item) => {
            const Icon = item.icon;
            const isActive = isItemActive(item.href);
            return (
              <NavLink
                key={item.href}
                to={item.href}
                onClick={onItemClick}
                className={cn(
                  'flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground',
                  isActive
                    ? 'bg-accent text-accent-foreground font-semibold'
                    : 'text-muted-foreground'
                )}
              >
                <Icon className="h-4 w-4 shrink-0" />
                <span>{item.title}</span>
              </NavLink>
            );
          })}
        </nav>

        {/* Org Navigation */}
        <div className="pt-2">
          <div className="my-3 px-1">
            <Separator />
          </div>
          <div className="px-3 pb-2 text-xs font-bold uppercase tracking-wider text-muted-foreground">
            Organization Intelligence
          </div>
          <nav className="space-y-1">
            {orgNavItems.map((item) => {
              const Icon = item.icon;
              const isActive = isItemActive(item.href);
              return (
                <NavLink
                  key={item.href}
                  to={item.href}
                  onClick={onItemClick}
                  className={cn(
                    'flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground',
                    isActive
                      ? 'bg-accent text-accent-foreground font-semibold'
                      : 'text-muted-foreground'
                  )}
                >
                  <Icon className="h-4 w-4 shrink-0" />
                  <span>{item.title}</span>
                </NavLink>
              );
            })}
          </nav>
        </div>
      </div>

      {/* User Info at bottom */}
      {(userName || userEmail || onLogout) && (
        <div className="mt-auto border-t border-border p-4 shrink-0">
          <div className="flex items-center justify-between gap-3">
            <div className="flex items-center gap-3 min-w-0">
              <Avatar className="h-9 w-9 shrink-0">
                {userAvatar && <AvatarImage src={userAvatar} alt={userName || 'User'} />}
                <AvatarFallback className="bg-primary/10 text-primary text-xs font-semibold">
                  {userName ? userName.slice(0, 2).toUpperCase() : 'U'}
                </AvatarFallback>
              </Avatar>
              <div className="min-w-0 flex-1">
                {userName && (
                  <p className="truncate text-sm font-medium text-foreground leading-tight">
                    {userName}
                  </p>
                )}
                {userEmail && (
                  <p className="truncate text-xs text-muted-foreground leading-tight">
                    {userEmail}
                  </p>
                )}
              </div>
            </div>
            {onLogout && (
              <Button
                variant="ghost"
                size="icon"
                onClick={onLogout}
                className="h-8 w-8 text-muted-foreground hover:text-destructive shrink-0"
                title="Log out"
                aria-label="Log out"
              >
                <LogOut className="h-4 w-4" />
              </Button>
            )}
          </div>
        </div>
      )}
    </div>
  );

  return (
    <>
      {/* Desktop Sidebar */}
      <aside
        className={cn(
          'hidden md:flex md:w-64 md:flex-col md:fixed md:inset-y-0 z-30 border-r border-border bg-background',
          className
        )}
      >
        {renderContent()}
      </aside>

      {/* Mobile Sidebar Sheet */}
      <Sheet
        open={isMobileOpen}
        onOpenChange={(open) => {
          if (!open && onMobileClose) {
            onMobileClose();
          }
        }}
      >
        {isMobileOpen === undefined && (
          <SheetTrigger asChild>
            <Button
              variant="ghost"
              size="icon"
              className="md:hidden"
              aria-label="Open menu"
            >
              <Menu className="h-5 w-5" />
            </Button>
          </SheetTrigger>
        )}
        <SheetContent side="left" className="w-64 p-0">
          <SheetHeader className="sr-only">
            <SheetTitle>Navigation Menu</SheetTitle>
          </SheetHeader>
          {renderContent(onMobileClose)}
        </SheetContent>
      </Sheet>
    </>
  );
};

export interface SidebarTriggerProps {
  onClick?: () => void;
  className?: string;
}

export const SidebarTrigger: FC<SidebarTriggerProps> = ({ onClick, className }) => (
  <Button
    variant="ghost"
    size="icon"
    onClick={onClick}
    className={cn('md:hidden', className)}
    aria-label="Open sidebar"
  >
    <Menu className="h-5 w-5" />
  </Button>
);

export default Sidebar;

