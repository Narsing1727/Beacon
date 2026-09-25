import Link from "next/link";
import { Home, Compass } from "lucide-react";
import { AppShell } from "@/components/app-shell";
import { Button } from "@/components/ui/button";
import { MapPreview } from "@/components/map-preview";

export default function NotFound() {
  return (
    <AppShell>
      <div className="mx-auto flex min-h-[70vh] max-w-2xl flex-col items-center justify-center px-4 py-16 text-center md:px-6">
        <div className="relative w-full max-w-md">
          <MapPreview seed={404} variant="vector" className="aspect-[16/9] w-full opacity-60" />
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="font-mono text-6xl font-bold tracking-tighter text-foreground/90 drop-shadow">
              404
            </span>
          </div>
        </div>
        <h1 className="mt-8 text-2xl font-semibold tracking-tight">
          This tile is off the map
        </h1>
        <p className="mt-2 max-w-md text-sm text-muted-foreground">
          The page you&apos;re looking for has no coordinates. It may have been moved,
          renamed, or the dataset was never committed.
        </p>
        <div className="mt-6 flex flex-wrap justify-center gap-3">
          <Button render={<Link href="/" />}>
            <Home data-icon="inline-start" />
            Back home
          </Button>
          <Button variant="outline" render={<Link href="/explore" />}>
            <Compass data-icon="inline-start" />
            Explore datasets
          </Button>
        </div>
      </div>
    </AppShell>
  );
}
