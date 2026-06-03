import { ReactNode } from "react";
import { color, ink, typography } from "../tokens";

interface Props {
  title: string;
  subtitle?: string;
  center?: boolean;
  showActions?: boolean;
  children?: ReactNode;
}

export function RetroPageStateCard({
  title,
  subtitle,
  center = true,
  showActions,
  children,
}: Props) {
  return (
    <div
      className={`mx-5 px-6 py-12 border ${center ? "text-center" : ""}`}
      style={{ borderColor: ink.rule, background: color.cardSurface }}
    >
      <h3 style={{ ...typography.sectionTitle, fontSize: 20 }}>{title}</h3>
      {subtitle && (
        <p className="mt-3 text-[13px] leading-relaxed" style={{ color: color.muted }}>
          {subtitle}
        </p>
      )}
      {showActions && <div className="mt-6">{children}</div>}
    </div>
  );
}
