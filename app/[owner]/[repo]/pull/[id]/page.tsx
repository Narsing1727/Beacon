"use client";

import { use } from "react";
import Link from "next/link";
import { Check, CheckCircle2, GitMerge, GitPullRequest, MessageSquare } from "lucide-react";
import { AppShell } from "@/components/app-shell";
import { RepoHeader } from "@/components/repo-header";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { InputGroup, InputGroupAddon, InputGroupTextarea, InputGroupButton } from "@/components/ui/input-group";
import { MapPreview, MapDiffLegend } from "@/components/map-preview";
import { DataTypeBadge } from "@/components/data-type-badge";
import { pullRequests } from "@/lib/data";

const timeline = [
  { actor: "arunn", text: "opened this pull request from levee-scenario", time: "2 hours ago", kind: "event" as const },
  {
    actor: "arunn",
    text: "Raised the embankment crest by 0.5 m along the right bank and re-ran the 100-yr event. Inundation extent drops noticeably near the confluence.",
    time: "2 hours ago",
    kind: "comment" as const,
  },
  { actor: "priyam", text: "Nice — can you confirm the datum matches the 2024 DEM before we merge?", time: "1 hour ago", kind: "comment" as const },
  { actor: "sarat", text: "approved these changes", time: "40 minutes ago", kind: "approve" as const },
];

export default function PullDetailPage({
  params,
}: {
  params: Promise<{ owner: string; repo: string; id: string }>;
}) {
  const { owner, repo, id } = use(params);
  const base = `/${owner}/${repo}`;
  const pr = pullRequests.find((p) => String(p.id) === id) ?? pullRequests[0];

  return (
    <AppShell>
      <RepoHeader owner={owner} repo={repo} />
      <div className="mx-auto max-w-5xl px-4 py-6 md:px-6">
        <div className="flex flex-col gap-2">
          <h1 className="text-2xl font-semibold">
            {pr.title} <span className="font-normal text-muted-foreground">#{pr.id}</span>
          </h1>
          <div className="flex flex-wrap items-center gap-3">
            <Badge className="gap-1 bg-chart-2/15 text-chart-2 border border-chart-2/40">
              <GitPullRequest className="size-3.5" />
              Open
            </Badge>
            <span className="text-sm text-muted-foreground">
              <span className="font-medium text-foreground">{pr.author}</span> wants to merge{" "}
              <span className="font-mono text-xs">{pr.source}</span> into{" "}
              <span className="font-mono text-xs">{pr.target}</span>
            </span>
          </div>
        </div>

        <div className="mt-6 grid gap-6 lg:grid-cols-[1fr_280px]">
          <div className="min-w-0">
            <Tabs defaultValue="conversation">
              <TabsList>
                <TabsTrigger value="conversation">
                  <MessageSquare data-icon="inline-start" />
                  Conversation
                </TabsTrigger>
                <TabsTrigger value="diff">
                  <GitMerge data-icon="inline-start" />
                  Map diff
                </TabsTrigger>
              </TabsList>

              <TabsContent value="conversation" className="flex flex-col gap-4 pt-4">
                {timeline.map((item, i) =>
                  item.kind === "comment" ? (
                    <Card key={i}>
                      <CardHeader className="flex-row items-center gap-2 border-b border-border pb-3">
                        <Avatar className="size-6">
                          <AvatarFallback className="text-[0.6rem]">{item.actor.slice(0, 2).toUpperCase()}</AvatarFallback>
                        </Avatar>
                        <span className="text-sm font-medium">{item.actor}</span>
                        <span className="text-xs text-muted-foreground">commented {item.time}</span>
                      </CardHeader>
                      <CardContent className="pt-3 text-sm text-muted-foreground">{item.text}</CardContent>
                    </Card>
                  ) : (
                    <div key={i} className="flex items-center gap-2 pl-2 text-sm text-muted-foreground">
                      {item.kind === "approve" ? (
                        <CheckCircle2 className="size-4 text-chart-2" />
                      ) : (
                        <GitPullRequest className="size-4" />
                      )}
                      <span className="font-medium text-foreground">{item.actor}</span> {item.text}
                      <span className="text-xs">· {item.time}</span>
                    </div>
                  ),
                )}

                <Card>
                  <CardContent>
                    <InputGroup>
                      <InputGroupTextarea placeholder="Leave a comment…" />
                      <InputGroupAddon align="block-end">
                        <InputGroupButton className="ml-auto" variant="default">
                          Comment
                        </InputGroupButton>
                      </InputGroupAddon>
                    </InputGroup>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="diff" className="flex flex-col gap-4 pt-4">
                <MapDiffLegend />
                <Card className="overflow-hidden py-0">
                  <CardHeader className="flex-row items-center gap-2 border-b border-border bg-muted/30 py-3">
                    <CardTitle className="font-mono text-sm">terrain/basin_dem.tif</CardTitle>
                    <DataTypeBadge type="DEM" />
                    <Badge variant="secondary" className="ml-auto">320 tiles changed</Badge>
                  </CardHeader>
                  <CardContent className="grid gap-3 p-4 sm:grid-cols-2">
                    <MapPreview seed={9} className="aspect-video" />
                    <MapPreview seed={9} className="aspect-video" diff={{ "3-4": "changed", "3-5": "changed", "4-4": "added", "4-5": "added", "6-9": "changed" }} />
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>

          <aside className="flex flex-col gap-4">
            <Card>
              <CardHeader>
                <CardTitle className="text-base">Merge checks</CardTitle>
              </CardHeader>
              <CardContent className="flex flex-col gap-3 text-sm">
                <Check2 label="1 approving review" ok />
                <Check2 label="No merge conflicts" ok />
                <Check2 label="Datum validation" ok={false} note="Awaiting confirmation" />
                <Separator />
                <Button className="w-full" disabled>
                  <GitMerge data-icon="inline-start" />
                  Merge pull request
                </Button>
                <p className="text-xs text-muted-foreground">Resolve the datum check to enable merging.</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle className="text-base">Reviewers</CardTitle>
              </CardHeader>
              <CardContent className="flex flex-col gap-2 text-sm">
                <Reviewer handle="sarat" status="approved" />
                <Reviewer handle="priyam" status="commented" />
              </CardContent>
            </Card>
          </aside>
        </div>
      </div>
    </AppShell>
  );
}

function Check2({ label, ok, note }: { label: string; ok: boolean; note?: string }) {
  return (
    <div className="flex items-center gap-2">
      {ok ? (
        <CheckCircle2 className="size-4 text-chart-2" />
      ) : (
        <span className="size-4 rounded-full border-2 border-chart-4" />
      )}
      <span>{label}</span>
      {note && <span className="ml-auto text-xs text-chart-4">{note}</span>}
    </div>
  );
}

function Reviewer({ handle, status }: { handle: string; status: "approved" | "commented" }) {
  return (
    <div className="flex items-center gap-2">
      <Avatar className="size-6">
        <AvatarFallback className="text-[0.6rem]">{handle.slice(0, 2).toUpperCase()}</AvatarFallback>
      </Avatar>
      <span>{handle}</span>
      <Badge variant="outline" className={status === "approved" ? "ml-auto text-chart-2 border-chart-2/40" : "ml-auto"}>
        {status}
      </Badge>
    </div>
  );
}
