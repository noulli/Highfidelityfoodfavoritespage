import { ChevronUp } from "lucide-react";
import { RetroSectionOrnamentBars } from "./retro-section-ornament-bars";

interface Props {
  city: string;
  collectionCount: number;
  expanded: boolean;
  onToggle?: () => void;
}

export function RetroCityAccordionHeader({ city, collectionCount, expanded, onToggle }: Props) {
  return (
    <button
      onClick={onToggle}
      className="w-full flex items-center px-4 py-3.5 bg-white rounded-2xl border border-neutral-100 shadow-[0_1px_2px_rgba(0,0,0,0.02)]"
    >
      <RetroSectionOrnamentBars />
      <span className="text-base font-semibold text-neutral-900 flex-1 text-left">
        {city}
      </span>
      <span className="text-xs text-neutral-400 mr-2">
        {collectionCount} 个合集
      </span>
      <ChevronUp
        className={`size-4 text-neutral-400 transition-transform ${
          expanded ? "" : "rotate-180"
        }`}
        strokeWidth={2}
      />
    </button>
  );
}
