"use client";

import { use } from "react";
import Link from "next/link";
import { ArrowLeftRight, GitPullRequest } from "lucide-react";
import { AppShell } from "@/components/app-shell";
import { RepoHeader } from "@/components/repo-header";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { MapPreview, MapDiffLegend } from "@/components/map-preview";
import { DataTypeBadge } from "@/components/data-type-badge";

const changedFiles = [
  {
    name: "terrain/basin_dem.tif",
    type: "DEM" as const,
    variant: "terrain" as const,
    stats: "320 tiles changed",
    diff: { "2-4": "changed", "2-5": "changed", "3-4": "added", "3-5": "added", "6-9": "changed", "7-9": "changed" } as Record<string, "added" | "removed" | "changed">,
  },
  {
    name: "vectors/levees.shp",
    type: "Shapefile" as const,
    variant: "vector" as const,
    stats: "86 features added",
    diff: { "4-2": "added", "4-3": "added", "5-3": "added", "5-4": "added" } as Record<string, "added" | "removed" | "changed">,
  },
];

export default function ComparePage({
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
        <h1 className="text-xl font-semibold">Compare changes</h1>
        <p className="mt-1 text-sm text-muted-foreground">
          Choose two branches to see what changed on the map between them.
        </p>

        <Card className="mt-6">
          <CardContent className="flex flex-wrap items-center gap-3">
            <span className="text-sm text-muted-foreground">base</span>
            <Select defaultValue="main">
              <SelectTrigger className="w-40">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectItem value="main">main</SelectItem>
                  <SelectItem value="develop">develop</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
            <ArrowLeftRight className="size-4 text-muted-foreground" />
            <span className="text-sm text-muted-foreground">compare</span>
            <Select defaultValue="levee-scenario">
              <SelectTrigger className="w-44">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectItem value="levee-scenario">levee-scenario</SelectItem>
                  <SelectItem value="lidar-2024-update">lidar-2024-update</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
            <div className="ml-auto flex items-center gap-2">
              <Badge variant="outline" className="gap-1">
                <span className="text-chart-2">+406</span>
                <span className="text-destructive">-12</span>
              </Badge>
              <Button size="sm" render={<Link href={`${base}/pull/142`} />}>
                <GitPullRequest data-icon="inline-start" />
                Create pull request
              </Button>
            </div>
          </CardContent>
        </Card>

        <div className="mt-6 flex items-center gap-3 text-sm text-muted-foreground">
          <Badge variant="secondary">2 files changed</Badge>
          <MapDiffLegend />
        </div>

        <div className="mt-4 flex flex-col gap-4">
          {changedFiles.map((file) => (
            <Card key={file.name} className="overflow-hidden py-0">
              <CardHeader className="flex-row items-center gap-2 border-b border-border bg-muted/30 py-3">
                <CardTitle className="font-mono text-sm">{file.name}</CardTitle>
                <DataTypeBadge type={file.type} />
                <Badge variant="secondary" className="ml-auto">{file.stats}</Badge>
              </CardHeader>
              <CardContent className="grid gap-3 p-4 sm:grid-cols-2">
                <div className="flex flex-col gap-1.5">
                  <span className="text-xs text-muted-foreground">main</span>
                  <MapPreview seed={file.name.length * 4} variant={file.variant} className="aspect-video" />
                </div>
                <div className="flex flex-col gap-1.5">
                  <span className="text-xs text-muted-foreground">levee-scenario</span>
                  <MapPreview seed={file.name.length * 4} variant={file.variant} className="aspect-video" diff={file.diff} />
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </AppShell>
  );
}
