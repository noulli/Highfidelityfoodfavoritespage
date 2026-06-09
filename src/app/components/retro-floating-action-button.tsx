import { Plus } from "lucide-react";
import { color, fontFamily, shadow } from "../tokens";

interface Props {
  label?: string;
  onClick?: () => void;
}

export function RetroFloatingActionButton({ label = "添加店铺", onClick }: Props) {
  return (
    <div
      className="pointer-events-none fixed inset-x-0 bottom-0 z-20 mx-auto flex max-w-[480px] justify-end px-5 pb-[max(1rem,env(safe-area-inset-bottom))] pt-4"
      style={{
        background: `linear-gradient(to top, ${color.paper} 72%, ${color.paper}00)`,
      }}
    >
      <button
        onClick={onClick}
        aria-label={label}
        className="pointer-events-auto h-12 px-5 inline-flex items-center gap-2 text-[13px] tracking-[0.16em] rounded-full focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2"
        style={{
          background: color.espresso,
          color: color.paper,
          boxShadow: shadow.fab,
          fontFamily: fontFamily.serif,
          outlineColor: color.espresso,
        }}
      >
        <Plus className="size-4" strokeWidth={2} />
        {label}
      </button>
    </div>
  );
}
