"use client";

import Link from "next/link";
import { toast } from "sonner";
import { User, Bell, Shield, KeyRound, Palette, Trash2 } from "lucide-react";
import { AppShell } from "@/components/app-shell";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Switch } from "@/components/ui/switch";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
  FieldSeparator,
} from "@/components/ui/field";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const nav = [
  { icon: User, label: "Profile", href: "/settings", active: true },
  { icon: Bell, label: "Notifications", href: "/settings" },
  { icon: Shield, label: "Security", href: "/settings" },
  { icon: KeyRound, label: "Developer", href: "/settings/developer" },
  { icon: Palette, label: "Appearance", href: "/settings" },
];

export default function SettingsPage() {
  function saveProfile() {
    toast.success("Profile changes saved locally");
  }

  function deleteAccount() {
    if (window.confirm("Delete this frontend demo account? This only clears local UI state.")) {
      toast.success("Account deletion queued", { description: "Connect the backend before this can remove data." });
    }
  }

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
          <Tabs defaultValue="profile">
            <TabsList>
              <TabsTrigger value="profile">Profile</TabsTrigger>
              <TabsTrigger value="notifications">Notifications</TabsTrigger>
              <TabsTrigger value="danger">Danger zone</TabsTrigger>
            </TabsList>

            <TabsContent value="profile" className="mt-4 flex flex-col gap-4">
              <Card>
                <CardHeader>
                  <CardTitle>Public profile</CardTitle>
                  <CardDescription>
                    This information appears on your profile and next to your commits.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-col gap-6 sm:flex-row">
                    <div className="flex flex-col items-center gap-2">
                      <Avatar className="size-24">
                        <AvatarFallback className="text-2xl">PM</AvatarFallback>
                      </Avatar>
                      <Button variant="outline" size="sm" onClick={() => toast.info("Avatar picker is ready for file storage integration.") }>
                        Change
                      </Button>
                    </div>
                    <FieldGroup className="flex-1">
                      <Field>
                        <FieldLabel htmlFor="name">Name</FieldLabel>
                        <Input id="name" defaultValue="Priya Menon" />
                      </Field>
                      <Field>
                        <FieldLabel htmlFor="email">Email</FieldLabel>
                        <Input id="email" type="email" defaultValue="priya@hydrolab.org" />
                        <FieldDescription>Used for notifications and commit attribution.</FieldDescription>
                      </Field>
                      <Field>
                        <FieldLabel htmlFor="bio">Bio</FieldLabel>
                        <Textarea
                          id="bio"
                          rows={3}
                          defaultValue="Hydrologist building open flood models."
                        />
                      </Field>
                    </FieldGroup>
                  </div>
                </CardContent>
                <CardFooter className="border-t border-border">
                  <Button onClick={saveProfile}>Save changes</Button>
                </CardFooter>
              </Card>
            </TabsContent>

            <TabsContent value="notifications" className="mt-4">
              <Card>
                <CardHeader>
                  <CardTitle>Notification preferences</CardTitle>
                  <CardDescription>Choose what Beacon emails you about.</CardDescription>
                </CardHeader>
                <CardContent>
                  <FieldGroup>
                    <Field orientation="horizontal">
                      <div className="flex flex-col">
                        <FieldLabel>Pull request reviews</FieldLabel>
                        <FieldDescription>When you are requested to review a dataset change.</FieldDescription>
                      </div>
                      <Switch defaultChecked />
                    </Field>
                    <FieldSeparator />
                    <Field orientation="horizontal">
                      <div className="flex flex-col">
                        <FieldLabel>Data quality issues</FieldLabel>
                        <FieldDescription>Alerts on datum, projection, or topology problems.</FieldDescription>
                      </div>
                      <Switch defaultChecked />
                    </Field>
                    <FieldSeparator />
                    <Field orientation="horizontal">
                      <div className="flex flex-col">
                        <FieldLabel>Storage &amp; quota</FieldLabel>
                        <FieldDescription>When a repo approaches its storage limit.</FieldDescription>
                      </div>
                      <Switch />
                    </Field>
                  </FieldGroup>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="danger" className="mt-4">
              <Card className="border-destructive/40">
                <CardHeader>
                  <CardTitle className="text-destructive">Delete account</CardTitle>
                  <CardDescription>
                    Permanently remove your account and all datasets you own. This cannot be undone.
                  </CardDescription>
                </CardHeader>
                <CardFooter className="border-t border-destructive/20">
                  <Button variant="destructive" onClick={deleteAccount}>
                    <Trash2 data-icon="inline-start" />
                    Delete account
                  </Button>
                </CardFooter>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </AppShell>
  );
}
