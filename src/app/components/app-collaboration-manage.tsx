import { useEffect, useMemo, useState, type ComponentType, type ReactNode } from "react";
import {
  Check,
  ChevronLeft,
  ChevronRight,
  Copy,
  Link,
  Lock,
  Power,
  RefreshCcw,
  ShieldAlert,
  X,
} from "lucide-react";
import { TNavbar } from "./t-navbar";
import { RetroDoubleDivider } from "./retro-double-divider";
import { RetroPageStateCard } from "./retro-page-state-card";
import { RetroConfirmDialog } from "./retro-confirm-dialog";
import {
  mockCollaborationInviteLink,
  mockCollaborationManageCollection,
  mockCollaborationManageMembers,
  mockCollaborationManagePermissions,
  type CollaborationInviteLink,
  type CollaborationManageDisplayState,
  type CollaborationManageMember,
  type CollaborationStatusTone,
} from "./collection-detail-mock-data";
import { color, fontFamily, ink, layout, shadow, typography } from "../tokens";

interface Props {
  onBack?: () => void;
  displayState?: CollaborationManageDisplayState;
}

type PendingConfirm =
  | { type: "closeCollaboration" }
  | { type: "revokeInvite" }
  | { type: "removeMember"; member: CollaborationManageMember };

const collaboratorLimit = 10;

function cloneInviteLink(): CollaborationInviteLink {
  return { ...mockCollaborationInviteLink };
}

function createRegeneratedInviteLink(collectionId: number): CollaborationInviteLink {
  const token = `new${Date.now().toString(36)}`;
  return {
    inviteToken: token,
    status: "enabled",
    statusTone: "active",
    statusLabel: "生效中",
    active: true,
    used: 0,
    limit: 20,
    createdAt: "2026-06-09",
    expiresAt: "2026-07-09",
    invitePath: `/pages/collection-detail/index?collectionId=${collectionId}&inviteToken=${token}`,
    inviteUrl: `https://chiida.app/invite/${token}`,
  };
}

function revokeInviteLink(inviteLink: CollaborationInviteLink): CollaborationInviteLink {
  return {
    ...inviteLink,
    status: "revoked",
    statusTone: "inactive",
    statusLabel: "已停用",
    active: false,
    inviteUrl: "",
    invitePath: "",
    expiresAt: "",
  };
}

