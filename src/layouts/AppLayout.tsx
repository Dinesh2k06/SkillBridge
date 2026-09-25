import { useState } from 'react';
import type { FC } from 'react';
import { Outlet } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { Sidebar } from '@/components/Sidebar';
import { TopBar } from '@/components/TopBar';

export const AppLayout: FC = () => {
  const { user, profile, signOut } = useAuth();
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);

  // Check if user is org admin (for now just pass false, the functionality will be expanded later)
  const isOrgAdmin = false;

  const userName = profile?.full_name || 'Dinesh';
  const userEmail = user?.email || 'dinesh@sns.edu.in';
  const userAvatar = profile?.avatar_url || null;

  const handleLogout = () => {
    void signOut();
  };

  return (
    <div className="flex min-h-screen bg-background">
      {/* Sidebar (hidden on mobile, w-64 on lg+) */}
      <Sidebar
        isOrgAdmin={isOrgAdmin}
        userName={userName}
        userEmail={userEmail}
        userAvatar={userAvatar}
        onLogout={handleLogout}
        isMobileOpen={mobileSidebarOpen}
        onMobileClose={() => setMobileSidebarOpen(false)}
        className="hidden lg:flex lg:w-64 lg:static lg:h-screen lg:sticky lg:top-0"
      />

      {/* Main area: flex-1 flex flex-col */}
      <div className="flex-1 flex flex-col min-w-0">
        <TopBar
          userName={userName}
          userAvatar={userAvatar}
          onLogout={handleLogout}
          onMenuClick={() => setMobileSidebarOpen((prev) => !prev)}
        />
        <main className="flex-1 overflow-auto p-6 bg-muted/30">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default AppLayout;
