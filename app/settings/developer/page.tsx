import Link from "next/link";
import { User, Bell, Shield, KeyRound, Palette, Plus, Copy, Terminal } from "lucide-react";
import { AppShell } from "@/components/app-shell";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupInput,
} from "@/components/ui/input-group";
import { tokens, sshKeys } from "@/lib/data";

const nav = [
  { icon: User, label: "Profile", href: "/settings" },
  { icon: Bell, label: "Notifications", href: "/settings" },
  { icon: Shield, label: "Security", href: "/settings" },
  { icon: KeyRound, label: "Developer", href: "/settings/developer", active: true },
  { icon: Palette, label: "Appearance", href: "/settings" },
];

export default function DeveloperSettingsPage() {
  return (
    <AppShell>
      <div className="mx-auto grid max-w-7xl gap-8 px-4 py-8 md:grid-cols-[220px_1fr] md:px-6">
        <aside>
          <h1 className="mb-3 px-3 text-lg font-semibold">Settings</h1>
          <nav className="flex flex-col gap-0.5 text-sm">
            {nav.map((item) => (
              <Link
                key={item.label}
                href={item.href}
                className={
                  item.active
                    ? "flex items-center gap-2 rounded-md bg-muted px-3 py-2 font-medium"
                    : "flex items-center gap-2 rounded-md px-3 py-2 text-muted-foreground hover:bg-muted/50 hover:text-foreground"
                }
              >
                <item.icon className="size-4" />
                {item.label}
              </Link>
            ))}
          </nav>
        </aside>

        <div className="min-w-0">
          <h2 className="text-xl font-semibold tracking-tight">Developer settings</h2>
          <p className="text-sm text-muted-foreground">
            Manage credentials for the Beacon CLI, CI pipelines, and QGIS integrations.
          </p>

          <Tabs defaultValue="tokens" className="mt-5">
            <TabsList>
              <TabsTrigger value="tokens">Access tokens</TabsTrigger>
              <TabsTrigger value="ssh">SSH keys</TabsTrigger>
              <TabsTrigger value="cli">CLI</TabsTrigger>
            </TabsList>

            <TabsContent value="tokens" className="mt-4">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between">
                  <div className="flex flex-col gap-1.5">
                    <CardTitle>Personal access tokens</CardTitle>
                    <CardDescription>Tokens scoped to your account and repositories.</CardDescription>
                  </div>
                  <Button size="sm">
                    <Plus data-icon="inline-start" />
                    Generate new token
                  </Button>
                </CardHeader>
                <CardContent>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Name</TableHead>
                        <TableHead>Scopes</TableHead>
                        <TableHead>Created</TableHead>
                        <TableHead>Last used</TableHead>
                        <TableHead className="text-right">Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {tokens.map((t) => (
                        <TableRow key={t.name}>
                          <TableCell className="font-medium">{t.name}</TableCell>
                          <TableCell>
                            <div className="flex flex-wrap gap-1">
                              {t.scope.split(", ").map((s) => (
                                <Badge key={s} variant="secondary" className="font-mono text-xs">
                                  {s}
                                </Badge>
                              ))}
                            </div>
                          </TableCell>
                          <TableCell className="text-muted-foreground">{t.created}</TableCell>
                          <TableCell className="text-muted-foreground">{t.lastUsed}</TableCell>
                          <TableCell className="text-right">
                            <Button variant="ghost" size="sm" className="text-destructive">
                              Revoke
                            </Button>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="ssh" className="mt-4">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between">
                  <div className="flex flex-col gap-1.5">
                    <CardTitle>SSH keys</CardTitle>
                    <CardDescription>Used to push large datasets over SSH.</CardDescription>
                  </div>
                  <Button size="sm">
                    <Plus data-icon="inline-start" />
                    New SSH key
                  </Button>
                </CardHeader>
                <CardContent>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Name</TableHead>
                        <TableHead>Fingerprint</TableHead>
                        <TableHead>Added</TableHead>
                        <TableHead>Last used</TableHead>
                        <TableHead className="text-right">Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {sshKeys.map((k) => (
                        <TableRow key={k.name}>
                          <TableCell className="font-medium">{k.name}</TableCell>
                          <TableCell className="font-mono text-xs text-muted-foreground">{k.fingerprint}</TableCell>
                          <TableCell className="text-muted-foreground">{k.created}</TableCell>
                          <TableCell className="text-muted-foreground">{k.lastUsed}</TableCell>
                          <TableCell className="text-right">
                            <Button variant="ghost" size="sm" className="text-destructive">
                              Delete
                            </Button>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="cli" className="mt-4">
              <Card>
                <CardHeader>
                  <CardTitle>Authenticate the Beacon CLI</CardTitle>
                  <CardDescription>Run this to log in and pull datasets.</CardDescription>
                </CardHeader>
                <CardContent className="flex flex-col gap-3">
                  <InputGroup>
                    <InputGroupAddon>
                      <Terminal />
                    </InputGroupAddon>
                    <InputGroupInput readOnly value="beacon auth login --token bcn_••••••••••••" />
                    <InputGroupAddon align="inline-end">
                      <InputGroupButton size="icon-xs" aria-label="Copy">
                        <Copy />
                      </InputGroupButton>
                    </InputGroupAddon>
                  </InputGroup>
                  <p className="text-sm text-muted-foreground">
                    Then clone a dataset with{" "}
                    <code className="rounded bg-muted px-1.5 py-0.5 font-mono text-xs">
                      beacon clone hydrolab/chalakudy-basin
                    </code>
                    .
                  </p>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </AppShell>
  );
}
