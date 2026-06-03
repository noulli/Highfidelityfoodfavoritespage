# Collection Detail Page — Component Wireframe (Main Page)

## Page Overview (Normal State)

```
┌──────────────────────────────────────┐
│  [←]  t-navbar "{title}"            │
│  ← left-arrow back                   │
├──────────────────────────────────────┤
│                                      │
│  ╔══════════════════════════════════╗│
│  ║  retro-double-divider            ║│
│  ╚══════════════════════════════════╝│
│                                      │
│  ┌──────────────────────────────────┐│
│  │  retro-detail-hero-main-info-block│
│  │         {title}                  ││
│  │  {cityLabel}  {privacyBadge}     ││
│  │  {description}                   ││
│  │  👤 {creatorLabel}  {updatedAt}  ││
│  │  {recentActivityLabel}           ││
│  └──────────────────────────────────┘│
│                                      │
│  ┌──────────────────────────────────┐│
│  │  retro-hero-bottom-stats-bar     ││
│  │  ❤ {savedLabel}  👥 {contributors}│
│  │  🏪 {shopCountLabel}            ││
│  └──────────────────────────────────┘│
│                                      │
│  ┌──────────────────────────────────┐│
│  │  retro-section-ornament-bars     ││
│  │  店铺卡册                        ││
│  │  retro-section-title-ornament    ││
│  │                    📍 查看地图    ││
│  └──────────────────────────────────┘│
│                                      │
│  ┌──────────────────────────────────┐│
│  │  retro-store-card-shell          ││
│  └──────────────────────────────────┘│
│  ┌──────────────────────────────────┐│
│  │  retro-store-card-shell          ││
│  └──────────────────────────────────┘│
│  ┌──────────────────────────────────┐│
│  │  retro-store-card-shell          ││
│  └──────────────────────────────────┘│
│                                      │
│                              [+]     │
│                         retro-FAB    │
└──────────────────────────────────────┘
```

## State Variants

### Loading State

```
┌──────────────────────────────────────┐
│  [←]  t-navbar "{title}"            │
├──────────────────────────────────────┤
│  ╔══════════════════════════════════╗│
│  ║  retro-double-divider            ║│
│  ╚══════════════════════════════════╝│
│                                      │
│  ┌──────────────────────────────────┐│
│  │         加载中                    ││
│  │  正在获取合集详情与店铺列表...    ││
│  └──────────────────────────────────┘│
└──────────────────────────────────────┘
```

### Error State

```
┌──────────────────────────────────────┐
│  [←]  t-navbar "{title}"            │
├──────────────────────────────────────┤
│  ╔══════════════════════════════════╗│
│  ║  retro-double-divider            ║│
│  ╚══════════════════════════════════╝│
│                                      │
│  ┌──────────────────────────────────┐│
│  │         加载失败                  ││
│  │  {error message}                 ││
│  │         [重试]                    ││
│  └──────────────────────────────────┘│
└──────────────────────────────────────┘
```

### Access Denied State

```
┌──────────────────────────────────────┐
│  [←]  t-navbar "{title}"            │
├──────────────────────────────────────┤
│  ╔══════════════════════════════════╗│
│  ║  retro-double-divider            ║│
│  ╚══════════════════════════════════╝│
│                                      │
│  ┌──────────────────────────────────┐│
│  │  retro-detail-hero-main-info-block│
│  │  retro-hero-bottom-stats-bar     ││
│  └──────────────────────────────────┘│
│                                      │
│  ┌──────────────────────────────────┐│
│  │         暂无访问权限              ││
│  │  该私密合集暂不对当前身份开放…   ││
│  │         [返回合集]               ││
│  └──────────────────────────────────┘│
└──────────────────────────────────────┘
```

### Empty Stores State

```
┌──────────────────────────────────────┐
│  [←]  t-navbar "{title}"            │
├──────────────────────────────────────┤
│  ╔══════════════════════════════════╗│
│  ║  retro-double-divider            ║│
│  ╚══════════════════════════════════╝│
│                                      │
│  ┌──────────────────────────────────┐│
│  │  retro-detail-hero-main-info-block│
│  │  retro-hero-bottom-stats-bar     ││
│  └──────────────────────────────────┘│
│                                      │
│  ┌──────────────────────────────────┐│
│  │  retro-section-ornament-bars     ││
│  │  店铺卡册                        ││
│  │  retro-section-title-ornament    ││
│  └──────────────────────────────────┘│
│                                      │
│  ┌──────────────────────────────────┐│
│  │         暂无店铺                  ││
│  │  contextual hint per permissions  ││
│  │       [添加店铺] (if can edit)    ││
│  └──────────────────────────────────┘│
└──────────────────────────────────────┘
```

