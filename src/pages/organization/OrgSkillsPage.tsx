import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { MOCK_ORG_DATA } from '@/data/mockData';

export default function OrgSkillsPage() {
  return (
    <div className="space-y-6 pb-10">
      <div className="rounded-2xl bg-gradient-to-r from-blue-900 to-indigo-950 p-6 text-white shadow-lg">
        <h1 className="text-2xl font-bold">Skills Matrix — SNS College of Engineering</h1>
        <p className="text-xs text-blue-200">Campus skill distribution & deficit analytics</p>
      </div>

      <Card className="border-border/60 shadow-md">
        <CardHeader>
          <CardTitle className="text-lg font-bold">Skill Supply Breakdown</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {MOCK_ORG_DATA.skillsSupply.map((item) => (
            <div key={item.skill} className="space-y-1">
              <div className="flex justify-between text-xs font-semibold">
                <span>{item.skill}</span>
                <span>{item.count} Active Students</span>
              </div>
              <Progress value={(item.count / 450) * 100} className="h-2" />
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  );
}
