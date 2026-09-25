import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
  Trophy,
  BookOpen,
  Users,
  GraduationCap,
  Sparkles,
  ArrowLeftRight,
  FolderKanban,
  CheckCircle2,
  ChevronRight,
  Flame,
  Zap,
  Star,
} from 'lucide-react';
import {
  CURRENT_USER,
  MOCK_STUDENT_GROWTH,
  ARUN_RECIPROCAL_MATCH,
} from '@/data/mockData';
import { useToast } from '@/contexts/ToastContext';

export default function DashboardPage() {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [exchangeSent, setExchangeSent] = useState(false);

  const handleQuickExchangeRequest = () => {
    setExchangeSent(true);
    toast({
      title: 'Exchange Request Sent!',
      description: 'Exchange request sent to Arun Kumar for Python ↔ UI/UX.',
      type: 'success',
    });
  };

  return (
    <div className="space-y-8 pb-10">
      {/* ── Hero Greeting Banner ── */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-primary via-indigo-600 to-purple-600 p-8 text-primary-foreground shadow-xl">
        <div className="absolute right-0 top-0 -mr-16 -mt-16 h-64 w-64 rounded-full bg-white/10 blur-2xl pointer-events-none" />
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/20 text-xs font-semibold backdrop-blur-md">
              <Sparkles className="h-3.5 w-3.5 text-amber-300" />
              <span>SkillBridge Prototype</span>
            </div>
            <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight">
              Good morning, {CURRENT_USER.name} 👋
            </h1>
            <p className="text-primary-foreground/90 max-w-xl text-sm md:text-base font-medium">
              Learn from your peers. Share what you know. Build something together.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <Button
              size="lg"
              className="bg-white text-primary hover:bg-white/90 font-extrabold shadow-lg"
              onClick={() => navigate('/exchange')}
            >
              <ArrowLeftRight className="mr-2 h-4 w-4" />
              Knowledge Exchange
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="border-white/30 text-white hover:bg-white/10 font-bold backdrop-blur-sm"
              onClick={() => navigate('/projects')}
            >
              <FolderKanban className="mr-2 h-4 w-4" />
              Project Help Hub
            </Button>
          </div>
        </div>
      </div>

      {/* ── Stats Cards Grid ── */}
      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
        <Card className="border-border/60 shadow-sm hover:shadow-md transition-shadow">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-semibold text-muted-foreground">Skill XP</CardTitle>
            <div className="h-10 w-10 rounded-xl bg-amber-500/10 flex items-center justify-center">
              <Trophy className="h-5 w-5 text-amber-500" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-extrabold text-foreground">{CURRENT_USER.xp} XP</div>
            <div className="flex items-center gap-1 mt-1.5 text-xs text-amber-600 font-semibold">
              <Flame className="h-3.5 w-3.5" />
              <span>Rank #3 Campus Leader</span>
            </div>
          </CardContent>
        </Card>

        <Card className="border-border/60 shadow-sm hover:shadow-md transition-shadow">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-semibold text-muted-foreground">Sessions</CardTitle>
            <div className="h-10 w-10 rounded-xl bg-blue-500/10 flex items-center justify-center">
              <CheckCircle2 className="h-5 w-5 text-blue-500" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-extrabold text-foreground">{CURRENT_USER.sessionsCompleted}</div>
            <p className="text-xs text-muted-foreground mt-1.5">Completed Exchanges</p>
          </CardContent>
        </Card>

        <Card className="border-border/60 shadow-sm hover:shadow-md transition-shadow">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-semibold text-muted-foreground">Students Helped</CardTitle>
            <div className="h-10 w-10 rounded-xl bg-purple-500/10 flex items-center justify-center">
              <Users className="h-5 w-5 text-purple-500" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-extrabold text-foreground">{CURRENT_USER.studentsHelped}</div>
            <p className="text-xs text-muted-foreground mt-1.5">Mentored Peers</p>
          </CardContent>
        </Card>

        <Card className="border-border/60 shadow-sm hover:shadow-md transition-shadow">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-semibold text-muted-foreground">Rating</CardTitle>
            <div className="h-10 w-10 rounded-xl bg-emerald-500/10 flex items-center justify-center">
              <Star className="h-5 w-5 text-emerald-500 fill-emerald-500" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-extrabold text-foreground">{CURRENT_USER.rating} ★</div>
            <p className="text-xs text-muted-foreground mt-1.5">Average Feedback</p>
          </CardContent>
        </Card>
      </div>

      {/* ── Dashboard Layout ── */}
      <div className="grid gap-8 lg:grid-cols-3">
        {/* Left 2 columns */}
        <div className="lg:col-span-2 space-y-8">
          {/* Section: Recommended For You */}
          <Card className="border-border/60 shadow-sm">
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="text-lg flex items-center gap-2">
                    <Sparkles className="h-5 w-5 text-amber-500" />
                    Recommended For You
                  </CardTitle>
                  <CardDescription>Personalized skill exchange & mentor opportunities</CardDescription>
                </div>
                <Link to="/exchange" className="text-xs text-primary font-bold hover:underline">
                  View All Matches
                </Link>
              </div>
            </CardHeader>
            <CardContent className="space-y-3">
              {/* Card 1: UI/UX Skill Exchange 96% Match */}
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 p-4 rounded-xl border border-emerald-500/30 bg-emerald-500/5">
                <div className="flex items-center gap-3">
                  <Avatar className="h-11 w-11 border-2 border-emerald-500">
                    <AvatarImage src={ARUN_RECIPROCAL_MATCH.partner.avatar} />
                    <AvatarFallback>AK</AvatarFallback>
                  </Avatar>
                  <div>
                    <div className="flex items-center gap-2">
                      <h4 className="font-bold text-foreground text-sm">1. UI/UX Skill Exchange</h4>
                      <Badge className="bg-emerald-500 text-white font-extrabold text-[10px]">
                        96% Match
                      </Badge>
                    </div>
                    <p className="text-xs text-muted-foreground">Arun Kumar • Python ↔ UI/UX Exchange</p>
                  </div>
                </div>
                <Button
                  size="sm"
                  disabled={exchangeSent}
                  onClick={handleQuickExchangeRequest}
                  className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold shrink-0"
                >
                  {exchangeSent ? 'Request Sent ✓' : 'Send Request'}
                </Button>
              </div>

              {/* Card 2: FastAPI Project Mentor 91% Match */}
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 p-4 rounded-xl border border-indigo-500/30 bg-indigo-500/5">
                <div className="flex items-center gap-3">
                  <Avatar className="h-11 w-11 border-2 border-indigo-500">
                    <AvatarImage src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=250" />
                    <AvatarFallback>PS</AvatarFallback>
                  </Avatar>
                  <div>
                    <div className="flex items-center gap-2">
                      <h4 className="font-bold text-foreground text-sm">2. FastAPI Project Mentor</h4>
                      <Badge className="bg-indigo-600 text-white font-extrabold text-[10px]">
                        91% Match
                      </Badge>
                    </div>
                    <p className="text-xs text-muted-foreground">Priya Sharma • Backend Specialist</p>
                  </div>
                </div>
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => navigate('/mentors')}
                  className="font-bold border-indigo-300 text-indigo-700 dark:text-indigo-300 shrink-0"
                >
                  View Mentor
                </Button>
              </div>

              {/* Card 3: React Fundamentals Recommended */}
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 p-4 rounded-xl border border-border bg-card">
                <div className="flex items-center gap-3">
                  <div className="p-3 rounded-xl bg-blue-500/10 text-blue-500 font-bold">
                    ⚛️
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <h4 className="font-bold text-foreground text-sm">3. React Fundamentals</h4>
                      <Badge variant="secondary" className="text-[10px] font-bold">
                        Recommended Course
                      </Badge>
                    </div>
                    <p className="text-xs text-muted-foreground">12 Modules • Free • 6/12 Completed</p>
                  </div>
                </div>
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => navigate('/learning')}
                  className="font-bold shrink-0"
                >
                  Continue
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Section: Your Skill Growth */}
          <Card className="border-border/60 shadow-sm">
            <CardHeader className="pb-3">
              <CardTitle className="text-lg flex items-center gap-2">
                <BookOpen className="h-5 w-5 text-blue-500" />
                Your Skill Growth
              </CardTitle>
              <CardDescription>Track your active learning & teaching progression</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {MOCK_STUDENT_GROWTH.map((item) => (
                <div key={item.skill} className="space-y-1.5">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-bold text-foreground">{item.skill}</span>
                    <span className="font-semibold text-primary">{item.progress}% ({item.status})</span>
                  </div>
                  <Progress value={item.progress} className="h-2.5" />
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Section: Continue Learning */}
          <Card className="border-border/60 shadow-sm">
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <CardTitle className="text-lg flex items-center gap-2">
                  <GraduationCap className="h-5 w-5 text-emerald-500" />
                  Continue Learning
                </CardTitle>
                <Button variant="ghost" size="sm" onClick={() => navigate('/learning')} className="text-primary font-bold">
                  Learning Hub <ChevronRight className="ml-1 h-4 w-4" />
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="p-4 rounded-xl border border-border bg-card space-y-3">
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-bold text-base text-foreground">React Fundamentals</h4>
                    <p className="text-xs text-muted-foreground">6/12 modules completed • 50% Progress</p>
                  </div>
                  <Badge className="bg-emerald-500 text-white font-bold">In Progress</Badge>
                </div>
                <Progress value={50} className="h-2" />
                <div className="flex justify-end">
                  <Button size="sm" onClick={() => navigate('/learning')} className="bg-blue-600 hover:bg-blue-700 text-white font-bold">
                    Resume Module 7
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Right 1 column */}
        <div className="space-y-8">
          {/* Section: Recent Activity */}
          <Card className="border-border/60 shadow-sm">
            <CardHeader className="pb-3">
              <CardTitle className="text-lg flex items-center gap-2">
                <Zap className="h-5 w-5 text-amber-500" />
                Recent Activity
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex gap-3 text-xs">
                <div className="h-2.5 w-2.5 rounded-full bg-emerald-500 mt-1 shrink-0" />
                <div>
                  <p className="font-bold text-foreground">+20 XP — Completed Python mentoring session</p>
                  <p className="text-muted-foreground">3 hours ago</p>
                </div>
              </div>

              <div className="flex gap-3 text-xs">
                <div className="h-2.5 w-2.5 rounded-full bg-amber-500 mt-1 shrink-0" />
                <div>
                  <p className="font-bold text-foreground">+10 XP — Received 5-star feedback</p>
                  <p className="text-muted-foreground">4 hours ago</p>
                </div>
              </div>

              <div className="flex gap-3 text-xs">
                <div className="h-2.5 w-2.5 rounded-full bg-blue-500 mt-1 shrink-0" />
                <div>
                  <p className="font-bold text-foreground">New match found — UI/UX ↔ Python</p>
                  <p className="text-muted-foreground">Reciprocal match with Arun • 5 hours ago</p>
                </div>
              </div>

              <div className="flex gap-3 text-xs">
                <div className="h-2.5 w-2.5 rounded-full bg-purple-500 mt-1 shrink-0" />
                <div>
                  <p className="font-bold text-foreground">Badge unlocked — Project Helper 🛠️</p>
                  <p className="text-muted-foreground">1 day ago</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Quick Actions */}
          <Card className="border-border/60 shadow-sm">
            <CardHeader className="pb-3">
              <CardTitle className="text-base font-bold">Quick Actions</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <Button variant="outline" className="w-full justify-start font-semibold" onClick={() => navigate('/exchange')}>
                <ArrowLeftRight className="mr-2 h-4 w-4 text-emerald-500" />
                Find Skill Exchange
              </Button>
              <Button variant="outline" className="w-full justify-start font-semibold" onClick={() => navigate('/mentors')}>
                <Users className="mr-2 h-4 w-4 text-purple-500" />
                Browse Peer Mentors
              </Button>
              <Button variant="outline" className="w-full justify-start font-semibold" onClick={() => navigate('/projects')}>
                <FolderKanban className="mr-2 h-4 w-4 text-indigo-500" />
                Post Project Problem
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
