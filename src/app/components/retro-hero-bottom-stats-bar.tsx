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
      className="mx-5 px-1 py-3 flex items-center justify-between"
      style={{ borderTop: `1px solid ${ink.hairline}`, borderBottom: `1px solid ${ink.hairline}` }}
    >
      <div className="flex items-center gap-5">
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
            style={{ color: saved ? color.tomato : color.muted }}
            fill={saved ? color.tomato : "none"}
          />
          <span className="text-[13px]" style={{ color: color.muted }}>
            {savedLabel}
          </span>
        </div>
        <button
          onClick={onContributorTap}
          className="inline-flex items-center gap-1.5"
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
          className="px-3.5 py-1.5 rounded-full border text-[12px] transition-colors"
          style={{
            borderColor: saved ? color.tomato : ink.edge,
            background: saved ? `${color.tomato}10` : "transparent",
            color: saved ? color.tomato : color.espresso,
          }}
        >
          {saved ? "已收藏" : "收藏"}
        </button>
      )}
    </div>
  );
}
