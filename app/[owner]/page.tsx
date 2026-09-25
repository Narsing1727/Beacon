import Link from "next/link";
import {
  MapPin,
  LinkIcon,
  Building2,
  Calendar,
  Users,
  BookMarked,
} from "lucide-react";
import { AppShell } from "@/components/app-shell";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { RepoCard } from "@/components/repo-card";
import { repos } from "@/lib/data";
import { cn } from "@/lib/utils";

function ContributionGrid() {
  const weeks = 26;
  const days = 7;
  const cells = [];
  let seed = 99;
  const rand = () => {
    seed = (seed * 16807) % 2147483647;
    return seed / 2147483647;
  };
  for (let w = 0; w < weeks; w++) {
    for (let d = 0; d < days; d++) {
      const level = Math.floor(rand() * 5);
      const bg = [
        "bg-muted",
        "bg-accent/25",
        "bg-accent/50",
        "bg-accent/75",
        "bg-accent",
      ][level];
      cells.push(
        <span
          key={`${w}-${d}`}
          className={cn("size-2.5 rounded-[2px]", bg)}
          style={{ gridRow: d + 1, gridColumn: w + 1 }}
        />,
      );
    }
  }
  return (
    <div
      className="grid w-fit gap-1"
      style={{
        gridTemplateColumns: `repeat(${weeks}, minmax(0, 1fr))`,
        gridTemplateRows: `repeat(${days}, minmax(0, 1fr))`,
        gridAutoFlow: "column",
      }}
    >
      {cells}
    </div>
  );
}

export default async function ProfilePage({
  params,
}: {
  params: Promise<{ owner: string }>;
}) {
  const { owner } = await params;
  const ownerRepos = repos.filter((r) => r.owner === owner);
  const shown = ownerRepos.length ? ownerRepos : repos.slice(0, 3);

  return (
    <AppShell>
      <div className="mx-auto grid max-w-7xl gap-8 px-4 py-8 md:grid-cols-[280px_1fr] md:px-6">
        <aside className="flex flex-col gap-4">
          <Avatar className="size-40 rounded-full border border-border">
            <AvatarFallback className="text-4xl">
              {owner.slice(0, 2).toUpperCase()}
            </AvatarFallback>
          </Avatar>
          <div>
            <h1 className="text-xl font-semibold">Priya Menon</h1>
            <p className="text-muted-foreground">{owner}</p>
          </div>
          <p className="text-sm text-muted-foreground">
            Hydrologist building open flood models. Maintainer of the Chalakudy basin
            dataset. Interested in reproducible terrain pipelines.
          </p>
          <Button variant="outline" className="w-full">
            Follow
          </Button>
          <div className="flex flex-col gap-2 text-sm text-muted-foreground">
            <span className="flex items-center gap-2">
              <Building2 className="size-4" /> hydrolab
            </span>
            <span className="flex items-center gap-2">
              <MapPin className="size-4" /> Kochi, India
            </span>
            <span className="flex items-center gap-2">
              <LinkIcon className="size-4" />
              <Link href="#" className="text-accent hover:underline">
                hydrolab.org
              </Link>
            </span>
            <span className="flex items-center gap-2">
              <Calendar className="size-4" /> Joined March 2021
            </span>
          </div>
          <Separator />
          <div className="flex items-center gap-4 text-sm">
            <span className="flex items-center gap-1.5">
              <Users className="size-4 text-muted-foreground" />
              <strong>128</strong>
              <span className="text-muted-foreground">followers</span>
            </span>
            <span className="flex items-center gap-1.5">
              <BookMarked className="size-4 text-muted-foreground" />
              <strong>{shown.length}</strong>
              <span className="text-muted-foreground">repos</span>
            </span>
          </div>
        </aside>

        <div className="flex flex-col gap-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-sm font-medium text-muted-foreground">
                1,284 contributions in the last year
              </CardTitle>
            </CardHeader>
            <CardContent className="overflow-x-auto">
              <ContributionGrid />
              <div className="mt-3 flex items-center gap-2 text-xs text-muted-foreground">
                Less
                <span className="size-2.5 rounded-[2px] bg-muted" />
                <span className="size-2.5 rounded-[2px] bg-accent/25" />
                <span className="size-2.5 rounded-[2px] bg-accent/50" />
                <span className="size-2.5 rounded-[2px] bg-accent/75" />
                <span className="size-2.5 rounded-[2px] bg-accent" />
                More
              </div>
            </CardContent>
          </Card>

          <div>
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-semibold">Repositories</h2>
              <Badge variant="secondary">{shown.length}</Badge>
            </div>
            <div className="mt-3 grid gap-4 sm:grid-cols-2">
              {shown.map((r) => (
                <RepoCard key={`${r.owner}/${r.name}`} repo={r} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </AppShell>
  );
}
