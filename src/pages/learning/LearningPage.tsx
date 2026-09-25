import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import {
  BookOpen,
  Clock,
  Star,
  Users,
  Award,
  HelpCircle,
  ShieldCheck,
  PlayCircle,
  Sparkles,
  Code2,
  CheckCircle2,
  Layers,
} from 'lucide-react';
import { MOCK_COURSES } from '@/data/mockData';
import type { Course } from '@/types';
import { useToast } from '@/contexts/ToastContext';

export default function LearningPage() {
  const { toast } = useToast();
  const [courses, setCourses] = useState<Course[]>(MOCK_COURSES);

  const handleEnrollOrContinue = (course: Course) => {
    if (!course.enrolled) {
      setCourses((prev) =>
        prev.map((c) => (c.id === course.id ? { ...c, enrolled: true, progressPercent: 10 } : c))
      );
      toast({
        title: 'Enrolled Successfully! 🎉',
        description: `You have enrolled in ${course.title}. Progress tracked in your Learning Dashboard.`,
        type: 'success',
      });
    } else {
      toast({
        title: `Resuming ${course.title}`,
        description: `Opening module workspace (${course.progressPercent}% completed).`,
        type: 'info',
      });
    }
  };

  const learningPathSteps = [
    { step: 1, title: 'React Fundamentals', desc: 'Core JSX & State Hooks', icon: BookOpen, status: 'Completed' },
    { step: 2, title: 'Learn Concepts', desc: 'Component Hierarchy & Props', icon: Layers, status: 'Completed' },
    { step: 3, title: 'Mini Quiz', desc: '10 Verification Questions', icon: HelpCircle, status: 'Completed' },
    { step: 4, title: 'Build Mini Project', desc: 'Todo & State Dashboard', icon: Code2, status: 'In Progress' },
    { step: 5, title: 'Get Mentor Help', desc: '1-on-1 Code Review with Priya', icon: Users, status: 'Next Step' },
    { step: 6, title: 'Complete Project', desc: 'Final Project Submission', icon: Award, status: 'Upcoming' },
    { step: 7, title: 'Skill Verification', desc: 'Earn Verified React Badge', icon: ShieldCheck, status: 'Upcoming' },
  ];

  return (
    <div className="space-y-8 pb-10">
      {/* ── Header ── */}
      <div className="rounded-2xl bg-gradient-to-r from-blue-600 via-indigo-600 to-sky-600 p-8 text-white shadow-xl relative overflow-hidden">
        <div className="absolute -right-10 -bottom-10 h-48 w-48 rounded-full bg-white/10 blur-xl pointer-events-none" />
        <div className="relative z-10 space-y-2">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/20 text-xs font-semibold backdrop-blur-md">
            <BookOpen className="h-3.5 w-3.5" />
            <span>Interactive Skill Modules</span>
          </div>
          <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight">Learning Hub</h1>
          <p className="text-blue-100 text-sm md:text-base max-w-2xl">
            Learn → Build → Get Help → Prove your skills. Guided hands-on courses integrated with peer mentor verification.
          </p>
        </div>
      </div>

      <Tabs defaultValue="courses" className="space-y-6">
        <TabsList className="bg-muted p-1 rounded-xl">
          <TabsTrigger value="courses" className="font-bold">Featured Courses</TabsTrigger>
          <TabsTrigger value="path" className="font-bold flex items-center gap-1.5">
            <Sparkles className="h-4 w-4 text-amber-500" />
            Visual Learning Path
          </TabsTrigger>
        </TabsList>

        {/* ── TAB 1: COURSES ── */}
        <TabsContent value="courses" className="space-y-6">
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-2">
            {courses.map((course) => (
              <Card key={course.id} className="border-border/60 shadow-sm hover:shadow-lg transition-all overflow-hidden flex flex-col justify-between">
                <div className="relative h-44 w-full overflow-hidden">
                  <img
                    src={course.image}
                    alt={course.title}
                    className="h-full w-full object-cover transition-transform duration-300 hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
                  <div className="absolute top-3 left-3 flex gap-2">
                    <Badge variant="secondary" className="bg-white/90 text-black font-semibold text-xs backdrop-blur-md">
                      {course.category}
                    </Badge>
                    <Badge variant="outline" className="bg-black/60 text-white border-white/30 text-xs backdrop-blur-md">
                      {course.level}
                    </Badge>
                  </div>
                  <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-white text-xs font-semibold">
                    <span className="flex items-center gap-1">
                      <Clock className="h-3.5 w-3.5" /> {course.duration}
                    </span>
                    <span className="flex items-center gap-1 text-amber-300">
                      <Star className="h-3.5 w-3.5 fill-amber-300" /> {course.rating} ({course.learnersCountText || `${course.studentCount} learners`})
                    </span>
                  </div>
                </div>

                <CardHeader className="pb-2">
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-xl font-bold text-foreground">{course.title}</CardTitle>
                    <span className={`font-extrabold text-base ${course.isFree ? 'text-emerald-600 dark:text-emerald-400' : 'text-primary'}`}>
                      {course.priceText}
                    </span>
                  </div>
                  <CardDescription className="text-xs text-muted-foreground line-clamp-2">
                    {course.description}
                  </CardDescription>
                </CardHeader>

                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between text-xs text-muted-foreground">
                    <span>{course.modulesCount} Interactive Modules</span>
                    <span>{course.enrolled ? `${course.progressPercent}% Completed (${course.completedModulesCount}/${course.modulesCount})` : 'Not Enrolled'}</span>
                  </div>

                  {course.enrolled && (
                    <Progress value={course.progressPercent} className="h-2" />
                  )}

                  <Button
                    variant={course.enrolled ? 'default' : 'outline'}
                    onClick={() => handleEnrollOrContinue(course)}
                    className={`w-full font-bold ${
                      course.enrolled
                        ? 'bg-blue-600 hover:bg-blue-700 text-white'
                        : 'border-primary text-primary hover:bg-primary/5'
                    }`}
                  >
                    <PlayCircle className="mr-2 h-4 w-4" />
                    {course.enrolled ? 'Continue Learning' : 'Enroll Course'}
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        {/* ── TAB 2: VISUAL LEARNING PATH (PAGE 9) ── */}
        <TabsContent value="path">
          <Card className="border-primary/30 bg-gradient-to-r from-card via-card to-blue-500/5 shadow-lg">
            <CardHeader className="pb-4 border-b">
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="text-2xl font-bold flex items-center gap-2">
                    <Sparkles className="h-6 w-6 text-amber-500" />
                    React Fundamentals — Learning Path Stepper
                  </CardTitle>
                  <CardDescription>Step-by-step roadmap from zero knowledge to peer-verified badge</CardDescription>
                </div>
                <Badge className="bg-emerald-500 text-white font-extrabold px-3 py-1 text-sm">
                  Active Roadmap
                </Badge>
              </div>
            </CardHeader>
            <CardContent className="pt-6">
              <div className="relative space-y-6 before:absolute before:left-6 before:top-3 before:bottom-3 before:w-0.5 before:bg-primary/20">
                {learningPathSteps.map((item) => {
                  const Icon = item.icon;
                  const isDone = item.status === 'Completed';
                  const isInProg = item.status === 'In Progress';

                  return (
                    <div key={item.step} className="relative flex items-start gap-5 pl-2">
                      <div
                        className={`h-9 w-9 rounded-full font-extrabold text-sm flex items-center justify-center shrink-0 z-10 ${
                          isDone
                            ? 'bg-emerald-500 text-white shadow-md'
                            : isInProg
                            ? 'bg-blue-600 text-white ring-4 ring-blue-500/30'
                            : 'bg-muted text-muted-foreground border'
                        }`}
                      >
                        {isDone ? <CheckCircle2 className="h-5 w-5" /> : item.step}
                      </div>

                      <div className="flex-1 p-4 rounded-xl border border-border bg-card shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                        <div className="space-y-0.5">
                          <div className="flex items-center gap-2">
                            <Icon className="h-4 w-4 text-primary" />
                            <h4 className="font-bold text-base text-foreground">{item.title}</h4>
                          </div>
                          <p className="text-xs text-muted-foreground">{item.desc}</p>
                        </div>

                        <Badge
                          variant={isDone ? 'default' : isInProg ? 'secondary' : 'outline'}
                          className={
                            isDone
                              ? 'bg-emerald-500/15 text-emerald-700 dark:text-emerald-300 font-bold text-xs'
                              : isInProg
                              ? 'bg-blue-500/15 text-blue-700 dark:text-blue-300 font-bold text-xs'
                              : 'text-xs'
                          }
                        >
                          {item.status}
                        </Badge>
                      </div>
                    </div>
                  );
                })}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
