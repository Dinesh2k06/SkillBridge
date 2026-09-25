import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { MOCK_ORG_DATA } from '@/data/mockData';
import { useToast } from '@/contexts/ToastContext';

export default function OrgSettingsPage() {
  const { toast } = useToast();

  const handleSave = () => {
    toast({
      title: 'Organization Settings Saved',
      description: 'Updated campus configuration for SNS College of Engineering.',
      type: 'success',
    });
  };

  return (
    <div className="space-y-6 pb-10 max-w-3xl">
      <div className="rounded-2xl bg-gradient-to-r from-slate-900 to-indigo-950 p-6 text-white shadow-lg">
        <h1 className="text-2xl font-bold">Organization Settings</h1>
        <p className="text-xs text-slate-300">Manage institution domain and network preferences</p>
      </div>

      <Card className="border-border/60 shadow-md">
        <CardHeader>
          <CardTitle className="text-lg font-bold">Institution Configuration</CardTitle>
          <CardDescription>Verified domain & administration settings</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-muted-foreground">Organization Name</label>
            <Input defaultValue={MOCK_ORG_DATA.name} />
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-muted-foreground">Domain</label>
            <Input defaultValue="sns.edu.in" readOnly className="bg-muted" />
          </div>

          <div className="flex justify-end pt-2">
            <Button onClick={handleSave} className="font-bold">
              Save Org Settings
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
