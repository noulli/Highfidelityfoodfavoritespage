export interface StoreCard {
  id: number;
  name: string;
  address: string;
  coverImage: string;
  cuisine: string;
  rating: number;
  distance: string;
  description: string;
  dishes: string[];
  contributor: string;
  featured: boolean;
  bgTone: "cream" | "mint" | "rose";
}

export interface CollectionDetail {
  title: string;
  cityLabel: string;
  description: string;
  creatorId: number;
  creatorAvatar: string;
  creatorFallback: string;
  creatorLabel: string;
  updatedAtLabel: string;
  recentActivityLabel: string;
  shopCountLabel: string;
  savedLabel: string;
  contributorCountLabel: string;
  privacyVariant: "public" | "private";
  showPrivacyBadge: boolean;
}

export interface Permissions {
  canEditPlaces: boolean;
  canRemovePlace: boolean;
  canSeeSaveAction: boolean;
  canManageMembers: boolean;
  canExitCollaboration: boolean;
}

export const mockCollectionDetail: CollectionDetail = {
  title: "上海本帮菜巡礼",
  cityLabel: "上海",
  description: "收集了上海最正宗的本帮菜馆，从老字号到新派融合。",
  creatorId: 1,
  creatorAvatar: "",
  creatorFallback: "S",
  creatorLabel: "Sarah",
  updatedAtLabel: "2 天前更新",
  recentActivityLabel: "昨天有新动态",
  shopCountLabel: "12 店铺",
  savedLabel: "28 收藏",
  contributorCountLabel: "3 人",
  privacyVariant: "public",
  showPrivacyBadge: false,
};

export const mockStoreCards: StoreCard[] = [
  {
    id: 1001,
    name: "老正兴菜馆",
    address: "上海市黄浦区福州路556号",
    coverImage: "",
    cuisine: "本帮菜",
    rating: 4.6,
    distance: "850m",
    description: "百年老店，招牌草头圈子必点。",
    dishes: ["草头圈子", "油爆虾", "八宝辣酱"],
    contributor: "由 Sarah 添加",
    featured: true,
    bgTone: "cream",
  },
  {
    id: 1002,
    name: "上海老饭店",
    address: "上海市黄浦区福佑路242号",
    coverImage: "",
    cuisine: "本帮菜",
    rating: 4.4,
    distance: "1.2km",
    description: "老城隍庙旁的经典本帮菜馆，八宝鸭是招牌。",
    dishes: ["八宝鸭", "虾子大乌参", "扣三丝"],
    contributor: "由 小明 添加",
    featured: false,
    bgTone: "mint",
  },
  {
    id: 1003,
    name: "德兴馆",
    address: "上海市黄浦区老西门中华路1711号",
    coverImage: "",
    cuisine: "本帮面馆",
    rating: 4.5,
    distance: "2.3km",
    description: "创始于1883年的老面馆，焖肉面一绝。",
    dishes: ["焖肉面", "爆鱼面", "辣肉面"],
    contributor: "由 阿花 添加",
    featured: false,
    bgTone: "rose",
  },
];

export const mockPermissions: Permissions = {
  canEditPlaces: true,
  canRemovePlace: true,
  canSeeSaveAction: true,
  canManageMembers: true,
  canExitCollaboration: false,
};

export interface Collaborator {
  id: number;
  name: string;
  avatarUrl: string;
  fallback: string;
  role: "owner" | "member";
}

export type CollaborationManageDisplayState =
  | "ready"
  | "loading"
  | "error"
  | "no_permission";

export type CollaborationStatusTone = "active" | "warning" | "inactive";

export interface CollaborationManageCollection {
  id: number;
  title: string;
  visibility: "public" | "private";
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
  status: "enabled" | "expired" | "revoked";
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

export type CollaborationMemberRole = "owner" | "editor" | "viewer";

export interface CollaborationManageMember {
  id: number;
  name: string;
  avatar: string;
  role: CollaborationMemberRole;
  roleLabel: string;
  contributionCount: number;
  avatarInitial: string;
}

export const mockCollaborators: Collaborator[] = [
  { id: 1, name: "Sarah", avatarUrl: "", fallback: "S", role: "owner" },
  { id: 2, name: "小明", avatarUrl: "", fallback: "明", role: "member" },
  { id: 3, name: "阿花", avatarUrl: "", fallback: "花", role: "member" },
];

export const mockCollaborationManageCollection: CollaborationManageCollection = {
  id: 1001,
  title: "上海本帮菜巡礼",
  visibility: "public",
  collaborative: true,
};

export const mockCollaborationManagePermissions: CollaborationManagePermissions = {
  canManageMembers: true,
  canRemoveCollaborator: true,
  canCloseCollaboration: true,
  canRegenerateInviteLink: true,
  canRevokeInviteLink: true,
};

export const mockCollaborationInviteLink: CollaborationInviteLink = {
  inviteToken: "abc123def456",
  status: "enabled",
  statusTone: "active",
  statusLabel: "生效中",
  active: true,
  used: 2,
  limit: 20,
  createdAt: "2026-06-01",
  expiresAt: "2026-07-01",
  invitePath: "/pages/collection-detail/index?collectionId=1001&inviteToken=abc123def456",
  inviteUrl: "https://chiida.app/invite/abc123def456",
};

export const mockCollaborationManageMembers: CollaborationManageMember[] = [
  {
    id: 301,
    name: "Sarah",
    avatar: "",
    role: "owner",
    roleLabel: "创建者",
    contributionCount: 12,
    avatarInitial: "S",
  },
  {
    id: 302,
    name: "小明",
    avatar: "",
    role: "editor",
    roleLabel: "编辑者",
    contributionCount: 5,
    avatarInitial: "明",
  },
  {
    id: 303,
    name: "阿花",
    avatar: "",
    role: "viewer",
    roleLabel: "查看者",
    contributionCount: 0,
    avatarInitial: "花",
  },
];
