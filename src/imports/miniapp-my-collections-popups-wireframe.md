# My Collections Page — Popup Components Wireframe

## Popup Index

| # | Component | Trigger | Placement |
|---|---|---|---|
| 2 | Create collection sheet (retro-form-sheet) | tap FAB | bottom |
| 3 | Edit collection sheet (retro-form-sheet) | tap edit on action sheet | bottom |
| 4 | Collection action sheet (retro-action-sheet) | tap more (⋯) on collection card | bottom |
| 5 | Delete confirmation modal (wx.showModal) | tap delete on action sheet | center |

---

## 2. Create Collection Sheet (retro-form-sheet)

Create a new collection with title, city, summary, and visibility.

```
  ┌──────────────────────────────────┐
  │          ━━━                     │  ← drag handle
  │  ┌──────────────────────────┐    │
  │  │ 新建合集            [✕]  │    │  ← title + close
  │  └──────────────────────────┘    │
  │                                  │
  │  ┌──────────────────────────┐    │  ← scroll body (no header divider)
  │  │                          │    │
  │  │  标题               *    │    │  ← label + required mark
  │  │  ┌──────────────────┐    │    │
  │  │  │ 给合集起个名字    │    │    │  ← input, maxlength=30
  │  │  └──────────────────┘    │    │
  │  │  {createValidation.title}│    │  ← error text
  │  │                          │    │
  │  │  城市               *    │    │  ← label + required mark
  │  │  ┌──────────────────┐    │    │
  │  │  │ 📍 请选择所属城市 │    │    │  ← tap to open city-selector page
  │  │  └──────────────────┘    │    │
  │  │  暂无可选城市...         │    │  ← hint when no city options
  │  │  {createValidation.city} │    │  ← error text
  │  │                          │    │
  │  │  简介         {N}/200    │    │  ← label + character count
  │  │  ┌──────────────────┐    │    │
  │  │  │ 简单介绍一下      │    │    │  ← textarea, maxlength=200
  │  │  │ 这个合集          │    │
  │  │  └──────────────────┘    │    │
  │  │                          │    │
  │  │  可见性                  │    │  ← label
  │  │  ┌─────────┐ ┌─────────┐│    │
  │  │  │ 🌐 公开  │ │ 🔒 私密 ││    │  ← visibility toggle buttons
  │  │  │ 所有人可 │ │ 仅自己  ││    │
  │  │  │ 以查看   │ │ 可见    ││    │
  │  │  └─────────┘ └─────────┘│    │
  │  │                          │    │
  │  └──────────────────────────┘    │
  │  ────────────────────────────── │  ← footer divider
  │  [       创建合集            ]  │  ← submit (or "创建中...")
  └──────────────────────────────────┘
```

**Props:** `visible`, `title` = `"新建合集"`, `showHeaderDivider` = `false`, `panelBackground` = `var(--retro-color-surface-card)`, `submitText` = `"创建合集"` / `"创建中..."`, `submitDisabled`, `submitLoading`, `closeDisabled` (when submitting)

**Events:** `visiblechange`, `close`, `submit`

**Data (`createForm`):**

| Field | Type | Default | Notes |
|---|---|---|---|
| `title` | string | `""` | Required, max 30 chars |
| `cityCode` | string | `""` | Required, set via city-selector |
| `summary` | string | `""` | Optional, max 200 chars |
| `visibility` | string | `"public"` | `"public"` or `"private"` |

**Validation (`createValidation`):**

| Field | Error message |
|---|---|
| `title` | `"请输入合集标题"` |
| `cityCode` | `"请选择城市"` |

**Interactions:**
- Tap city picker → `wx.navigateTo('/pages/city-selector/index')` → receive `citySelected` via eventChannel → `applyCitySelection`
- Tap visibility option → toggle between `public` / `private`
- Submit → validate → `userService.createCollection(payload)` → append to collection groups → switch tab to "created" → show toast "合集创建成功"
- Close blocked while `createSubmitting`

---

## 3. Edit Collection Sheet (retro-form-sheet)

Reuse the same form sheet as create, pre-filled with existing collection data. City field becomes read-only.

```
  ┌──────────────────────────────────┐
  │          ━━━                     │
  │  ┌──────────────────────────┐    │
  │  │ 编辑合集            [✕]  │    │  ← title changes to "编辑合集"
  │  └──────────────────────────┘    │
  │                                  │
  │  ┌──────────────────────────┐    │
  │  │                          │    │
  │  │  标题               *    │    │
  │  │  ┌──────────────────┐    │    │
  │  │  │ {existing title}  │    │    │  ← pre-filled
  │  │  └──────────────────┘    │    │
  │  │                          │    │
  │  │  城市               *    │    │
  │  │  ┌──────────────────┐    │    │
  │  │  │ {existing city}   │    │    │  ← read-only (not tappable)
  │  │  └──────────────────┘    │    │
  │  │                          │    │
  │  │  简介         {N}/200    │    │
  │  │  ┌──────────────────┐    │    │
  │  │  │ {existing summary}│    │    │  ← pre-filled
  │  │  └──────────────────┘    │    │
  │  │                          │    │
  │  │  可见性                  │    │
  │  │  ┌─────────┐ ┌─────────┐│    │
  │  │  │ 🌐 公开  │ │ 🔒 私密 ││    │  ← pre-selected
  │  │  └─────────┘ └─────────┘│    │
  │  │                          │    │
  │  └──────────────────────────┘    │
  │  ────────────────────────────── │
  │  [       保存修改            ]  │  ← submit text changes
  └──────────────────────────────────┘
```

