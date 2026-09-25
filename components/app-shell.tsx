import { RouteBack } from "@/components/route-back";

export function AppShell({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen flex-col bg-background text-foreground">
      <main className="flex-1">
        <RouteBack />
        {children}
      </main>
    </div>
  );
}
