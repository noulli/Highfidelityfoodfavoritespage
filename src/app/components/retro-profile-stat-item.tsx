import { LucideIcon } from "lucide-react";

interface Props {
  icon: LucideIcon;
  label: string;
  value: number | string;
  tone?: "neutral" | "accent";
}

export function RetroProfileStatItem({ icon: Icon, label, value, tone = "neutral" }: Props) {
  const toneColor = tone === "accent" ? "text-orange-500" : "text-neutral-500";
  return (
    <div className="flex flex-col items-center gap-1.5">
      <div className={`flex items-center gap-1.5 ${toneColor}`}>
        <Icon className="size-4" strokeWidth={1.75} />
        <span className="text-sm">{label}</span>
      </div>
      <div className="text-2xl font-semibold text-neutral-900">{value}</div>
    </div>
  );
}
