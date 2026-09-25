import Link from "next/link";
import { BeaconLogo } from "@/components/beacon-logo";

const columns = [
  {
    heading: "Product",
    links: [
      { href: "/explore", label: "Explore" },
      { href: "/pricing", label: "Pricing" },
      { href: "/docs", label: "Docs" },
      { href: "/api-reference", label: "API reference" },
    ],
  },
  {
    heading: "Company",
    links: [
      { href: "/about", label: "About" },
      { href: "/blog", label: "Blog & changelog" },
      { href: "/contact", label: "Contact & support" },
    ],
  },
  {
    heading: "Legal",
    links: [
      { href: "/terms", label: "Terms" },
      { href: "/privacy", label: "Privacy" },
    ],
  },
];

export function SiteFooter() {
  return (
    <footer className="border-t border-border bg-muted/20">
      <div className="mx-auto grid max-w-7xl gap-10 px-4 py-12 md:grid-cols-4 md:px-6">
        <div className="flex flex-col gap-3">
          <BeaconLogo />
          <p className="max-w-xs text-sm text-muted-foreground">
            Version control and collaboration for hydro and GIS engineers.
          </p>
        </div>
        {columns.map((col) => (
          <div key={col.heading} className="flex flex-col gap-3">
            <h3 className="text-sm font-medium">{col.heading}</h3>
            <ul className="flex flex-col gap-2">
              {col.links.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-sm text-muted-foreground transition-colors hover:text-foreground">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      <div className="border-t border-border">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-2 px-4 py-4 text-xs text-muted-foreground md:flex-row md:px-6">
          <p>© 2026 Beacon, Inc. All rights reserved.</p>
          <p className="font-mono">beacon --version 1.2.0</p>
        </div>
      </div>
    </footer>
  );
}
