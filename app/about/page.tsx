import Link from "next/link";
import { Waves, GitBranch, Globe, ShieldCheck, Users, Database } from "lucide-react";
import { AppShell } from "@/components/app-shell";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { MapPreview } from "@/components/map-preview";

const values = [
  {
    icon: GitBranch,
    title: "Version control for data",
    body: "Every DEM, shapefile, and model plan is tracked with content-addressed diffs so you can branch, review, and roll back terabytes safely.",
  },
  {
    icon: Globe,
    title: "Built for the field",
    body: "Native handling for GeoTIFF, LiDAR, NetCDF, and hydraulic model formats — no proprietary silos, no lossy re-exports.",
  },
  {
    icon: ShieldCheck,
    title: "Reproducible science",
    body: "Pinned releases with checksums mean a flood study run today can be reproduced byte-for-byte years from now.",
  },
];

const stats = [
  { icon: Database, value: "18 PB", label: "of terrain hosted" },
  { icon: Users, value: "9,400+", label: "engineers & researchers" },
  { icon: GitBranch, value: "2.1M", label: "dataset commits" },
];

export default function AboutPage() {
  return (
    <AppShell>
      <section className="border-b border-border">
        <div className="mx-auto grid max-w-7xl items-center gap-10 px-4 py-16 md:grid-cols-2 md:px-6">
          <div className="flex flex-col gap-5">
            <div className="flex w-fit items-center gap-2 rounded-full border border-border bg-card px-3 py-1 text-xs text-muted-foreground">
              <Waves className="size-3.5 text-accent" />
              Our mission
            </div>
            <h1 className="text-4xl font-semibold tracking-tight text-balance">
              Git for the people who model water
            </h1>
            <p className="text-lg text-muted-foreground text-pretty">
              Beacon gives hydrologists, flood modellers, and GIS engineers a real
              version-control platform for the massive geospatial datasets their work
              depends on.
            </p>
            <div className="flex gap-3">
              <Button render={<Link href="/explore" />}>Explore datasets</Button>
              <Button variant="outline" render={<Link href="/contact" />}>
                Contact us
              </Button>
            </div>
          </div>
          <MapPreview seed={12} variant="vector" className="aspect-[4/3] w-full" />
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-14 md:px-6">
        <div className="grid gap-4 md:grid-cols-3">
          {values.map((v) => (
            <Card key={v.title}>
              <CardHeader>
                <div className="flex size-10 items-center justify-center rounded-lg bg-accent/15 text-accent">
                  <v.icon className="size-5" />
                </div>
                <CardTitle className="mt-2">{v.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">{v.body}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      <section className="border-t border-border bg-card/40">
        <div className="mx-auto grid max-w-7xl gap-6 px-4 py-12 sm:grid-cols-3 md:px-6">
          {stats.map((s) => (
            <div key={s.label} className="flex flex-col items-center gap-1 text-center">
              <s.icon className="size-6 text-accent" />
              <p className="text-3xl font-semibold">{s.value}</p>
              <p className="text-sm text-muted-foreground">{s.label}</p>
            </div>
          ))}
        </div>
      </section>
    </AppShell>
  );
}
