import { Plus } from "lucide-react";
import { color, fontFamily, shadow } from "../tokens";

interface Props {
  label?: string;
  onClick?: () => void;
}

export function RetroFloatingActionButton({ label = "添加店铺", onClick }: Props) {
  return (
    <button
      onClick={onClick}
      aria-label={label}
      className="fixed bottom-6 h-12 px-5 inline-flex items-center gap-2 text-[13px] tracking-[0.25em] rounded-full"
      style={{
        right: "max(1rem, calc(50% - 240px + 1rem))",
        background: color.espresso,
        color: color.paper,
        boxShadow: shadow.fab,
        fontFamily: fontFamily.serif,
      }}
    >
      <Plus className="size-4" strokeWidth={2} />
      {label}
    </button>
  );
}
