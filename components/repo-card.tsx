import Link from "next/link";
import { GitBranch, Lock, Star } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { DataTypeBadge } from "@/components/data-type-badge";
import type { Repo } from "@/lib/data";

export function RepoCard({ repo }: { repo: Repo }) {
  return (
    <div className="group flex flex-col gap-3 border-b border-border/20 bg-transparent p-4 transition-colors hover:bg-muted/10">
      <div className="flex items-start justify-between gap-2">
        <Link href={`/${repo.owner}/${repo.name}`} className="font-medium hover:underline text-foreground">
          <span className="text-muted-foreground">{repo.owner}/</span>
          {repo.name}
        </Link>
        {repo.visibility === "private" && <Lock className="size-3.5 shrink-0 text-muted-foreground" />}
      </div>
      <p className="line-clamp-2 text-sm text-muted-foreground">{repo.description}</p>
      <div className="flex flex-wrap gap-1.5">
        {repo.tags.map((t) => (
          <DataTypeBadge key={t} type={t} />
        ))}
      </div>
      <div className="flex flex-wrap items-center gap-4 text-xs text-muted-foreground pt-1">
        <span>{repo.size}</span>
        <span className="flex items-center gap-1">
          <Star className="size-3.5" />
          {repo.stars}
        </span>
        <span className="flex items-center gap-1">
          <GitBranch className="size-3.5" />
          {repo.forks}
        </span>
        <span className="ml-auto">Updated {repo.updated}</span>
      </div>
    </div>
  );
}