function AppCollaborationManage({ onBack, displayState = "ready" }: Props) {
  const permissions = mockCollaborationManagePermissions;
  const collection = mockCollaborationManageCollection;
  const [effectiveState, setEffectiveState] =
    useState<CollaborationManageDisplayState>(displayState);
  const [collaborationEnabled, setCollaborationEnabled] = useState(collection.collaborative);
  const [inviteLink, setInviteLink] = useState<CollaborationInviteLink>(cloneInviteLink);
  const [members, setMembers] = useState<CollaborationManageMember[]>(() =>
    mockCollaborationManageMembers.map((member) => ({ ...member })),
  );
  const [copied, setCopied] = useState(false);
  const [pendingConfirm, setPendingConfirm] = useState<PendingConfirm | null>(null);

  useEffect(() => {
    setEffectiveState(displayState);
  }, [displayState]);

  useEffect(() => {
    if (!copied) return;
    const timer = window.setTimeout(() => setCopied(false), 1600);
    return () => window.clearTimeout(timer);
  }, [copied]);

  const hasActiveInviteLink =
    collaborationEnabled && inviteLink.active && Boolean(inviteLink.inviteUrl);

  const confirmDialogCopy = useMemo(() => {
    if (!pendingConfirm) return null;
    if (pendingConfirm.type === "closeCollaboration") {
      return {
        title: "关闭协作模式",
        content: "协作者将降级为只读，当前邀请链接会失效。",
        confirmText: "关闭协作",
      };
    }
    if (pendingConfirm.type === "revokeInvite") {
      return {
        title: "停用邀请链接",
        content: "停用后，拿到旧链接的人将无法继续加入协作。",
        confirmText: "停用链接",
      };
    }
    return {
      title: "移除协作者",
      content: `确认将 ${pendingConfirm.member.name} 移出当前合集协作？`,
      confirmText: "移除成员",
    };
  }, [pendingConfirm]);

  const resetReadyState = () => {
    setEffectiveState("ready");
    setCollaborationEnabled(collection.collaborative);
    setInviteLink(cloneInviteLink());
    setMembers(mockCollaborationManageMembers.map((member) => ({ ...member })));
    setCopied(false);
    setPendingConfirm(null);
  };

  const handleCopy = async () => {
    if (!hasActiveInviteLink) return;
    try {
      await navigator.clipboard?.writeText(inviteLink.inviteUrl);
    } catch {
      // Feedback is local and optimistic even if clipboard access is unavailable.
    }
    setCopied(true);
  };

  const handleConfirm = () => {
    if (!pendingConfirm) return;
    if (pendingConfirm.type === "closeCollaboration") {
      setCollaborationEnabled(false);
      setInviteLink((prev) => revokeInviteLink(prev));
      setCopied(false);
      setMembers((prev) =>
        prev.map((member) =>
          member.role === "owner" ? member : { ...member, role: "viewer", roleLabel: "查看者" },
        ),
      );
    } else if (pendingConfirm.type === "revokeInvite") {
      setInviteLink((prev) => revokeInviteLink(prev));
      setCopied(false);
    } else {
      const memberId = pendingConfirm.member.id;
      setMembers((prev) =>
        prev.filter((member) => member.role === "owner" || member.id !== memberId),
      );
    }
    setPendingConfirm(null);
  };

  const openCollaboration = () => {
    setCollaborationEnabled(true);
    setInviteLink(createRegeneratedInviteLink(collection.id));
    setCopied(false);
  };

  const readyBlocked = effectiveState === "ready" && !permissions.canManageMembers;

  return (
    <div className="min-h-full w-full" style={{ background: color.paper, color: color.espresso }}>
      <div
        className="mx-auto min-h-screen"
        style={{ maxWidth: layout.pageMaxWidth, paddingBottom: layout.pageBottomPadding }}
      >
        <TNavbar
          title="协作管理"
          left={
            <button
              type="button"
              onClick={onBack}
              aria-label="返回"
              className="size-10 flex items-center justify-center rounded-full focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2"
              style={{ outlineColor: color.espresso }}
            >
              <ChevronLeft className="size-6" strokeWidth={1.5} />
            </button>
          }
        />

        <RetroDoubleDivider />

        {effectiveState === "loading" && (
          <div className="mt-8">
            <RetroPageStateCard title="正在整理协作信息" subtitle="加载中..." />
          </div>
        )}

        {effectiveState === "error" && (
          <div className="mt-8">
            <RetroPageStateCard title="加载失败" subtitle="网络异常，请稍后重试。" showActions>
              <PrimaryStateButton onClick={resetReadyState}>重 试</PrimaryStateButton>
            </RetroPageStateCard>
          </div>
        )}

        {(effectiveState === "no_permission" || readyBlocked) && (
          <div className="mt-8">
            <RetroPageStateCard
              title="暂无协作管理权限"
              subtitle="当前身份无法修改邀请和成员设置，请返回合集详情查看。"
              showActions
            >
              <OutlineStateButton onClick={onBack}>返 回 合 集 详 情</OutlineStateButton>
            </RetroPageStateCard>
          </div>
        )}

        {effectiveState === "ready" && !readyBlocked && (
          <main className="px-5 pt-6 space-y-5">
            <CollaborationManageCard
              title="协作设置"
              right={
                <CollaborationStatusChip
                  label={collaborationEnabled ? "协作已开启" : "协作未开启"}
                  tone={collaborationEnabled ? "active" : "inactive"}
                />
              }
            >
              <button
                type="button"
                onClick={() =>
                  collaborationEnabled
                    ? setPendingConfirm({ type: "closeCollaboration" })
                    : openCollaboration()
                }
                disabled={collaborationEnabled && !permissions.canCloseCollaboration}
                className="group mt-4 flex min-h-[72px] w-full items-center justify-between gap-4 rounded-lg px-4 text-left transition duration-200 enabled:hover:opacity-85 enabled:active:scale-[0.99] disabled:cursor-not-allowed disabled:opacity-50 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2"
                style={{
                  background: ink.chip,
                  outlineColor: color.espresso,
                }}
              >
                <span className="flex min-w-0 items-center gap-3">
                  <span
                    className="flex size-10 shrink-0 items-center justify-center rounded-full"
                    style={{
                      background: collaborationEnabled ? `${color.tomato}14` : `${color.sage}18`,
                      color: collaborationEnabled ? color.tomatoText : color.sageText,
                    }}
                  >
                    <Power className="size-5" strokeWidth={1.7} />
                  </span>
                  <span className="min-w-0">
                    <span
                      className="block text-[15px] leading-snug"
                      style={{ fontFamily: fontFamily.serif, color: color.espresso }}
                    >
                      {collaborationEnabled ? "关闭协作模式" : "开启协作模式"}
                    </span>
                    <span className="mt-1 block text-[12px] leading-relaxed" style={typography.meta}>
                      {collaborationEnabled
                        ? "协作者将降级为只读，邀请链接会失效"
                        : "邀请其他人加入协作"}
                    </span>
                  </span>
                </span>
                <ChevronRight
                  className="size-5 shrink-0 transition-transform group-hover:translate-x-0.5"
                  strokeWidth={1.6}
                  style={{ color: color.mutedText }}
                />
              </button>
            </CollaborationManageCard>

            <CollaborationInviteCard
              inviteLink={inviteLink}
              collaborationEnabled={collaborationEnabled}
              copied={copied}
              canRegenerate={permissions.canRegenerateInviteLink}
              canRevoke={permissions.canRevokeInviteLink}
              onCopy={handleCopy}
              onRegenerate={() => {
                setCopied(false);
                setInviteLink(createRegeneratedInviteLink(collection.id));
              }}
              onRevoke={() => setPendingConfirm({ type: "revokeInvite" })}
            />

            <CollaborationMembersCard
              members={members}
              collaborationEnabled={collaborationEnabled}
              canRemoveCollaborator={permissions.canRemoveCollaborator}
              onRemoveMember={(member) => setPendingConfirm({ type: "removeMember", member })}
            />

            <CollaborationNoticeCard />
          </main>
        )}

        {confirmDialogCopy && (
          <RetroConfirmDialog
            visible={Boolean(pendingConfirm)}
            title={confirmDialogCopy.title}
            content={confirmDialogCopy.content}
            confirmText={confirmDialogCopy.confirmText}
            danger
            onConfirm={handleConfirm}
            onCancel={() => setPendingConfirm(null)}
          />
        )}
      </div>
    </div>
  );
}

