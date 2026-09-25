import Link from "next/link";
import { BookOpen, Pencil, Search } from "lucide-react";
import { AppShell } from "@/components/app-shell";
import { RepoHeader } from "@/components/repo-header";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "@/components/ui/input-group";
import { MapPreview } from "@/components/map-preview";

const pages = [
  "Home",
  "Calibration methodology",
  "Terrain processing pipeline",
  "Gauge network",
  "Boundary conditions",
  "Datum & projections",
  "Changelog",
];

export default async function WikiPage({
  params,
}: {
  params: Promise<{ owner: string; repo: string }>;
}) {
  const { owner, repo } = await params;

  return (
    <AppShell>
      <RepoHeader owner={owner} repo={repo} />
      <div className="mx-auto max-w-7xl px-4 py-6 md:px-6">
        <div className="grid gap-6 md:grid-cols-[240px_1fr]">
          <aside className="flex flex-col gap-3">
            <InputGroup>
              <InputGroupAddon>
                <Search />
              </InputGroupAddon>
              <InputGroupInput placeholder="Search wiki" />
            </InputGroup>
            <nav className="flex flex-col gap-0.5 text-sm">
              {pages.map((p, i) => (
                <Link
                  key={p}
                  href={`?page=${encodeURIComponent(p.toLowerCase().replaceAll(" ", "-"))}`}
                  className={
                    i === 1
                      ? "rounded-md bg-muted px-3 py-2 font-medium text-foreground"
                      : "rounded-md px-3 py-2 text-muted-foreground hover:bg-muted/50 hover:text-foreground"
                  }
                >
                  {p}
                </Link>
              ))}
            </nav>
          </aside>

          <article className="min-w-0">
            <div className="flex items-center justify-between gap-3">
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <BookOpen className="size-4" />
                Wiki
              </div>
              <Button variant="outline" size="sm">
                <Pencil data-icon="inline-start" />
                Edit page
              </Button>
            </div>

            <h1 className="mt-3 text-2xl font-semibold tracking-tight">
              Calibration methodology
            </h1>
            <p className="mt-1 text-xs text-muted-foreground">
              Last edited by priyam · 1 week ago
            </p>
            <Separator className="my-4" />

            <div className="flex flex-col gap-4 text-sm leading-relaxed text-muted-foreground">
              <p>
                The 2D HEC-RAS model of the Chalakudy basin was calibrated against the
                2018 monsoon flood, the largest event with reliable high-water marks.
                Roughness coefficients were adjusted per land-cover class until modelled
                stage matched observed marks within ±0.15 m.
              </p>
              <h2 className="text-base font-semibold text-foreground">Terrain</h2>
              <p>
                The bare-earth DEM is a 2 m grid derived from the 2024 LiDAR survey. The
                figure below shows the modelled inundation extent for the calibration
                event over the terrain mesh.
              </p>
              <MapPreview seed={22} variant="vector" className="aspect-[16/7] w-full" />
              <h2 className="text-base font-semibold text-foreground">Roughness values</h2>
              <p>
                Manning&apos;s n ranges from 0.028 in the main channel to 0.12 for dense
                riparian vegetation. Final values and the Nash–Sutcliffe efficiency for
                each gauge are recorded in the model&apos;s plan file.
              </p>
            </div>
          </article>
        </div>
      </div>
    </AppShell>
  );
}
