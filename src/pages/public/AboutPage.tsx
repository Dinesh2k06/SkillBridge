import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Users, Target, Heart, Shield, ArrowRight } from 'lucide-react';

export default function AboutPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <section className="py-24 bg-indigo-50/50">
        <div className="container mx-auto px-6 max-w-4xl text-center">
          <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight mb-6">About SkillBridge</h1>
          <p className="text-xl text-muted-foreground leading-relaxed">
            We are building a platform that breaks down silos and connects knowledge seekers with knowledge providers within organizations.
          </p>
        </div>
      </section>

      <section className="py-20">
        <div className="container mx-auto px-6 max-w-5xl">
          <div className="mb-16">
            <h2 className="text-3xl font-bold mb-6">Our Mission</h2>
            <p className="text-lg text-muted-foreground max-w-3xl leading-relaxed">
              To democratize learning by creating a self-sustaining ecosystem where every member can both teach and learn. We believe the collective knowledge of an organization is its greatest asset, and our goal is to unlock it.
            </p>
          </div>

          <div className="mb-24">
            <h2 className="text-3xl font-bold mb-10">How It Works</h2>
            <div className="grid md:grid-cols-3 gap-8">
              {[
                { step: '1', title: 'Create Profile', desc: 'List your skills, what you want to learn, and your availability.' },
                { step: '2', title: 'Connect', desc: 'Find matches for knowledge exchange, mentoring, or project collaboration.' },
                { step: '3', title: 'Grow', desc: 'Complete sessions, earn XP, and build your verified reputation.' }
              ].map((item, i) => (
                <div key={i} className="relative">
                  <div className="text-6xl font-black text-indigo-100 absolute -top-6 -left-4 -z-10">{item.step}</div>
                  <h3 className="text-xl font-bold mb-2">{item.title}</h3>
                  <p className="text-muted-foreground">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>

          <div>
            <h2 className="text-3xl font-bold mb-10 text-center">Our Values</h2>
            <div className="grid sm:grid-cols-2 gap-6">
              {[
                { icon: Users, title: 'Community First', desc: 'We prioritize the success and growth of our collective community.' },
                { icon: Target, title: 'Continuous Growth', desc: 'Learning is a lifelong journey, not a destination.' },
                { icon: Heart, title: 'Empathy', desc: 'We teach with patience and learn with humility.' },
                { icon: Shield, title: 'Trust', desc: 'Verified skills and transparent reputations build a safe environment.' }
              ].map((value, i) => (
                <Card key={i} className="border-none bg-slate-50">
                  <CardHeader>
                    <value.icon className="w-8 h-8 text-indigo-600 mb-2" />
                    <CardTitle>{value.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground">{value.desc}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 bg-indigo-900 text-white text-center mt-auto">
        <div className="container mx-auto px-6 max-w-2xl">
          <h2 className="text-3xl font-bold mb-6">Join the Community</h2>
          <p className="text-indigo-200 mb-8 text-lg">Start your journey of learning and sharing today.</p>
          <Button asChild size="lg" className="bg-white text-indigo-900 hover:bg-slate-100 rounded-full">
            <Link to="/signup">Get Started <ArrowRight className="w-4 h-4 ml-2" /></Link>
          </Button>
        </div>
      </section>
    </div>
  );
}
