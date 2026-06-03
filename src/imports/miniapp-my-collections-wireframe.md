## Page Overview (Normal State)

```
┌──────────────────────────────────────┐
│  [👤]  t-navbar "我的"              │
│  ← retro-top-bar-icon-button        │
├──────────────────────────────────────┤
│                                      │
│  ╔══════════════════════════════════╗│
│  ║  retro-double-divider            ║│
│  ╚══════════════════════════════════╝│
│                                      │
│  ┌──────────────────────────────────┐│
│  │  retro-avatar-edit-block         ││
│  │         retro-profile-text-block ││
│  │  ──── ◆ ────                    ││
│  │  retro-profile-stat-item × 2    ││
│  └──────────────────────────────────┘│
│                                      │
│  ┌──────────────────────────────────┐│
│  │ [我的创建]  [我的收藏]           ││
│  │  retro-tab-pill-button × 2      ││
│  │  retro-tab-active-indicator × 2 ││
│  │                    📚 {N} 个合集 ││
│  └──────────────────────────────────┘│
│                                      │
│  ┌──────────────────────────────────┐│
│  │  retro-city-accordion-header     ││
│  │    retro-collection-card-shell   ││
│  │    retro-collection-card-shell   ││
│  │  retro-city-accordion-header     ││
│  │    retro-collection-card-shell   ││
│  └──────────────────────────────────┘│
│                                      │
└──────────────────────────────────────┘
```

## Component Wireframes

### 1. retro-top-bar-icon-button

```
  ┌────┐
  │ 👤 │   ← t-icon (resolvedIcon)
  └────┘
```

Plain icon button used inside navbar left/right slots.

---

### 2. retro-avatar-edit-block

```
       ┌─────────┐
       │  ╭───╮  │  ← avatar-ring (decorative ring image)
       │  │   │  │
       │  │ 头 │  │  ← avatar image / fallback (icon or initial)
       │  │   │  │
       │  ╰───╯  │
       │    ✏️    │  ← avatar-edit-badge (bottom-right overlay)
       └─────────┘
```

Tappable avatar block. Shows `fallbackIcon` or `fallbackInitial` when no avatar URL is set. An edit badge is overlaid at the bottom-right corner.


---

### 3. retro-profile-text-block

```
  ┌─────────────────────┐
  │  {nickname}          │  ← heading (h2 or h3 based on headingLevel)
  │  {bio}               │  ← plain text
  └─────────────────────┘
```

Two-line text block with a heading and a bio line.


---

### 4. retro-profile-stat-item

```
  ┌─────────────────────┐
  │  🏷️ {label}   {value}│
  │  ← icon with tone   │
  └─────────────────────┘
```

Single row: icon + label on the left (colored by `tone`), numeric value on the right.

---

### 5. retro-tab-pill-button

```
  Unselected:             Selected:
  ┌──────────┐           ┌──────────┐
  │ {label}  │           │ ▓{label}▓ │
  └──────────┘           └──────────┘
```

Pill-shaped tab button. Fills with accent color when `selected` is true.


---

### 6. retro-tab-active-indicator

```
  Inactive:               Active:
                          ━━━━━━━━
  (hidden)                (short bar)
```

Thin horizontal bar that appears below the active tab.


---

### 7. retro-page-state-card

```
  ┌──────────────────────────────┐
  │         {title}              │
  │       {subtitle}             │
  │                              │
  │       [ <slot> ]             │
  │       (action button area)   │
  └──────────────────────────────┘
```

Reusable state card for loading, error, and empty states. The slot area is shown when `showActions` is true.

**Props:** `title`, `subtitle`, `center` (center-align text), `showActions` (render slot area)

**Usage on this page:**

| State   | Title             | Subtitle                                         | Action        |
|---------|-------------------|--------------------------------------------------|---------------|
| loading | 加载中            | 正在加载你的合集数据...                           | —             |
| error   | 加载失败          | {pageError}                                      | [重试]        |
| empty   | 暂无可展示的合集   | contextual hint per active tab                    | dynamic       |


---

### 8. retro-city-accordion-header

```
  ┌──────────────────────────────────────┐
  │ ████  {city}          {N} 个合集  ▼  │
  │ █                                     │
  │ ← ornament-bars       ← chevron      │
  └──────────────────────────────────────┘

  Collapsed:  ▼        Expanded:  ▲
```

Tappable header row for city-grouped collections. Left side shows `retro-section-ornament-bars` plus city name. Right side shows collection count and a chevron that rotates on expand.

**Props:** `city`, `collectionCount`, `expanded`

**Sub-components:** `retro-section-ornament-bars`


---

### 9. retro-collection-card-shell

```
  ┌──────────────────────────────────┐
  │                          [⋯]    │  ← visible when showAction=true
  │  {title}                        │
  │  {summary}                      │
  │  [🔒 私密]                      │  ← retro-collection-privacy-tag
  │                                 │
  │  🏪 {storeCount}  ❤ {favorites} │  ← retro-collection-meta-row
  │  📅 {updatedAt}                 │
  └──────────────────────────────────┘
```

Card representing a single collection. Displays title, summary, privacy badge, and a meta row with store count, favorites, and last-updated time. An action button (more menu) appears on "created" tab cards.

**Props:** `collection` (object), `showAction` (show more button), `variant` (`"default"` / `"featured"`)

**Sub-components:** `retro-collection-privacy-tag`, `retro-collection-meta-row`
