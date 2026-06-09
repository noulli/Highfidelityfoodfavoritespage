import { MapPin, Lock, Globe } from "lucide-react";
import { color, ink, typography, fontFamily } from "../tokens";

interface Props {
  title: string;
  cityLabel: string;
  description: string;
  creatorAvatar?: string;
  creatorFallback: string;
  creatorLabel: string;
  updatedAtLabel: string;
  roleLabel?: string;
  privacyVariant: "public" | "private";
  showPrivacyBadge: boolean;
}

export function RetroDetailHeroMainInfoBlock({
  title,
  cityLabel,
  description,
  creatorAvatar,
  creatorFallback,
  creatorLabel,
  updatedAtLabel,
  roleLabel,
  privacyVariant,
  showPrivacyBadge,
}: Props) {
  return (
    <section className="px-5 pt-5 pb-6">
      <div className="flex items-center gap-2 mb-3">
        <span
          className="inline-flex items-center gap-1 text-[12px]"
          style={{ color: color.sageText }}
        >
          <MapPin className="size-3.5" strokeWidth={1.75} style={{ color: color.sage }} />
          {cityLabel}
        </span>
        {showPrivacyBadge && (
          <>
            <span
              className="size-1 rounded-full"
              style={{ background: color.muted, opacity: 0.4 }}
            />
            <span
              className="inline-flex items-center gap-1 text-[11px]"
              style={{
                color: privacyVariant === "private" ? color.mutedText : color.sageText,
              }}
            >
              {privacyVariant === "private" ? (
                <Lock className="size-3" strokeWidth={1.75} />
              ) : (
                <Globe className="size-3" strokeWidth={1.75} />
              )}
              {privacyVariant === "private" ? "私密" : "公开"}
            </span>
          </>
        )}
      </div>

      <h2 className="mb-3" style={typography.pageHeroTitle}>
        {title}
      </h2>

      <p className="mb-5" style={typography.body}>
        {description}
      </p>

      <div className="flex items-center gap-3">
        <div
          className="size-8 rounded-full flex items-center justify-center overflow-hidden"
          style={{ background: color.warmFill }}
        >
          {creatorAvatar ? (
            <img src={creatorAvatar} alt="" className="size-full object-cover" />
          ) : (
            <span
              style={{
                fontFamily: fontFamily.serif,
                fontSize: 15,
                fontWeight: 600,
                color: color.espresso,
              }}
            >
              {creatorFallback}
            </span>
          )}
        </div>
        <span className="text-[13px]" style={{ color: color.espresso }}>
          {creatorLabel}
        </span>
        <span
          className="size-1 rounded-full"
          style={{ background: color.muted, opacity: 0.4 }}
        />
        <span style={typography.meta}>{updatedAtLabel}</span>
        {roleLabel && (
          <>
            <span
              className="size-1 rounded-full"
              style={{ background: color.muted, opacity: 0.4 }}
            />
            <span
              className="rounded px-1.5 py-0.5 text-[11px]"
              style={{
                background: ink.chip,
                color: color.mutedText,
              }}
            >
              {roleLabel}
            </span>
          </>
        )}
      </div>

    </section>
  );
}