interface CollaborationManageCardProps {
  title: string;
  right?: ReactNode;
  children: ReactNode;
}

function CollaborationManageCard({ title, right, children }: CollaborationManageCardProps) {
  return (
    <section
      className="overflow-hidden border px-4 py-4"
      style={{
        background: color.cardSurface,
        borderColor: ink.rule,
        borderRadius: 8,
        boxShadow: shadow.card,
      }}
    >
      <div className="flex items-center justify-between gap-3">
        <h2 style={{ ...typography.sectionTitle, fontSize: 17 }}>{title}</h2>
        {right}
      </div>
      {children}
    </section>
  );
}

interface CollaborationStatusChipProps {
  label: string;
  tone: CollaborationStatusTone;
}

function CollaborationStatusChip({ label, tone }: CollaborationStatusChipProps) {
  const toneStyle = {
    active: {
      background: `${color.sage}20`,
      color: color.sageText,
      borderColor: `${color.sage}45`,
    },
    warning: {
      background: `${color.star}18`,
      color: "#8A5B00",
      borderColor: `${color.star}45`,
    },
    inactive: {
      background: ink.chip,
      color: color.mutedText,
      borderColor: ink.rule,
    },
  }[tone];

  return (
    <span
      className="inline-flex h-7 shrink-0 items-center rounded-full border px-2.5 text-[11px]"
      style={{
        ...toneStyle,
        fontFamily: fontFamily.serif,
        letterSpacing: "0.08em",
      }}
    >
      {label}
    </span>
  );
}

interface CollaborationInviteCardProps {
  inviteLink: CollaborationInviteLink;
  collaborationEnabled: boolean;
  copied: boolean;
  canRegenerate: boolean;
  canRevoke: boolean;
  onCopy: () => void;
  onRegenerate: () => void;
  onRevoke: () => void;
}

