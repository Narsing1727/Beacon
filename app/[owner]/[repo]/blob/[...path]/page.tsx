"use client";

import { use } from "react";
import Link from "next/link";
import { Copy, Download, History, Pencil, Ruler } from "lucide-react";
import { AppShell } from "@/components/app-shell";
import { RepoHeader } from "@/components/repo-header";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from "@/components/ui/breadcrumb";
import { MapPreview } from "@/components/map-preview";
import { DataTypeBadge } from "@/components/data-type-badge";

const metadata = [
  { label: "Format", value: "Cloud-Optimized GeoTIFF" },
  { label: "CRS", value: "EPSG:32643 (UTM 43N)" },
  { label: "Resolution", value: "2 m × 2 m" },
  { label: "Dimensions", value: "18,240 × 12,880" },
  { label: "Bands", value: "1 (elevation, Float32)" },
  { label: "Elevation range", value: "3.2 m – 842.6 m" },
  { label: "Nodata", value: "-9999" },
  { label: "Size", value: "2.8 GB" },
];

export default function FileViewPage({
  params,
}: {
  params: Promise<{ owner: string; repo: string; path: string[] }>;
}) {
  const { owner, repo, path } = use(params);
  const base = `/${owner}/${repo}`;
  const filename = path[path.length - 1];

  return (
    <AppShell>
      <RepoHeader owner={owner} repo={repo} />
      <div className="mx-auto max-w-7xl px-4 py-6 md:px-6">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbLink render={<Link href={base} />}>{repo}</BreadcrumbLink>
              </BreadcrumbItem>
              {path.slice(0, -1).map((seg) => (
                <span key={seg} className="flex items-center gap-2">
                  <BreadcrumbSeparator />
                  <BreadcrumbItem>
                    <BreadcrumbLink render={<Link href={base} />}>{seg}</BreadcrumbLink>
                  </BreadcrumbItem>
                </span>
              ))}
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbPage className="font-mono">{filename}</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm" render={<Link href={`${base}/commit/a1b2c3d`} />}>
              <History data-icon="inline-start" />
              History
            </Button>
            <Button variant="outline" size="sm">
              <Pencil data-icon="inline-start" />
              Edit
            </Button>
            <Button variant="outline" size="sm">
              <Download data-icon="inline-start" />
              Download
            </Button>
          </div>
        </div>

        <div className="mt-4 grid gap-6 lg:grid-cols-[1fr_300px]">
          <Card className="overflow-hidden py-0">
            <div className="flex items-center gap-2 border-b border-border bg-muted/30 px-4 py-3 text-sm">
              <span className="font-mono">{filename}</span>
              <DataTypeBadge type="DEM" />
              <Badge variant="secondary" className="ml-auto">Raster preview</Badge>
            </div>
            <CardContent className="p-4">
              <MapPreview seed={21} className="aspect-[16/10]" />
              <div className="mt-3 flex items-center justify-between text-xs text-muted-foreground">
                <span className="flex items-center gap-1.5">
                  <Ruler className="size-3.5" />
                  Hillshade rendering · elevation ramp
                </span>
                <span className="font-mono">3.2 m — 842.6 m</span>
              </div>
            </CardContent>
          </Card>

          <div className="flex flex-col gap-4">
            <Card>
              <CardHeader>
                <CardTitle className="text-base">Metadata</CardTitle>
              </CardHeader>
              <CardContent className="flex flex-col gap-2.5 text-sm">
                {metadata.map((m) => (
                  <div key={m.label} className="flex items-center justify-between gap-2">
                    <span className="text-muted-foreground">{m.label}</span>
                    <span className="text-right font-mono text-xs">{m.value}</span>
                  </div>
                ))}
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle className="text-base">Access from code</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center gap-2 rounded-md border border-border bg-muted/40 p-2 font-mono text-xs">
                  <span className="truncate">beacon pull {owner}/{repo}</span>
                  <Copy className="ml-auto size-3.5 shrink-0 text-muted-foreground" />
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </AppShell>
  );
}
