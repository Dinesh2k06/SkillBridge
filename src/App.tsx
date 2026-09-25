import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AuthProvider } from '@/contexts/AuthContext';
import { ToastProvider } from '@/contexts/ToastContext';
import { ErrorBoundary } from '@/components/ErrorBoundary';
import { ProtectedRoute } from '@/components/ProtectedRoute';

// Layouts
import PublicLayout from '@/layouts/PublicLayout';
import AppLayout from '@/layouts/AppLayout';
import OnboardingLayout from '@/layouts/OnboardingLayout';

// Public pages
import LandingPage from '@/pages/public/LandingPage';
import AboutPage from '@/pages/public/AboutPage';

// Auth pages
import LoginPage from '@/pages/auth/LoginPage';
import SignupPage from '@/pages/auth/SignupPage';

// Onboarding
import OnboardingPage from '@/pages/onboarding/OnboardingPage';

// Dashboard
import DashboardPage from '@/pages/dashboard/DashboardPage';

// Student pages
import ProfilePage from '@/pages/profile/ProfilePage';
import SkillsPage from '@/pages/skills/SkillsPage';
import ExchangePage from '@/pages/exchange/ExchangePage';
import MentorsPage from '@/pages/mentors/MentorsPage';
import ProjectsPage from '@/pages/projects/ProjectsPage';
import LearningPage from '@/pages/learning/LearningPage';
import LeaderboardPage from '@/pages/leaderboard/LeaderboardPage';
import NotificationsPage from '@/pages/notifications/NotificationsPage';
import SettingsPage from '@/pages/settings/SettingsPage';

// Organization pages
import OrgDashboardPage from '@/pages/organization/OrgDashboardPage';
import OrgStudentsPage from '@/pages/organization/OrgStudentsPage';
import OrgMentorsPage from '@/pages/organization/OrgMentorsPage';
import OrgSkillsPage from '@/pages/organization/OrgSkillsPage';
import OrgProjectsPage from '@/pages/organization/OrgProjectsPage';
import OrgAnalyticsPage from '@/pages/organization/OrgAnalyticsPage';
import OrgSettingsPage from '@/pages/organization/OrgSettingsPage';

// Admin
import AdminPage from '@/pages/admin/AdminPage';

export default function App() {
  return (
    <ErrorBoundary>
      <BrowserRouter>
        <AuthProvider>
          <ToastProvider>
            <Routes>
            {/* ── Public Routes ── */}
            <Route element={<PublicLayout />}>
              <Route path="/" element={<LandingPage />} />
              <Route path="/about" element={<AboutPage />} />
            </Route>

            {/* ── Auth Routes ── */}
            <Route path="/login" element={<LoginPage />} />
            <Route path="/signup" element={<SignupPage />} />

            {/* ── Onboarding Routes ── */}
            <Route element={<OnboardingLayout />}>
              <Route
                path="/onboarding"
                element={
                  <ProtectedRoute requireOnboarding={false}>
                    <OnboardingPage />
                  </ProtectedRoute>
                }
              />
            </Route>

            {/* ── Protected Student Routes ── */}
            <Route
              element={
                <ProtectedRoute>
                  <AppLayout />
                </ProtectedRoute>
              }
            >
              <Route path="/dashboard" element={<DashboardPage />} />
              <Route path="/profile" element={<ProfilePage />} />
              <Route path="/skills" element={<SkillsPage />} />
              <Route path="/exchange" element={<ExchangePage />} />
              <Route path="/mentors" element={<MentorsPage />} />
              <Route path="/projects" element={<ProjectsPage />} />
              <Route path="/learning" element={<LearningPage />} />
              <Route path="/leaderboard" element={<LeaderboardPage />} />
              <Route path="/notifications" element={<NotificationsPage />} />
              <Route path="/settings" element={<SettingsPage />} />

              {/* ── Organization Routes ── */}
              <Route path="/organization" element={<OrgDashboardPage />} />
              <Route path="/organization/students" element={<OrgStudentsPage />} />
              <Route path="/organization/mentors" element={<OrgMentorsPage />} />
              <Route path="/organization/skills" element={<OrgSkillsPage />} />
              <Route path="/organization/projects" element={<OrgProjectsPage />} />
              <Route path="/organization/analytics" element={<OrgAnalyticsPage />} />
              <Route path="/organization/settings" element={<OrgSettingsPage />} />

              {/* ── Admin Route ── */}
              <Route path="/admin" element={<AdminPage />} />
            </Route>
          </Routes>
          </ToastProvider>
        </AuthProvider>
      </BrowserRouter>
    </ErrorBoundary>
  );
}
