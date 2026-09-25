import Link from "next/link";
import { AppShell } from "@/components/app-shell";
import { Separator } from "@/components/ui/separator";

const sections = [
  {
    id: "acceptance",
    title: "1. Acceptance of terms",
    body: "By accessing Beacon you agree to these Terms of Service and our Privacy Policy. If you use Beacon on behalf of an organization, you represent that you have authority to bind that organization.",
  },
  {
    id: "data",
    title: "2. Your data",
    body: "You retain all rights to the datasets, models, and terrain you upload. By hosting content on Beacon you grant us a limited license to store, transfer, and render that content solely to provide the service.",
  },
  {
    id: "public",
    title: "3. Public datasets",
    body: "Datasets marked public are visible to anyone. You are responsible for ensuring you have the right to publish any elevation, hydrographic, or survey data, and for complying with the licenses attached to source data.",
  },
  {
    id: "storage",
    title: "4. Storage & fair use",
    body: "Plans include defined storage and transfer allowances. Sustained usage that materially exceeds your plan may be rate-limited or billed at overage rates described on the pricing page.",
  },
  {
    id: "privacy",
    title: "5. Privacy",
    body: "We collect only the information needed to operate Beacon. We do not sell personal data. Private repositories are encrypted at rest and are never used to train models without your explicit consent.",
  },
  {
    id: "termination",
    title: "6. Termination",
    body: "You may close your account at any time. We may suspend accounts that violate these terms. On termination we provide a 30-day window to export your datasets before deletion.",
  },
  {
    id: "liability",
    title: "7. Limitation of liability",
    body: "Beacon is provided \u201Cas is.\u201D Flood models and terrain hosted here are engineering inputs, not guarantees. We are not liable for decisions made using data retrieved from the platform.",
  },
];

export default function TermsPage() {
  return (
    <AppShell>
      <div className="mx-auto grid max-w-6xl gap-10 px-4 py-12 md:grid-cols-[1fr_240px] md:px-6">
        <article className="min-w-0">
          <h1 className="text-3xl font-semibold tracking-tight">Terms &amp; Privacy</h1>
          <p className="mt-2 text-sm text-muted-foreground">Last updated March 14, 2026</p>
          <Separator className="my-6" />
          <div className="flex flex-col gap-8">
            {sections.map((s) => (
              <section key={s.id} id={s.id} className="scroll-mt-20">
                <h2 className="text-lg font-semibold">{s.title}</h2>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{s.body}</p>
              </section>
            ))}
          </div>
          <Separator className="my-8" />
          <p className="text-sm text-muted-foreground">
            Questions about these terms? Reach us at{" "}
            <Link href="/contact" className="text-accent hover:underline">
              our contact page
            </Link>
            .
          </p>
        </article>

        <aside className="hidden md:block">
          <nav className="sticky top-20 flex flex-col gap-1 text-sm">
            <p className="mb-1 font-medium">On this page</p>
            {sections.map((s) => (
              <Link
                key={s.id}
                href={`#${s.id}`}
                className="text-muted-foreground hover:text-foreground"
              >
                {s.title}
              </Link>
            ))}
          </nav>
        </aside>
      </div>
    </AppShell>
  );
}
