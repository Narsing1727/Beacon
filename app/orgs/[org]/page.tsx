import Link from "next/link";
import { Building2, Users, BookMarked, HardDrive, Settings, CreditCard } from "lucide-react";
import { AppShell } from "@/components/app-shell";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { RepoCard } from "@/components/repo-card";
import { repos, orgMembers } from "@/lib/data";

const roleVariant: Record<string, "default" | "secondary" | "outline"> = {
  Owner: "default",
  Maintainer: "secondary",
  Member: "outline",
};

export default async function OrgPage({
  params,
}: {
  params: Promise<{ org: string }>;
}) {
  const { org } = await params;
  const orgRepos = repos.filter((r) => r.owner === org);
  const shown = orgRepos.length ? orgRepos : repos.slice(0, 4);

  return (
    <AppShell>
      <div className="border-b border-border bg-card/40">
        <div className="mx-auto flex max-w-7xl flex-wrap items-center gap-4 px-4 py-6 md:px-6">
          <Avatar className="size-16 rounded-lg border border-border">
            <AvatarFallback className="rounded-lg bg-accent/15 text-accent">
              <Building2 className="size-7" />
            </AvatarFallback>
          </Avatar>
          <div className="flex-1">
            <div className="flex items-center gap-2">
              <h1 className="text-2xl font-semibold">{org}</h1>
              <Badge variant="secondary">Team plan</Badge>
            </div>
            <p className="text-sm text-muted-foreground">
              Open hydrology research lab · {shown.length} datasets · {orgMembers.length} members
            </p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" render={<Link href={`/orgs/${org}/billing`} />}>
              <CreditCard data-icon="inline-start" />
              Billing
            </Button>
            <Button variant="outline">
              <Settings data-icon="inline-start" />
              Settings
            </Button>
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-4 py-6 md:px-6">
        <div className="grid gap-4 sm:grid-cols-3">
          <Card>
            <CardContent className="flex items-center gap-3 py-4">
              <BookMarked className="size-5 text-accent" />
              <div>
                <p className="text-xl font-semibold">{shown.length}</p>
                <p className="text-xs text-muted-foreground">Datasets</p>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="flex items-center gap-3 py-4">
              <Users className="size-5 text-accent" />
              <div>
                <p className="text-xl font-semibold">{orgMembers.length}</p>
                <p className="text-xs text-muted-foreground">Members</p>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="flex items-center gap-3 py-4">
              <HardDrive className="size-5 text-accent" />
              <div>
                <p className="text-xl font-semibold">34 GB</p>
                <p className="text-xs text-muted-foreground">of 100 GB used</p>
              </div>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="repos" className="mt-6">
          <TabsList>
            <TabsTrigger value="repos">Datasets</TabsTrigger>
            <TabsTrigger value="members">Members</TabsTrigger>
          </TabsList>

          <TabsContent value="repos" className="mt-4">
            <div className="grid gap-4 sm:grid-cols-2">
              {shown.map((r) => (
                <RepoCard key={r.name} repo={r} />
              ))}
            </div>
          </TabsContent>

          <TabsContent value="members" className="mt-4">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <div className="flex flex-col gap-1.5">
                  <CardTitle>Members</CardTitle>
                  <CardDescription>People with access to {org} datasets.</CardDescription>
                </div>
                <Button size="sm">Invite member</Button>
              </CardHeader>
              <CardContent className="flex flex-col divide-y divide-border">
                {orgMembers.map((m) => (
                  <div key={m.handle} className="flex items-center gap-3 py-3 first:pt-0 last:pb-0">
                    <Avatar className="size-9">
                      <AvatarFallback>{m.handle.slice(0, 2).toUpperCase()}</AvatarFallback>
                    </Avatar>
                    <div className="flex-1">
                      <p className="text-sm font-medium">{m.name}</p>
                      <p className="text-xs text-muted-foreground">
                        {m.handle} · {m.repos} datasets
                      </p>
                    </div>
                    <Badge variant={roleVariant[m.role]}>{m.role}</Badge>
                  </div>
                ))}
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </AppShell>
  );
}
