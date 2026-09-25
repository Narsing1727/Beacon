import Link from "next/link";
import { Tag, Download, Database, GitCommit } from "lucide-react";
import { AppShell } from "@/components/app-shell";
import { RepoHeader } from "@/components/repo-header";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { releases } from "@/lib/data";

export default async function ReleasesPage({
  params,
}: {
  params: Promise<{ owner: string; repo: string }>;
}) {
  const { owner, repo } = await params;

  return (
    <AppShell>
      <RepoHeader owner={owner} repo={repo} />
      <div className="mx-auto max-w-7xl px-4 py-6 md:px-6">
        <div className="flex items-center justify-between gap-3">
          <div>
            <h1 className="text-xl font-semibold tracking-tight">Releases &amp; tags</h1>
            <p className="text-sm text-muted-foreground">
              Immutable, versioned snapshots of the full dataset with pinned checksums.
            </p>
          </div>
          <Button>
            <Tag data-icon="inline-start" />
            Draft a new release
          </Button>
        </div>

        <div className="mt-6 flex flex-col gap-5 md:grid md:grid-cols-[220px_1fr]">
          <aside className="hidden md:block">
            <ol className="flex flex-col gap-3 border-l border-border pl-4 text-sm">
              {releases.map((r) => (
                <li key={r.version} className="relative">
                  <span className="absolute -left-[22px] top-1.5 size-2.5 rounded-full bg-accent" />
                  <Link href="#" className="font-medium hover:text-accent hover:underline">
                    {r.version}
                  </Link>
                  <p className="text-xs text-muted-foreground">{r.date}</p>
                </li>
              ))}
            </ol>
          </aside>

          <div className="flex flex-col gap-5">
            {releases.map((r) => (
              <Card key={r.version}>
                <CardHeader className="flex flex-wrap items-center gap-2">
                  <Tag className="size-4 text-accent" />
                  <span className="font-semibold">{r.version}</span>
                  {r.latest && <Badge>Latest</Badge>}
                  <span className="flex items-center gap-1 text-xs text-muted-foreground">
                    <GitCommit className="size-3.5" />
                    <code className="font-mono">{r.sha}</code>
                  </span>
                  <span className="ml-auto text-xs text-muted-foreground">
                    {r.author} released this on {r.date}
                  </span>
                </CardHeader>
                <CardContent className="flex flex-col gap-4">
                  <h2 className="text-base font-medium">{r.title}</h2>
                  <p className="text-sm text-muted-foreground">{r.notes}</p>
                  <Separator />
                  <div className="flex flex-wrap items-center gap-2">
                    <Button variant="outline" size="sm">
                      <Database data-icon="inline-start" />
                      Full dataset
                      <Badge variant="secondary" className="ml-1">{r.size}</Badge>
                    </Button>
                    <Button variant="outline" size="sm">
                      <Download data-icon="inline-start" />
                      Source (zip)
                    </Button>
                    <Button variant="ghost" size="sm">
                      Checksums
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </AppShell>
  );
}
