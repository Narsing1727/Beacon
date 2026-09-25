"use client";

import Link from "next/link";
import type { FormEvent } from "react";
import { toast } from "sonner";
import { Mail, MessageSquare, LifeBuoy, BookOpen } from "lucide-react";
import { AppShell } from "@/components/app-shell";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
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
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const channels = [
  {
    icon: LifeBuoy,
    title: "Support",
    body: "Account, billing, and dataset issues.",
    action: "support@beacon.dev",
    href: "mailto:support@beacon.dev",
  },
  {
    icon: MessageSquare,
    title: "Community",
    body: "Ask the hydro engineering community.",
    action: "Join the forum",
    href: "/explore",
  },
  {
    icon: BookOpen,
    title: "Documentation",
    body: "Guides for the CLI and data formats.",
    action: "Read the docs",
    href: "/docs",
  },
];

export default function ContactPage() {
  function submitMessage(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    event.currentTarget.reset();
    toast.success("Message queued", { description: "Your support request is saved locally for this frontend demo." });
  }

  return (
    <AppShell>
      <div className="mx-auto max-w-5xl px-4 py-12 md:px-6">
        <div className="max-w-2xl">
          <h1 className="text-3xl font-semibold tracking-tight">Contact &amp; support</h1>
          <p className="mt-2 text-muted-foreground">
            Questions about hosting terrain, calibrating models, or your organization&apos;s
            plan? We&apos;re here to help.
          </p>
        </div>

        <div className="mt-8 grid gap-8 md:grid-cols-[1fr_320px]">
          <form onSubmit={submitMessage}>
          <Card>
            <CardHeader>
              <CardTitle>Send us a message</CardTitle>
              <CardDescription>We usually reply within one business day.</CardDescription>
            </CardHeader>
            <CardContent>
              <FieldGroup>
                <div className="grid gap-4 sm:grid-cols-2">
                  <Field>
                    <FieldLabel htmlFor="name">Name</FieldLabel>
                    <Input id="name" placeholder="Priya Menon" />
                  </Field>
                  <Field>
                    <FieldLabel htmlFor="email">Email</FieldLabel>
                    <Input id="email" type="email" placeholder="you@lab.org" />
                  </Field>
                </div>
                <Field>
                  <FieldLabel htmlFor="topic">Topic</FieldLabel>
                  <Select defaultValue="technical">
                    <SelectTrigger id="topic">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        <SelectItem value="technical">Technical support</SelectItem>
                        <SelectItem value="billing">Billing &amp; plans</SelectItem>
                        <SelectItem value="storage">Large dataset hosting</SelectItem>
                        <SelectItem value="other">Something else</SelectItem>
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                </Field>
                <Field>
                  <FieldLabel htmlFor="message">Message</FieldLabel>
                  <Textarea id="message" rows={5} placeholder="Tell us what you need…" />
                </Field>
              </FieldGroup>
            </CardContent>
            <CardFooter className="border-t border-border">
              <Button type="submit">
                <Mail data-icon="inline-start" />
                Send message
              </Button>
            </CardFooter>
          </Card>
          </form>

          <div className="flex flex-col gap-3">
            {channels.map((c) => (
              <Card key={c.title}>
                <CardContent className="flex gap-3 py-4">
                  <div className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-accent/15 text-accent">
                    <c.icon className="size-5" />
                  </div>
                  <div>
                    <p className="text-sm font-medium">{c.title}</p>
                    <p className="text-xs text-muted-foreground">{c.body}</p>
                    <Link href={c.href} className="mt-1 inline-block text-xs text-accent hover:underline">
                      {c.action}
                    </Link>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </AppShell>
  );
}
