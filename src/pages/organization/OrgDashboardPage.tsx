import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Building2, Users, GraduationCap, ArrowLeftRight, FolderKanban, TrendingUp, Network } from 'lucide-react';
import { MOCK_ORG_DATA } from '@/data/mockData';

export default function OrgDashboardPage() {
  return (
    <div className="space-y-8 pb-10">
      {/* Header */}
      <div className="rounded-2xl bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 p-8 text-white shadow-xl relative overflow-hidden">
        <div className="absolute -right-10 -bottom-10 h-48 w-48 rounded-full bg-white/10 blur-xl pointer-events-none" />
        <div className="relative z-10 space-y-2">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 text-xs font-semibold backdrop-blur-md">
            <Building2 className="h-3.5 w-3.5" />
            <span>Organization Analytics</span>
          </div>
          <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight">{MOCK_ORG_DATA.name}</h1>
          <p className="text-indigo-200 text-sm md:text-base max-w-2xl">
            {MOCK_ORG_DATA.subtitle} — Real-time insights into campus skills, peer mentorship, and inter-department collaboration.
          </p>
        </div>
      </div>

      {/* Stats Cards Grid */}
      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
        <Card className="border-border/60 shadow-sm">
          <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
            <CardTitle className="text-sm font-semibold text-muted-foreground">Total Students</CardTitle>
            <div className="h-10 w-10 rounded-xl bg-blue-500/10 flex items-center justify-center text-blue-500">
              <Users className="h-5 w-5" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-extrabold text-foreground">{MOCK_ORG_DATA.totalStudents.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground mt-1">Enrolled on SkillBridge</p>
          </CardContent>
        </Card>

        <Card className="border-border/60 shadow-sm">
          <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
            <CardTitle className="text-sm font-semibold text-muted-foreground">Active Mentors</CardTitle>
            <div className="h-10 w-10 rounded-xl bg-purple-500/10 flex items-center justify-center text-purple-500">
              <GraduationCap className="h-5 w-5" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-extrabold text-foreground">{MOCK_ORG_DATA.activeMentors}</div>
            <p className="text-xs text-muted-foreground mt-1">Verified Peer Mentors</p>
          </CardContent>
        </Card>

        <Card className="border-border/60 shadow-sm">
          <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
            <CardTitle className="text-sm font-semibold text-muted-foreground">Sessions Completed</CardTitle>
            <div className="h-10 w-10 rounded-xl bg-emerald-500/10 flex items-center justify-center text-emerald-500">
              <ArrowLeftRight className="h-5 w-5" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-extrabold text-foreground">{MOCK_ORG_DATA.sessionsCompleted}</div>
            <p className="text-xs text-muted-foreground mt-1">1-on-1 Exchanges</p>
          </CardContent>
        </Card>

        <Card className="border-border/60 shadow-sm">
          <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
            <CardTitle className="text-sm font-semibold text-muted-foreground">Projects Helped</CardTitle>
            <div className="h-10 w-10 rounded-xl bg-amber-500/10 flex items-center justify-center text-amber-500">
              <FolderKanban className="h-5 w-5" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-extrabold text-foreground">{MOCK_ORG_DATA.projectsHelped}</div>
            <p className="text-xs text-muted-foreground mt-1">Blockers Resolved</p>
          </CardContent>
        </Card>
      </div>

      {/* Charts & Demand Matrix */}
      <div className="grid gap-8 lg:grid-cols-2">
        {/* Skills Students Have */}
        <Card className="border-border/60 shadow-sm">
          <CardHeader>
            <CardTitle className="text-xl font-bold flex items-center gap-2">
              <TrendingUp className="h-5 w-5 text-emerald-500" />
              SKILLS STUDENTS HAVE
            </CardTitle>
            <CardDescription>Top teaching & expertise supply across departments</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {MOCK_ORG_DATA.skillsSupply.map((item) => (
              <div key={item.skill} className="space-y-1.5">
                <div className="flex items-center justify-between text-xs font-semibold">
                  <span className="text-foreground">{item.skill}</span>
                  <span className="text-muted-foreground">{item.count} Students</span>
                </div>
                <Progress value={(item.count / 450) * 100} className="h-2.5" />
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Skill Demand */}
        <Card className="border-border/60 shadow-sm">
          <CardHeader>
            <CardTitle className="text-xl font-bold flex items-center gap-2">
              <TrendingUp className="h-5 w-5 text-amber-500" />
              SKILL DEMAND
            </CardTitle>
            <CardDescription>High learning demand areas identified by student search algorithms</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            {MOCK_ORG_DATA.skillsDemand.map((item) => (
              <div key={item.skill} className="flex items-center justify-between p-3 rounded-xl border border-border bg-card">
                <span className="font-bold text-sm text-foreground">{item.skill}</span>
                <Badge
                  className={
                    item.demandLevel === 'HIGH'
                      ? 'bg-destructive text-destructive-foreground font-extrabold'
                      : item.demandLevel === 'MEDIUM'
                      ? 'bg-amber-500 text-white font-bold'
                      : 'bg-muted text-muted-foreground font-medium'
                  }
                >
                  {item.demandLevel} DEMAND
                </Badge>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>

      {/* Organization Network Section */}
      <Card className="border-border/60 shadow-md">
        <CardHeader>
          <CardTitle className="text-xl font-bold flex items-center gap-2">
            <Network className="h-5 w-5 text-indigo-500" />
            Inter-Organization Network Concept
          </CardTitle>
          <CardDescription>Cross-campus skill collaboration network status</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* My Org */}
          <div className="p-4 rounded-xl bg-primary/10 border border-primary/30 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <span className="text-3xl">🏛️</span>
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-primary">MY ORGANIZATION</span>
                <h4 className="font-extrabold text-base text-foreground">{MOCK_ORG_DATA.name}</h4>
              </div>
            </div>
            <Badge className="bg-primary text-primary-foreground font-bold">Primary Hub</Badge>
          </div>

          {/* Connected Orgs */}
          <div className="space-y-3">
            <h4 className="font-bold text-xs uppercase tracking-wider text-muted-foreground">CONNECTED ORGANIZATIONS</h4>
            <div className="grid gap-3 sm:grid-cols-3">
              {MOCK_ORG_DATA.connectedOrgs.map((org) => (
                <div key={org.name} className="p-4 rounded-xl border border-border bg-card space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-2xl">{org.logo}</span>
                    <Badge variant="outline" className="text-[10px] text-emerald-600 border-emerald-500/30">
                      {org.status}
                    </Badge>
                  </div>
                  <h5 className="font-bold text-xs text-foreground line-clamp-1">{org.name}</h5>
                  <p className="text-[11px] text-muted-foreground">{org.type}</p>
                </div>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
