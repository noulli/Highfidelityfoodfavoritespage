import { color } from "../tokens";

export function RetroSectionOrnamentBars() {
  return (
    <div className="flex flex-col gap-0.5 mr-2.5">
      <div className="h-3 w-[3px]" style={{ background: color.tomato }} />
      <div className="h-1.5 w-[3px]" style={{ background: color.espresso, opacity: 0.5 }} />
    </div>
  );
}
