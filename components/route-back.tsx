"use client";

import { ArrowLeft } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";

export function RouteBack() {
  const pathname = usePathname();
  const router = useRouter();

  if (pathname === "/") return null;

  function goBack() {
    if (window.history.length > 1) {
      router.back();
      return;
    }

    router.push("/");
  }

  return (
    <div className="mx-auto flex max-w-7xl px-4 pt-4 md:px-6">
      <Button variant="ghost" size="icon-sm" onClick={goBack} aria-label="Go back" title="Go back">
        <ArrowLeft />
      </Button>
    </div>
  );
}
