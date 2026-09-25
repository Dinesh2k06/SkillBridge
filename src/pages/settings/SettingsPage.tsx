import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { Settings, User, Bell, Network } from 'lucide-react';
import { CURRENT_USER } from '@/data/mockData';
import { useToast } from '@/contexts/ToastContext';

export default function SettingsPage() {
  const { toast } = useToast();
  const [networkPref, setNetworkPref] = useState('organization');
  const [exchangeAlerts, setExchangeAlerts] = useState(true);
  const [learningReminders, setLearningReminders] = useState(true);

  const handleSave = () => {
    toast({
      title: 'Settings Saved Successfully! ⚙️',
      description: 'Your profile, network, and notification preferences have been saved.',
      type: 'success',
    });
  };

  return (
    <div className="space-y-8 pb-10 max-w-4xl">
      {/* Header */}
      <div className="rounded-2xl bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 p-8 text-white shadow-xl">
        <div className="space-y-2">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 text-xs font-semibold backdrop-blur-md">
            <Settings className="h-3.5 w-3.5" />
            <span>Account & Preferences</span>
          </div>
          <h1 className="text-3xl font-extrabold tracking-tight">Settings</h1>
          <p className="text-slate-300 text-sm">
            Manage your student account preferences, network visibility, and notification alerts.
          </p>
        </div>
      </div>

      {/* 1. Profile Section */}
      <Card className="border-border/60 shadow-md">
        <CardHeader>
          <CardTitle className="text-lg font-bold flex items-center gap-2">
            <User className="h-5 w-5 text-primary" />
            Student Identity & Campus Profile
          </CardTitle>
          <CardDescription>Registered student credentials at SNS College of Engineering</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <label className="text-xs font-semibold text-muted-foreground block mb-1">Full Name</label>
              <Input defaultValue={CURRENT_USER.name} />
            </div>
            <div>
              <label className="text-xs font-semibold text-muted-foreground block mb-1">Department</label>
              <Input defaultValue={CURRENT_USER.department} readOnly className="bg-muted" />
            </div>
            <div>
              <label className="text-xs font-semibold text-muted-foreground block mb-1">Academic Year</label>
              <Input defaultValue={CURRENT_USER.year} readOnly className="bg-muted" />
            </div>
            <div>
              <label className="text-xs font-semibold text-muted-foreground block mb-1">Organization</label>
              <Input defaultValue={CURRENT_USER.organization} readOnly className="bg-muted" />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* 2. Network Preferences */}
      <Card className="border-border/60 shadow-md">
        <CardHeader>
          <CardTitle className="text-lg font-bold flex items-center gap-2">
            <Network className="h-5 w-5 text-indigo-500" />
            Network Visibility Preferences
          </CardTitle>
          <CardDescription>Control who can discover your reciprocal skill profile</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <RadioGroup value={networkPref} onValueChange={setNetworkPref} className="space-y-3">
            <div className="flex items-start space-x-3 p-3 rounded-xl border border-border bg-card">
              <RadioGroupItem value="organization" id="r-org" className="mt-1" />
              <div className="space-y-0.5">
                <Label htmlFor="r-org" className="font-bold text-sm cursor-pointer">My Organization Only</Label>
                <p className="text-xs text-muted-foreground">Only students enrolled at SNS College of Engineering can view & request exchanges</p>
              </div>
            </div>

            <div className="flex items-start space-x-3 p-3 rounded-xl border border-border bg-card">
              <RadioGroupItem value="selected" id="r-selected" className="mt-1" />
              <div className="space-y-0.5">
                <Label htmlFor="r-selected" className="font-bold text-sm cursor-pointer">Selected Organizations</Label>
                <p className="text-xs text-muted-foreground">Partner campuses (PSG, CIT, Kumaraguru) can also discover your skill profile</p>
              </div>
            </div>

            <div className="flex items-start space-x-3 p-3 rounded-xl border border-border bg-card">
              <RadioGroupItem value="open" id="r-open" className="mt-1" />
              <div className="space-y-0.5">
                <Label htmlFor="r-open" className="font-bold text-sm cursor-pointer">Open Network</Label>
                <p className="text-xs text-muted-foreground">All verified SkillBridge student accounts across any organization can connect</p>
              </div>
            </div>
          </RadioGroup>
        </CardContent>
      </Card>

      {/* 3. Notifications */}
      <Card className="border-border/60 shadow-md">
        <CardHeader>
          <CardTitle className="text-lg font-bold flex items-center gap-2">
            <Bell className="h-5 w-5 text-amber-500" />
            Notifications & Learning Preferences
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="flex items-center justify-between p-3 rounded-xl border border-border">
            <div>
              <h4 className="font-semibold text-sm">Skill Exchange Alerts</h4>
              <p className="text-xs text-muted-foreground">Receive instant notifications when someone matches your reciprocal skills</p>
            </div>
            <Button
              variant={exchangeAlerts ? 'default' : 'outline'}
              size="sm"
              onClick={() => setExchangeAlerts(!exchangeAlerts)}
            >
              {exchangeAlerts ? 'Enabled ✓' : 'Disabled'}
            </Button>
          </div>

          <div className="flex items-center justify-between p-3 rounded-xl border border-border">
            <div>
              <h4 className="font-semibold text-sm">Learning Reminders</h4>
              <p className="text-xs text-muted-foreground">Weekly reminders for enrolled courses and upcoming mentor sessions</p>
            </div>
            <Button
              variant={learningReminders ? 'default' : 'outline'}
              size="sm"
              onClick={() => setLearningReminders(!learningReminders)}
            >
              {learningReminders ? 'Enabled ✓' : 'Disabled'}
            </Button>
          </div>
        </CardContent>
      </Card>

      <div className="flex justify-end">
        <Button size="lg" onClick={handleSave} className="font-bold bg-primary">
          Save Settings
        </Button>
      </div>
    </div>
  );
}
