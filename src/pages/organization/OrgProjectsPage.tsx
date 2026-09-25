import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { MOCK_PROJECT_PROBLEMS } from '@/data/mockData';

export default function OrgProjectsPage() {
  return (
    <div className="space-y-6 pb-10">
      <div className="rounded-2xl bg-gradient-to-r from-slate-900 to-cyan-950 p-6 text-white shadow-lg">
        <h1 className="text-2xl font-bold">Campus Projects & Problem Hub</h1>
        <p className="text-xs text-slate-300">Active student project blockers and peer resolution logs</p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        {MOCK_PROJECT_PROBLEMS.map((p) => (
          <Card key={p.id} className="border-border/60 shadow-sm">
            <CardHeader className="pb-2">
              <div className="flex justify-between items-center">
                <Badge variant="outline">{p.category}</Badge>
                <Badge className="bg-amber-500 text-white text-[10px]">{p.studentsNeedingHelp} Needing Help</Badge>
              </div>
              <CardTitle className="text-base font-bold pt-1">{p.title}</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2 text-xs">
              <p className="text-muted-foreground">{p.description}</p>
              <div className="flex flex-wrap gap-1">
                {p.technology.map((t) => (
                  <Badge key={t} variant="secondary" className="text-[10px]">{t}</Badge>
                ))}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
