"use client";

import { use, useState } from "react";
import Link from "next/link";
import { toast } from "sonner";
import { GitBranch, GitMerge, Trash2 } from "lucide-react";
import { AppShell } from "@/components/app-shell";
import { RepoHeader } from "@/components/repo-header";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { branches } from "@/lib/data";

export default function BranchesPage({
  params,
}: {
  params: Promise<{ owner: string; repo: string }>;
}) {
  const { owner, repo } = use(params);
  const base = `/${owner}/${repo}`;
  const [branchList, setBranchList] = useState(branches);

  function createBranch() {
    const name = window.prompt("Branch name");
    if (!name?.trim()) return;

    if (branchList.some((branch) => branch.name === name.trim())) {
      toast.error("Branch already exists");
      return;
    }

    setBranchList((current) => [
      { name: name.trim(), lastCommit: "Created locally", author: "priyam", updated: "just now", ahead: 0, behind: 0 },
      ...current,
    ]);
    toast.success(`Created ${name.trim()}`);
  }

  function deleteBranch(name: string) {
    if (!window.confirm(`Delete branch ${name}?`)) return;
    setBranchList((current) => current.filter((branch) => branch.name !== name));
    toast.success(`Deleted ${name}`);
  }

  return (
    <AppShell>
      <RepoHeader owner={owner} repo={repo} />
      <div className="mx-auto max-w-5xl px-4 py-6 md:px-6">
        <div className="flex items-center justify-between">
          <h1 className="text-xl font-semibold">Branches</h1>
          <Button size="sm" onClick={createBranch}>
            <GitBranch data-icon="inline-start" />
            New branch
          </Button>
        </div>

        <Card className="mt-6 overflow-hidden py-0">
          <ul className="divide-y divide-border">
            {branchList.map((branch) => (
              <li key={branch.name} className="flex flex-wrap items-center gap-3 px-4 py-3.5">
                <GitBranch className="size-4 text-muted-foreground" />
                <Link href={base} className="font-mono text-sm font-medium hover:underline">
                  {branch.name}
                </Link>
                {branch.isDefault && <Badge variant="secondary">default</Badge>}

                {!branch.isDefault && (
                  <div className="flex items-center gap-2 text-xs">
                    <span className="flex items-center gap-1 text-chart-2">
                      <span className="font-mono">{branch.ahead}</span> ahead
                    </span>
                    <span className="flex items-center gap-1 text-muted-foreground">
                      <span className="font-mono">{branch.behind}</span> behind
                    </span>
                  </div>
                )}

                <div className="ml-auto flex items-center gap-3">
                  <span className="hidden items-center gap-2 text-xs text-muted-foreground sm:flex">
                    <Avatar className="size-5">
                      <AvatarFallback className="text-[0.55rem]">
                        {branch.author.slice(0, 2).toUpperCase()}
                      </AvatarFallback>
                    </Avatar>
                    Updated {branch.updated}
                  </span>
                  {!branch.isDefault && (
                    <>
                      <Button variant="outline" size="sm" render={<Link href={`${base}/compare`} />}>
                        <GitMerge data-icon="inline-start" />
                        Compare
                      </Button>
                      <Button variant="ghost" size="icon" aria-label={`Delete ${branch.name}`} onClick={() => deleteBranch(branch.name)}>
                        <Trash2 />
                      </Button>
                    </>
                  )}
                </div>
              </li>
            ))}
          </ul>
        </Card>
      </div>
    </AppShell>
  );
}
