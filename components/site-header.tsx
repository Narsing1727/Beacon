"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Bell, Plus, Search } from "lucide-react";
import { BeaconLogo } from "@/components/beacon-logo";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { InputGroup, InputGroupAddon, InputGroupInput } from "@/components/ui/input-group";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Badge } from "@/components/ui/badge";

const navLinks = [
  { href: "/dashboard", label: "Dashboard" },
  { href: "/explore", label: "Explore" },
  { href: "/pricing", label: "Pricing" },
  { href: "/docs", label: "Docs" },
];

export function SiteHeader() {
  const router = useRouter();
  const [query, setQuery] = useState("");

  function onSearch(e: React.FormEvent) {
    e.preventDefault();
    router.push(`/search?q=${encodeURIComponent(query || "basin")}`);
  }

  return (
    <header className="sticky top-0 z-40 border-b border-border bg-background/80 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="mx-auto flex h-14 max-w-7xl items-center gap-4 px-4 md:px-6">
        <Link href="/" className="flex items-center gap-2 font-mono text-sm shrink-0">
          <span className="text-muted-foreground">nerolith /</span>
          <span className="font-semibold tracking-tight text-foreground">beacon</span>
          <span className="hidden sm:inline-block border border-border/30 bg-muted/20 px-1.5 py-0.5 text-[10px] text-muted-foreground">
            git for hydro
          </span>
        </Link>

        <form onSubmit={onSearch} className="hidden max-w-sm flex-1 md:block">
          <InputGroup className="h-8 border-border/30 bg-muted/10">
            <InputGroupAddon>
              <Search className="size-3.5 text-muted-foreground" />
            </InputGroupAddon>
            <InputGroupInput
              placeholder="Search models, DEM tiles, shapefiles, commits…"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="text-xs"
            />
          </InputGroup>
        </form>

        <nav className="ml-auto hidden items-center gap-1 sm:flex text-xs font-mono">
          <Button variant="ghost" size="sm" render={<Link href="/dashboard" />}>
            Repositories
          </Button>
          <Button variant="ghost" size="sm" render={<Link href="/explore" />}>
            Explore Data
          </Button>
          <span className="mx-1 h-3 w-px bg-border/40" />
          <span className="text-muted-foreground text-[11px] hidden lg:inline">
            <span className="text-accent">$</span> beacon push
          </span>
        </nav>

        <div className="ml-auto flex items-center gap-1 lg:ml-2">
          <Button variant="ghost" size="icon" render={<Link href="/notifications" />} aria-label="Notifications" className="relative">
            <Bell />
            <span className="absolute right-1.5 top-1.5 size-2 rounded-full bg-accent" />
          </Button>

          <DropdownMenu>
            <DropdownMenuTrigger
              render={
                <Button variant="ghost" size="icon" aria-label="Create new">
                  <Plus />
                </Button>
              }
            />
            <DropdownMenuContent align="end">
              <DropdownMenuGroup>
                <DropdownMenuItem onClick={() => router.push("/new")}>New repository</DropdownMenuItem>
                <DropdownMenuItem onClick={() => router.push("/new")}>Upload files</DropdownMenuItem>
                <DropdownMenuItem onClick={() => router.push("/orgs/hydrolab")}>New organization</DropdownMenuItem>
              </DropdownMenuGroup>
            </DropdownMenuContent>
          </DropdownMenu>

          <DropdownMenu>
            <DropdownMenuTrigger
              render={
                <button className="ml-1 rounded-full outline-none focus-visible:ring-2 focus-visible:ring-ring" aria-label="Account menu">
                  <Avatar className="size-8">
                    <AvatarImage src="/avatars/priya.png" alt="Priya Menon" />
                    <AvatarFallback>PM</AvatarFallback>
                  </Avatar>
                </button>
              }
            />
            <DropdownMenuContent align="end" className="w-56">
              <DropdownMenuGroup>
                <DropdownMenuLabel className="flex items-center justify-between">
                  priyam
                  <Badge variant="secondary">Pro</Badge>
                </DropdownMenuLabel>
              </DropdownMenuGroup>
              <DropdownMenuSeparator />
              <DropdownMenuGroup>
                <DropdownMenuItem onClick={() => router.push("/priyam")}>Your profile</DropdownMenuItem>
                <DropdownMenuItem onClick={() => router.push("/dashboard")}>Your repositories</DropdownMenuItem>
                <DropdownMenuItem onClick={() => router.push("/orgs/hydrolab")}>Your organizations</DropdownMenuItem>
              </DropdownMenuGroup>
              <DropdownMenuSeparator />
              <DropdownMenuGroup>
                <DropdownMenuItem onClick={() => router.push("/settings")}>Account settings</DropdownMenuItem>
                <DropdownMenuItem onClick={() => router.push("/settings/developer")}>Developer settings</DropdownMenuItem>
              </DropdownMenuGroup>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={() => router.push("/login")}>Sign out</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  );
}
