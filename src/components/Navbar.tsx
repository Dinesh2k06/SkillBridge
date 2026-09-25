import { useState } from 'react';
import type { FC } from 'react';
import { Link } from 'react-router-dom';
import { Menu } from 'lucide-react';
import Logo from '@/components/Logo';
import { Button } from '@/components/ui/button';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';
import { cn } from '@/lib/utils';

export interface NavbarProps {
  className?: string;
}

export const Navbar: FC<NavbarProps> = ({ className }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header
      className={cn(
        'fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-md border-b border-border/40',
        className
      )}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        {/* Logo on left */}
        <div className="flex items-center">
          <Link to="/" className="flex items-center">
            <Logo />
          </Link>
        </div>

        {/* Navigation links in center */}
        <nav className="hidden md:flex items-center gap-8">
          <Link
            to="/about"
            className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
          >
            About
          </Link>
        </nav>

        {/* Auth buttons on right */}
        <div className="hidden md:flex items-center gap-3">
          <Button variant="outline" asChild>
            <Link to="/login">Log in</Link>
          </Button>
          <Button asChild>
            <Link to="/signup">Sign up</Link>
          </Button>
        </div>

        {/* Mobile hamburger menu */}
        <div className="md:hidden">
          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" aria-label="Open menu">
                <Menu className="h-5 w-5" />
              </Button>
            </SheetTrigger>
            <SheetContent
              side="right"
              className="flex flex-col justify-between w-[300px] sm:w-[350px]"
            >
              <div className="flex flex-col space-y-6 pt-2">
                <SheetHeader className="text-left">
                  <SheetTitle className="sr-only">SkillBridge Navigation</SheetTitle>
                  <Link to="/" onClick={() => setIsOpen(false)} className="inline-block">
                    <Logo />
                  </Link>
                </SheetHeader>
                <nav className="flex flex-col space-y-3">
                  <Link
                    to="/about"
                    onClick={() => setIsOpen(false)}
                    className="text-base font-medium text-muted-foreground transition-colors hover:text-foreground px-2 py-1.5 rounded-md hover:bg-accent"
                  >
                    About
                  </Link>
                </nav>
              </div>
              <div className="flex flex-col gap-3 pb-4">
                <Button variant="outline" className="w-full justify-center" asChild>
                  <Link to="/login" onClick={() => setIsOpen(false)}>
                    Log in
                  </Link>
                </Button>
                <Button className="w-full justify-center" asChild>
                  <Link to="/signup" onClick={() => setIsOpen(false)}>
                    Sign up
                  </Link>
                </Button>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
