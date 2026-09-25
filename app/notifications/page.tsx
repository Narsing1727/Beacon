"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { toast } from "sonner";
import {
  GitCommit,
  GitPullRequest,
  MessageSquare,
  AtSign,
  GitBranch,
  Tag,
  Check,
  CheckCheck,
} from "lucide-react";
import { AppShell } from "@/components/app-shell";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  ToggleGroup,
  ToggleGroupItem,
} from "@/components/ui/toggle-group";
import { activityFeed, type Activity } from "@/lib/data";

const iconFor: Record<Activity["type"], typeof GitCommit> = {
  commit: GitCommit,
  pr: GitPullRequest,
  comment: MessageSquare,
  mention: AtSign,
  branch: GitBranch,
  release: Tag,
};

export default function NotificationsPage() {
  const [notifications, setNotifications] = useState(activityFeed);
  const [filter, setFilter] = useState("all");
  const unread = notifications.filter((a) => !a.read).length;
  const visibleNotifications = useMemo(() => notifications.filter((notification) => {
    if (filter === "unread") return !notification.read;
    if (filter === "mentions") return notification.type === "mention";
    if (filter === "reviews") return notification.type === "pr";
    return true;
  }), [filter, notifications]);

  function markAllRead() {
    setNotifications((current) => current.map((notification) => ({ ...notification, read: true })));
    toast.success("All notifications marked as read");
  }

  function markRead(index: number) {
    setNotifications((current) => current.map((notification, currentIndex) => currentIndex === index ? { ...notification, read: true } : notification));
  }

  return (
    <AppShell>
      <div className="mx-auto max-w-3xl px-4 py-8 md:px-6">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <h1 className="text-2xl font-semibold tracking-tight">Notifications</h1>
            {unread > 0 && <Badge>{unread} unread</Badge>}
          </div>
          <Button variant="outline" size="sm" onClick={markAllRead} disabled={unread === 0}>
            <CheckCheck data-icon="inline-start" />
            Mark all as read
          </Button>
        </div>

        <ToggleGroup value={[filter]} onValueChange={(value) => setFilter(value[0] ?? "all")} variant="outline" className="mt-5">
          <ToggleGroupItem value="all">All</ToggleGroupItem>
          <ToggleGroupItem value="unread">Unread</ToggleGroupItem>
          <ToggleGroupItem value="mentions">Mentions</ToggleGroupItem>
          <ToggleGroupItem value="reviews">Reviews</ToggleGroupItem>
        </ToggleGroup>

        <Card className="mt-4 overflow-hidden py-0">
          <ul className="divide-y divide-border">
            {visibleNotifications.map((n) => {
              const Icon = iconFor[n.type];
              const index = notifications.indexOf(n);
              return (
                <li
                  key={`${n.actor}-${n.time}-${n.repo}`}
                  className={
                    n.read
                      ? "flex items-start gap-3 px-4 py-3.5 hover:bg-muted/30"
                      : "flex items-start gap-3 bg-accent/5 px-4 py-3.5 hover:bg-accent/10"
                  }
                >
                  {!n.read ? (
                    <span className="mt-1.5 size-2 shrink-0 rounded-full bg-accent" />
                  ) : (
                    <span className="mt-1.5 size-2 shrink-0" />
                  )}
                  <Icon className="mt-0.5 size-4 shrink-0 text-muted-foreground" />
                  <div className="flex min-w-0 flex-1 flex-col">
                    <p className="text-sm">
                      <span className="font-medium">{n.actor}</span> {n.text}{" "}
                      <Link href={`/${n.repo}`} className="font-medium text-accent hover:underline">
                        {n.repo}
                      </Link>
                    </p>
                    <span className="text-xs text-muted-foreground">{n.time}</span>
                  </div>
                  <Button variant="ghost" size="icon-sm" aria-label="Mark as read" onClick={() => markRead(index)} disabled={n.read}>
                    <Check />
                  </Button>
                </li>
              );
            })}
          </ul>
        </Card>
      </div>
    </AppShell>
  );
}
