import Link from "next/link";
import { AppShell } from "@/components/app-shell";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";

const nav = [
  { heading: "Getting started", items: ["Introduction", "Install the CLI", "Your first repository", "Authentication"] },
  { heading: "Working with data", items: ["Supported formats", "Chunking & deduplication", "Large file workflow", "Map diffs"] },
  { heading: "Collaboration", items: ["Branches", "Pull requests", "Reviews", "Provenance"] },
  { heading: "Reference", items: ["CLI commands", "REST API", "Webhooks", "Rate limits"] },
];

const formats = [
  { type: "Rasters", exts: ".tif · .tiff · .img · .vrt", note: "Auto-converted to Cloud-Optimized GeoTIFF" },
  { type: "Vectors", exts: ".shp · .geojson · .gpkg · .kml", note: "Indexed by feature for diffing" },
  { type: "Point clouds", exts: ".las · .laz · .copc", note: "Stored as Cloud-Optimized Point Clouds" },
  { type: "Grids", exts: ".nc · .zarr · .grib", note: "Chunked along spatial + time axes" },
  { type: "Models", exts: "HEC-RAS · HEC-HMS · SWMM · EPANET", note: "Versioned as structured projects" },
];

export default function DocsPage() {
  return (
    <AppShell>
      <div className="mx-auto grid max-w-7xl gap-10 px-4 py-10 md:grid-cols-[220px_1fr] md:px-6">
        <aside className="hidden md:block">
          <nav className="sticky top-20 flex flex-col gap-6">
            {nav.map((section) => (
              <div key={section.heading} className="flex flex-col gap-2">
                <h3 className="text-sm font-medium">{section.heading}</h3>
                <ul className="flex flex-col gap-1.5 border-l border-border pl-3">
                  {section.items.map((item) => (
                    <li key={item}>
                      <Link href={`#${item.toLowerCase().replaceAll(" ", "-")}`} className="text-sm text-muted-foreground transition-colors hover:text-foreground">
                        {item}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </nav>
        </aside>

        <div className="min-w-0">
          <Badge variant="secondary">Getting started</Badge>
          <h1 className="mt-3 font-serif text-4xl font-semibold">Introduction</h1>
          <p className="mt-3 text-lg text-muted-foreground">
            Beacon brings the git workflow to geospatial data. This guide gets you from install to your
            first versioned basin model.
          </p>

          <Separator className="my-8" />

          <h2 id="install-the-cli" className="font-serif text-2xl font-semibold">Install the CLI</h2>
          <p className="mt-2 text-muted-foreground">Beacon works on macOS, Linux, and Windows.</p>
          <pre className="mt-4 overflow-x-auto rounded-lg border border-border bg-muted/40 p-4 font-mono text-sm">
{`# macOS / Linux
curl -fsSL https://beacon.dev/install | sh

# verify
beacon --version`}
          </pre>

          <h2 id="your-first-repository" className="mt-10 font-serif text-2xl font-semibold">Your first repository</h2>
          <pre className="mt-4 overflow-x-auto rounded-lg border border-border bg-muted/40 p-4 font-mono text-sm">
{`beacon init chalakudy-basin
beacon add terrain/ vectors/ model/
beacon commit -m "Initial import"
beacon push -u origin main`}
          </pre>

          <h2 id="supported-formats" className="mt-10 font-serif text-2xl font-semibold">Supported formats</h2>
          <div className="mt-4 grid gap-3 sm:grid-cols-2">
            {formats.map((f) => (
              <Card key={f.type}>
                <CardHeader>
                  <CardTitle className="text-base">{f.type}</CardTitle>
                  <CardDescription className="font-mono text-xs">{f.exts}</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">{f.note}</p>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="mt-10 flex items-center gap-3 rounded-lg border border-accent/30 bg-accent/5 p-4">
            <p className="text-sm text-muted-foreground">
              Looking for endpoints and parameters? See the full{" "}
              <Link href="/api-reference" className="text-accent hover:underline">
                API reference
              </Link>
              .
            </p>
          </div>
        </div>
      </div>
    </AppShell>
  );
}
