import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { MOCK_MENTORS } from '@/data/mockData';

export default function OrgMentorsPage() {
  return (
    <div className="space-y-6 pb-10">
      <div className="rounded-2xl bg-gradient-to-r from-purple-900 to-indigo-950 p-6 text-white shadow-lg">
        <h1 className="text-2xl font-bold">Verified Mentors — SNS College of Engineering</h1>
        <p className="text-xs text-purple-200">186 Approved Student Peer Mentors</p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-2">
        {MOCK_MENTORS.map((m) => (
          <Card key={m.id} className="border-border/60 shadow-sm">
            <CardHeader className="pb-3 flex flex-row items-center justify-between">
              <div className="flex items-center gap-3">
                <Avatar className="h-12 w-12">
                  <AvatarImage src={m.avatar} />
                  <AvatarFallback>{m.name.slice(0, 2)}</AvatarFallback>
                </Avatar>
                <div>
                  <CardTitle className="text-base font-bold">{m.name}</CardTitle>
                  <p className="text-xs text-primary font-semibold">{m.roleTitle}</p>
                </div>
              </div>
              <Badge className="bg-amber-500 text-white font-bold">{m.rating} ⭐</Badge>
            </CardHeader>
            <CardContent className="space-y-2 text-xs">
              <div className="flex flex-wrap gap-1">
                {m.skills.map((s) => (
                  <Badge key={s} variant="secondary" className="text-[10px]">
                    {s}
                  </Badge>
                ))}
              </div>
              <p className="text-muted-foreground pt-1">{m.projectsHelped} Projects Helped • {m.issuesResolved} Issues Resolved</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
