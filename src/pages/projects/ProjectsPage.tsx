import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from '@/components/ui/dialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { FolderKanban, Plus, Sparkles, ShieldAlert } from 'lucide-react';
import { MOCK_PROJECT_PROBLEMS } from '@/data/mockData';
import type { ProjectProblem } from '@/types';
import { useToast } from '@/contexts/ToastContext';

export default function ProjectsPage() {
  const { toast } = useToast();
  const [problems, setProblems] = useState<ProjectProblem[]>(MOCK_PROJECT_PROBLEMS);
  const [selectedProblem, setSelectedProblem] = useState<ProjectProblem | null>(null);
  const [isPostModalOpen, setIsPostModalOpen] = useState(false);

  // New Problem Form State
  const [newTitle, setNewTitle] = useState('');
  const [newCategory, setNewCategory] = useState('Backend');
  const [newDescription, setNewDescription] = useState('');
  const [newTech, setNewTech] = useState('');

  const handlePostProblem = () => {
    if (!newTitle.trim()) return;
    const techArray = newTech.split(',').map((t) => t.trim()).filter(Boolean);

    const created: ProjectProblem = {
      id: `prob-${Date.now()}`,
      title: newTitle,
      category: newCategory,
      problem: newTitle,
      technology: techArray.length ? techArray : ['React', 'TypeScript'],
      difficulty: 'Intermediate',
      studentsNeedingHelp: 1,
      description: newDescription || 'Need assistance resolving project blocker.',
      aiDetectedSkills: techArray.concat(['Debugging', 'System Design']),
      recommendedMentors: [
        {
          mentorId: 'mentor-priya',
          name: 'Priya Sharma',
          avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=250',
          roleTitle: 'Senior Mentor',
          matchPercentage: 96,
        },
      ],
      authorName: 'Dinesh',
      authorAvatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=250',
      createdAgo: 'Just now',
    };

    setProblems([created, ...problems]);
    setIsPostModalOpen(false);
    setNewTitle('');
    setNewDescription('');
    setNewTech('');

    toast({
      title: 'Problem Posted Successfully! 💡',
      description: 'AI detected relevant skill tags and matched top mentors for your issue.',
      type: 'success',
    });
  };

  const handleRequestHelpFromMentor = (mentorName: string) => {
    toast({
      title: 'Mentor Help Requested!',
      description: `Help request dispatched to ${mentorName}. They will review your code snippet shortly.`,
      type: 'success',
    });
    setSelectedProblem(null);
  };

  return (
    <div className="space-y-8 pb-10">
      {/* ── Header ── */}
      <div className="rounded-2xl bg-gradient-to-r from-indigo-600 via-blue-600 to-cyan-600 p-8 text-white shadow-xl relative overflow-hidden flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="relative z-10 space-y-2">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/20 text-xs font-semibold backdrop-blur-md">
            <FolderKanban className="h-3.5 w-3.5" />
            <span>Peer Troubleshooting</span>
          </div>
          <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight">Project Help Hub</h1>
          <p className="text-indigo-100 text-sm md:text-base max-w-xl">
            Stuck on your project? Find someone who can help or request automated AI skill-matched student mentors.
          </p>
        </div>

        <Button
          size="lg"
          onClick={() => setIsPostModalOpen(true)}
          className="bg-white text-indigo-700 hover:bg-white/90 font-extrabold shadow-lg shrink-0"
        >
          <Plus className="mr-2 h-5 w-5" />
          Post a Problem
        </Button>
      </div>

      {/* ── Problem Cards List ── */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {problems.map((prob) => (
          <Card
            key={prob.id}
            className="border-border/60 shadow-sm hover:shadow-lg transition-all flex flex-col justify-between cursor-pointer"
            onClick={() => setSelectedProblem(prob)}
          >
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between gap-2 mb-2">
                <Badge variant="outline" className="bg-indigo-50 dark:bg-indigo-950/40 text-indigo-600 border-indigo-200 font-semibold text-xs">
                  {prob.category}
                </Badge>
                <Badge variant="secondary" className="text-xs">
                  {prob.difficulty}
                </Badge>
              </div>
              <CardTitle className="text-lg font-bold text-foreground line-clamp-1">{prob.title}</CardTitle>
              <CardDescription className="text-xs text-muted-foreground line-clamp-2 mt-1">
                {prob.description}
              </CardDescription>
            </CardHeader>

            <CardContent className="space-y-4">
              {/* Tech Stack */}
              <div className="flex flex-wrap gap-1.5">
                {prob.technology.map((tech) => (
                  <span key={tech} className="px-2 py-0.5 rounded bg-muted text-[11px] font-semibold text-muted-foreground">
                    {tech}
                  </span>
                ))}
              </div>

              {/* Status & Mentor Recommendation */}
              <div className="p-3 rounded-lg bg-amber-500/10 border border-amber-500/20 space-y-1">
                <div className="flex items-center justify-between text-xs font-semibold text-amber-700 dark:text-amber-300">
                  <span className="flex items-center gap-1">
                    <ShieldAlert className="h-3.5 w-3.5" />
                    {prob.studentsNeedingHelp} students need help
                  </span>
                </div>
                {prob.recommendedMentors.length > 0 && (
                  <p className="text-[11px] text-muted-foreground truncate">
                    Top Mentor: <span className="font-semibold text-foreground">{prob.recommendedMentors[0].name}</span> ({prob.recommendedMentors[0].matchPercentage}% Match)
                  </p>
                )}
              </div>

              {/* Footer Button */}
              <Button
                variant="outline"
                className="w-full font-semibold border-primary/30 text-primary hover:bg-primary/5"
                onClick={(e) => {
                  e.stopPropagation();
                  setSelectedProblem(prob);
                }}
              >
                Get Help & View Mentors
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* ── Problem Detail Modal (Section 6) ── */}
      <Dialog open={Boolean(selectedProblem)} onOpenChange={(open) => !open && setSelectedProblem(null)}>
        {selectedProblem && (
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <div className="flex items-center gap-2">
                <Badge variant="outline" className="bg-indigo-50 text-indigo-600 border-indigo-200">
                  {selectedProblem.category}
                </Badge>
                <span className="text-xs text-muted-foreground">Posted by {selectedProblem.authorName} • {selectedProblem.createdAgo}</span>
              </div>
              <DialogTitle className="text-2xl font-bold mt-1">{selectedProblem.title}</DialogTitle>
              <DialogDescription className="text-sm">
                Problem: <span className="font-semibold text-foreground">{selectedProblem.problem}</span>
              </DialogDescription>
            </DialogHeader>

            <div className="space-y-5 py-4">
              {/* Detailed Description */}
              <div className="p-4 rounded-xl bg-muted/40 border border-border space-y-2">
                <h4 className="font-semibold text-xs text-muted-foreground uppercase tracking-wider">Detailed Issue Description</h4>
                <p className="text-sm text-foreground leading-relaxed">"{selectedProblem.description}"</p>
              </div>

              {/* AI Detected Skills */}
              <div className="space-y-2">
                <h4 className="font-semibold text-xs flex items-center gap-1.5 text-indigo-600 dark:text-indigo-400">
                  <Sparkles className="h-4 w-4" /> AI Detected Required Skills:
                </h4>
                <div className="flex flex-wrap gap-1.5">
                  {selectedProblem.aiDetectedSkills.map((skill) => (
                    <Badge key={skill} className="bg-indigo-500/10 text-indigo-700 dark:text-indigo-300 border-indigo-500/30">
                      {skill}
                    </Badge>
                  ))}
                </div>
              </div>

              {/* Recommended Mentors */}
              <div className="space-y-3">
                <h4 className="font-semibold text-sm text-foreground">Recommended Mentors for this Problem:</h4>
                <div className="space-y-2">
                  {selectedProblem.recommendedMentors.map((mentor) => (
                    <div
                      key={mentor.mentorId}
                      className="flex items-center justify-between p-3 rounded-xl border border-border bg-card hover:border-indigo-400 transition-colors"
                    >
                      <div className="flex items-center gap-3">
                        <Avatar className="h-10 w-10">
                          <AvatarImage src={mentor.avatar} />
                          <AvatarFallback>{mentor.name.slice(0, 2)}</AvatarFallback>
                        </Avatar>
                        <div>
                          <h5 className="font-bold text-sm text-foreground">{mentor.name}</h5>
                          <p className="text-xs text-muted-foreground">{mentor.roleTitle}</p>
                        </div>
                      </div>

                      <div className="flex items-center gap-3">
                        <Badge className="bg-emerald-500/15 text-emerald-700 dark:text-emerald-300 font-extrabold">
                          {mentor.matchPercentage}% Match
                        </Badge>
                        <Button
                          size="sm"
                          onClick={() => handleRequestHelpFromMentor(mentor.name)}
                          className="bg-indigo-600 hover:bg-indigo-700 text-white font-semibold"
                        >
                          Request Help
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <DialogFooter>
              <Button variant="outline" onClick={() => setSelectedProblem(null)}>
                Close
              </Button>
            </DialogFooter>
          </DialogContent>
        )}
      </Dialog>

      {/* ── Post a Problem Modal ── */}
      <Dialog open={isPostModalOpen} onOpenChange={setIsPostModalOpen}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle className="text-xl font-bold flex items-center gap-2">
              <Plus className="h-5 w-5 text-indigo-600" />
              Post a Project Problem
            </DialogTitle>
            <DialogDescription>
              Describe your bug or issue. SkillBridge will auto-detect skills and recommend peer mentors.
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4 py-3">
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-foreground">Problem Title</label>
              <Input
                placeholder="e.g. FastAPI 401 Unauthorized on CORS request"
                value={newTitle}
                onChange={(e) => setNewTitle(e.target.value)}
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-foreground">Category</label>
              <Select value={newCategory} onValueChange={setNewCategory}>
                <SelectTrigger>
                  <SelectValue placeholder="Select Category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Backend">Backend</SelectItem>
                  <SelectItem value="Frontend">Frontend</SelectItem>
                  <SelectItem value="AI / Data Science">AI / Data Science</SelectItem>
                  <SelectItem value="DevOps & Cloud">DevOps & Cloud</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-foreground">Technologies (comma separated)</label>
              <Input
                placeholder="FastAPI, JWT, REST API"
                value={newTech}
                onChange={(e) => setNewTech(e.target.value)}
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-foreground">Issue Description</label>
              <Input
                placeholder="Describe what is failing and error messages..."
                value={newDescription}
                onChange={(e) => setNewDescription(e.target.value)}
              />
            </div>
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={() => setIsPostModalOpen(false)}>
              Cancel
            </Button>
            <Button variant="default" onClick={handlePostProblem} className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold">
              Submit Problem
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
