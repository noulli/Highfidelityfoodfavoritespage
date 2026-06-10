# 协作管理页 — Wireframe 与交互设计文档

---

## 1. 页面状态总览

| 状态 (`displayState`) | 触发条件 | 页面内容 |
|---|---|---|
| `loading` | 首次加载 / 切换合集 | 居中状态卡片 "正在整理协作信息" |
| `error` | 网络异常 | 居中状态卡片 + "重 试" 按钮 |
| `no_permission` | 权限不足 | 居中状态卡片 + "返 回 合 集 详 情" 按钮 |
| `ready` + `!canManageMembers` | 有查看权无管理权 | 同 `no_permission` |
| `ready` + `canManageMembers` | 正常态 | 完整管理界面（下文详述） |

---

## 2. Wireframe — ready 正常态

```
┌──────────────────────────────────────────┐
│  ◀  协作管理                              │  ← TNavbar
├══════════════════════════════════════════╡  ← RetroDoubleDivider
│                                          │
│  ┌────────────────────────────────────┐  │
│  │ 协作设置           [协作已开启]     │  │  ← CollaborationManageCard
│  │                                    │  │
│  │ ┌──────────────────────────────┐   │  │
│  │ │  ⏻ 关闭协作模式              ▸ │   │  │  ← 开/关按钮
│  │ │    协作者将降级为只读          │   │  │
│  │ └──────────────────────────────┘   │  │
│  └────────────────────────────────────┘  │
│                                          │
│  ┌────────────────────────────────────┐  │
│  │ 邀请链接                [生效中]   │  │  ← CollaborationInviteCard
│  │                                    │  │
│  │ ┌──────────────────────────────┐   │  │
│  │ │ 🔗 https://chiida.app/       │   │  │  ← 链接展示区
│  │ │     invite/abc123def456      │   │  │
│  │ │                              │   │  │
│  │ │ 2 / 20 已加入    过期 2026-07-01│  │
│  │ └──────────────────────────────┘   │  │
│  │                                    │  │
│  │  [📋 复制]   [🔄 更新]   [✕ 停用]  │  │  ← 三个操作按钮
│  └────────────────────────────────────┘  │
│                                          │
│  ┌────────────────────────────────────┐  │
│  │ 当前协作者               3 / 10   │  │  ← CollaborationMembersCard
│  │                                    │  │
│  │ ┌──────────────────────────────┐   │  │
│  │ │ (S) Sarah          [创建者]  │   │  │  ← owner 行
│  │ │     创建者 · 贡献 12 家      │   │  │
│  │ ├──────────────────────────────┤   │  │
│  │ │ (明) 小明               [⋯]  │   │  │  ← editor 行 + 移除按钮
│  │ │     编辑者 · 贡献 5 家       │   │  │
│  │ ├──────────────────────────────┤   │  │
│  │ │ (花) 阿花               [⋯]  │   │  │  ← viewer 行 + 移除按钮
│  │ │     查看者 · 贡献 0 家       │   │  │
│  │ └──────────────────────────────┘   │  │
│  └────────────────────────────────────┘  │
│                                          │
│  ┌────────────────────────────────────┐  │
│  │ 🔒 关于邀请链接                     │  │  ← CollaborationNoticeCard
│  │ 任何拿到链接的人都可以加入为协作者。 │  │
│  │ 链接 30 天后过期，你可以随时停用。  │  │
│  └────────────────────────────────────┘  │
│                                          │
└──────────────────────────────────────────┘
```

---

## 3. Wireframe — 非常态

### 3.1 Loading

```
┌──────────────────────────────────────────┐
│  ◀  协作管理                              │
├══════════════════════════════════════════╡
│                                          │
│         ┌──────────────────────┐         │
│         │ 正在整理协作信息       │         │
│         │ 加载中...             │         │
│         └──────────────────────┘         │
│                                          │
└──────────────────────────────────────────┘
```

### 3.2 Error

```
┌──────────────────────────────────────────┐
│  ◀  协作管理                              │
├══════════════════════════════════════════╡
│                                          │
│         ┌──────────────────────┐         │
│         │ 加载失败              │         │
│         │ 网络异常，请稍后重试。 │         │
│         │                      │         │
│         │     [  重 试  ]       │         │
│         └──────────────────────┘         │
│                                          │
└──────────────────────────────────────────┘
```

### 3.3 No Permission

