import { useEffect, type ReactNode } from "react";
import { Users, MoreHorizontal, UserPlus, Settings2, X } from "lucide-react";
import type { Collaborator } from "./collection-detail-mock-data";
import { color, ink, fontFamily, typography, shadow } from "../tokens";

interface Props {
  visible: boolean;
  collaborators: Collaborator[];
  canManageMembers?: boolean;
  onClose: () => void;
  onManage?: () => void;
  onInvite?: () => void;
  onRowMore?: (collaborator: Collaborator) => void;
}

export function RetroCollaboratorSheet({
  visible,
  collaborators,
  canManageMembers = true,
  onClose,
  onManage,
  onInvite,
  onRowMore,
}: Props) {
  useEffect(() => {
    if (!visible) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [visible]);

  if (!visible) return null;

  const owners = collaborators.filter((c) => c.role === "owner");
  const members = collaborators.filter((c) => c.role === "member");
  const collaboratorCountText =
    collaborators.length > 0
      ? `${collaborators.length} 位成员正在维护这份合集`
      : "邀请熟悉这份清单的人一起补充餐厅";

  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center">
      <button
        type="button"
        aria-label="关闭"
        onClick={onClose}
        className="absolute inset-0"
        style={{ background: "rgba(43,31,26,0.45)" }}
      />

      <div
        data-retro-collaborator-sheet
        role="dialog"
        aria-modal="true"
        aria-labelledby="collaborator-sheet-title"
        aria-describedby="collaborator-sheet-description"
        className="relative w-full max-w-[480px] flex flex-col"
        style={{
          background: color.paper,
          color: color.espresso,
          maxHeight: "88vh",
          borderTopLeftRadius: 20,
          borderTopRightRadius: 20,
          boxShadow: shadow.fab,
          animation: "retro-sheet-up 220ms ease-out",
        }}
      >
        <style>{`
          @keyframes retro-sheet-up {
            from { transform: translateY(8%); opacity: 0; }
            to { transform: none; opacity: 1; }
          }
          @media (prefers-reduced-motion: reduce) {
            [data-retro-collaborator-sheet] {
              animation: none !important;
            }
          }
        `}</style>
        <div className="pt-3 pb-2 flex justify-center">
          <div
            className="h-1 w-10 rounded-full"
            style={{ background: ink.edge }}
          />
        </div>

        <div className="px-5 pt-2 pb-4">
          <div className="flex items-start justify-between gap-3">
            <div className="flex min-w-0 items-start gap-3">
              <div
                className="mt-0.5 flex size-9 shrink-0 items-center justify-center rounded-full"
                style={{ background: `${color.sage}18`, color: color.sageText }}
              >
                <Users className="size-5" strokeWidth={1.6} />
              </div>
              <div className="min-w-0">
                <div className="flex min-w-0 items-baseline gap-2">
                  <h2
                    id="collaborator-sheet-title"
                    style={{ ...typography.sectionTitle, fontSize: 17, letterSpacing: "0.12em" }}
                  >
                    协作成员
                  </h2>
                  <span
                    className="text-[13px]"
                    style={{
                      color: color.mutedText,
                      fontFamily: fontFamily.serif,
                      fontVariantNumeric: "tabular-nums",
                    }}
                  >
                    {collaborators.length}
                  </span>
                </div>
                <p
                  id="collaborator-sheet-description"
                  className="mt-1 text-[12px] leading-relaxed"
                  style={{ color: color.mutedText }}
                >
                  {collaboratorCountText}
                </p>
              </div>
            </div>
            <button
              type="button"
              onClick={onClose}
              aria-label="关闭协作成员面板"
              className="-mr-2 flex size-9 shrink-0 items-center justify-center rounded-full transition duration-200 hover:opacity-80 active:scale-95 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2"
              style={{ color: color.espresso, outlineColor: color.espresso }}
            >
              <X className="size-5" strokeWidth={1.5} />
            </button>
          </div>
        </div>

        <div className="mx-5 h-px" style={{ background: ink.rule }} />

        <div className="flex-1 overflow-y-auto px-5 py-5 space-y-5">
          {owners.length > 0 && (
            <CollaboratorGroup label="创建者" count={owners.length}>
              {owners.map((c, index) => (
                <CollaboratorRow
                  key={c.id}
                  collaborator={c}
                  roleLabel="拥有者"
                  showDivider={index > 0}
                  trailing={
                    <span
                      className="inline-flex h-7 shrink-0 items-center rounded-full border px-2.5 text-[11px]"
                      style={{
                        background: `${color.star}18`,
                        borderColor: `${color.star}45`,
                        color: "#8A5B00",
                        fontFamily: fontFamily.serif,
                        letterSpacing: "0.08em",
                      }}
                    >
                      创建者
                    </span>
                  }
                />
              ))}
            </CollaboratorGroup>
          )}

          {members.length > 0 && (
            <CollaboratorGroup label="协作者" count={members.length}>
              {members.map((c, index) => (
                <CollaboratorRow
                  key={c.id}
                  collaborator={c}
                  roleLabel="可补充餐厅"
                  showDivider={index > 0}
                  trailing={
                    canManageMembers ? (
                      <button
                        type="button"
                        aria-label={`管理 ${c.name}`}
                        onClick={() => onRowMore?.(c)}
                        disabled={!onRowMore}
                        className="inline-flex size-10 shrink-0 items-center justify-center rounded-full transition duration-200 enabled:hover:opacity-80 enabled:active:scale-95 disabled:cursor-not-allowed disabled:opacity-40 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2"
                        style={{
                          background: ink.chip,
                          color: color.espresso,
                          outlineColor: color.espresso,
                        }}
                      >
                        <MoreHorizontal className="size-5" strokeWidth={1.6} />
                      </button>
                    ) : null
                  }
                />
              ))}
            </CollaboratorGroup>
          )}

          {collaborators.length === 0 && (
            <div
              className="flex min-h-[120px] flex-col items-center justify-center rounded-lg border px-5 py-6 text-center"
              style={{ background: color.cardSurface, borderColor: ink.rule }}
            >
              <div
                className="flex size-10 items-center justify-center rounded-full"
                style={{ background: ink.chip, color: color.espresso }}
              >
                <UserPlus className="size-5" strokeWidth={1.6} />
              </div>
              <p className="mt-3 text-[14px]" style={{ color: color.espresso, fontFamily: fontFamily.serif }}>
                暂无协作成员
              </p>
              <p className="mt-1 text-[12px] leading-relaxed" style={{ color: color.mutedText }}>
                邀请后，成员会出现在这里。
              </p>
            </div>
          )}
        </div>

        {canManageMembers && (
          <div
            className="px-5 pt-4 pb-6 grid grid-cols-2 gap-3"
            style={{ borderTop: `1px solid ${ink.rule}` }}
          >
            <FooterAction
              icon={<Settings2 className="size-4" strokeWidth={1.5} />}
              label="协作管理"
              onClick={onManage}
              variant="ghost"
            />
            <FooterAction
              icon={<UserPlus className="size-4" strokeWidth={1.5} />}
              label="邀请协作者"
              onClick={onInvite}
              variant="primary"
            />
          </div>
        )}
      </div>
    </div>
  );
}

