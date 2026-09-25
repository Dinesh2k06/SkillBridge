import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { MOCK_ORG_DATA } from '@/data/mockData';

export default function OrgAnalyticsPage() {
  return (
    <div className="space-y-6 pb-10">
      <div className="rounded-2xl bg-gradient-to-r from-emerald-900 to-indigo-950 p-6 text-white shadow-lg">
        <h1 className="text-2xl font-bold">Campus Engagement Analytics</h1>
        <p className="text-xs text-emerald-200">Participation & skill transfer metrics</p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <Card className="border-border/60">
          <CardHeader className="pb-2">
            <CardTitle className="text-xs font-semibold text-muted-foreground">Student Participation</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-extrabold">84%</div>
            <p className="text-[11px] text-muted-foreground mt-0.5">Active monthly users</p>
          </CardContent>
        </Card>

        <Card className="border-border/60">
          <CardHeader className="pb-2">
            <CardTitle className="text-xs font-semibold text-muted-foreground">Mentorship Activity</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-extrabold">{MOCK_ORG_DATA.sessionsCompleted}</div>
            <p className="text-[11px] text-muted-foreground mt-0.5">Completed sessions</p>
          </CardContent>
        </Card>

        <Card className="border-border/60">
          <CardHeader className="pb-2">
            <CardTitle className="text-xs font-semibold text-muted-foreground">Skill Exchange Activity</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-extrabold">92%</div>
            <p className="text-[11px] text-muted-foreground mt-0.5">Reciprocal satisfaction rate</p>
          </CardContent>
        </Card>

        <Card className="border-border/60">
          <CardHeader className="pb-2">
            <CardTitle className="text-xs font-semibold text-muted-foreground">Project Help Resolution</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-extrabold">{MOCK_ORG_DATA.projectsHelped}</div>
            <p className="text-[11px] text-muted-foreground mt-0.5">Issues solved</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
