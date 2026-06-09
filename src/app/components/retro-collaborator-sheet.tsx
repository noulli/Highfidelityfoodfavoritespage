import { useEffect } from "react";
import { Users, MoreHorizontal, UserPlus, Settings2 } from "lucide-react";
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

  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center">
      <button
        aria-label="关闭"
        onClick={onClose}
        className="absolute inset-0"
        style={{ background: "rgba(43,31,26,0.45)" }}
      />

      <div
        className="relative w-full max-w-[480px] flex flex-col"
        style={{
          background: color.paper,
          color: color.espresso,
          maxHeight: "82vh",
          borderTopLeftRadius: 20,
          borderTopRightRadius: 20,
          boxShadow: shadow.fab,
          animation: "retro-sheet-up 220ms ease-out",
        }}
      >
        <div className="pt-3 pb-2 flex justify-center">
          <div
            className="h-1 w-10 rounded-full"
            style={{ background: ink.edge }}
          />
        </div>

        <div className="px-5 pt-2 pb-3 flex items-center gap-2">
          <Users
            className="size-5"
            strokeWidth={1.5}
            style={{ color: color.sage }}
          />
          <h2 style={{ ...typography.sectionTitle, fontSize: 17, letterSpacing: "0.15em" }}>
            协作成员
          </h2>
          <span
            className="text-[13px]"
            style={{ color: color.muted, fontFamily: fontFamily.serif, fontVariantNumeric: "tabular-nums" }}
          >
            ({collaborators.length})
          </span>
        </div>

        <div className="mx-5 h-px" style={{ background: ink.rule }} />

        <div className="flex-1 overflow-y-auto px-5 py-5 space-y-5">
          {owners.length > 0 && (
            <CollaboratorGroup label="创建者">
              {owners.map((c) => (
                <CollaboratorRow
                  key={c.id}
                  collaborator={c}
                  trailing={
                    <span
                      className="px-2 py-0.5 text-[11px] rounded"
                      style={{
                        background: `${color.tomato}15`,
                        color: color.tomato,
                        fontFamily: fontFamily.serif,
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
            <CollaboratorGroup label="协作者">
              {members.map((c) => (
                <CollaboratorRow
                  key={c.id}
                  collaborator={c}
                  trailing={
                    canManageMembers ? (
                      <button
                        aria-label={`管理 ${c.name}`}
                        onClick={() => onRowMore?.(c)}
                        className="size-8 inline-flex items-center justify-center rounded-full"
                        style={{ color: color.muted }}
                      >
                        <MoreHorizontal className="size-4" strokeWidth={1.5} />
                      </button>
                    ) : null
                  }
                />
              ))}
            </CollaboratorGroup>
          )}

          {collaborators.length === 0 && (
            <p
              className="text-center text-[13px] py-8"
              style={{ color: color.muted }}
            >
              暂无协作成员
            </p>
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
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <div
        className="text-[11px] tracking-[0.3em] mb-2"
        style={{ color: color.muted, fontFamily: fontFamily.serif }}
      >
        {label}
      </div>
      <div
        className="rounded overflow-hidden"
        style={{ border: `1px solid ${ink.rule}` }}
      >
        {children}
      </div>
    </div>
  );
}

function CollaboratorRow({
  collaborator,
  trailing,
}: {
  collaborator: Collaborator;
  trailing?: React.ReactNode;
}) {
  return (
    <div
      className="flex items-center gap-3 px-3 py-3"
      style={{ borderBottom: `1px solid ${ink.hairline}` }}
    >
      <div
        className="shrink-0 size-9 rounded-full flex items-center justify-center overflow-hidden"
        style={{ background: color.warmFill }}
      >
        {collaborator.avatarUrl ? (
          <img
            src={collaborator.avatarUrl}
            alt=""
            className="size-full object-cover"
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
        <div
          className="text-[14px] truncate"
          style={{ color: color.espresso, fontFamily: fontFamily.serif }}
        >
          {collaborator.name}
        </div>
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
  icon: React.ReactNode;
  label: string;
  variant: "primary" | "ghost";
  onClick?: () => void;
}) {
  const primary = variant === "primary";
  return (
    <button
      onClick={onClick}
      className="h-11 inline-flex items-center justify-center gap-1.5 text-[13px] tracking-[0.2em] rounded-full"
      style={{
        background: primary ? color.espresso : "transparent",
        color: primary ? color.paper : color.espresso,
        border: primary ? "none" : `1px solid ${ink.edge}`,
        fontFamily: fontFamily.serif,
      }}
    >
      {icon}
      {label}
    </button>
  );
}
