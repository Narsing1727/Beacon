"use client";

import { use } from "react";
import Link from "next/link";
import { Check, GitMerge, GitPullRequest, MessageSquare } from "lucide-react";
import { AppShell } from "@/components/app-shell";
import { RepoHeader } from "@/components/repo-header";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { pullRequests, type PullRequest } from "@/lib/data";

const statusMeta: Record<PullRequest["status"], { label: string; className: string; icon: typeof GitPullRequest }> = {
  open: { label: "Open", className: "text-chart-2 border-chart-2/40 bg-chart-2/10", icon: GitPullRequest },
  merged: { label: "Merged", className: "text-chart-5 border-chart-5/40 bg-chart-5/10", icon: GitMerge },
  "changes-requested": { label: "Changes requested", className: "text-chart-4 border-chart-4/40 bg-chart-4/10", icon: MessageSquare },
  approved: { label: "Approved", className: "text-chart-2 border-chart-2/40 bg-chart-2/10", icon: Check },
};

export default function PullsPage({
  params,
}: {
  params: Promise<{ owner: string; repo: string }>;
}) {
  const { owner, repo } = use(params);
  const base = `/${owner}/${repo}`;

  return (
    <AppShell>
      <RepoHeader owner={owner} repo={repo} />
      <div className="mx-auto max-w-5xl px-4 py-6 md:px-6">
        <div className="flex items-center justify-between">
          <h1 className="text-xl font-semibold">Pull requests</h1>
          <Button size="sm" render={<Link href={`${base}/compare`} />}>
            <GitPullRequest data-icon="inline-start" />
            New pull request
          </Button>
        </div>

        <Tabs defaultValue="open" className="mt-6">
          <TabsList>
            <TabsTrigger value="open">
              <GitPullRequest data-icon="inline-start" />2 Open
            </TabsTrigger>
            <TabsTrigger value="closed">
              <Check data-icon="inline-start" />1 Merged
            </TabsTrigger>
          </TabsList>
        </Tabs>

        <Card className="mt-4 overflow-hidden py-0">
          <ul className="divide-y divide-border">
            {pullRequests.map((pr) => {
              const meta = statusMeta[pr.status];
              const Icon = meta.icon;
              return (
                <li key={pr.id} className="flex items-start gap-3 px-4 py-4">
                  <Icon className={pr.status === "merged" ? "mt-0.5 size-5 text-chart-5" : "mt-0.5 size-5 text-chart-2"} />
                  <div className="min-w-0 flex-1">
                    <Link href={`${base}/pull/${pr.id}`} className="font-medium hover:underline">
                      {pr.title}
                    </Link>
                    <p className="mt-0.5 text-sm text-muted-foreground">
                      #{pr.id} opened by {pr.author} ·{" "}
                      <span className="font-mono text-xs">
                        {pr.source} → {pr.target}
                      </span>{" "}
                      · updated {pr.updated}
                    </p>
                  </div>
                  <div className="flex shrink-0 items-center gap-3">
                    <Badge variant="outline" className={meta.className}>
                      {meta.label}
                    </Badge>
                    {pr.comments > 0 && (
                      <span className="flex items-center gap-1 text-sm text-muted-foreground">
                        <MessageSquare className="size-4" />
                        {pr.comments}
                      </span>
                    )}
                  </div>
                </li>
              );
            })}
          </ul>
        </Card>
      </div>
    </AppShell>
  );
}
