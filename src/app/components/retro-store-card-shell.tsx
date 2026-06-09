import { Star, MoreVertical, MapPin } from "lucide-react";
import type { StoreCard } from "./collection-detail-mock-data";
import { color, ink, typography, fontFamily } from "../tokens";

interface Props extends StoreCard {
  index: number;
  canEdit?: boolean;
  onClick?: () => void;
  onEditClick?: () => void;
}

export function RetroStoreCardShell({
  index,
  name,
  address,
  coverImage,
  cuisine,
  rating,
  distance,
  description,
  dishes,
  contributor,
  featured,
  canEdit = false,
  onClick,
  onEditClick,
}: Props) {
  return (
    <article
      onClick={onClick}
      className="relative cursor-pointer pt-4 pb-6"
      style={{ borderTop: `1px solid ${ink.hairline}` }}
    >
      <div className="flex items-start justify-between gap-2">
        <div className="flex items-baseline gap-2 min-w-0">
          <span
            className="text-[12px] tracking-[0.15em] shrink-0"
            style={{
              color: color.mutedText,
              fontFamily: fontFamily.serif,
              fontVariantNumeric: "tabular-nums",
            }}
          >
            {String(index).padStart(2, "0")}
          </span>
          <h3 style={typography.cardTitle}>{name}</h3>
          {featured && (
            <span
              className="text-[10px] px-1.5 py-0.5 shrink-0"
              style={{ background: color.tomato, color: color.paper, borderRadius: 2 }}
            >
              主推
            </span>
          )}
        </div>
        {canEdit && (
          <button
            onClick={(e) => {
              e.stopPropagation();
              onEditClick?.();
            }}
            aria-label="更多"
            className="size-11 flex items-center justify-center shrink-0 -mt-2 -mr-3 rounded-full focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2"
            style={{ color: color.mutedText, outlineColor: color.espresso }}
          >
            <MoreVertical className="size-4" strokeWidth={1.5} />
          </button>
        )}
      </div>

      <div
        className="mt-1.5 flex items-center gap-2 text-[11px]"
        style={{ color: color.mutedText }}
      >
        <span>{cuisine}</span>
        <span className="size-0.5 rounded-full" style={{ background: color.muted }} />
        <span className="inline-flex items-center gap-0.5" style={{ color: color.espresso }}>
          <Star className="size-3" strokeWidth={1.75} fill={color.espresso} />
          {rating}
        </span>
        <span className="size-0.5 rounded-full" style={{ background: color.muted }} />
        <span>{distance}</span>
      </div>

      <div
        className="mt-1.5 inline-flex items-start gap-1 text-[11px]"
        style={{ color: color.mutedText }}
      >
        <MapPin className="size-3 mt-0.5 shrink-0" strokeWidth={1.75} style={{ color: color.muted }} />
        <span className="line-clamp-1">{address}</span>
      </div>

      {coverImage && (
        <div
          className="mt-3 w-full overflow-hidden rounded"
          style={{ aspectRatio: "16/9", background: color.warmFill }}
        >
          <img src={coverImage} alt="" className="size-full object-cover" />
        </div>
      )}

      <p className="mt-3" style={typography.pullQuote}>
        {description}
      </p>

      {dishes.length > 0 && (
        <div className="mt-2.5 flex flex-wrap gap-1.5">
          {dishes.map((dish, idx) => (
            <span
              key={idx}
              className="px-2 py-0.5 text-[11px] rounded"
              style={{ background: ink.chip, color: color.espresso }}
            >
              {dish}
            </span>
          ))}
        </div>
      )}

      <div className="mt-3 text-[10px] tracking-[0.2em]" style={{ color: color.mutedText }}>
        — {contributor}
      </div>
    </article>
  );
}
