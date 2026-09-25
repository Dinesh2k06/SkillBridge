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
import { Search, Star, CheckCircle2, Filter, Users, Award, MessageSquare, FolderKanban, Send } from 'lucide-react';
import { MOCK_MENTORS } from '@/data/mockData';
import type { Mentor } from '@/types';
import { useToast } from '@/contexts/ToastContext';

export default function MentorsPage() {
  const { toast } = useToast();
  const [searchQuery, setSearchQuery] = useState('');
  const [priceFilter, setPriceFilter] = useState<string>('all');
  const [selectedProfile, setSelectedProfile] = useState<Mentor | null>(null);
  const [selectedRequestMentor, setSelectedRequestMentor] = useState<Mentor | null>(null);
  const [sessionTopic, setSessionTopic] = useState('');

  const filteredMentors = useMemo(() => {
    return MOCK_MENTORS.filter((m) => {
      const matchesSearch =
        m.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        m.roleTitle.toLowerCase().includes(searchQuery.toLowerCase()) ||
        m.skills.some((s) => s.toLowerCase().includes(searchQuery.toLowerCase()));

      const matchesPrice =
        priceFilter === 'all' ||
        (priceFilter === 'free' && m.priceNumeric === 0) ||
        (priceFilter === '100' && m.priceNumeric === 100) ||
        (priceFilter === '250' && m.priceNumeric === 250) ||
        (priceFilter === '500' && m.priceNumeric === 500);

      return matchesSearch && matchesPrice;
    });
  }, [searchQuery, priceFilter]);

  const handleConfirmRequest = () => {
    const mentor = selectedRequestMentor || selectedProfile;
    if (!mentor) return;
    toast({
      title: 'Mentorship Requested Successfully! 🚀',
      description: `Mentorship request sent to ${mentor.name}. Session Topic: "${sessionTopic || 'Project Mentorship'}"`,
      type: 'success',
    });
    setSelectedRequestMentor(null);
    setSelectedProfile(null);
    setSessionTopic('');
  };

  const handleSendMessage = (name: string) => {
    toast({
      title: 'Message Workspace Opened',
      description: `Direct chat started with ${name}.`,
      type: 'info',
    });
  };

  const handleViewProjects = (name: string) => {
    toast({
      title: 'Mentor Projects Workspace',
      description: `Viewing open-source projects contributed by ${name}.`,
      type: 'info',
    });
  };

  return (
    <div className="space-y-8 pb-10">
      {/* ── Header ── */}
      <div className="rounded-2xl bg-gradient-to-r from-purple-600 via-indigo-600 to-blue-700 p-8 text-white shadow-xl relative overflow-hidden">
        <div className="absolute -right-10 -bottom-10 h-48 w-48 rounded-full bg-white/10 blur-xl pointer-events-none" />
        <div className="relative z-10 space-y-2">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/20 text-xs font-semibold backdrop-blur-md">
            <Users className="h-3.5 w-3.5" />
            <span>Peer Mentorship Hub</span>
          </div>
          <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight">Find a Student Mentor</h1>
          <p className="text-purple-100 text-sm md:text-base max-w-2xl">
            Get help from students who have already built what you're trying to build.
          </p>
        </div>
      </div>

      {/* ── Search & Filter Controls ── */}
      <Card className="border-border/60 shadow-sm">
        <CardContent className="p-4 space-y-4 md:space-y-0 md:flex md:items-center md:gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search mentors by name or skill (e.g. FastAPI, Python, Docker)..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-9 bg-background"
            />
          </div>

          <div className="flex items-center gap-2 overflow-x-auto pb-1 md:pb-0">
            <span className="text-xs font-semibold text-muted-foreground flex items-center gap-1 shrink-0">
              <Filter className="h-3.5 w-3.5" /> Pricing:
            </span>
            {[
              { label: 'All Rates', value: 'all' },
              { label: 'Free', value: 'free' },
              { label: '₹100', value: '100' },
              { label: '₹250', value: '250' },
              { label: '₹500', value: '500' },
            ].map((pf) => (
              <Button
                key={pf.value}
                variant={priceFilter === pf.value ? 'default' : 'outline'}
                size="sm"
                onClick={() => setPriceFilter(pf.value)}
                className="h-8 text-xs shrink-0 font-medium"
              >
                {pf.label}
              </Button>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* ── Mentor Cards Grid ── */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-2">
        {filteredMentors.map((mentor) => (
          <Card key={mentor.id} className="border-border/60 shadow-sm hover:shadow-lg transition-all">
            <CardHeader className="pb-3">
              <div className="flex items-start justify-between gap-3">
                <div className="flex items-center gap-3">
                  <Avatar className="h-14 w-14 border-2 border-primary/30">
                    <AvatarImage src={mentor.avatar} alt={mentor.name} />
                    <AvatarFallback>{mentor.name.slice(0, 2)}</AvatarFallback>
                  </Avatar>
                  <div>
                    <h3 className="font-bold text-lg text-foreground">{mentor.name}</h3>
                    <p className="text-xs font-semibold text-primary">{mentor.roleTitle}</p>
                    <p className="text-xs text-muted-foreground mt-0.5">{mentor.organization}</p>
                  </div>
                </div>

                <div className="text-right">
                  <div className="inline-flex items-center gap-1 text-sm font-extrabold text-amber-500 bg-amber-500/10 px-2.5 py-1 rounded-lg">
                    <Star className="h-4 w-4 fill-amber-500" />
                    <span>{mentor.rating} ⭐</span>
                  </div>
                  <Badge variant="outline" className="mt-1 block text-[10px] text-emerald-600 border-emerald-500/30">
                    {mentor.availability}
                  </Badge>
                </div>
              </div>
            </CardHeader>

            <CardContent className="space-y-4">
              <p className="text-xs text-muted-foreground line-clamp-2">{mentor.bio}</p>

              {/* Skills Tags */}
              <div className="flex flex-wrap gap-1.5">
                {mentor.skills.map((skill) => (
                  <Badge key={skill} variant="secondary" className="text-xs font-medium">
                    {skill}
                  </Badge>
                ))}
              </div>

              {/* Stats Bar */}
              <div className="grid grid-cols-3 gap-2 py-2 px-3 rounded-lg bg-muted/40 text-center border border-border/60 text-xs">
                <div>
                  <span className="font-bold text-foreground block">{mentor.projectsHelped}</span>
                  <span className="text-[10px] text-muted-foreground">Projects Helped</span>
                </div>
                <div className="border-x border-border/60">
                  <span className="font-bold text-foreground block">{mentor.issuesResolved}</span>
                  <span className="text-[10px] text-muted-foreground">Issues Resolved</span>
                </div>
                <div>
                  <span className="font-bold text-foreground block">{mentor.responseRate}</span>
                  <span className="text-[10px] text-muted-foreground">Response Rate</span>
                </div>
              </div>

              {/* Price & Action */}
              <div className="flex items-center justify-between pt-2 border-t border-border/60">
                <div>
                  <span className="text-xs text-muted-foreground block">Session Rate</span>
                  <span className="font-extrabold text-foreground text-base">{mentor.priceText}</span>
                </div>

                <div className="flex items-center gap-2">
                  <Button variant="outline" size="sm" onClick={() => setSelectedProfile(mentor)}>
                    View Profile
                  </Button>
                  <Button variant="default" size="sm" onClick={() => setSelectedRequestMentor(mentor)}>
                    Request Mentorship
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* ── PAGE 5: DETAILED MENTOR PROFILE MODAL ── */}
      <Dialog open={Boolean(selectedProfile)} onOpenChange={(open) => !open && setSelectedProfile(null)}>
        {selectedProfile && (
          <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
            <DialogHeader className="pb-2">
              <div className="flex items-center gap-4">
                <Avatar className="h-16 w-16 border-2 border-primary">
                  <AvatarImage src={selectedProfile.avatar} />
                  <AvatarFallback>{selectedProfile.name.slice(0, 2)}</AvatarFallback>
                </Avatar>
                <div>
                  <DialogTitle className="text-2xl font-bold">{selectedProfile.name}</DialogTitle>
                  <p className="text-sm font-semibold text-primary">{selectedProfile.roleTitle}</p>
                  <p className="text-xs text-muted-foreground">{selectedProfile.organization}</p>
                </div>
              </div>
            </DialogHeader>

            <div className="space-y-6 py-4">
              {/* Highlights bar */}
              <div className="grid grid-cols-4 gap-2 p-3 rounded-xl bg-gradient-to-r from-purple-50 to-indigo-50 dark:from-purple-950/40 dark:to-indigo-950/40 border border-purple-200 dark:border-purple-800 text-center text-xs">
                <div>
                  <span className="font-extrabold text-amber-500 block text-base">{selectedProfile.rating} ⭐</span>
                  <span className="text-[10px] text-muted-foreground">Rating</span>
                </div>
                <div>
                  <span className="font-bold text-foreground block text-base">{selectedProfile.responseRate}</span>
                  <span className="text-[10px] text-muted-foreground">Response Rate</span>
                </div>
                <div>
                  <span className="font-bold text-foreground block text-base">{selectedProfile.projectsHelped}</span>
                  <span className="text-[10px] text-muted-foreground">Projects Helped</span>
                </div>
                <div>
                  <span className="font-bold text-foreground block text-base">{selectedProfile.issuesResolved}</span>
                  <span className="text-[10px] text-muted-foreground">Issues Resolved</span>
                </div>
              </div>

              {/* Skills */}
              <div className="space-y-2">
                <h4 className="font-bold text-xs uppercase tracking-wider text-muted-foreground">Skills</h4>
                <div className="flex flex-wrap gap-1.5">
                  {selectedProfile.skills.map((skill) => (
                    <Badge key={skill} className="bg-primary/10 text-primary font-bold text-xs">
                      {skill}
                    </Badge>
                  ))}
                </div>
              </div>

              {/* About */}
              <div className="space-y-1.5 p-3.5 rounded-xl bg-muted/40 border">
                <h4 className="font-bold text-xs text-muted-foreground uppercase tracking-wider">About</h4>
                <p className="text-sm text-foreground italic">"{selectedProfile.bio}"</p>
              </div>

              {/* Achievements */}
              {selectedProfile.achievements && (
                <div className="space-y-2">
                  <h4 className="font-bold text-xs uppercase tracking-wider text-muted-foreground flex items-center gap-1">
                    <Award className="h-4 w-4 text-amber-500" /> Achievements
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {selectedProfile.achievements.map((ach) => (
                      <span key={ach} className="px-2.5 py-1 rounded-lg bg-amber-500/10 text-amber-700 dark:text-amber-300 font-semibold text-xs border border-amber-500/20">
                        🏆 {ach}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* Available Sessions */}
              {selectedProfile.availableSessions && (
                <div className="space-y-2">
                  <h4 className="font-bold text-xs uppercase tracking-wider text-muted-foreground">Available Sessions</h4>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                    {selectedProfile.availableSessions.map((sess) => (
                      <div key={sess.title} className="p-3 rounded-lg border bg-card text-center space-y-1">
                        <span className="font-semibold text-xs text-foreground block">{sess.title}</span>
                        <span className="font-extrabold text-sm text-primary block">{sess.priceText}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            <DialogFooter className="flex-col sm:flex-row gap-2">
              <Button variant="outline" onClick={() => handleViewProjects(selectedProfile.name)}>
                <FolderKanban className="mr-2 h-4 w-4" />
                View Projects
              </Button>
              <Button variant="outline" onClick={() => handleSendMessage(selectedProfile.name)}>
                <MessageSquare className="mr-2 h-4 w-4" />
                Send Message
              </Button>
              <Button
                variant="default"
                onClick={() => {
                  setSelectedRequestMentor(selectedProfile);
                }}
                className="bg-purple-600 hover:bg-purple-700 text-white font-bold"
              >
                <Send className="mr-2 h-4 w-4" />
                Request Mentorship
              </Button>
            </DialogFooter>
          </DialogContent>
        )}
      </Dialog>

      {/* ── Request Mentorship Modal ── */}
      <Dialog open={Boolean(selectedRequestMentor)} onOpenChange={(open) => !open && setSelectedRequestMentor(null)}>
        {selectedRequestMentor && (
          <DialogContent className="max-w-md">
            <DialogHeader>
              <DialogTitle className="text-xl font-bold">Request Mentorship</DialogTitle>
              <DialogDescription>
                Schedule a 1-on-1 problem-solving session with {selectedRequestMentor.name}
              </DialogDescription>
            </DialogHeader>

            <div className="space-y-4 py-3">
              <div className="flex items-center gap-3 p-3 rounded-xl bg-muted/50 border">
                <Avatar className="h-12 w-12">
                  <AvatarImage src={selectedRequestMentor.avatar} />
                  <AvatarFallback>{selectedRequestMentor.name.slice(0, 2)}</AvatarFallback>
                </Avatar>
                <div>
                  <h4 className="font-bold text-foreground">{selectedRequestMentor.name}</h4>
                  <p className="text-xs text-primary font-semibold">{selectedRequestMentor.roleTitle}</p>
                  <p className="text-xs text-muted-foreground">Session Rate: {selectedRequestMentor.priceText}</p>
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-xs font-semibold text-foreground">Session Topic / Problem Description</label>
                <Input
                  placeholder="e.g. Debugging FastAPI 401 Unauthorized issue in backend..."
                  value={sessionTopic}
                  onChange={(e) => setSessionTopic(e.target.value)}
                />
              </div>

              <div className="space-y-1 text-xs text-muted-foreground">
                <p className="flex items-center gap-1.5 text-emerald-600 font-semibold">
                  <CheckCircle2 className="h-4 w-4" /> Response expected within 2 hours
                </p>
              </div>
            </div>

            <DialogFooter>
              <Button variant="outline" onClick={() => setSelectedRequestMentor(null)}>
                Cancel
              </Button>
              <Button variant="default" onClick={handleConfirmRequest} className="bg-purple-600 hover:bg-purple-700 text-white font-bold">
                Confirm Request ({selectedRequestMentor.priceText})
              </Button>
            </DialogFooter>
          </DialogContent>
        )}
      </Dialog>
    </div>
  );
}
