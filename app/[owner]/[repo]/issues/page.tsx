import Link from "next/link";
import { CircleDot, CheckCircle2, MessageSquare, Search, FileWarning } from "lucide-react";
import { AppShell } from "@/components/app-shell";
import { RepoHeader } from "@/components/repo-header";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "@/components/ui/input-group";
import {
  ToggleGroup,
  ToggleGroupItem,
} from "@/components/ui/toggle-group";
import { issues } from "@/lib/data";

const labelStyles: Record<string, string> = {
  "data-quality": "bg-chart-1/15 text-chart-1 border-chart-1/30",
  question: "bg-chart-3/15 text-chart-3 border-chart-3/30",
  enhancement: "bg-chart-2/15 text-chart-2 border-chart-2/30",
  bug: "bg-destructive/15 text-destructive border-destructive/30",
};

export default async function IssuesPage({
  params,
}: {
  params: Promise<{ owner: string; repo: string }>;
}) {
  const { owner, repo } = await params;
  const openCount = issues.filter((i) => i.status === "open").length;
  const closedCount = issues.filter((i) => i.status === "closed").length;

  return (
    <AppShell>
      <RepoHeader owner={owner} repo={repo} />
      <div className="mx-auto max-w-7xl px-4 py-6 md:px-6">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <InputGroup className="max-w-md flex-1">
            <InputGroupAddon>
              <Search />
            </InputGroupAddon>
            <InputGroupInput placeholder="Search issues and discussions" />
          </InputGroup>
          <div className="flex items-center gap-2">
            <ToggleGroup defaultValue={["labels"]} variant="outline">
              <ToggleGroupItem value="labels">Labels</ToggleGroupItem>
              <ToggleGroupItem value="milestones">Milestones</ToggleGroupItem>
            </ToggleGroup>
            <Button>
              <CircleDot data-icon="inline-start" />
              New issue
            </Button>
          </div>
        </div>

        <Card className="mt-5 overflow-hidden py-0">
          <div className="flex items-center gap-4 border-b border-border bg-muted/40 px-4 py-3 text-sm font-medium">
            <span className="flex items-center gap-1.5 text-foreground">
              <CircleDot className="size-4" /> {openCount} Open
            </span>
            <span className="flex items-center gap-1.5 text-muted-foreground">
              <CheckCircle2 className="size-4" /> {closedCount} Closed
            </span>
          </div>
          <ul className="divide-y divide-border">
            {issues.map((issue) => (
              <li key={issue.id} className="flex items-start gap-3 px-4 py-3.5 hover:bg-muted/30">
                {issue.status === "open" ? (
                  <CircleDot className="mt-0.5 size-4 shrink-0 text-chart-2" />
                ) : (
                  <CheckCircle2 className="mt-0.5 size-4 shrink-0 text-chart-4" />
                )}
                <div className="flex min-w-0 flex-1 flex-col gap-1">
                  <div className="flex flex-wrap items-center gap-2">
                    <Link href="#" className="font-medium hover:text-accent hover:underline">
                      {issue.title}
                    </Link>
                    <Badge variant="outline" className={labelStyles[issue.label]}>
                      {issue.label}
                    </Badge>
                  </div>
                  <div className="flex flex-wrap items-center gap-2 text-xs text-muted-foreground">
                    <span>
                      #{issue.id} opened {issue.updated} by {issue.author}
                    </span>
                    {issue.reference && (
                      <span className="flex items-center gap-1">
                        <FileWarning className="size-3" />
                        <code className="rounded bg-muted px-1 py-0.5 font-mono">{issue.reference}</code>
                      </span>
                    )}
                  </div>
                </div>
                {issue.comments > 0 && (
                  <span className="flex items-center gap-1 text-xs text-muted-foreground">
                    <MessageSquare className="size-3.5" />
                    {issue.comments}
                  </span>
                )}
              </li>
            ))}
          </ul>
        </Card>
      </div>
    </AppShell>
  );
}
