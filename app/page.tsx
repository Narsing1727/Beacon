import Link from "next/link";
import {
  ArrowRight,
  Box,
  GitCompare,
  GitPullRequest,
  HardDrive,
  ShieldCheck,
  Upload,
} from "lucide-react";
import { AppShell } from "@/components/app-shell";
import { DataTypeBadge } from "@/components/data-type-badge";
import { MapPreview, MapDiffLegend } from "@/components/map-preview";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { repos } from "@/lib/data";

const entryPoints = [
  {
    icon: Upload,
    title: "Push a field project",
    body: "Version a HEC-RAS, HMS, SWMM, MIKE, or EPANET project alongside its terrain and boundary data.",
    href: "/new",
    action: "Create repository",
  },
  {
    icon: GitCompare,
    title: "Review a spatial change",
    body: "Compare tiles, vector features, grids, and configuration files before a model change reaches main.",
    href: "/hydrolab/chalakudy-basin/compare",
    action: "Open map diff",
  },
  {
    icon: ShieldCheck,
    title: "Verify a submission",
    body: "Keep the commit, source data, and Merkle proof together for an audit-ready project history.",
    href: "/hydrolab/chalakudy-basin/commit/a1b2c3d",
    action: "View provenance",
  },
];

export default function HomePage() {
  const project = repos[0];

  return (
    <AppShell>
      <section className="border-b border-border/30">
        <div className="mx-auto flex max-w-7xl flex-col gap-6 px-4 py-8 md:px-6 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <div className="font-mono text-xs text-muted-foreground">nerolith / beacon</div>
            <h1 className="mt-2 font-serif text-3xl font-semibold md:text-4xl">Hydro project version control</h1>
            <p className="mt-2 max-w-2xl text-sm leading-relaxed text-muted-foreground">
              A working repository for terrain, surveys, model inputs, and results. Beacon keeps the exact data history your team needs to review, reproduce, and certify.
            </p>
          </div>
          <div className="flex flex-wrap gap-2">
            <Button render={<Link href="/new" />}>
              <Upload data-icon="inline-start" />
              New repository
            </Button>
            <Button variant="outline" render={<Link href="/explore" />}>
              Browse public data
            </Button>
          </div>
        </div>
      </section>

      <section className="mx-auto grid max-w-7xl gap-6 px-4 py-6 md:px-6 lg:grid-cols-[minmax(0,1fr)_300px]">
        <div className="border border-border/30">
          <div className="flex flex-wrap items-center justify-between gap-3 border-b border-border/30 px-4 py-3">
            <div className="flex items-center gap-2">
              <Box className="size-4 text-accent" />
              <Link href={`/${project.owner}/${project.name}`} className="font-mono text-sm font-semibold hover:underline">
                {project.owner}/{project.name}
              </Link>
              <Badge variant="outline">{project.visibility}</Badge>
            </div>
            <span className="font-mono text-xs text-muted-foreground">main @ a1b2c3d</span>
          </div>

          <div className="grid gap-5 p-4 md:grid-cols-[minmax(0,1fr)_240px]">
            <div>
              <div className="flex items-center justify-between gap-3">
                <div>
                  <p className="text-sm font-medium">Latest verified change</p>
                  <p className="mt-1 text-xs text-muted-foreground">Re-tile DEM to Cloud-Optimized GeoTIFF</p>
                </div>
                <Badge variant="secondary" className="font-mono">+42 MB unique</Badge>
              </div>
              <div className="mt-4 grid gap-3 sm:grid-cols-2">
                <MapPreview seed={12} className="aspect-video" />
                <MapPreview
                  seed={12}
                  className="aspect-video"
                  diff={{ "2-4": "changed", "2-5": "changed", "3-4": "changed", "3-5": "added", "5-9": "added", "6-9": "changed" }}
                />
              </div>
              <div className="mt-3 flex flex-wrap items-center justify-between gap-3">
                <MapDiffLegend />
                <Button size="sm" variant="outline" render={<Link href={`/${project.owner}/${project.name}/compare`} />}>
                  Inspect change <ArrowRight data-icon="inline-end" />
                </Button>
              </div>
            </div>

            <div className="flex flex-col gap-4 border-t border-border/30 pt-4 text-xs md:border-l md:border-t-0 md:pl-4 md:pt-0">
              <div>
                <span className="text-muted-foreground">Data in this commit</span>
                <div className="mt-2 flex flex-wrap gap-1.5">
                  {project.tags.map((tag) => <DataTypeBadge key={tag} type={tag} />)}
                </div>
              </div>
              <div className="border-y border-border/20 py-3">
                <span className="block text-muted-foreground">Change summary</span>
                <span className="mt-1 block leading-relaxed">320 terrain tiles updated. No connectivity breaks detected.</span>
              </div>
              <div>
                <span className="block text-muted-foreground">Integrity proof</span>
                <span className="mt-1 block font-mono text-[11px] text-emerald-400">verified · 7f9ac32b…98112</span>
              </div>
            </div>
          </div>
        </div>

        <aside className="flex flex-col gap-4">
          <div className="border border-border/30 p-4">
            <div className="flex items-center gap-2 text-sm font-medium"><HardDrive className="size-4 text-accent" /> Storage</div>
            <div className="mt-4 flex items-end justify-between font-mono">
              <span className="text-2xl font-bold">4.8 GB</span>
              <span className="text-xs text-muted-foreground">of 20 GB unique</span>
            </div>
            <div className="mt-3 h-1.5 bg-muted"><div className="h-full w-[24%] bg-foreground" /></div>
            <p className="mt-3 text-xs leading-relaxed text-muted-foreground">Shared public terrain and rainfall layers are deduplicated before they count toward storage.</p>
          </div>
          <div className="border border-border/30 p-4">
            <div className="flex items-center gap-2 text-sm font-medium"><GitPullRequest className="size-4 text-accent" /> Review queue</div>
            <Link href="/hydrolab/chalakudy-basin/pull/142" className="mt-4 block border-l-2 border-chart-2 pl-3 text-xs hover:text-foreground">
              <span className="font-mono text-muted-foreground">#142 · 2 reviewers</span>
              <span className="mt-1 block leading-relaxed">Levee scenario: raise embankment crest by 0.5 m</span>
            </Link>
          </div>
        </aside>
      </section>

      <section className="border-t border-border/30">
        <div className="mx-auto grid max-w-7xl gap-px px-4 py-6 md:grid-cols-3 md:px-6">
          {entryPoints.map((item) => (
            <Link key={item.title} href={item.href} className="group border border-border/30 p-5 transition-colors hover:bg-muted/30">
              <item.icon className="size-4 text-accent" />
              <h2 className="mt-5 text-sm font-semibold">{item.title}</h2>
              <p className="mt-2 text-xs leading-relaxed text-muted-foreground">{item.body}</p>
              <span className="mt-5 flex items-center gap-1 text-xs font-medium group-hover:underline">{item.action}<ArrowRight className="size-3" /></span>
            </Link>
          ))}
        </div>
      </section>
    </AppShell>
  );
}
