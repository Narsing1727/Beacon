import Link from "next/link";
import { Check } from "lucide-react";
import { AppShell } from "@/components/app-shell";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const tiers = [
  {
    name: "Free",
    price: "$0",
    cadence: "forever",
    description: "For individuals and open datasets.",
    features: [
      "5 GB of your own unique data",
      "Shared public elevation & rainfall data deduplicated — doesn't count against you",
      "Unlimited public repositories",
      "Unlimited push / pull",
      "Visual map diffs",
    ],
    cta: { label: "Get started", href: "/signup", variant: "outline" as const },
  },
  {
    name: "Team",
    price: "$19",
    cadence: "per seat / month",
    description: "For hydro teams collaborating on private models.",
    highlight: true,
    features: [
      "Everything in Free",
      "100 GB unique data included",
      "Unlimited private repositories",
      "Provenance export for audit & citation",
      "Branch protection & required reviews",
    ],
    cta: { label: "Upgrade to Team", href: "/orgs/hydrolab/billing", variant: "default" as const },
  },
  {
    name: "Enterprise",
    price: "Custom",
    cadence: "contact sales",
    description: "For agencies and large organizations.",
    features: [
      "Everything in Team",
      "SSO / SAML & SCIM",
      "Org-level admin controls",
      "Dedicated storage region",
      "Priority support & SLA",
    ],
    cta: { label: "Contact sales", href: "/contact", variant: "outline" as const },
  },
];

const faqs = [
  {
    q: "Why does the free quota go further than I expect?",
    a: "Most base data — public elevation models, rainfall grids — is identical across users. Beacon stores it once and deduplicates it across every account, so it never counts against your 5 GB. You only spend quota on the unique data you produce.",
  },
  {
    q: "What happens when I pass my storage limit?",
    a: "Your existing repos stay fully accessible and readable. New pushes that would exceed the quota are paused until you upgrade or free up space — nothing is deleted.",
  },
  {
    q: "Is my private data ever shared with other users?",
    a: "Never. Deduplication only applies to public datasets. Private repositories are encrypted and isolated; their data is never surfaced to or shared with anyone outside your team.",
  },
];

export default function PricingPage() {
  return (
    <AppShell>
      <div className="mx-auto max-w-7xl px-4 py-16 md:px-6">
        <div className="mx-auto max-w-2xl text-center">
          <h1 className="font-serif text-4xl font-semibold md:text-5xl">Simple pricing for big data</h1>
          <p className="mt-3 text-muted-foreground">
            Public base data is shared and deduplicated, so your free tier goes much further than a raw storage number suggests.
          </p>
        </div>

        <div className="mt-12 grid gap-6 lg:grid-cols-3">
          {tiers.map((tier) => (
            <Card key={tier.name} className={tier.highlight ? "relative border-accent/50 shadow-lg" : ""}>
              {tier.highlight && (
                <Badge className="absolute -top-3 left-1/2 -translate-x-1/2">Most popular</Badge>
              )}
              <CardHeader>
                <CardTitle>{tier.name}</CardTitle>
                <CardDescription>{tier.description}</CardDescription>
                <div className="mt-2 flex items-baseline gap-1">
                  <span className="font-serif text-4xl font-semibold">{tier.price}</span>
                  <span className="text-sm text-muted-foreground">/ {tier.cadence}</span>
                </div>
              </CardHeader>
              <CardContent>
                <ul className="flex flex-col gap-3">
                  {tier.features.map((f) => (
                    <li key={f} className="flex items-start gap-2 text-sm">
                      <Check className="mt-0.5 size-4 shrink-0 text-chart-2" />
                      {f}
                    </li>
                  ))}
                </ul>
              </CardContent>
              <CardFooter>
                <Button variant={tier.cta.variant} className="w-full" render={<Link href={tier.cta.href} />}>
                  {tier.cta.label}
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>

        <div className="mx-auto mt-16 max-w-3xl">
          <h2 className="mb-4 text-center font-serif text-2xl font-semibold">Frequently asked questions</h2>
          <Accordion>
            {faqs.map((f) => (
              <AccordionItem key={f.q} value={f.q}>
                <AccordionTrigger>{f.q}</AccordionTrigger>
                <AccordionContent>{f.a}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </AppShell>
  );
}
