import { useState } from "react";
import { Heart, Users, Store } from "lucide-react";
import { color, ink } from "../tokens";

interface Props {
  savedLabel: string;
  contributorCountLabel: string;
  shopCountLabel: string;
  isSubscribed?: boolean;
  canSeeSaveAction?: boolean;
  onSaveTap?: () => void;
  onContributorTap?: () => void;
}

export function RetroHeroBottomStatsBar({
  savedLabel,
  contributorCountLabel,
  shopCountLabel,
  isSubscribed = false,
  canSeeSaveAction = true,
  onSaveTap,
  onContributorTap,
}: Props) {
  const [saved, setSaved] = useState(isSubscribed);

  const handleSave = () => {
    setSaved(!saved);
    onSaveTap?.();
  };

  return (
    <div
      className="mx-5 px-1 py-3 flex items-center justify-between gap-3"
      style={{ borderTop: `1px solid ${ink.hairline}`, borderBottom: `1px solid ${ink.hairline}` }}
    >
      <div className="flex min-w-0 items-center gap-4">
        <div className="inline-flex items-center gap-1.5">
          <Store className="size-4" strokeWidth={1.5} style={{ color: color.sage }} />
          <span className="text-[13px]" style={{ color: color.espresso }}>
            {shopCountLabel}
          </span>
        </div>
        <div className="inline-flex items-center gap-1.5">
          <Heart
            className="size-4"
            strokeWidth={1.5}
            style={{ color: saved ? color.tomato : color.mutedText }}
            fill={saved ? color.tomato : "none"}
          />
          <span className="text-[13px]" style={{ color: color.mutedText }}>
            {savedLabel}
          </span>
        </div>
        <button
          onClick={onContributorTap}
          aria-label={`查看协作者,${contributorCountLabel}`}
          className="inline-flex min-h-10 items-center gap-1.5 rounded-full px-1.5 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2"
          style={{ outlineColor: color.espresso }}
        >
          <Users className="size-4" strokeWidth={1.5} style={{ color: color.sage }} />
          <span className="text-[13px]" style={{ color: color.espresso }}>
            {contributorCountLabel}
          </span>
        </button>
      </div>

      {canSeeSaveAction && (
        <button
          onClick={handleSave}
          className="min-h-10 shrink-0 rounded-full border px-4 text-[12px] transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2"
          style={{
            borderColor: saved ? color.tomato : ink.edge,
            background: saved ? `${color.tomato}10` : "transparent",
            color: saved ? color.tomatoText : color.espresso,
            outlineColor: color.espresso,
          }}
        >
          {saved ? "已收藏" : "收藏"}
        </button>
      )}
    </div>
  );
}
