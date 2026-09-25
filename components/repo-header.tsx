"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";
import {
  Book,
  CircleDot,
  GitBranch,
  GitPullRequest,
  LineChart,
  Lock,
  Star,
  Tag,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { DataTypeBadge } from "@/components/data-type-badge";
import { cn } from "@/lib/utils";
import { getRepo } from "@/lib/data";

export function RepoHeader({ owner, repo }: { owner: string; repo: string }) {
  const pathname = usePathname();
  const [starred, setStarred] = useState(false);
  const base = `/${owner}/${repo}`;
  const data = getRepo(owner, repo);

  const tabs = [
    { href: base, label: "Code", icon: Book, exact: true },
    { href: `${base}/issues`, label: "Issues", icon: CircleDot, badge: 3 },
    { href: `${base}/pulls`, label: "Pull requests", icon: GitPullRequest, badge: 2 },
    { href: `${base}/branches`, label: "Branches", icon: GitBranch },
    { href: `${base}/releases`, label: "Releases", icon: Tag },
    { href: `${base}/wiki`, label: "Wiki", icon: Book },
    { href: `${base}/insights`, label: "Insights", icon: LineChart },
  ];

  function toggleStar() {
    setStarred((current) => !current);
    toast.success(starred ? "Star removed" : "Repository starred", {
      description: `${owner}/${repo} was updated in this browser.`,
    });
  }

  return (
    <div className="border-b border-border bg-card/40">
      <div className="mx-auto max-w-7xl px-4 pt-5 md:px-6">
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div className="flex flex-col gap-2">
            <div className="flex items-center gap-2 text-lg">
              <Link href={`/${owner}`} className="text-muted-foreground hover:text-foreground hover:underline">
                {owner}
              </Link>
              <span className="text-muted-foreground">/</span>
              <Link href={base} className="font-semibold hover:underline">
                {repo}
              </Link>
              <Badge variant="outline" className="ml-1 gap-1 capitalize">
                {data.visibility === "private" && <Lock className="size-3" />}
                {data.visibility}
              </Badge>
            </div>
            <p className="max-w-2xl text-sm text-muted-foreground">{data.description}</p>
            <div className="flex flex-wrap items-center gap-1.5">
              {data.tags.map((t) => (
                <DataTypeBadge key={t} type={t} />
              ))}
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm" onClick={toggleStar} aria-pressed={starred}>
              <Star data-icon="inline-start" />
              {starred ? "Starred" : "Star"}
              <Badge variant="secondary" className="ml-1">{data.stars + Number(starred)}</Badge>
            </Button>
            <Button variant="outline" size="sm" render={<Link href={`${base}/fork`} />}>
              <GitBranch data-icon="inline-start" />
              Fork
              <Badge variant="secondary" className="ml-1">{data.forks}</Badge>
            </Button>
          </div>
        </div>

        <nav className="-mb-px mt-4 flex gap-1 overflow-x-auto">
          {tabs.map((tab) => {
            const active = tab.exact ? pathname === tab.href : pathname.startsWith(tab.href);
            return (
              <Link
                key={tab.href}
                href={tab.href}
                className={cn(
                  "flex shrink-0 items-center gap-2 border-b-2 px-3 py-2.5 text-sm transition-colors",
                  active
                    ? "border-accent text-foreground"
                    : "border-transparent text-muted-foreground hover:text-foreground",
                )}
              >
                <tab.icon className="size-4" />
                {tab.label}
                {tab.badge ? (
                  <Badge variant="secondary" className="ml-0.5">
                    {tab.badge}
                  </Badge>
                ) : null}
              </Link>
            );
          })}
        </nav>
      </div>
    </div>
  );
}
