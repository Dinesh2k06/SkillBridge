import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  ArrowLeftRight, 
  Users, 
  FolderKanban, 
  BookOpen, 
  Trophy, 
  Building2, 
  ArrowRight, 
  Sparkles, 
  GraduationCap, 
  Lightbulb, 
  CheckCircle, 
  Rocket 
} from 'lucide-react';

export default function LandingPage() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="relative px-6 py-24 md:py-32 lg:py-40 bg-gradient-to-b from-indigo-50/80 to-background overflow-hidden">
        <div className="absolute inset-0 bg-grid-black/[0.02] bg-[size:20px_20px]" />
        <div className="container relative mx-auto max-w-5xl text-center">
          <Badge className="mb-4 bg-indigo-100 text-indigo-800 hover:bg-indigo-100/80 border-indigo-200">
            <Sparkles className="w-3 h-3 mr-1" /> Reimagining Learning
          </Badge>
          <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight text-foreground mb-6">
            Learn Together, <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-violet-600">Grow Together</span>
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground mb-10 max-w-3xl mx-auto leading-relaxed">
            SkillBridge connects students within organizations to exchange knowledge, find mentors, and collaborate on projects.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button asChild size="lg" className="rounded-full px-8 bg-indigo-600 hover:bg-indigo-700 font-extrabold text-base shadow-xl">
              <Link to="/dashboard">Launch SkillBridge Demo (Dinesh) <ArrowRight className="w-5 h-5 ml-2" /></Link>
            </Button>
            <Button asChild size="lg" variant="outline" className="rounded-full px-8 font-bold">
              <Link to="/exchange">Explore Knowledge Exchange</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Philosophy Section */}
      <section className="py-20 bg-background border-y">
        <div className="container mx-auto px-6 max-w-6xl text-center">
          <h2 className="text-3xl font-bold mb-12">The Learning Path</h2>
          <div className="flex flex-wrap justify-center items-center gap-4 md:gap-6">
            {[
              { icon: BookOpen, label: 'LEARN' },
              { icon: FolderKanban, label: 'PRACTICE' },
              { icon: Rocket, label: 'BUILD' },
              { icon: Users, label: 'GET HELP' },
              { icon: CheckCircle, label: 'VERIFY' },
              { icon: Lightbulb, label: 'TEACH' },
              { icon: GraduationCap, label: 'MENTOR' },
              { icon: Users, label: 'COLLABORATE' },
              { icon: Trophy, label: 'GROW' }
            ].map((step, idx) => (
              <div key={idx} className="flex items-center">
                <Badge variant="secondary" className="px-4 py-2 text-sm font-medium rounded-full flex items-center gap-2">
                  <step.icon className="w-4 h-4 text-indigo-600" />
                  {step.label}
                </Badge>
                {idx < 8 && <ArrowRight className="w-4 h-4 mx-2 md:mx-4 text-muted-foreground/40 hidden md:block" />}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-24 bg-slate-50/50">
        <div className="container mx-auto px-6 max-w-6xl">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4">Everything you need to grow</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Our platform provides all the tools you need to connect, learn, and build your reputation.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              { icon: ArrowLeftRight, title: 'Knowledge Exchange', desc: 'Trade your skills with peers. Teach what you know, learn what you need.' },
              { icon: Users, title: 'Peer Mentoring', desc: 'Find mentors within your organization to guide your career and learning.' },
              { icon: FolderKanban, title: 'Project Collaboration', desc: 'Get help with your projects or join others to build something amazing.' },
              { icon: BookOpen, title: 'Learning Hub', desc: 'Access courses, workshops, and exclusive internal resources.' },
              { icon: Trophy, title: 'Reputation & XP', desc: 'Build your reputation profile and earn experience points as you contribute.' },
              { icon: Building2, title: 'Organization Network', desc: 'Connect across different departments and teams seamlessly.' }
            ].map((feature, idx) => (
              <Card key={idx} className="border-none shadow-sm bg-white hover:shadow-md transition-shadow">
                <CardHeader>
                  <div className="w-12 h-12 rounded-xl bg-indigo-100 flex items-center justify-center mb-4 text-indigo-600">
                    <feature.icon className="w-6 h-6" />
                  </div>
                  <CardTitle>{feature.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">{feature.desc}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Two Economies Section */}
      <section className="py-24 bg-background">
        <div className="container mx-auto px-6 max-w-5xl">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4">A Flexible Ecosystem</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Participate in the way that works best for you.
            </p>
          </div>
          <div className="grid md:grid-cols-2 gap-8">
            <Card className="border-indigo-100 border-2 shadow-lg shadow-indigo-100/20 relative overflow-hidden">
              <div className="absolute top-0 right-0 p-6 opacity-5">
                <ArrowLeftRight className="w-32 h-32" />
              </div>
              <CardHeader>
                <Badge className="w-fit mb-2 bg-indigo-100 text-indigo-700">Time-Based</Badge>
                <CardTitle className="text-2xl">Knowledge ↔ Knowledge</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground text-lg">Trade skills directly with peers. Teach someone React for an hour, and they teach you Python in return. No money involved, pure skill exchange.</p>
              </CardContent>
            </Card>
            <Card className="border-violet-100 border-2 shadow-lg shadow-violet-100/20 relative overflow-hidden">
               <div className="absolute top-0 right-0 p-6 opacity-5">
                <BookOpen className="w-32 h-32" />
              </div>
              <CardHeader>
                <Badge className="w-fit mb-2 bg-violet-100 text-violet-700">Value-Based</Badge>
                <CardTitle className="text-2xl">Affordable Learning</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground text-lg">Access premium internal courses, workshops, and dedicated mentoring sessions at accessible rates from top talent in your org.</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-gradient-to-br from-indigo-900 to-violet-900 text-white text-center">
        <div className="container mx-auto px-6 max-w-3xl">
          <h2 className="text-4xl font-bold mb-6">Ready to start your learning journey?</h2>
          <p className="text-indigo-200 text-xl mb-10">Join thousands of students building their skills and reputation together.</p>
          <Button asChild size="lg" className="bg-white text-indigo-900 hover:bg-slate-100 rounded-full px-10">
            <Link to="/signup">Create Free Account</Link>
          </Button>
        </div>
      </section>
    </div>
  );
}
