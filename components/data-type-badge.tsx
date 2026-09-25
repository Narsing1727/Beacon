import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { dataTypeColors, type DataType } from "@/lib/data";

export function DataTypeBadge({ type, className }: { type: DataType; className?: string }) {
  return (
    <Badge variant="outline" className={cn("font-mono text-[0.7rem]", dataTypeColors[type], className)}>
      {type}
    </Badge>
  );
}
