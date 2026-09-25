import Link from "next/link";
import { Braces, KeyRound, RadioTower, Terminal } from "lucide-react";
import { AppShell } from "@/components/app-shell";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

const endpoints = [
  { method: "GET", path: "/v1/repos", note: "List repositories visible to the authenticated user." },
  { method: "POST", path: "/v1/repos", note: "Create a repository and its initial default branch." },
  { method: "POST", path: "/v1/uploads", note: "Start a resumable, content-defined upload session." },
  { method: "GET", path: "/v1/commits/{sha}/manifest", note: "Read the signed Merkle manifest for a commit." },
];

export default function ApiReferencePage() {
  return (
    <AppShell>
      <div className="mx-auto grid max-w-7xl gap-8 px-4 py-8 md:grid-cols-[220px_1fr] md:px-6">
        <aside className="hidden md:block">
          <div className="sticky top-6 border-l border-border/50 pl-3 text-sm">
            <Link href="#authentication" className="block py-1.5 text-muted-foreground hover:text-foreground">Authentication</Link>
            <Link href="#repositories" className="block py-1.5 text-muted-foreground hover:text-foreground">Repositories</Link>
            <Link href="#uploads" className="block py-1.5 text-muted-foreground hover:text-foreground">Resumable uploads</Link>
            <Link href="#provenance" className="block py-1.5 text-muted-foreground hover:text-foreground">Provenance</Link>
          </div>
        </aside>

        <div className="min-w-0">
          <Badge variant="secondary">Reference</Badge>
          <h1 className="mt-3 font-serif text-4xl font-semibold">Beacon API</h1>
          <p className="mt-3 max-w-2xl text-base leading-relaxed text-muted-foreground">
            Build upload, validation, review, and provenance workflows around the same repository model used by Beacon.
          </p>

          <section id="authentication" className="mt-10 border-t border-border/40 pt-6">
            <div className="flex items-center gap-2"><KeyRound className="size-4 text-accent" /><h2 className="text-lg font-semibold">Authentication</h2></div>
            <p className="mt-2 text-sm text-muted-foreground">Send a scoped personal access token with each request.</p>
            <pre className="mt-4 overflow-x-auto border border-border/40 bg-muted/30 p-4 font-mono text-xs">{`Authorization: Bearer bcn_your_token`}</pre>
          </section>

          <section id="repositories" className="mt-10 border-t border-border/40 pt-6">
            <div className="flex items-center gap-2"><Braces className="size-4 text-accent" /><h2 className="text-lg font-semibold">Endpoints</h2></div>
            <div className="mt-4 flex flex-col gap-3">
              {endpoints.map((endpoint) => (
                <Card key={`${endpoint.method}-${endpoint.path}`} className="py-0">
                  <CardContent className="flex flex-col gap-2 p-4 sm:flex-row sm:items-center">
                    <Badge variant="outline" className="w-fit font-mono">{endpoint.method}</Badge>
                    <code className="font-mono text-sm">{endpoint.path}</code>
                    <span className="text-sm text-muted-foreground sm:ml-auto">{endpoint.note}</span>
                  </CardContent>
                </Card>
              ))}
            </div>
          </section>

          <section id="uploads" className="mt-10 border-t border-border/40 pt-6">
            <div className="flex items-center gap-2"><Terminal className="size-4 text-accent" /><h2 className="text-lg font-semibold">Resumable uploads</h2></div>
            <p className="mt-2 text-sm leading-relaxed text-muted-foreground">Clients fingerprint raw chunks before compression, retry only unverified chunks, and can resume the same upload session after a lost connection.</p>
          </section>

          <section id="provenance" className="mt-10 border-t border-border/40 pt-6">
            <div className="flex items-center gap-2"><RadioTower className="size-4 text-accent" /><h2 className="text-lg font-semibold">Provenance manifests</h2></div>
            <p className="mt-2 text-sm leading-relaxed text-muted-foreground">Every commit can expose its chunk manifest and Merkle root for a verifiable, audit-ready record of the model inputs and outputs.</p>
          </section>
        </div>
      </div>
    </AppShell>
  );
}
