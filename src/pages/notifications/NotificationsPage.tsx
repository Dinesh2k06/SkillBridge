import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Bell, ArrowLeftRight, FolderKanban, Trophy, Award, CheckCircle2 } from 'lucide-react';
import { MOCK_NOTIFICATIONS } from '@/data/mockData';
import type { NotificationItem } from '@/types';
import { useToast } from '@/contexts/ToastContext';

export default function NotificationsPage() {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [notifications, setNotifications] = useState<NotificationItem[]>(MOCK_NOTIFICATIONS);

  const handleMarkAllRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
    toast({
      title: 'Notifications Updated',
      description: 'All notifications marked as read.',
      type: 'info',
    });
  };

  const handleAction = (notif: NotificationItem) => {
    if (notif.actionUrl) {
      navigate(notif.actionUrl);
    }
  };

  return (
    <div className="space-y-8 pb-10">
      {/* ── Header ── */}
      <div className="rounded-2xl bg-gradient-to-r from-slate-800 via-purple-900 to-indigo-900 p-8 text-white shadow-xl flex items-center justify-between">
        <div className="space-y-2">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 text-xs font-semibold backdrop-blur-md">
            <Bell className="h-3.5 w-3.5" />
            <span>Activity & Updates</span>
          </div>
          <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight">Notifications</h1>
          <p className="text-slate-300 text-sm md:text-base max-w-xl">
            Stay updated with your reciprocal skill exchange requests, mentor availability, and XP milestones.
          </p>
        </div>

        <Button
          variant="outline"
          className="border-white/30 text-white hover:bg-white/10 font-semibold"
          onClick={handleMarkAllRead}
        >
          <CheckCircle2 className="mr-2 h-4 w-4" />
          Mark all as read
        </Button>
      </div>

      {/* ── Notifications List ── */}
      <Card className="border-border/60 shadow-md">
        <CardContent className="p-0 divide-y divide-border">
          {notifications.map((notif) => {
            const getIcon = () => {
              switch (notif.type) {
                case 'exchange':
                  return <ArrowLeftRight className="h-5 w-5 text-emerald-500" />;
                case 'project':
                  return <FolderKanban className="h-5 w-5 text-indigo-500" />;
                case 'xp':
                  return <Trophy className="h-5 w-5 text-amber-500" />;
                case 'badge':
                  return <Award className="h-5 w-5 text-purple-500" />;
                default:
                  return <Bell className="h-5 w-5 text-primary" />;
              }
            };

            return (
              <div
                key={notif.id}
                className={`p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4 transition-colors ${
                  !notif.read ? 'bg-primary/5 font-medium' : 'hover:bg-muted/30'
                }`}
              >
                <div className="flex items-start gap-4">
                  <div className="p-3 rounded-xl bg-background border border-border shadow-sm shrink-0">
                    {getIcon()}
                  </div>

                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <h4 className="font-bold text-foreground text-sm sm:text-base">{notif.title}</h4>
                      {!notif.read && (
                        <Badge className="bg-primary text-primary-foreground text-[10px] px-2 py-0.5">
                          New
                        </Badge>
                      )}
                    </div>
                    <p className="text-xs sm:text-sm text-muted-foreground">{notif.message}</p>
                    <span className="text-[11px] text-muted-foreground block pt-1">{notif.timeAgo}</span>
                  </div>
                </div>

                {notif.actionText && (
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => handleAction(notif)}
                    className="shrink-0 font-semibold border-primary/30 text-primary hover:bg-primary/5"
                  >
                    {notif.actionText}
                  </Button>
                )}
              </div>
            );
          })}
        </CardContent>
      </Card>
    </div>
  );
}