## Component Wireframes

### 1. t-navbar

```
  ┌──────────────────────────────────────┐
  │ [←]     {collectionDetail.title}     │
  └──────────────────────────────────────┘
```

Standard navigation bar with back arrow. Title shows collection title. Fixed with placeholder.

---

### 2. retro-double-divider

```
  ╔══════════════════════════════════╗
  ║  ═══════════        ═══════════  ║
  ╚══════════════════════════════════╝
```

Decorative double-line divider. No props.

---

### 3. retro-detail-hero-main-info-block

```
  ┌──────────────────────────────────┐
  │  📍 {cityLabel}  [🔒]            │  ← privacy badge (if showPrivacyBadge)
  │                                  │
  │  {title}                         │  ← heading (h2 by default)
  │                                  │
  │  {description}                   │  ← collection description
  │                                  │
  │  👤 {creatorLabel}               │  ← creator avatar + name
  │  {updatedAtLabel}                │  ← "更新于 X"
  │  {recentActivityLabel}           │  ← recent activity text
  └──────────────────────────────────┘
```

Main hero section showing collection title, city, privacy badge, description, and creator info.

**Props:** `cityLabel`, `creatorAvatar`, `creatorFallback`, `creatorLabel`, `updatedAtLabel`, `description`, `headingLevel`, `privacyVariant`, `recentActivityLabel`, `showPrivacyBadge`, `title`

---

### 4. retro-hero-bottom-stats-bar

```
  ┌──────────────────────────────────┐
  │  ❤ {savedLabel}  👥 {contributorCountLabel}  🏪 {shopCountLabel}  │
  │
  │  [saved icon: toggleable]        │
  │  [contributor icon: tappable]    │
  │     shows {contributorActionLabel}
  └──────────────────────────────────┘
```

Stats bar with save/favorite toggle, contributor count (tappable), and shop count.

**Props:** `contributorCountLabel`, `contributorActionLabel`, `contributorActionType`, `savedLabel`, `shopCountLabel`, `isSubscribed`, `canTriggerSaveAction`

**Events:** `bind:savedicontap`, `bind:contributoricontap`

---

### 5. retro-section-ornament-bars

```
  ████
  █
```

Decorative bars ornament for section headers. No props.

---

### 6. retro-section-title-ornament

```
  ───◆───
```

Decorative ornament after section title text. No props.

---

### 7. Section Header (inline composition)

```
  ┌──────────────────────────────────────┐
  │ ████  店铺卡册  ───◆───  📍 查看地图 │
  │ █                    ← tappable      │
  │ ← ornament-bars      ← t-icon "map" │
  └──────────────────────────────────────┘
```

Composed from `retro-section-ornament-bars` + heading text + `retro-section-title-ornament` + map button. Map button triggers `handleMapTap`.

---

### 8. retro-store-card-shell

```
  ┌──────────────────────────────────┐
  │  🖼️              [✏️]            │  ← edit button when canEdit=true
  │  cover image                     │
  │                                  │
  │  {name}                          │
  │  {address}                       │
  │  {cuisine}        ⭐ {rating}    │
  │  {distance}                      │
  │                                  │
  │  "{description}"                 │  ← recommendation reason
  │                                  │
  │  🍽️ {dish₁}  {dish₂}  {dish₃}   │  ← recommended dishes
  │                                  │
  │  ✍️ {contributor}                │  ← "由 X 添加"
  └──────────────────────────────────┘
```

Card for a single store/place. Shows cover image, name, address, cuisine, rating, distance, recommendation reason, dishes, and contributor attribution.

**Props:** `address`, `bgTone`, `canEdit`, `contributor`, `coverImage`, `cuisine`, `description`, `dishes`, `distance`, `featured`, `name`, `rating`

**Events:** `bind:click`, `bind:editclick`

---

### 9. retro-floating-action-button

```
                           ┌────┐
                           │ [+]│   ← icon="plus"
                           └────┘
                           添加店铺  ← label
```

Fixed-position FAB for adding stores. Only visible when `permissions.canEditPlaces` is true.

**Props:** `icon`, `label`, `position` (`"fixed"`), `pressed`

**Events:** `bind:click`