**Differences from create mode:**

| Aspect | Create | Edit |
|---|---|---|
| Title | `"新建合集"` | `"编辑合集"` |
| Submit text | `"创建合集"` / `"创建中..."` | `"保存修改"` / `"保存中..."` |
| City picker | Tappable, navigates to city-selector | Read-only text display |
| Pre-fill | Empty form | Loaded from collection detail |
| Submitter | `userService.createCollection` | `collectionService.updateCollection(id, payload)` |
| On success | Append to groups, toast "合集创建成功" | Replace in groups, toast "合集已更新" |

**Data flags:** `isEditMode` = `true`, `editingCollectionId` = target collection ID

---

## 4. Collection Action Sheet (retro-action-sheet)

Action menu shown for "created" tab collections.

```
  ┌──────────────────────────────────┐
  │  {collectionTitle}               │  ← title = active collection title
  │                                  │
  │  ┌────────────────────────────┐  │
  │  │  编辑                      │  │  ← action: "edit", danger: false
  │  ├────────────────────────────┤  │
  │  │  删除                      │  │  ← action: "delete", danger: true (red)
  │  └────────────────────────────┘  │
  │                                  │
  │  [取消]                          │  ← cancel button
  └──────────────────────────────────┘
```

**Props:** `visible`, `title` = `activeActionCollectionTitle`, `items` = `COLLECTION_ACTION_SHEET_ITEMS`, `cancelText` = (default)

**Items:**

| Action | Label | Danger |
|---|---|---|
| `edit` | 编辑 | false |
| `delete` | 删除 | true |

**Events:** `visiblechange`, `action` (payload: `{action}`), `cancel`

**Interactions:**
- Tap "编辑" → close action sheet → fetch collection detail → open edit sheet (#3)
- Tap "删除" → close action sheet → show delete confirmation modal (#5)
- Tap "取消" or backdrop → close action sheet

---

## 5. Delete Confirmation Modal (wx.showModal)

Native WeChat modal dialog for confirming collection deletion.

```
  ┌──────────────────────────────┐
  │                              │
  │        删除合集               │  ← title
  │                              │
  │  删除后不可恢复，             │  ← content
  │  确定删除这个合集吗？         │
  │                              │
  │   [取消]      [确定]         │  ← confirmColor: #bc4d3f (red)
  │                              │
  └──────────────────────────────┘
```

**Config:** `title` = `"删除合集"`, `content` = `"删除后不可恢复，确定删除这个合集吗？"`, `confirmColor` = `"#bc4d3f"`

**Interactions:**
- Tap "取消" → dismiss, no action
- Tap "确定" → `collectionService.deleteCollection(targetId)` → remove from collection groups → show toast "合集已删除"

---

## Shared Components Used

### retro-action-sheet

```
  ┌──────────────────────────────────┐
  │  {title}                         │  ← optional title
  │                                  │
  │  ┌────────────────────────────┐  │
  │  │  {item.label}              │  │  ← normal item
  │  ├────────────────────────────┤  │
  │  │  {item.label}              │  │  ← danger item (red text)
  │  └────────────────────────────┘  │
  │                                  │
  │  [取消]                          │  ← cancelText
  └──────────────────────────────────┘
```

**Props:** `visible`, `title`, `items[]` (`{action, label, danger}`), `cancelText`

**Events:** `visiblechange`, `action` (payload: `{action}`), `cancel`

### retro-form-sheet

```
  ┌──────────────────────────────────┐
  │          ━━━                     │  ← drag handle
  │  ┌──────────────────────────┐    │
  │  │ [←]  {title}       [✕]  │    │  ← optional back + title + close
  │  │     {subtitle}           │    │  ← optional subtitle
  │  │ ─────────────────────── │    │  ← optional header divider
  │  └──────────────────────────┘    │
  │                                  │
  │  ┌──────────────────────────┐    │
  │  │  scroll-view             │    │  ← scrollable body (slot)
  │  │  <slot />                │    │
  │  │                          │    │
  │  └──────────────────────────┘    │
  │  ────────────────────────────── │  ← optional footer divider
  │  [       {submitText}      ]    │  ← t-button primary round
  └──────────────────────────────────┘
```

**Props:** `visible`, `title`, `subtitle`, `showHeaderDivider`, `showFooterDivider`, `showBack`, `backDisabled`, `submitText`, `submitDisabled`, `submitLoading`, `closeDisabled`, `panelBackground`

**Events:** `visiblechange`, `close`, `back`, `submit`
