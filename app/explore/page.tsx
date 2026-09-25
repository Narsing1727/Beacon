"use client";

import { useMemo, useState } from "react";
import { Search } from "lucide-react";
import { AppShell } from "@/components/app-shell";
import { RepoCard } from "@/components/repo-card";
import { InputGroup, InputGroupAddon, InputGroupInput } from "@/components/ui/input-group";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { Empty, EmptyDescription, EmptyHeader, EmptyTitle } from "@/components/ui/empty";
import { repos, type DataType } from "@/lib/data";

const filters: (DataType | "All")[] = ["All", "DEM", "Shapefile", "LiDAR", "NetCDF", "HEC-RAS", "SWMM"];

export default function ExplorePage() {
  const [query, setQuery] = useState("");
  const [filter, setFilter] = useState<string>("All");

  const results = useMemo(() => {
    return repos
      .filter((r) => r.visibility === "public")
      .filter((r) => (filter === "All" ? true : r.tags.includes(filter as DataType)))
      .filter((r) =>
        query
          ? `${r.owner}/${r.name} ${r.description} ${r.region}`.toLowerCase().includes(query.toLowerCase())
          : true,
      );
  }, [query, filter]);

  return (
    <AppShell>
      <div className="border-b border-border/20 bg-transparent">
        <div className="mx-auto max-w-7xl px-4 py-8 md:px-6">
          <h1 className="font-serif text-3xl font-semibold md:text-4xl">Explore public repositories</h1>
          <p className="mt-2 max-w-2xl text-sm text-muted-foreground">
            Open datasets, published basin models, and shared elevation tiles contributed by the community.
          </p>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-4 py-8 md:px-6">
        <div className="flex flex-col gap-4">
          <InputGroup className="max-w-md">
            <InputGroupAddon>
              <Search className="text-muted-foreground" />
            </InputGroupAddon>
            <InputGroupInput
              placeholder="Search by name, tag, or region…"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
          </InputGroup>

          <ToggleGroup
            value={[filter]}
            onValueChange={(v) => setFilter(v[0] ?? "All")}
            variant="outline"
            className="flex-wrap"
          >
            {filters.map((f) => (
              <ToggleGroupItem key={f} value={f}>
                {f}
              </ToggleGroupItem>
            ))}
          </ToggleGroup>
        </div>

        {results.length > 0 ? (
          <div className="mt-8 grid gap-0 divide-y divide-border/20 border border-border/20 sm:grid-cols-2 lg:grid-cols-3 sm:divide-y-0 sm:divide-x">
            {results.map((r) => (
              <RepoCard key={`${r.owner}/${r.name}`} repo={r} />
            ))}
          </div>
        ) : (
          <Empty className="mt-12">
            <EmptyHeader>
              <EmptyTitle>No repositories found</EmptyTitle>
              <EmptyDescription>Try a different search term or data-type filter.</EmptyDescription>
            </EmptyHeader>
          </Empty>
        )}
      </div>
    </AppShell>
  );
}
