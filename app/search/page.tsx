import Link from "next/link";
import { Search, BookMarked, FileCode, Users, Building2 } from "lucide-react";
import { AppShell } from "@/components/app-shell";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "@/components/ui/input-group";
import { RepoCard } from "@/components/repo-card";
import { DataTypeBadge } from "@/components/data-type-badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { repos, orgMembers, fileTree } from "@/lib/data";

const filters = [
  { label: "Repositories", icon: BookMarked, count: repos.length, active: true },
  { label: "Code", icon: FileCode, count: 24 },
  { label: "Datasets", icon: BookMarked, count: 11 },
  { label: "People", icon: Users, count: orgMembers.length },
  { label: "Organizations", icon: Building2, count: 2 },
];

export default async function SearchPage({
  searchParams,
}: {
  searchParams: Promise<{ q?: string }>;
}) {
  const { q } = await searchParams;
  const query = q ?? "basin";
  const codeMatches = fileTree.filter((f) => f.dataType).slice(0, 4);

  return (
    <AppShell>
      <div className="mx-auto max-w-7xl px-4 py-6 md:px-6">
        <InputGroup className="max-w-2xl">
          <InputGroupAddon>
            <Search />
          </InputGroupAddon>
          <InputGroupInput defaultValue={query} placeholder="Search Beacon" />
        </InputGroup>

        <div className="mt-6 grid gap-6 md:grid-cols-[220px_1fr]">
          <aside className="flex flex-col gap-1 text-sm">
            {filters.map((f) => (
              <Link
                key={f.label}
                href={`/search?q=${encodeURIComponent(query)}&type=${f.label.toLowerCase()}`}
                className={
                  f.active
                    ? "flex items-center justify-between rounded-md bg-muted px-3 py-2 font-medium"
                    : "flex items-center justify-between rounded-md px-3 py-2 text-muted-foreground hover:bg-muted/50 hover:text-foreground"
                }
              >
                <span className="flex items-center gap-2">
                  <f.icon className="size-4" />
                  {f.label}
                </span>
                <Badge variant="secondary">{f.count}</Badge>
              </Link>
            ))}
          </aside>

          <div className="min-w-0">
            <p className="text-sm text-muted-foreground">
              {repos.length} repository results for{" "}
              <span className="font-medium text-foreground">&ldquo;{query}&rdquo;</span>
            </p>

            <div className="mt-4 grid gap-4">
              {repos.map((r) => (
                <RepoCard key={`${r.owner}/${r.name}`} repo={r} />
              ))}
            </div>

            <h2 className="mt-8 text-sm font-semibold text-muted-foreground">Code results</h2>
            <div className="mt-3 flex flex-col gap-2">
              {codeMatches.map((f) => (
                <Card key={f.name}>
                  <CardContent className="flex items-center gap-3 py-3">
                    <FileCode className="size-4 text-muted-foreground" />
                    <code className="font-mono text-sm">{f.name}</code>
                    {f.dataType && <DataTypeBadge type={f.dataType} />}
                    <span className="ml-auto text-xs text-muted-foreground">{f.size}</span>
                  </CardContent>
                </Card>
              ))}
            </div>

            <h2 className="mt-8 text-sm font-semibold text-muted-foreground">People</h2>
            <div className="mt-3 grid gap-3 sm:grid-cols-2">
              {orgMembers.map((m) => (
                <Card key={m.handle}>
                  <CardContent className="flex items-center gap-3 py-3">
                    <Avatar className="size-9">
                      <AvatarFallback>{m.handle.slice(0, 2).toUpperCase()}</AvatarFallback>
                    </Avatar>
                    <div>
                      <Link href={`/${m.handle}`} className="text-sm font-medium hover:text-accent hover:underline">
                        {m.name}
                      </Link>
                      <p className="text-xs text-muted-foreground">{m.handle}</p>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </div>
    </AppShell>
  );
}
