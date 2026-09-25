"use client";

import { use } from "react";
import Link from "next/link";
import {
  Code2,
  Database,
  FileText,
  Folder,
  GitBranch,
  History,
  Map as MapIcon,
  Sheet,
  Table2,
} from "lucide-react";
import { RepoHeader } from "@/components/repo-header";
import { AppShell } from "@/components/app-shell";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { MapPreview } from "@/components/map-preview";
import { DataTypeBadge } from "@/components/data-type-badge";
import { fileTree, readmeContent, getRepo, type FileNode } from "@/lib/data";

const fileIcons: Record<FileNode["type"], typeof Folder> = {
  dir: Folder,
  raster: MapIcon,
  vector: Sheet,
  table: Table2,
  text: FileText,
  model: Database,
};

export default function RepoPage({ params }: { params: Promise<{ owner: string; repo: string }> }) {
  const { owner, repo } = use(params);
  const data = getRepo(owner, repo);
  const base = `/${owner}/${repo}`;

  return (
    <AppShell>
      <RepoHeader owner={owner} repo={repo} />
      <div className="mx-auto grid max-w-7xl gap-6 px-4 py-6 md:px-6 lg:grid-cols-[1fr_300px]">
        <div className="flex min-w-0 flex-col gap-4">
          {/* Branch bar */}
          <div className="flex flex-wrap items-center gap-3">
            <Select defaultValue={data.defaultBranch}>
              <SelectTrigger className="w-44">
                <GitBranch className="size-4" />
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectItem value="main">main</SelectItem>
                  <SelectItem value="develop">develop</SelectItem>
                  <SelectItem value="levee-scenario">levee-scenario</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
            <Button variant="outline" size="sm" render={<Link href={`${base}/branches`} />}>
              <GitBranch data-icon="inline-start" />4 branches
            </Button>
            <Button variant="outline" size="sm" render={<Link href={`${base}/commit/a1b2c3d`} />}>
              <History data-icon="inline-start" />
              128 commits
            </Button>
            <div className="ml-auto">
              <Button size="sm" render={<Link href={`${base}/compare`} />}>
                <Code2 data-icon="inline-start" />
                Compare
              </Button>
            </div>
          </div>

          {/* File table */}
          <Card className="overflow-hidden py-0">
            <div className="flex items-center gap-3 border-b border-border bg-muted/30 px-4 py-3">
              <Avatar className="size-6">
                <AvatarFallback className="text-[0.6rem]">PM</AvatarFallback>
              </Avatar>
              <span className="text-sm font-medium">priyam</span>
              <span className="truncate text-sm text-muted-foreground">Re-tile DEM to Cloud-Optimized GeoTIFF</span>
              <span className="ml-auto shrink-0 font-mono text-xs text-muted-foreground">a1b2c3d · 3 hours ago</span>
            </div>
            <ul className="divide-y divide-border">
              {fileTree.map((file) => {
                const Icon = fileIcons[file.type];
                const href = file.type === "dir" ? base : `${base}/blob/${file.name}`;
                return (
                  <li key={file.name}>
                    <Link
                      href={href}
                      className="flex items-center gap-3 px-4 py-2.5 text-sm transition-colors hover:bg-muted/40"
                    >
                      <Icon className={file.type === "dir" ? "size-4 text-accent" : "size-4 text-muted-foreground"} />
                      <span className="font-medium">{file.name}</span>
                      {file.dataType && <DataTypeBadge type={file.dataType} />}
                      <span className="ml-auto hidden truncate text-muted-foreground sm:block">{file.lastCommit}</span>
                      <span className="w-16 shrink-0 text-right font-mono text-xs text-muted-foreground">{file.size}</span>
                      <span className="hidden w-24 shrink-0 text-right text-xs text-muted-foreground md:block">
                        {file.updated}
                      </span>
                    </Link>
                  </li>
                );
              })}
            </ul>
          </Card>

          {/* README */}
          <Card>
            <CardHeader className="flex-row items-center gap-2">
              <FileText className="size-4 text-muted-foreground" />
              <CardTitle className="text-base">README.md</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="prose-sm max-w-none">
                {readmeContent.split("\n\n").map((block, i) => (
                  <ReadmeBlock key={i} block={block} />
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Sidebar */}
        <aside className="flex flex-col gap-6">
          <div>
            <h3 className="mb-2 text-sm font-medium">About</h3>
            <p className="text-sm text-muted-foreground">{data.description}</p>
            <div className="mt-3 flex flex-wrap gap-1.5">
              {data.tags.map((t) => (
                <DataTypeBadge key={t} type={t} />
              ))}
            </div>
          </div>
          <Separator />
          <div className="flex flex-col gap-3 text-sm">
            <Detail label="Region" value={data.region} />
            <Detail label="Total size" value={data.size} />
            <Detail label="Default branch" value={data.defaultBranch} mono />
            <Detail label="License" value="CC BY 4.0" />
          </div>
          <Separator />
          <div>
            <h3 className="mb-3 text-sm font-medium">Latest preview</h3>
            <MapPreview seed={5} className="aspect-video" />
            <p className="mt-2 text-xs text-muted-foreground">terrain/basin_dem.tif · 2 m resolution</p>
          </div>
          <Separator />
          <div className="flex items-center gap-4 text-sm">
            <span className="flex items-center gap-1.5">
              <Badge variant="secondary">{data.stars}</Badge> stars
            </span>
            <span className="flex items-center gap-1.5">
              <Badge variant="secondary">{data.forks}</Badge> forks
            </span>
          </div>
        </aside>
      </div>
    </AppShell>
  );
}

function Detail({ label, value, mono }: { label: string; value: string; mono?: boolean }) {
  return (
    <div className="flex items-center justify-between">
      <span className="text-muted-foreground">{label}</span>
      <span className={mono ? "font-mono text-xs" : ""}>{value}</span>
    </div>
  );
}

function ReadmeBlock({ block }: { block: string }) {
  if (block.startsWith("# ")) return <h1 className="mb-2 font-serif text-2xl font-semibold">{block.slice(2)}</h1>;
  if (block.startsWith("## ")) return <h2 className="mb-2 mt-4 text-lg font-semibold">{block.slice(3)}</h2>;
  if (block.startsWith("- ")) {
    return (
      <ul className="my-2 flex list-disc flex-col gap-1 pl-5 text-sm text-muted-foreground">
        {block.split("\n").map((line, i) => (
          <li key={i}>{line.replace(/^- /, "")}</li>
        ))}
      </ul>
    );
  }
  return <p className="my-2 text-sm text-muted-foreground">{block}</p>;
}
