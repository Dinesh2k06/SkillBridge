import { useState, useMemo } from 'react';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  ArrowLeftRight,
  Search,
  Sparkles,
  Send,
  MessageSquare,
  Star,
} from 'lucide-react';
import { MOCK_STUDENTS, ARUN_RECIPROCAL_MATCH } from '@/data/mockData';
import type { MockStudent } from '@/types';
import { useToast } from '@/contexts/ToastContext';

export default function ExchangePage() {
  const { toast } = useToast();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedSkill, setSelectedSkill] = useState<string>('all');
  const [selectedMatch, setSelectedMatch] = useState<MockStudent | null>(null);
  const [requestSentMap, setRequestSentMap] = useState<Record<string, boolean>>({});

  const filteredStudents = useMemo(() => {
    return MOCK_STUDENTS.filter((student) => {
      const matchesSearch =
        student.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        student.canTeach.some((s) => s.toLowerCase().includes(searchQuery.toLowerCase())) ||
        student.wantsToLearn.some((s) => s.toLowerCase().includes(searchQuery.toLowerCase()));

      const matchesSkillFilter =
        selectedSkill === 'all' ||
        student.canTeach.includes(selectedSkill) ||
        student.wantsToLearn.includes(selectedSkill);

      return matchesSearch && matchesSkillFilter;
    });
  }, [searchQuery, selectedSkill]);

  const handleSendRequest = (studentId: string, studentName: string) => {
    setRequestSentMap((prev) => ({ ...prev, [studentId]: true }));
    toast({
      title: 'Exchange Request Sent Successfully!',
      description: `Your skill exchange request has been delivered to ${studentName}.`,
      type: 'success',
    });
    setSelectedMatch(null);
  };

  const handleSendMessage = (studentName: string) => {
    toast({
      title: 'Message Workspace Opened',
      description: `Started direct conversation with ${studentName}.`,
      type: 'info',
    });
  };

  return (
    <div className="space-y-8 pb-10">
      {/* ── Page Header ── */}
      <div className="rounded-2xl bg-gradient-to-r from-emerald-600 via-teal-600 to-cyan-700 p-8 text-white shadow-xl relative overflow-hidden">
        <div className="absolute -right-10 -bottom-10 h-48 w-48 rounded-full bg-white/10 blur-xl pointer-events-none" />
        <div className="relative z-10 space-y-2">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/20 text-xs font-semibold backdrop-blur-md">
            <ArrowLeftRight className="h-3.5 w-3.5" />
            <span>Reciprocal Skill Matching</span>
          </div>
          <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight">Knowledge Exchange</h1>
          <p className="text-emerald-100 text-sm md:text-base max-w-2xl">
            Learn from someone. Teach someone. Grow together. Find students with matching skills for 1-on-1 reciprocal learning.
          </p>
        </div>
      </div>

      {/* ── Search & Filters Bar ── */}
      <Card className="border-border/60 shadow-sm">
        <CardContent className="p-4 space-y-4 md:space-y-0 md:flex md:items-center md:gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="What do you want to learn? (e.g. Python, UI/UX, Figma)..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-9 bg-background"
            />
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 md:flex md:items-center gap-3">
            <Select value={selectedSkill} onValueChange={setSelectedSkill}>
              <SelectTrigger className="w-full md:w-[140px]">
                <SelectValue placeholder="Skill" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Skills</SelectItem>
                <SelectItem value="Python">Python</SelectItem>
                <SelectItem value="FastAPI">FastAPI</SelectItem>
                <SelectItem value="UI/UX">UI/UX</SelectItem>
                <SelectItem value="Figma">Figma</SelectItem>
                <SelectItem value="React">React</SelectItem>
                <SelectItem value="Cloud">Cloud</SelectItem>
              </SelectContent>
            </Select>

            <Select defaultValue="all">
              <SelectTrigger className="w-full md:w-[130px]">
                <SelectValue placeholder="Level" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Levels</SelectItem>
                <SelectItem value="beginner">Beginner</SelectItem>
                <SelectItem value="intermediate">Intermediate</SelectItem>
                <SelectItem value="advanced">Advanced</SelectItem>
              </SelectContent>
            </Select>

            <Select defaultValue="sns">
              <SelectTrigger className="w-full md:w-[150px]">
                <SelectValue placeholder="Organization" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="sns">SNS College</SelectItem>
                <SelectItem value="all">All Campuses</SelectItem>
              </SelectContent>
            </Select>

            <Select defaultValue="reciprocal">
              <SelectTrigger className="w-full md:w-[150px]">
                <SelectValue placeholder="Exchange Type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="reciprocal">Reciprocal Only</SelectItem>
                <SelectItem value="all">All Types</SelectItem>
                <SelectItem value="free">Free Only</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* ── Reciprocal Matches Grid ── */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-2">
        {filteredStudents.map((student) => {
          const isSent = requestSentMap[student.id];
          const isArun = student.id === 'student-arun';

          return (
            <Card
              key={student.id}
              className={`border transition-all duration-200 hover:shadow-lg ${
                isArun
                  ? 'border-emerald-500/40 bg-gradient-to-br from-card via-card to-emerald-500/5 shadow-md ring-1 ring-emerald-500/20'
                  : 'border-border/60'
              }`}
            >
              <CardHeader className="pb-3">
                <div className="flex items-start justify-between gap-3">
                  <div className="flex items-center gap-3">
                    <Avatar className="h-14 w-14 border-2 border-emerald-500/30">
                      <AvatarImage src={student.avatar} alt={student.name} />
                      <AvatarFallback>{student.name.slice(0, 2)}</AvatarFallback>
                    </Avatar>
                    <div>
                      <div className="flex items-center gap-2">
                        <h3 className="font-bold text-lg text-foreground">{student.name}</h3>
                        {student.rating >= 4.8 && (
                          <Badge variant="outline" className="text-[10px] bg-amber-500/10 text-amber-600 border-amber-500/30 font-bold">
                            Top Rated
                          </Badge>
                        )}
                      </div>
                      <p className="text-xs text-muted-foreground">{student.organization} • {student.department}</p>
                      <div className="flex items-center gap-3 mt-1 text-xs text-muted-foreground">
                        <span className="flex items-center gap-1 font-semibold text-amber-500">
                          <Star className="h-3.5 w-3.5 fill-amber-500" /> {student.rating}
                        </span>
                        <span>•</span>
                        <span>{student.sessionsCompleted} Sessions</span>
                        <span>•</span>
                        <span className="font-semibold text-primary">{student.xp} XP</span>
                      </div>
                    </div>
                  </div>

                  <Badge className="bg-emerald-500 text-white font-extrabold text-xs px-2.5 py-1 shadow-sm">
                    {student.matchScore || 92}% Match
                  </Badge>
                </div>
              </CardHeader>

              <CardContent className="space-y-4">
                {/* Skills Swap Badges */}
                <div className="grid grid-cols-2 gap-3 p-3.5 rounded-xl bg-muted/40 border border-border/60">
                  <div className="space-y-1">
                    <span className="text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">
                      Can Teach
                    </span>
                    <div className="flex flex-wrap gap-1">
                      {student.canTeach.map((tech) => (
                        <Badge key={tech} variant="secondary" className="text-xs bg-emerald-500/10 text-emerald-700 dark:text-emerald-300 font-semibold">
                          {tech}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  <div className="space-y-1">
                    <span className="text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">
                      Wants to Learn
                    </span>
                    <div className="flex flex-wrap gap-1">
                      {student.wantsToLearn.map((tech) => (
                        <Badge key={tech} variant="outline" className="text-xs border-primary/30 text-primary font-semibold">
                          {tech}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="flex items-center justify-between pt-1">
                  <span className="text-xs font-semibold text-emerald-600 dark:text-emerald-400 flex items-center gap-1">
                    <Sparkles className="h-3.5 w-3.5" />
                    {student.exchangeType || 'Reciprocal Exchange'}
                  </span>

                  <div className="flex items-center gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setSelectedMatch(student)}
                      className="font-semibold"
                    >
                      View Match
                    </Button>
                    <Button
                      variant="default"
                      size="sm"
                      disabled={isSent}
                      onClick={() => handleSendRequest(student.id, student.name)}
                      className="bg-emerald-600 hover:bg-emerald-700 text-white font-semibold"
                    >
                      {isSent ? 'Sent ✓' : 'Send Request'}
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* ── Reciprocal Match Detail Modal ── */}
      <Dialog open={Boolean(selectedMatch)} onOpenChange={(open) => !open && setSelectedMatch(null)}>
        {selectedMatch && (
          <DialogContent className="max-w-lg">
            <DialogHeader>
              <div className="flex items-center gap-2 text-emerald-600 font-semibold text-xs uppercase tracking-wider">
                <Sparkles className="h-4 w-4" />
                <span>Perfect Skill Exchange Match</span>
              </div>
              <DialogTitle className="text-2xl font-bold flex items-center justify-between">
                <span>Python ↔ UI/UX</span>
                <Badge className="bg-emerald-500 text-white text-sm font-extrabold">
                  {selectedMatch.matchScore || 96}% Match
                </Badge>
              </DialogTitle>
              <DialogDescription>
                Reciprocal skill exchange breakdown with {selectedMatch.name}
              </DialogDescription>
            </DialogHeader>

            <div className="space-y-5 py-4">
              {/* Reciprocal Visual Diagram */}
              <div className="grid grid-cols-2 gap-4 p-4 rounded-xl bg-gradient-to-br from-emerald-50 to-teal-50 dark:from-emerald-950/40 dark:to-teal-950/40 border border-emerald-500/30">
                {/* You Box */}
                <div className="space-y-2 p-3 rounded-lg bg-background border border-border shadow-sm">
                  <div className="flex items-center gap-2">
                    <Avatar className="h-6 w-6">
                      <AvatarImage src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=250" />
                      <AvatarFallback>D</AvatarFallback>
                    </Avatar>
                    <span className="font-bold text-xs">YOU</span>
                  </div>
                  <div className="text-xs">
                    <span className="text-muted-foreground block text-[10px]">Can Teach</span>
                    <span className="font-semibold text-emerald-600 dark:text-emerald-400">Python</span>
                  </div>
                  <div className="text-xs pt-1 border-t">
                    <span className="text-muted-foreground block text-[10px]">Want to Learn</span>
                    <span className="font-semibold text-primary">UI/UX</span>
                  </div>
                </div>

                {/* Partner Box */}
                <div className="space-y-2 p-3 rounded-lg bg-background border border-border shadow-sm">
                  <div className="flex items-center gap-2">
                    <Avatar className="h-6 w-6">
                      <AvatarImage src={selectedMatch.avatar} />
                      <AvatarFallback>{selectedMatch.name.slice(0, 2)}</AvatarFallback>
                    </Avatar>
                    <span className="font-bold text-xs uppercase">{selectedMatch.name.split(' ')[0]}</span>
                  </div>
                  <div className="text-xs">
                    <span className="text-muted-foreground block text-[10px]">Wants to Learn</span>
                    <span className="font-semibold text-emerald-600 dark:text-emerald-400">Python</span>
                  </div>
                  <div className="text-xs pt-1 border-t">
                    <span className="text-muted-foreground block text-[10px]">Can Teach</span>
                    <span className="font-semibold text-primary">UI/UX</span>
                  </div>
                </div>
              </div>

              {/* Match Reason Text */}
              <div className="p-3.5 rounded-lg bg-muted/60 text-xs text-muted-foreground leading-relaxed border border-border/50">
                <span className="font-semibold text-foreground block mb-1">Why this is a 96% match:</span>
                "{ARUN_RECIPROCAL_MATCH.reason}"
              </div>

              {/* Stats & Badge row */}
              <div className="flex items-center justify-between text-xs text-muted-foreground px-1">
                <span>{selectedMatch.organization}</span>
                <span className="font-semibold text-foreground">★ {selectedMatch.rating} Rating</span>
                <span className="text-emerald-600 font-semibold">{selectedMatch.xp} XP</span>
              </div>
            </div>

            <DialogFooter className="gap-2 sm:gap-0">
              <Button
                variant="outline"
                onClick={() => handleSendMessage(selectedMatch.name)}
                className="w-full sm:w-auto"
              >
                <MessageSquare className="mr-2 h-4 w-4" />
                Message
              </Button>
              <Button
                variant="default"
                onClick={() => handleSendRequest(selectedMatch.id, selectedMatch.name)}
                className="w-full sm:w-auto bg-emerald-600 hover:bg-emerald-700 text-white font-semibold"
              >
                <Send className="mr-2 h-4 w-4" />
                Send Exchange Request
              </Button>
            </DialogFooter>
          </DialogContent>
        )}
      </Dialog>
    </div>
  );
}
