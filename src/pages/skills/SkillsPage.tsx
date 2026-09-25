import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from '@/components/ui/dialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Wrench, Plus, CheckCircle2, BookOpen, ShieldCheck, Sparkles, Trash2 } from 'lucide-react';
import { useToast } from '@/contexts/ToastContext';

export default function SkillsPage() {
  const { toast } = useToast();
  const [canTeachSkills, setCanTeachSkills] = useState([
    { name: 'Python', level: 'Advanced', verified: true },
    { name: 'Data Analysis', level: 'Intermediate', verified: true },
    { name: 'HTML', level: 'Intermediate', verified: true },
    { name: 'CSS', level: 'Intermediate', verified: true },
  ]);

  const [wantsToLearnSkills, setWantsToLearnSkills] = useState([
    { name: 'React', priority: 'High' },
    { name: 'UI/UX', priority: 'High' },
    { name: 'Cloud', priority: 'Medium' },
  ]);

  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [newSkillName, setNewSkillName] = useState('');
  const [newType, setNewType] = useState<'teach' | 'learn'>('teach');

  const handleAddSkill = () => {
    if (!newSkillName.trim()) return;

    if (newType === 'teach') {
      setCanTeachSkills([...canTeachSkills, { name: newSkillName.trim(), level: 'Intermediate', verified: false }]);
    } else {
      setWantsToLearnSkills([...wantsToLearnSkills, { name: newSkillName.trim(), priority: 'High' }]);
    }

    setNewSkillName('');
    setIsAddModalOpen(false);
    toast({
      title: 'Skill Added! 🎯',
      description: `Added "${newSkillName.trim()}" to your skills matrix.`,
      type: 'success',
    });
  };

  const handleRemoveTeachSkill = (name: string) => {
    setCanTeachSkills(canTeachSkills.filter((s) => s.name !== name));
    toast({ title: 'Skill Removed', description: `Removed ${name} from teaching skills.`, type: 'info' });
  };

  const handleRemoveLearnSkill = (name: string) => {
    setWantsToLearnSkills(wantsToLearnSkills.filter((s) => s.name !== name));
    toast({ title: 'Skill Removed', description: `Removed ${name} from learning goals.`, type: 'info' });
  };

  return (
    <div className="space-y-8 pb-10">
      {/* Header */}
      <div className="rounded-2xl bg-gradient-to-r from-blue-700 via-indigo-700 to-violet-800 p-8 text-white shadow-xl flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="space-y-2">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/20 text-xs font-semibold backdrop-blur-md">
            <Wrench className="h-3.5 w-3.5" />
            <span>Skill Matrix Management</span>
          </div>
          <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight">My Skills & Verification</h1>
          <p className="text-blue-100 text-sm md:text-base max-w-xl">
            Manage the skills you can offer to peers and set goals for what you want to learn next.
          </p>
        </div>

        <Button
          size="lg"
          onClick={() => setIsAddModalOpen(true)}
          className="bg-white text-blue-800 hover:bg-white/90 font-extrabold shadow-lg shrink-0"
        >
          <Plus className="mr-2 h-5 w-5" />
          Add Skill
        </Button>
      </div>

      {/* Grid */}
      <div className="grid gap-8 md:grid-cols-2">
        {/* Can Teach */}
        <Card className="border-border/60 shadow-md">
          <CardHeader className="pb-3 border-b">
            <CardTitle className="text-xl font-bold flex items-center justify-between">
              <span className="flex items-center gap-2 text-emerald-600 dark:text-emerald-400">
                <ShieldCheck className="h-5 w-5" />
                Skills I Can Teach ({canTeachSkills.length})
              </span>
            </CardTitle>
            <CardDescription>Verified by peer sessions and project reviews</CardDescription>
          </CardHeader>
          <CardContent className="p-4 space-y-3">
            {canTeachSkills.map((skill) => (
              <div key={skill.name} className="flex items-center justify-between p-3 rounded-xl border border-border bg-card">
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-lg bg-emerald-500/10 text-emerald-600">
                    <CheckCircle2 className="h-4 w-4" />
                  </div>
                  <div>
                    <h4 className="font-bold text-foreground text-sm">{skill.name}</h4>
                    <span className="text-xs text-muted-foreground">{skill.level}</span>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  {skill.verified ? (
                    <Badge className="bg-emerald-500/15 text-emerald-700 dark:text-emerald-300 font-bold text-[10px]">
                      Verified Peer Mentor
                    </Badge>
                  ) : (
                    <Badge variant="outline" className="text-[10px]">
                      Pending Verification
                    </Badge>
                  )}
                  <Button
                    size="icon"
                    variant="ghost"
                    onClick={() => handleRemoveTeachSkill(skill.name)}
                    className="h-8 w-8 text-muted-foreground hover:text-destructive"
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Wants to Learn */}
        <Card className="border-border/60 shadow-md">
          <CardHeader className="pb-3 border-b">
            <CardTitle className="text-xl font-bold flex items-center justify-between">
              <span className="flex items-center gap-2 text-primary">
                <BookOpen className="h-5 w-5" />
                Skills I Want to Learn ({wantsToLearnSkills.length})
              </span>
            </CardTitle>
            <CardDescription>Skill Bridge matches you with student mentors for these goals</CardDescription>
          </CardHeader>
          <CardContent className="p-4 space-y-3">
            {wantsToLearnSkills.map((skill) => (
              <div key={skill.name} className="flex items-center justify-between p-3 rounded-xl border border-border bg-card">
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-lg bg-primary/10 text-primary">
                    <Sparkles className="h-4 w-4" />
                  </div>
                  <div>
                    <h4 className="font-bold text-foreground text-sm">{skill.name}</h4>
                    <span className="text-xs text-muted-foreground">Priority: {skill.priority}</span>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <Badge variant="outline" className="border-primary/40 text-primary font-semibold text-[10px]">
                    Active Learning Goal
                  </Badge>
                  <Button
                    size="icon"
                    variant="ghost"
                    onClick={() => handleRemoveLearnSkill(skill.name)}
                    className="h-8 w-8 text-muted-foreground hover:text-destructive"
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>

      {/* Add Skill Dialog */}
      <Dialog open={isAddModalOpen} onOpenChange={setIsAddModalOpen}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle className="text-xl font-bold">Add New Skill</DialogTitle>
            <DialogDescription>Add to your teaching or learning catalog</DialogDescription>
          </DialogHeader>

          <div className="space-y-4 py-3">
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-foreground">Type</label>
              <Select value={newType} onValueChange={(v) => setNewType(v as any)}>
                <SelectTrigger>
                  <SelectValue placeholder="Select type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="teach">Skill I Can Teach</SelectItem>
                  <SelectItem value="learn">Skill I Want to Learn</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-foreground">Skill Name</label>
              <Input
                placeholder="e.g. Next.js, Docker, PyTorch"
                value={newSkillName}
                onChange={(e) => setNewSkillName(e.target.value)}
              />
            </div>
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={() => setIsAddModalOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleAddSkill} className="bg-primary font-bold">
              Add Skill
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