function CollaborationInviteCard({
  inviteLink,
  collaborationEnabled,
  copied,
  canRegenerate,
  canRevoke,
  onCopy,
  onRegenerate,
  onRevoke,
}: CollaborationInviteCardProps) {
  const hasActiveInviteLink =
    collaborationEnabled && inviteLink.active && Boolean(inviteLink.inviteUrl);
  const linkLabel = hasActiveInviteLink ? inviteLink.inviteUrl : "(无有效链接)";

  return (
    <CollaborationManageCard
      title="邀请链接"
      right={<CollaborationStatusChip label={inviteLink.statusLabel} tone={inviteLink.statusTone} />}
    >
      <div
        className="mt-4 border px-3 py-3"
        style={{
          background: color.paper,
          borderColor: ink.rule,
          borderRadius: 8,
        }}
      >
        <div className="flex items-start gap-2">
          <Link className="mt-0.5 size-4 shrink-0" strokeWidth={1.7} style={{ color: color.mutedText }} />
          <p
            className="min-h-5 flex-1 break-all text-[13px] leading-relaxed"
            style={{ color: hasActiveInviteLink ? color.espresso : color.mutedText }}
          >
            {linkLabel}
          </p>
        </div>
        <div
          className="mt-3 flex items-center justify-between gap-3 border-t pt-3 text-[12px]"
          style={{ borderColor: ink.hairline, color: color.mutedText }}
        >
          <span>{`${inviteLink.used} / ${inviteLink.limit} 已加入`}</span>
          <span>{hasActiveInviteLink ? `过期 ${inviteLink.expiresAt}` : "过期 —"}</span>
        </div>
      </div>

      <div className="mt-3 grid grid-cols-3 gap-2">
        <InviteActionButton
          icon={copied ? Check : Copy}
          label={copied ? "已复制" : "复制链接"}
          disabled={!hasActiveInviteLink}
          onClick={onCopy}
          live={copied}
        />
        <InviteActionButton
          icon={RefreshCcw}
          label="更新链接"
          disabled={!collaborationEnabled || !canRegenerate}
          onClick={onRegenerate}
        />
        <InviteActionButton
          icon={X}
          label="停用链接"
          danger
          disabled={!hasActiveInviteLink || !canRevoke}
          onClick={onRevoke}
        />
      </div>
    </CollaborationManageCard>
  );
}

interface CollaborationMembersCardProps {
  members: CollaborationManageMember[];
  collaborationEnabled: boolean;
  canRemoveCollaborator: boolean;
  onRemoveMember: (member: CollaborationManageMember) => void;
}

function CollaborationMembersCard({
  members,
  collaborationEnabled,
  canRemoveCollaborator,
  onRemoveMember,
}: CollaborationMembersCardProps) {
  return (
    <CollaborationManageCard
      title="当前协作者"
      right={
        <span
          className="text-[12px]"
          style={{ color: color.mutedText, fontVariantNumeric: "tabular-nums" }}
        >
          {members.length} / {collaboratorLimit}
        </span>
      }
    >
      <div className="mt-3">
        {members.map((member, index) => {
          const isOwner = member.role === "owner";
          const showMore = collaborationEnabled && canRemoveCollaborator && !isOwner;
          return (
            <div
              key={member.id}
              className="flex min-h-[68px] items-center gap-3 py-3"
              style={index > 0 ? { borderTop: `1px solid ${ink.hairline}` } : undefined}
            >
              <div
                className="flex size-11 shrink-0 items-center justify-center overflow-hidden rounded-full"
                style={{ background: color.warmFill, color: color.espresso }}
              >
                {member.avatar ? (
                  <img
                    src={member.avatar}
                    alt=""
                    className="h-full w-full object-cover"
                    draggable={false}
                  />
                ) : (
                  <span className="text-[15px]" style={{ fontFamily: fontFamily.serif }}>
                    {member.avatarInitial}
                  </span>
                )}
              </div>
              <div className="min-w-0 flex-1">
                <div className="flex min-w-0 items-center gap-2">
                  <p className="truncate text-[15px]" style={{ color: color.espresso }}>
                    {member.name}
                  </p>
                  {isOwner && <CollaborationStatusChip label="创建者" tone="warning" />}
                </div>
                <p className="mt-1 text-[12px]" style={{ color: color.mutedText }}>
                  {member.roleLabel} · 贡献 {member.contributionCount} 家
                </p>
              </div>
              {showMore && (
                <button
                  type="button"
                  aria-label={`移除 ${member.name}`}
                  onClick={() => onRemoveMember(member)}
                  className="flex size-10 shrink-0 items-center justify-center rounded-full transition duration-200 hover:opacity-80 active:scale-95 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2"
                  style={{
                    background: `${color.tomato}10`,
                    color: color.tomatoText,
                    outlineColor: color.espresso,
                  }}
                >
                  <X className="size-4" strokeWidth={1.8} />
                </button>
              )}
            </div>
          );
        })}
      </div>
      {!collaborationEnabled && (
        <div
          className="mt-3 flex items-start gap-2 border px-3 py-3 text-[12px] leading-relaxed"
          style={{
            background: `${color.tomato}10`,
            borderColor: `${color.tomato}35`,
            borderRadius: 8,
            color: color.tomatoText,
          }}
        >
          <ShieldAlert className="mt-0.5 size-4 shrink-0" strokeWidth={1.7} />
          <span>协作模式当前已关闭。开启后才可邀请他人。</span>
        </div>
      )}
    </CollaborationManageCard>
  );
}

