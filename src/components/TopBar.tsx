import { useState } from 'react';
import type { FC } from 'react';
import { Link } from 'react-router-dom';
import { Search, Bell, Menu, User, Settings, LogOut } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { cn } from '@/lib/utils';

export interface TopBarProps {
  onMenuClick?: () => void;
  userName?: string;
  userAvatar?: string | null;
  onLogout?: () => void;
  hasUnreadNotifications?: boolean;
  className?: string;
}

export const TopBar: FC<TopBarProps> = ({
  onMenuClick,
  userName = '',
  userAvatar = null,
  onLogout,
  hasUnreadNotifications = true,
  className,
}) => {
  const [searchQuery, setSearchQuery] = useState('');

  return (
    <header
      className={cn(
        'sticky top-0 z-20 flex h-16 w-full items-center justify-between border-b border-border bg-white px-6',
        className
      )}
    >
      {/* Left: Mobile Menu Button & Search */}
      <div className="flex items-center gap-4 flex-1 max-w-xl">
        <Button
          variant="ghost"
          size="icon"
          onClick={onMenuClick}
          className="md:hidden shrink-0"
          aria-label="Open sidebar"
        >
          <Menu className="h-5 w-5" />
        </Button>

        {/* Center/Left: Search input with Search icon */}
        <div className="relative w-full max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground pointer-events-none" />
          <Input
            type="search"
            placeholder="Search skills, mentors, projects..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-4 h-9 bg-muted/40 focus-visible:bg-background"
          />
        </div>
      </div>

      {/* Right: Notifications & User dropdown */}
      <div className="flex items-center gap-3 shrink-0">
        {/* Notification bell icon button with optional badge dot */}
        <Link to="/notifications" aria-label="Notifications">
          <Button
            variant="ghost"
            size="icon"
            className="relative text-muted-foreground hover:text-foreground"
            aria-label="View notifications"
          >
            <Bell className="h-5 w-5" />
            {hasUnreadNotifications && (
              <span className="absolute top-2 right-2 h-2 w-2 rounded-full bg-primary" />
            )}
          </Button>
        </Link>

        {/* User dropdown menu */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="ghost"
              className="relative h-9 w-9 rounded-full p-0 ring-offset-background transition-opacity hover:opacity-80"
              aria-label="Open user menu"
            >
              <Avatar className="h-9 w-9">
                {userAvatar && <AvatarImage src={userAvatar} alt={userName || 'User'} />}
                <AvatarFallback className="bg-primary/10 text-primary text-xs font-semibold">
                  {userName ? userName.slice(0, 2).toUpperCase() : 'U'}
                </AvatarFallback>
              </Avatar>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-56" align="end" forceMount>
            {userName && (
              <>
                <DropdownMenuLabel className="font-normal">
                  <div className="flex flex-col space-y-1">
                    <p className="text-sm font-medium leading-none text-foreground">{userName}</p>
                  </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
              </>
            )}
            <DropdownMenuItem asChild>
              <Link to="/profile" className="flex w-full cursor-pointer items-center gap-2">
                <User className="h-4 w-4" />
                <span>My Profile</span>
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem asChild>
              <Link to="/settings" className="flex w-full cursor-pointer items-center gap-2">
                <Settings className="h-4 w-4" />
                <span>Settings</span>
              </Link>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem
              onClick={onLogout}
              className="flex cursor-pointer items-center gap-2 text-destructive focus:bg-destructive/10 focus:text-destructive"
            >
              <LogOut className="h-4 w-4" />
              <span>Log out</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
};

export default TopBar;
