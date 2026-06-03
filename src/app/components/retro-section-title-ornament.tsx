import { color } from "../tokens";

export function RetroSectionTitleOrnament() {
  return (
    <div className="inline-flex items-center gap-2">
      <span className="w-6 h-px" style={{ background: color.tomato, opacity: 0.3 }} />
      <span className="size-1 rotate-45" style={{ background: color.tomato }} />
      <span className="w-6 h-px" style={{ background: color.tomato, opacity: 0.3 }} />
    </div>
  );
}
