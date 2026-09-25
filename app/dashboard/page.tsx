import Link from "next/link";
import { GitBranch, GitCommit, GitPullRequest, MessageSquare, Plus, Tag } from "lucide-react";
import { AppShell } from "@/components/app-shell";
import { RepoCard } from "@/components/repo-card";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import { repos, activityFeed, type Activity } from "@/lib/data";

const icons: Record<Activity["type"], typeof GitCommit> = {
  commit: GitCommit,
  branch: GitBranch,
  comment: MessageSquare,
  pr: GitPullRequest,
  mention: MessageSquare,
  release: Tag,
};

export default function DashboardPage() {
  const myRepos = repos.filter((r) => r.owner === "hydrolab");

  return (
    <AppShell>
      <div className="mx-auto flex max-w-7xl flex-col gap-8 px-4 py-8 md:px-6">
        {/* Top KPI Metrics Row */}
        <div className="grid grid-cols-2 gap-4 border-b border-border/20 pb-6 md:grid-cols-4">
          <div className="flex flex-col gap-1 border border-border/20 p-4">
            <span className="text-xs text-muted-foreground">Storage Used</span>
            <span className="font-mono text-xl font-bold">3.1 GB / 5.0 GB</span>
            <div className="mt-2 h-1.5 w-full bg-muted/40">
              <div className="h-full bg-foreground" style={{ width: "62%" }} />
            </div>
          </div>
          <div className="flex flex-col gap-1 border border-border/20 p-4">
            <span className="text-xs text-muted-foreground">Deduplication</span>
            <span className="font-mono text-xl font-bold">812 GB</span>
            <span className="text-[10px] text-emerald-400">94.2% ratio saved</span>
          </div>
          <div className="flex flex-col gap-1 border border-border/20 p-4">
            <span className="text-xs text-muted-foreground">Active Repos</span>
            <span className="font-mono text-xl font-bold">{myRepos.length}</span>
            <span className="text-[10px] text-muted-foreground">2 team workspaces</span>
          </div>
          <div className="flex flex-col gap-1 border border-border/20 p-4">
            <span className="text-xs text-muted-foreground">Monthly Syncs</span>
            <span className="font-mono text-xl font-bold">1,248</span>
            <span className="text-[10px] text-emerald-400">+18% this month</span>
          </div>
        </div>

        <div className="grid gap-8 lg:grid-cols-[1fr_320px]">
          <div className="flex flex-col gap-6">
            <div className="flex items-center justify-between border-b border-border/20 pb-3">
              <h1 className="text-xl font-semibold">Your repositories</h1>
              <Button size="sm" render={<Link href="/new" />}>
                <Plus data-icon="inline-start" />
                New
              </Button>
            </div>
            <div className="grid gap-0 divide-y divide-border/20 border border-border/20">
              {myRepos.map((r) => (
                <RepoCard key={r.name} repo={r} />
              ))}
            </div>
          </div>

          <aside className="flex flex-col gap-6">
            {/* Storage Info */}
            <div className="flex flex-col gap-3 border border-border/20 p-5">
              <h2 className="text-sm font-semibold">Storage & Quota</h2>
              <div className="flex justify-between text-xs font-mono">
                <span>3.1 GB used</span>
                <span className="text-muted-foreground">5.0 GB limit</span>
              </div>
              <div className="h-1.5 w-full bg-muted/40">
                <div className="h-full bg-foreground" style={{ width: "62%" }} />
              </div>
              <p className="text-[11px] text-muted-foreground leading-relaxed">
                812 GB of shared public elevation data is deduplicated and does not count against your quota.
              </p>
            </div>

            {/* Recent Activity */}
            <div className="flex flex-col gap-3 border border-border/20 p-5">
              <h2 className="text-sm font-semibold border-b border-border/20 pb-2">Recent activity</h2>
              <div className="flex flex-col divide-y divide-border/10">
                {activityFeed.map((a, i) => {
                  const Icon = icons[a.type];
                  return (
                    <div key={i} className="flex items-start gap-2.5 py-2.5 text-xs">
                      <Avatar className="size-6 shrink-0">
                        <AvatarFallback className="text-[9px] font-semibold">{a.actor.slice(0, 2).toUpperCase()}</AvatarFallback>
                      </Avatar>
                      <div className="flex-1">
                        <p className="text-muted-foreground">
                          <span className="font-medium text-foreground">{a.actor}</span> {a.text}{" "}
                          <Link href={`/${a.repo}`} className="text-foreground hover:underline">
                            {a.repo}
                          </Link>
                        </p>
                        <span className="mt-1 flex items-center gap-1 text-[10px] text-muted-foreground">
                          <Icon className="size-2.5" />
                          {a.time}
                        </span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </aside>
        </div>
      </div>
    </AppShell>
  );
}