function CollaboratorGroup({
  label,
  count,
  children,
}: {
  label: string;
  count: number;
  children: ReactNode;
}) {
  return (
    <section>
      <div className="mb-2 flex items-center justify-between gap-3">
        <h3
          className="text-[11px] tracking-[0.24em]"
          style={{ color: color.mutedText, fontFamily: fontFamily.serif }}
        >
          {label}
        </h3>
        <span
          className="text-[12px]"
          style={{ color: color.mutedText, fontVariantNumeric: "tabular-nums" }}
        >
          {count}
        </span>
      </div>
      <div
        className="overflow-hidden border"
        style={{ background: color.cardSurface, borderColor: ink.rule, borderRadius: 8 }}
      >
        {children}
      </div>
    </section>
  );
}

function CollaboratorRow({
  collaborator,
  roleLabel,
  showDivider,
  trailing,
}: {
  collaborator: Collaborator;
  roleLabel: string;
  showDivider?: boolean;
  trailing?: ReactNode;
}) {
  return (
    <div
      className="flex min-h-[64px] items-center gap-3 px-3 py-3"
      style={showDivider ? { borderTop: `1px solid ${ink.hairline}` } : undefined}
    >
      <div
        className="flex size-10 shrink-0 items-center justify-center overflow-hidden rounded-full"
        style={{ background: color.warmFill, color: color.espresso }}
      >
        {collaborator.avatarUrl ? (
          <img
            src={collaborator.avatarUrl}
            alt=""
            className="size-full object-cover"
            draggable={false}
          />
        ) : (
          <span
            style={{
              fontFamily: fontFamily.serif,
              fontSize: 14,
              fontWeight: 600,
              color: color.espresso,
            }}
          >
            {collaborator.fallback}
          </span>
        )}
      </div>
      <div className="flex-1 min-w-0">
        <p
          className="truncate text-[15px]"
          style={{ color: color.espresso, fontFamily: fontFamily.serif }}
        >
          {collaborator.name}
        </p>
        <p className="mt-1 text-[12px]" style={{ color: color.mutedText }}>
          {roleLabel}
        </p>
      </div>
      {trailing}
    </div>
  );
}

function FooterAction({
  icon,
  label,
  variant,
  onClick,
}: {
  icon: ReactNode;
  label: string;
  variant: "primary" | "ghost";
  onClick?: () => void;
}) {
  const primary = variant === "primary";
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={!onClick}
      className="inline-flex h-11 min-w-0 items-center justify-center gap-1.5 rounded-full px-3 text-[13px] tracking-[0.16em] transition duration-200 enabled:hover:opacity-85 enabled:active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-45 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2"
      style={{
        background: primary ? color.espresso : "transparent",
        color: primary ? color.paper : color.espresso,
        border: primary ? "none" : `1px solid ${ink.edge}`,
        fontFamily: fontFamily.serif,
        outlineColor: color.espresso,
      }}
    >
      {icon}
      <span className="truncate">{label}</span>
    </button>
  );
}
