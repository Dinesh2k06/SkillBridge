import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { MOCK_STUDENTS } from '@/data/mockData';

export default function OrgStudentsPage() {
  return (
    <div className="space-y-6 pb-10">
      <div className="rounded-2xl bg-gradient-to-r from-slate-900 to-indigo-950 p-6 text-white shadow-lg">
        <h1 className="text-2xl font-bold">Enrolled Students — SNS College of Engineering</h1>
        <p className="text-xs text-slate-300">2,340 Students active in peer learning network</p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {MOCK_STUDENTS.map((student) => (
          <Card key={student.id} className="border-border/60 shadow-sm">
            <CardHeader className="pb-3 flex flex-row items-center gap-3">
              <Avatar className="h-12 w-12">
                <AvatarImage src={student.avatar} />
                <AvatarFallback>{student.name.slice(0, 2)}</AvatarFallback>
              </Avatar>
              <div>
                <CardTitle className="text-base font-bold">{student.name}</CardTitle>
                <p className="text-xs text-muted-foreground">{student.department} • {student.year}</p>
              </div>
            </CardHeader>
            <CardContent className="space-y-2 text-xs">
              <div>
                <span className="text-muted-foreground block text-[10px]">Teaching</span>
                <div className="flex flex-wrap gap-1 mt-0.5">
                  {student.canTeach.map((s) => (
                    <Badge key={s} className="bg-emerald-500/10 text-emerald-600 border-emerald-500/20 text-[10px]">
                      {s}
                    </Badge>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
