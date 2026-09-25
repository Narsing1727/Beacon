import { cn } from "@/lib/utils";

export function BeaconLogo({ className }: { className?: string }) {
  return (
    <span className={cn("inline-flex items-center gap-2 font-semibold", className)}>
      <span className="inline-flex size-6 items-center justify-center rounded-md bg-primary text-primary-foreground">
        <svg viewBox="0 0 24 24" fill="none" className="size-4" aria-hidden="true">
          <path d="M12 2 4 20h16L12 2Z" fill="currentColor" opacity="0.9" />
          <circle cx="12" cy="9" r="2.4" fill="var(--primary)" />
        </svg>
      </span>
      Beacon
    </span>
  );
}
