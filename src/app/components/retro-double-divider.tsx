import { color } from "../tokens";

export function RetroDoubleDivider() {
  return (
    <div className="w-full px-5 py-1.5">
      <div className="h-px" style={{ background: color.espresso, opacity: 0.85 }} />
      <div className="h-[3px]" />
      <div className="h-px" style={{ background: color.espresso, opacity: 0.25 }} />
    </div>
  );
}
