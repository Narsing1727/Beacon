"use client";

import { use } from "react";
import { HardDrive, GitCommit, Users, TrendingUp } from "lucide-react";
import { Bar, BarChart, CartesianGrid, XAxis, Area, AreaChart } from "recharts";
import { AppShell } from "@/components/app-shell";
import { RepoHeader } from "@/components/repo-header";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from "@/components/ui/chart";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Progress } from "@/components/ui/progress";
import { commitActivity, orgMembers } from "@/lib/data";

const commitConfig = {
  commits: { label: "Commits", color: "var(--chart-1)" },
} satisfies ChartConfig;

const storageConfig = {
  storage: { label: "Storage (GB)", color: "var(--chart-2)" },
} satisfies ChartConfig;

const storageGrowth = [
  { month: "Oct", storage: 3.1 },
  { month: "Nov", storage: 3.4 },
  { month: "Dec", storage: 3.6 },
  { month: "Jan", storage: 3.9 },
  { month: "Feb", storage: 4.0 },
  { month: "Mar", storage: 4.2 },
];

const stats = [
  { label: "Total commits", value: "1,284", icon: GitCommit },
  { label: "Contributors", value: "12", icon: Users },
  { label: "Dataset size", value: "4.2 GB", icon: HardDrive },
  { label: "Commits / week", value: "+27", icon: TrendingUp },
];

const contributors = [
  { handle: "priyam", pct: 46 },
  { handle: "arunn", pct: 31 },
  { handle: "sarat", pct: 18 },
  { handle: "vikramr", pct: 5 },
];

export default function InsightsPage({
  params,
}: {
  params: Promise<{ owner: string; repo: string }>;
}) {
  const { owner, repo } = use(params);

  return (
    <AppShell>
      <RepoHeader owner={owner} repo={repo} />
      <div className="mx-auto max-w-7xl px-4 py-6 md:px-6">
        <h1 className="text-xl font-semibold tracking-tight">Insights</h1>
        <p className="text-sm text-muted-foreground">
          Activity and storage trends for {owner}/{repo}.
        </p>

        <div className="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {stats.map((s) => (
            <Card key={s.label}>
              <CardContent className="flex items-center gap-3 py-4">
                <div className="flex size-10 items-center justify-center rounded-lg bg-muted text-accent">
                  <s.icon className="size-5" />
                </div>
                <div>
                  <p className="text-2xl font-semibold tabular-nums">{s.value}</p>
                  <p className="text-xs text-muted-foreground">{s.label}</p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="mt-4 grid gap-4 lg:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle>Commit activity</CardTitle>
              <CardDescription>Commits over the last 8 weeks</CardDescription>
            </CardHeader>
            <CardContent>
              <ChartContainer config={commitConfig} className="h-[240px] w-full">
                <BarChart data={commitActivity}>
                  <CartesianGrid vertical={false} />
                  <XAxis dataKey="week" tickLine={false} axisLine={false} tickMargin={8} />
                  <ChartTooltip content={<ChartTooltipContent />} />
                  <Bar dataKey="commits" fill="var(--color-commits)" radius={4} />
                </BarChart>
              </ChartContainer>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Storage growth</CardTitle>
              <CardDescription>Total dataset size over time</CardDescription>
            </CardHeader>
            <CardContent>
              <ChartContainer config={storageConfig} className="h-[240px] w-full">
                <AreaChart data={storageGrowth}>
                  <CartesianGrid vertical={false} />
                  <XAxis dataKey="month" tickLine={false} axisLine={false} tickMargin={8} />
                  <ChartTooltip content={<ChartTooltipContent />} />
                  <Area
                    dataKey="storage"
                    type="monotone"
                    fill="var(--color-storage)"
                    fillOpacity={0.2}
                    stroke="var(--color-storage)"
                  />
                </AreaChart>
              </ChartContainer>
            </CardContent>
          </Card>
        </div>

        <Card className="mt-4">
          <CardHeader>
            <CardTitle>Top contributors</CardTitle>
            <CardDescription>Share of commits this quarter</CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col gap-4">
            {contributors.map((c) => {
              const member = orgMembers.find((m) => m.handle === c.handle);
              return (
                <div key={c.handle} className="flex items-center gap-3">
                  <Avatar className="size-8">
                    <AvatarFallback>{c.handle.slice(0, 2).toUpperCase()}</AvatarFallback>
                  </Avatar>
                  <div className="flex flex-1 flex-col gap-1">
                    <div className="flex items-center justify-between text-sm">
                      <span className="font-medium">{member?.name ?? c.handle}</span>
                      <span className="tabular-nums text-muted-foreground">{c.pct}%</span>
                    </div>
                    <Progress value={c.pct} />
                  </div>
                </div>
              );
            })}
          </CardContent>
        </Card>
      </div>
    </AppShell>
  );
}
