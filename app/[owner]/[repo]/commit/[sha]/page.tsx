"use client";

import { use } from "react";
import Link from "next/link";
import { GitCommit } from "lucide-react";
import { AppShell } from "@/components/app-shell";
import { RepoHeader } from "@/components/repo-header";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import { MapPreview, MapDiffLegend } from "@/components/map-preview";
import { DataTypeBadge } from "@/components/data-type-badge";
import { commits } from "@/lib/data";

export default function CommitPage({
  params,
}: {
  params: Promise<{ owner: string; repo: string; sha: string }>;
}) {
  const { owner, repo, sha } = use(params);
  const base = `/${owner}/${repo}`;

  return (
    <AppShell>
      <RepoHeader owner={owner} repo={repo} />
      <div className="mx-auto max-w-5xl px-4 py-6 md:px-6">
        <h1 className="text-xl font-semibold">Commit history</h1>
        <p className="mt-1 text-sm text-muted-foreground">128 commits on <span className="font-mono">main</span></p>

        <div className="mt-6 flex flex-col gap-4">
          {commits.map((commit, idx) => {
            const isFocused = commit.sha === sha || (sha === "a1b2c3d" && idx === 0);
            return (
              <Card key={commit.sha} className={isFocused ? "border-accent/50" : ""}>
                <CardHeader className="flex-row items-start gap-3">
                  <span className="mt-0.5 inline-flex size-8 shrink-0 items-center justify-center rounded-full bg-muted">
                    <GitCommit className="size-4 text-muted-foreground" />
                  </span>
                  <div className="min-w-0 flex-1">
                    <CardTitle className="text-base leading-snug">{commit.message}</CardTitle>
                    <div className="mt-1.5 flex flex-wrap items-center gap-2 text-sm text-muted-foreground">
                      <Avatar className="size-5">
                        <AvatarFallback className="text-[0.55rem]">
                          {commit.authorHandle.slice(0, 2).toUpperCase()}
                        </AvatarFallback>
                      </Avatar>
                      <Link href={`/${commit.authorHandle}`} className="font-medium text-foreground hover:underline">
                        {commit.author}
                      </Link>
                      committed {commit.timestamp}
                    </div>
                  </div>
                  <div className="flex shrink-0 flex-col items-end gap-1">
                    <Badge variant="outline" className="font-mono">{commit.sha}</Badge>
                    <Badge variant="secondary" className="font-mono text-xs">{commit.sizeDelta}</Badge>
                  </div>
                </CardHeader>

                {isFocused && (
                  <CardContent className="flex flex-col gap-4">
                    <Separator />
                    <p className="text-sm font-medium">Changed data</p>
                    {commit.files.map((f) => (
                      <div key={f.name} className="flex flex-col gap-3 rounded-lg border border-border p-4">
                        <div className="flex flex-wrap items-center gap-2 text-sm">
                          <span className="font-mono">{f.name}</span>
                          {f.dataType && <DataTypeBadge type={f.dataType} />}
                          <span className="ml-auto flex items-center gap-2 font-mono text-xs">
                            <span className="text-chart-2">+{f.added}</span>
                            <span className="text-chart-4">~{f.changed}</span>
                            <span className="text-destructive">-{f.removed}</span>
                            <span className="text-muted-foreground">{f.unit}</span>
                          </span>
                        </div>
                        <div className="grid gap-3 sm:grid-cols-2">
                          <div className="flex flex-col gap-1.5">
                            <span className="text-xs text-muted-foreground">Before</span>
                            <MapPreview seed={commit.sha.charCodeAt(1) + 3} className="aspect-video" />
                          </div>
                          <div className="flex flex-col gap-1.5">
                            <span className="text-xs text-muted-foreground">After</span>
                            <MapPreview
                              seed={commit.sha.charCodeAt(1) + 3}
                              variant={f.dataType === "Shapefile" ? "vector" : "terrain"}
                              className="aspect-video"
                              diff={{ "2-3": "changed", "2-4": "added", "3-3": "changed", "4-8": "added", "5-8": "changed", "6-2": "removed" }}
                            />
                          </div>
                        </div>
                        <MapDiffLegend />
                      </div>
                    ))}
                  </CardContent>
                )}
              </Card>
            );
          })}
        </div>
      </div>
    </AppShell>
  );
}