```
┌──────────────────────────────────────────┐
│  ◀  协作管理                              │
├══════════════════════════════════════════╡
│                                          │
│     ┌──────────────────────────────┐     │
│     │ 暂无协作管理权限               │     │
│     │ 当前身份无法修改邀请和成员设置， │     │
│     │ 请返回合集详情查看。           │     │
│     │                              │     │
│     │  [  返 回 合 集 详 情  ]       │     │
│     └──────────────────────────────┘     │
│                                          │
└──────────────────────────────────────────┘
```

### 3.4 协作已关闭态

```
┌────────────────────────────────────────┐
│ 协作设置             [协作未开启]       │
│                                        │
│ ┌──────────────────────────────────┐   │
│ │  ⏻ 开启协作模式                ▸ │   │
│ │    邀请其他人加入协作              │   │
│ └──────────────────────────────────┘   │
└────────────────────────────────────────┘

┌────────────────────────────────────────┐
│ 邀请链接                 [已停用]       │
│                                        │
│ ┌──────────────────────────────────┐   │
│ │ 🔗 (无有效链接)                   │   │
│ │                                  │   │
│ │  2 / 20 已加入        过期 —     │   │
│ └──────────────────────────────────┘   │
│                                        │
│  [📋 复制]   [🔄 更新]   [✕ 停用]     │  ← 全部 disabled
└────────────────────────────────────────┘

┌────────────────────────────────────────┐
│ 当前协作者                3 / 10       │
│                                        │
│ ⚠️ 协作模式当前已关闭。开启后才可       │
│    邀请他人。                           │  ← 警告提示条
└────────────────────────────────────────┘
```

---

## 4. 确认弹窗

三个危险操作共享同一个 `RetroConfirmDialog` 组件：

### 4.1 关闭协作模式

```
┌──────────────────────────────┐
│  关闭协作模式                  │
│  协作者将降级为只读，当前邀请   │
│  链接会失效。                  │
│                              │
│       [取消]    [关闭]         │  ← danger 样式
└──────────────────────────────┘
```

**关闭后的状态变更：**
| 字段 | 变更 |
|---|---|
| `collaborationEnabled` | `true → false` |
| `inviteLink.status` | `"enabled" → "revoked"` |
| `inviteLink.active` | `true → false` |
| `inviteLink.inviteUrl` | 清空 |
| 非 owner 成员 `role` | 全部 → `"viewer"` |
| 非 owner 成员 `roleLabel` | 全部 → `"查看者"` |

### 4.2 停用邀请链接

```
┌──────────────────────────────┐
│  停用邀请链接                  │
│  停用后，拿到旧链接的人将无法   │
│  继续加入协作。                │
│                              │
│       [取消]    [停用]         │
└──────────────────────────────┘
```

**停用后的状态变更：**
| 字段 | 变更 |
|---|---|
| `inviteLink.status` | `"enabled" → "revoked"` |
| `inviteLink.active` | `true → false` |
| `inviteLink.inviteUrl` | 清空 |
| `inviteLink.expiresAt` | 清空 |

### 4.3 移除协作者

```
┌──────────────────────────────┐
│  移除协作者                    │
│  确认将 {member.name} 移出     │
│  当前合集协作？                │
│                              │
│       [取消]    [移除]         │
└──────────────────────────────┘
```

**移除后的状态变更：**
- 从 `members` 数组中过滤掉该成员（owner 不会被移除）

---

## 5. 操作按钮状态矩阵

### 5.1 邀请链接操作按钮

| 按钮 | enabled 条件 | 点击行为 |
|---|---|---|
| **复制** | `hasActiveInviteLink` | 复制 `inviteUrl` 到剪贴板，按钮文字变为 "已复制" ✓，1.6s 后恢复 |
| **更新** | `collaborationEnabled && canRegenerate` | 生成新 token，重置链接、状态、过期时间 |
| **停用** | `hasActiveInviteLink && canRevoke` | 触发 `revokeInvite` 确认弹窗 |

### 5.2 协作开关按钮

| 状态 | 按钮文案 | enabled 条件 | 点击行为 |
|---|---|---|---|
| 协作开启中 | "关闭协作模式" | `canCloseCollaboration` | 触发 `closeCollaboration` 确认弹窗 |
| 协作关闭中 | "开启协作模式" | 始终可点 | 直接开启，生成新邀请链接 |

### 5.3 成员操作

| 按钮 | 可见条件 | 点击行为 |
|---|---|---|
| 移除 (⋯) | `collaborationEnabled && canRemoveCollaborator && member.role !== "owner"` | 触发 `removeMember` 确认弹窗 |

---

## 6. Mock 数据结构

### 6.1 Collection