function CollaborationNoticeCard() {
  return (
    <section
      className="flex items-start gap-3 border px-4 py-4"
      style={{
        background: color.cardSurface,
        borderColor: ink.rule,
        borderRadius: 8,
        boxShadow: shadow.card,
      }}
    >
      <div
        className="flex size-10 shrink-0 items-center justify-center rounded-full"
        style={{ background: ink.chip, color: color.espresso }}
      >
        <Lock className="size-5" strokeWidth={1.7} />
      </div>
      <div className="min-w-0">
        <h2 style={{ ...typography.sectionTitle, fontSize: 16 }}>关于邀请链接</h2>
        <p className="mt-2 text-[13px] leading-relaxed" style={{ color: color.mutedText }}>
          任何拿到链接的人都可以加入为协作者。链接 30 天后过期，你可以随时停用。
        </p>
      </div>
    </section>
  );
}

interface StateButtonProps {
  children: ReactNode;
  onClick?: () => void;
}

function PrimaryStateButton({ children, onClick }: StateButtonProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="h-11 rounded-full px-6 text-[12px] tracking-[0.2em] transition duration-200 hover:opacity-85 active:scale-[0.98] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2"
      style={{
        background: color.espresso,
        color: color.paper,
        fontFamily: fontFamily.serif,
        outlineColor: color.espresso,
      }}
    >
      {children}
    </button>
  );
}

function OutlineStateButton({ children, onClick }: StateButtonProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="h-11 rounded-full px-6 text-[12px] tracking-[0.2em] transition duration-200 hover:opacity-85 active:scale-[0.98] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2"
      style={{
        border: `1px solid ${color.espresso}`,
        color: color.espresso,
        fontFamily: fontFamily.serif,
        outlineColor: color.espresso,
      }}
    >
      {children}
    </button>
  );
}

interface InviteActionButtonProps {
  icon: ComponentType<{ className?: string; strokeWidth?: number }>;
  label: string;
  danger?: boolean;
  disabled?: boolean;
  live?: boolean;
  onClick: () => void;
}

function InviteActionButton({
  icon: Icon,
  label,
  danger,
  disabled,
  live,
  onClick,
}: InviteActionButtonProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      aria-live={live ? "polite" : undefined}
      className="inline-flex h-11 min-w-0 items-center justify-center gap-1.5 rounded-md border px-1.5 text-[12px] transition duration-200 enabled:hover:opacity-85 enabled:active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-45 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2"
      style={{
        borderColor: danger ? `${color.tomato}45` : ink.edge,
        color: danger ? color.tomatoText : color.espresso,
        background: color.paper,
        fontFamily: fontFamily.serif,
        outlineColor: color.espresso,
      }}
    >
      <Icon className="size-4 shrink-0" strokeWidth={1.7} />
      <span className="min-w-0 text-center leading-none">{label}</span>
    </button>
  );
}

export default AppCollaborationManage;
