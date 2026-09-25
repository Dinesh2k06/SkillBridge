import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Trophy, Medal, Crown } from 'lucide-react';
import { MOCK_LEADERBOARD } from '@/data/mockData';

export default function LeaderboardPage() {
  return (
    <div className="space-y-8 pb-10">
      {/* ── Header ── */}
      <div className="rounded-2xl bg-gradient-to-r from-amber-500 via-orange-600 to-red-600 p-8 text-white shadow-xl relative overflow-hidden">
        <div className="absolute -right-10 -bottom-10 h-48 w-48 rounded-full bg-white/10 blur-xl pointer-events-none" />
        <div className="relative z-10 space-y-2">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/20 text-xs font-semibold backdrop-blur-md">
            <Trophy className="h-3.5 w-3.5 text-amber-200" />
            <span>Campus Community Gamification</span>
          </div>
          <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight">Campus Skill Leaders</h1>
          <p className="text-amber-100 text-sm md:text-base max-w-2xl">
            Recognizing top student contributors, mentors, and skill exchange champions across SNS College.
          </p>
        </div>
      </div>

      {/* ── Tabs & Leaderboard Table ── */}
      <Card className="border-border/60 shadow-md">
        <CardHeader className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pb-4 border-b">
          <div>
            <CardTitle className="text-xl font-bold flex items-center gap-2">
              <Crown className="h-5 w-5 text-amber-500" />
              Leaderboard Standings
            </CardTitle>
            <CardDescription>Earn XP by mentoring peers, completing skill exchanges, and solving project blockers</CardDescription>
          </div>

          <Tabs defaultValue="month">
            <TabsList className="bg-muted">
              <TabsTrigger value="week">This Week</TabsTrigger>
              <TabsTrigger value="month">This Month</TabsTrigger>
              <TabsTrigger value="all">All Time</TabsTrigger>
            </TabsList>
          </Tabs>
        </CardHeader>

        <CardContent className="p-0">
          <div className="divide-y divide-border">
            {MOCK_LEADERBOARD.map((user) => {
              const isFirst = user.rank === 1;
              const isSecond = user.rank === 2;
              const isThird = user.rank === 3;

              return (
                <div
                  key={user.id}
                  className={`flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-4 transition-colors ${
                    user.isCurrentUser
                      ? 'bg-amber-500/10 dark:bg-amber-500/15 border-l-4 border-l-amber-500 font-medium'
                      : 'hover:bg-muted/30'
                  }`}
                >
                  <div className="flex items-center gap-4 min-w-0">
                    {/* Rank Badge */}
                    <div className="w-8 flex items-center justify-center shrink-0">
                      {isFirst && <Crown className="h-6 w-6 text-amber-500" />}
                      {isSecond && <Medal className="h-6 w-6 text-slate-400" />}
                      {isThird && <Medal className="h-6 w-6 text-amber-700" />}
                      {!isFirst && !isSecond && !isThird && (
                        <span className="font-extrabold text-muted-foreground text-sm">#{user.rank}</span>
                      )}
                    </div>

                    {/* Avatar & User Details */}
                    <Avatar className={`h-12 w-12 shrink-0 ${user.isCurrentUser ? 'ring-2 ring-amber-500' : ''}`}>
                      <AvatarImage src={user.avatar} alt={user.name} />
                      <AvatarFallback>{user.name.slice(0, 2)}</AvatarFallback>
                    </Avatar>

                    <div className="min-w-0 flex-1">
                      <div className="flex items-center gap-2">
                        <h3 className="font-bold text-base text-foreground truncate">{user.name}</h3>
                        {user.isCurrentUser && (
                          <Badge className="bg-amber-500 text-white font-extrabold text-[10px]">
                            YOU
                          </Badge>
                        )}
                      </div>
                      <p className="text-xs text-muted-foreground truncate">
                        {user.organization} • {user.department}
                      </p>
                      <div className="flex flex-wrap gap-1 mt-1">
                        {user.badges.map((badge) => (
                          <span key={badge} className="px-2 py-0.5 rounded-full bg-muted text-[10px] font-semibold text-muted-foreground">
                            🏷️ {badge}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* XP & Stats */}
                  <div className="flex items-center justify-between sm:justify-end gap-6 border-t sm:border-t-0 pt-2 sm:pt-0">
                    <div className="text-left sm:text-right">
                      <span className="text-[11px] text-muted-foreground block">Skills & Badges</span>
                      <span className="text-xs font-semibold text-foreground">
                        {user.skillsCount} Skills • {user.badgesCount} Badges
                      </span>
                    </div>

                    <div className="text-right px-3 py-1.5 rounded-xl bg-amber-500/10 border border-amber-500/20">
                      <span className="text-[10px] text-amber-700 dark:text-amber-300 font-bold block uppercase tracking-wider">Total XP</span>
                      <span className="text-xl font-extrabold text-amber-600 dark:text-amber-400">
                        {user.xp} XP
                      </span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