```typescript
interface CollaborationManageCollection {
  id: number;            // 1001
  title: string;         // "上海本帮菜巡礼"
  visibility: string;    // "public"
  collaborative: boolean; // true — 控制 collaborationEnabled 初始值
}
```

### 6.2 Permissions

```typescript
interface CollaborationManagePermissions {
  canManageMembers: boolean;         // true — false 时整个管理页被拦截
  canRemoveCollaborator: boolean;    // true — 控制成员移除按钮
  canCloseCollaboration: boolean;    // true — 控制关闭协作按钮
  canRegenerateInviteLink: boolean;  // true — 控制更新按钮
  canRevokeInviteLink: boolean;      // true — 控制停用按钮
}
```

### 6.3 InviteLink

```typescript
interface CollaborationInviteLink {
  inviteToken: string;   // "abc123def456"
  status: string;        // "enabled" | "revoked"
  statusTone: CollaborationStatusTone;  // "active" | "inactive"
  statusLabel: string;   // "生效中" | "已停用"
  active: boolean;       // true | false
  used: number;          // 2 — 已加入人数
  limit: number;         // 20 — 链接使用上限
  createdAt: string;     // "2026-06-01"
  expiresAt: string;     // "2026-07-01" | "" (停用后)
  invitePath: string;    // 小程序路径
  inviteUrl: string;     // "https://chiida.app/invite/abc123def456" | "" (停用后)
}
```

### 6.4 Members

```typescript
type CollaborationMemberRole = "owner" | "editor" | "viewer";

interface CollaborationManageMember {
  id: number;                // 301 | 302 | 303
  name: string;              // "Sarah" | "小明" | "阿花"
  avatar: string;            // "" — 空时显示 avatarInitial
  avatarInitial: string;     // "S" | "明" | "花"
  role: CollaborationMemberRole;
  roleLabel: string;         // "创建者" | "编辑者" | "查看者"
  contributionCount: number; // 12 | 5 | 0
}
```

### 6.5 枚举值

```typescript
type CollaborationManageDisplayState = "ready" | "loading" | "error" | "no_permission";
type CollaborationStatusTone = "active" | "warning" | "inactive";
```

---

## 7. 交互流程图

### 7.1 页面初始化

```
displayState ──┬── "loading"     → 显示加载卡片
               ├── "error"       → 显示错误卡片 + 重试按钮
               ├── "no_permission" → 显示权限卡片
               └── "ready"       → 检查 canManageMembers
                                   ├── false → 显示权限卡片
                                   └── true  → 渲染完整管理界面
```

### 7.2 复制链接

```
[复制] → hasActiveInviteLink?
           ├── no  → disabled, 无响应
           └── yes → clipboard.writeText(inviteUrl)
                     copied = true → 图标变 ✓, 文字变 "已复制"
                     1.6s 后 copied = false → 恢复原始状态
```

### 7.3 开启/关闭协作

```
[协作开关按钮] → collaborationEnabled?
                  ├── true  → canCloseCollaboration?
                  │           ├── false → disabled
                  │           └── true  → 弹窗确认 → 确认后:
                  │                        collaborationEnabled = false
                  │                        inviteLink = revoked
                  │                        非 owner 成员 → viewer
                  └── false → 直接执行:
                               collaborationEnabled = true
                               inviteLink = 新生成链接 (新 token)
```

### 7.4 重试 (Error 状态)

```
[重试] → resetReadyState()
          → effectiveState = "ready"
          → 所有状态恢复为 mock 初始值
```

---

## 8. 状态芯片 (StatusChip) 样式映射

| tone | 用途 | 背景色 | 文字色 | 边框色 |
|---|---|---|---|---|
| `active` | 协作已开启 / 生效中 | `sage 20%` | `sageText` | `sage 45%` |
| `warning` | 创建者标签 | `star 18%` | `#8A5B00` | `star 45%` |
| `inactive` | 协作未开启 / 已停用 | `ink.chip` | `mutedText` | `ink.rule` |

---

## 9. 常量

| 常量 | 值 | 说明 |
|---|---|---|
| `collaboratorLimit` | `10` | 最大协作者人数上限 |

---

## 10. 工具函数

| 函数 | 输入 | 输出 | 用途 |
|---|---|---|---|
| `cloneInviteLink()` | — | mock 邀请链接的浅拷贝 | 初始化 / 重置 |
| `createRegeneratedInviteLink(collectionId)` | 合集 ID | 带 `new{timestamp}` token 的新链接 | 更新链接 / 开启协作 |
| `revokeInviteLink(inviteLink)` | 当前链接 | 停用后的链接副本 | 停用链接 / 关闭协作 |
