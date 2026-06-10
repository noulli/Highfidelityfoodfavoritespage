export type CollaborationManageDisplayState =
  | "ready"
  | "loading"
  | "error"
  | "no_permission";

export type CollaborationStatusTone = "active" | "warning" | "inactive";
export type CollaborationMemberRole = "owner" | "editor" | "viewer";

export interface CollaborationManageCollection {
  id: number;
  title: string;
  visibility: string;
  collaborative: boolean;
}

export interface CollaborationManagePermissions {
  canManageMembers: boolean;
  canRemoveCollaborator: boolean;
  canCloseCollaboration: boolean;
  canRegenerateInviteLink: boolean;
  canRevokeInviteLink: boolean;
}

export interface CollaborationInviteLink {
  inviteToken: string;
  status: "enabled" | "revoked";
  statusTone: CollaborationStatusTone;
  statusLabel: string;
  active: boolean;
  used: number;
  limit: number;
  createdAt: string;
  expiresAt: string;
  invitePath: string;
  inviteUrl: string;
}

export interface CollaborationManageMember {
  id: number;
  name: string;
  avatar: string;
  avatarInitial: string;
  role: CollaborationMemberRole;
  roleLabel: string;
  contributionCount: number;
}

export const COLLABORATOR_LIMIT = 10;

export const mockCollaborationCollection: CollaborationManageCollection = {
  id: 1001,
  title: "上海本帮菜巡礼",
  visibility: "public",
  collaborative: true,
};

export const mockCollaborationPermissions: CollaborationManagePermissions = {
  canManageMembers: true,
  canRemoveCollaborator: true,
  canCloseCollaboration: true,
  canRegenerateInviteLink: true,
  canRevokeInviteLink: true,
};

export const cloneInviteLink = (): CollaborationInviteLink => ({
  inviteToken: "abc123def456",
  status: "enabled",
  statusTone: "active",
  statusLabel: "生效中",
  active: true,
  used: 2,
  limit: 20,
  createdAt: "2026-06-01",
  expiresAt: "2026-07-01",
  invitePath: "/pages/invite/index?token=abc123def456",
  inviteUrl: "https://chiida.app/invite/abc123def456",
});

export const createRegeneratedInviteLink = (
  collectionId: number,
): CollaborationInviteLink => {
  const token = `new${Date.now()}`;
  return {
    inviteToken: token,
    status: "enabled",
    statusTone: "active",
    statusLabel: "生效中",
    active: true,
    used: 0,
    limit: 20,
    createdAt: new Date().toISOString().slice(0, 10),
    expiresAt: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000)
      .toISOString()
      .slice(0, 10),
    invitePath: `/pages/invite/index?token=${token}&cid=${collectionId}`,
    inviteUrl: `https://chiida.app/invite/${token}`,
  };
};

export const revokeInviteLink = (
  current: CollaborationInviteLink,
): CollaborationInviteLink => ({
  ...current,
  status: "revoked",
  statusTone: "inactive",
  statusLabel: "已停用",
  active: false,
  inviteUrl: "",
  expiresAt: "",
});

export const mockCollaborationMembers: CollaborationManageMember[] = [
  {
    id: 301,
    name: "Sarah",
    avatar: "",
    avatarInitial: "S",
    role: "owner",
    roleLabel: "创建者",
    contributionCount: 12,
  },
  {
    id: 302,
    name: "小明",
    avatar: "",
    avatarInitial: "明",
    role: "editor",
    roleLabel: "编辑者",
    contributionCount: 5,
  },
  {
    id: 303,
    name: "阿花",
    avatar: "",
    avatarInitial: "花",
    role: "viewer",
    roleLabel: "查看者",
    contributionCount: 0,
  },
];
