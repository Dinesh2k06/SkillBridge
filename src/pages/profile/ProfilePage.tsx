import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from '@/components/ui/dialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import {
  Trophy,
  Star,
  CheckCircle2,
  GraduationCap,
  Award,
  Plus,
  Edit3,
  BookOpen,
  FolderKanban,
  Building2,
  Globe,
  Link2,
  Code2,
} from 'lucide-react';
import { CURRENT_USER, MOCK_BADGES } from '@/data/mockData';
import { useToast } from '@/contexts/ToastContext';

export default function ProfilePage() {
  const { toast } = useToast();
  const [userProfile, setUserProfile] = useState(CURRENT_USER);

  // Modals state
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isAddSkillModalOpen, setIsAddSkillModalOpen] = useState(false);

  // Form states
  const [editBio, setEditBio] = useState(userProfile.bio);
  const [editYear, setEditYear] = useState(userProfile.year);
  const [newSkillName, setNewSkillName] = useState('');
  const [newSkillType, setNewSkillType] = useState<'teach' | 'learn'>('teach');

  const handleSaveProfile = () => {
    setUserProfile((prev) => ({
      ...prev,
      bio: editBio,
      year: editYear,
    }));
    setIsEditModalOpen(false);
    toast({
      title: 'Profile Updated! ✨',
      description: 'Your bio and academic details have been updated.',
      type: 'success',
    });
  };

  const handleAddSkill = () => {
    if (!newSkillName.trim()) return;

    if (newSkillType === 'teach') {
      setUserProfile((prev) => ({
        ...prev,
        canTeach: [...prev.canTeach, newSkillName.trim()],
      }));
    } else {
      setUserProfile((prev) => ({
        ...prev,
        wantsToLearn: [...prev.wantsToLearn, newSkillName.trim()],
      }));
    }

    setNewSkillName('');
    setIsAddSkillModalOpen(false);
    toast({
      title: 'Skill Added! 🚀',
      description: `Added "${newSkillName.trim()}" to your ${newSkillType === 'teach' ? 'Skills I Can Teach' : 'Skills I Want to Learn'} list.`,
      type: 'success',
    });
  };

  return (
    <div className="space-y-8 pb-10">
      {/* ── Banner & Profile Card Header ── */}
      <Card className="border-border/60 shadow-lg overflow-hidden">
        <div className="h-36 bg-gradient-to-r from-primary via-indigo-600 to-purple-600 relative" />
        <CardContent className="pt-0 relative px-6 pb-6">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 -mt-16 sm:-mt-12 mb-6">
            <div className="flex flex-col sm:flex-row items-center sm:items-end gap-4 text-center sm:text-left">
              <Avatar className="h-28 w-28 border-4 border-background shadow-xl">
                <AvatarImage src={userProfile.avatar} alt={userProfile.name} />
                <AvatarFallback>D</AvatarFallback>
              </Avatar>
              <div className="space-y-1">
                <h1 className="text-2xl sm:text-3xl font-extrabold text-foreground">{userProfile.name}</h1>
                <p className="text-xs sm:text-sm font-semibold text-primary">
                  {userProfile.department} • {userProfile.year}
                </p>
                <p className="text-xs text-muted-foreground flex items-center justify-center sm:justify-start gap-1">
                  <Building2 className="h-3.5 w-3.5 text-muted-foreground" />
                  {userProfile.organization}
                </p>

                {/* Social Links */}
                <div className="flex items-center gap-3 pt-1 text-muted-foreground">
                  <a href={userProfile.githubUrl} target="_blank" rel="noreferrer" className="hover:text-foreground transition-colors text-xs flex items-center gap-1">
                    <Code2 className="h-3.5 w-3.5 text-primary" /> GitHub
                  </a>
                  <span>•</span>
                  <a href={userProfile.linkedinUrl} target="_blank" rel="noreferrer" className="hover:text-foreground transition-colors text-xs flex items-center gap-1">
                    <Link2 className="h-3.5 w-3.5 text-primary" /> LinkedIn
                  </a>
                  <span>•</span>
                  <a href={userProfile.portfolioUrl} target="_blank" rel="noreferrer" className="hover:text-foreground transition-colors text-xs flex items-center gap-1">
                    <Globe className="h-3.5 w-3.5 text-primary" /> Portfolio
                  </a>
                </div>
              </div>
            </div>

            <div className="flex items-center justify-center gap-3">
              <Button variant="outline" onClick={() => setIsEditModalOpen(true)} className="font-semibold">
                <Edit3 className="mr-2 h-4 w-4" />
                Edit Profile
              </Button>
              <Button onClick={() => setIsAddSkillModalOpen(true)} className="bg-primary font-semibold">
                <Plus className="mr-2 h-4 w-4" />
                Add Skill
              </Button>
            </div>
          </div>

          {/* Bio paragraph */}
          <div className="p-4 rounded-xl bg-muted/40 border border-border/60">
            <p className="text-sm text-foreground italic">"{userProfile.bio}"</p>
          </div>
        </CardContent>
      </Card>

      {/* ── Stats Overview ── */}
      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
        <Card className="border-border/60 shadow-sm">
          <CardContent className="p-5 flex items-center gap-4">
            <div className="h-12 w-12 rounded-xl bg-amber-500/10 flex items-center justify-center text-amber-500">
              <Trophy className="h-6 w-6" />
            </div>
            <div>
              <span className="text-2xl font-extrabold text-foreground block">{userProfile.xp} XP</span>
              <span className="text-xs text-muted-foreground">Rank #3 Campus Leader</span>
            </div>
          </CardContent>
        </Card>

        <Card className="border-border/60 shadow-sm">
          <CardContent className="p-5 flex items-center gap-4">
            <div className="h-12 w-12 rounded-xl bg-emerald-500/10 flex items-center justify-center text-emerald-500">
              <CheckCircle2 className="h-6 w-6" />
            </div>
            <div>
              <span className="text-2xl font-extrabold text-foreground block">{userProfile.sessionsCompleted}</span>
              <span className="text-xs text-muted-foreground">Sessions Completed</span>
            </div>
          </CardContent>
        </Card>

        <Card className="border-border/60 shadow-sm">
          <CardContent className="p-5 flex items-center gap-4">
            <div className="h-12 w-12 rounded-xl bg-purple-500/10 flex items-center justify-center text-purple-500">
              <GraduationCap className="h-6 w-6" />
            </div>
            <div>
              <span className="text-2xl font-extrabold text-foreground block">{userProfile.studentsHelped}</span>
              <span className="text-xs text-muted-foreground">Students Helped</span>
            </div>
          </CardContent>
        </Card>

        <Card className="border-border/60 shadow-sm">
          <CardContent className="p-5 flex items-center gap-4">
            <div className="h-12 w-12 rounded-xl bg-blue-500/10 flex items-center justify-center text-blue-500">
              <Star className="h-6 w-6 fill-blue-500" />
            </div>
            <div>
              <span className="text-2xl font-extrabold text-foreground block">{userProfile.rating} ★</span>
              <span className="text-xs text-muted-foreground">Average Peer Rating</span>
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="skills" className="space-y-6">
        <TabsList className="bg-muted p-1 rounded-xl">
          <TabsTrigger value="skills" className="font-bold">Skills & Projects</TabsTrigger>
          <TabsTrigger value="badges" className="font-bold">Badges Gallery ({MOCK_BADGES.length})</TabsTrigger>
        </TabsList>

        {/* Tab 1: Skills & Projects */}
        <TabsContent value="skills">
          <div className="grid gap-8 lg:grid-cols-2">
            {/* Skills I Can Teach vs Wants */}
            <Card className="border-border/60 shadow-sm space-y-4">
              <CardHeader className="pb-2">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-xl font-bold flex items-center gap-2">
                    <BookOpen className="h-5 w-5 text-primary" />
                    Skills Portfolio
                  </CardTitle>
                  <Button size="sm" variant="ghost" onClick={() => setIsAddSkillModalOpen(true)} className="text-primary font-semibold">
                    + Add Skill
                  </Button>
                </div>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Skills I Can Teach */}
                <div className="space-y-2">
                  <h4 className="font-bold text-xs uppercase tracking-wider text-emerald-600 dark:text-emerald-400">
                    CAN TEACH ({userProfile.canTeach.length})
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {userProfile.canTeach.map((skill) => (
                      <Badge key={skill} className="bg-emerald-500/15 text-emerald-700 dark:text-emerald-300 border-emerald-500/30 px-3 py-1 text-xs font-bold">
                        ✓ {skill}
                      </Badge>
                    ))}
                  </div>
                </div>

                {/* Skills I Want */}
                <div className="space-y-2 pt-2 border-t border-border/60">
                  <h4 className="font-bold text-xs uppercase tracking-wider text-primary">
                    WANTS TO LEARN ({userProfile.wantsToLearn.length})
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {userProfile.wantsToLearn.map((skill) => (
                      <Badge key={skill} variant="outline" className="border-primary/40 text-primary px-3 py-1 text-xs font-bold">
                        🎯 {skill}
                      </Badge>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Projects */}
            <Card className="border-border/60 shadow-sm">
              <CardHeader className="pb-3">
                <CardTitle className="text-xl font-bold flex items-center gap-2">
                  <FolderKanban className="h-5 w-5 text-indigo-500" />
                  My Projects ({userProfile.projects.length})
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="grid gap-3 sm:grid-cols-2">
                  {userProfile.projects.map((proj) => (
                    <div key={proj} className="p-3.5 rounded-xl border border-border bg-card space-y-1">
                      <h4 className="font-bold text-sm text-foreground flex items-center gap-1.5">
                        🚀 {proj}
                      </h4>
                      <p className="text-xs text-muted-foreground">Active student project on SkillBridge</p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* PAGE 12: BADGES GALLERY */}
        <TabsContent value="badges">
          <Card className="border-border/60 shadow-md">
            <CardHeader>
              <CardTitle className="text-xl font-bold flex items-center gap-2">
                <Award className="h-5 w-5 text-amber-500" />
                Badges & Achievements
              </CardTitle>
              <CardDescription>Badges earned by helping peers, unlocking skills, and contributing</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {MOCK_BADGES.map((badge) => (
                  <div
                    key={badge.id}
                    className={`p-4 rounded-xl border transition-all ${
                      badge.unlocked
                        ? 'bg-amber-500/10 border-amber-500/30'
                        : 'bg-muted/40 border-border opacity-60'
                    }`}
                  >
                    <div className="flex items-start justify-between">
                      <span className="text-3xl">{badge.icon}</span>
                      <Badge
                        variant={badge.unlocked ? 'default' : 'outline'}
                        className={badge.unlocked ? 'bg-amber-500 text-white font-bold text-[10px]' : 'text-[10px]'}
                      >
                        {badge.unlocked ? 'Unlocked' : 'Locked'}
                      </Badge>
                    </div>

                    <div className="mt-3 space-y-1">
                      <h4 className="font-bold text-sm text-foreground">{badge.name}</h4>
                      <p className="text-xs text-muted-foreground">{badge.description}</p>
                      {badge.unlockedAt && (
                        <span className="text-[10px] text-amber-700 dark:text-amber-300 font-semibold block pt-1">
                          Unlocked in {badge.unlockedAt}
                        </span>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* ── Edit Profile Modal ── */}
      <Dialog open={isEditModalOpen} onOpenChange={setIsEditModalOpen}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle className="text-xl font-bold">Edit Profile</DialogTitle>
            <DialogDescription>Update your student bio and academic year</DialogDescription>
          </DialogHeader>

          <div className="space-y-4 py-3">
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-foreground">Academic Year</label>
              <Select value={editYear} onValueChange={setEditYear}>
                <SelectTrigger>
                  <SelectValue placeholder="Select Year" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="1st Year">1st Year</SelectItem>
                  <SelectItem value="2nd Year">2nd Year</SelectItem>
                  <SelectItem value="3rd Year">3rd Year</SelectItem>
                  <SelectItem value="4th Year">4th Year</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-foreground">Bio</label>
              <Input value={editBio} onChange={(e) => setEditBio(e.target.value)} />
            </div>
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={() => setIsEditModalOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleSaveProfile}>Save Changes</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* ── Add Skill Modal ── */}
      <Dialog open={isAddSkillModalOpen} onOpenChange={setIsAddSkillModalOpen}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle className="text-xl font-bold">Add New Skill</DialogTitle>
            <DialogDescription>Add a skill you can teach or want to learn</DialogDescription>
          </DialogHeader>

          <div className="space-y-4 py-3">
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-foreground">Skill Category</label>
              <Select value={newSkillType} onValueChange={(v) => setNewSkillType(v as any)}>
                <SelectTrigger>
                  <SelectValue placeholder="Select Type" />
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
                placeholder="e.g. Next.js, PyTorch, Docker..."
                value={newSkillName}
                onChange={(e) => setNewSkillName(e.target.value)}
              />
            </div>
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={() => setIsAddSkillModalOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleAddSkill} className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold">
              Add Skill
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
