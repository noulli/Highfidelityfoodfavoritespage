# Collection Detail Page — API Mock Data

## 1. GET /library/collections/:id (getCollectionDetail)

Fields consumed by `normalizeCollectionPayload`: `id`, `title`, `summary`, `city`, `cityCode`, `visibility`, `creator`, `collaborators`, `places` (count), `saves`, `updatedAt`, `recentActivity`.

```json
{
  "success": true,
  "code": 200,
  "message": "OK",
  "data": {
    "id": 101,
    "title": "上海本帮菜巡礼",
    "summary": "收集了上海最正宗的本帮菜馆，从老字号到新派融合。",
    "cityCode": "310000",
    "city": "上海",
    "visibility": "public",
    "creator": {
      "id": 1,
      "nickname": "Sarah",
      "avatar": "https://cdn.example.com/avatars/sarah_001.jpg"
    },
    "collaborators": [
      {
        "id": 2,
        "nickname": "小明",
        "avatar": "https://cdn.example.com/avatars/xiaoming_001.jpg",
        "role": "editor"
      },
      {
        "id": 3,
        "nickname": "阿花",
        "avatar": "https://cdn.example.com/avatars/ahua_001.jpg",
        "role": "viewer"
      }
    ],
    "places": 12,
    "saves": 28,
    "updatedAt": "2026-06-01T14:20:00Z",
    "recentActivity": "2026-06-02T09:15:00Z"
  }
}
```

Normalized page data (`collectionDetail`):

```json
{
  "title": "上海本帮菜巡礼",
  "cityLabel": "上海",
  "description": "收集了上海最正宗的本帮菜馆，从老字号到新派融合。",
  "creatorId": 1,
  "creatorAvatar": "https://cdn.example.com/avatars/sarah_001.jpg",
  "creatorFallback": "S",
  "creatorLabel": "Sarah",
  "updatedAtLabel": "2 天前更新",
  "recentActivityLabel": "昨天有新动态",
  "shopCountLabel": "12 店铺",
  "savedLabel": "28 收藏",
  "contributorCountLabel": "3 人",
  "privacyVariant": "public",
  "showPrivacyBadge": false
}
```

---

## 2. GET /library/collections/:id/places (getPlaces)

Fields consumed by `normalizeStoreCards`: `id`, `name`, `address`, `coverImage`, `cuisine`, `rating`, `distance`, `description`, `dishes`, `contributor`, `featured`.

```json
{
  "success": true,
  "code": 200,
  "message": "OK",
  "data": {
    "items": [
      {
        "id": 1001,
        "name": "老正兴菜馆",
        "address": "上海市黄浦区福州路556号",
        "coverImage": "https://cdn.example.com/stores/laozhengxing.jpg",
        "cuisine": "本帮菜",
        "rating": 4.6,
        "distance": 850,
        "description": "百年老店，招牌草头圈子必点。",
        "dishes": ["草头圈子", "油爆虾", "八宝辣酱"],
        "contributor": {
          "id": 1,
          "nickname": "Sarah"
        },
        "featured": true
      },
      {
        "id": 1002,
        "name": "上海老饭店",
        "address": "上海市黄浦区福佑路242号",
        "coverImage": "https://cdn.example.com/stores/laofandian.jpg",
        "cuisine": "本帮菜",
        "rating": 4.4,
        "distance": 1200,
        "description": "老城隍庙旁的经典本帮菜馆，八宝鸭是招牌。",
        "dishes": ["八宝鸭", "虾子大乌参", "扣三丝"],
        "contributor": {
          "id": 2,
          "nickname": "小明"
        },
        "featured": false
      },
      {
        "id": 1003,
        "name": "德兴馆",
        "address": "上海市黄浦区老西门中华路1711号",
        "coverImage": "",
        "cuisine": "本帮面馆",
        "rating": 4.5,
        "distance": 2300,
        "description": "创始于1883年的老面馆，焖肉面一绝。",
        "dishes": ["焖肉面", "爆鱼面", "辣肉面"],
        "contributor": {
          "id": 3,
          "nickname": "阿花"
        },
        "featured": false
      }
    ]
  }
}
```

Normalized items (via `normalizeStoreCards`):

```json
[
  {
    "id": 1001,
    "name": "老正兴菜馆",
    "address": "上海市黄浦区福州路556号",
    "coverImage": "https://cdn.example.com/stores/laozhengxing.jpg",
    "cuisine": "本帮菜",
    "rating": 4.6,
    "distance": "850m",
    "description": "百年老店，招牌草头圈子必点。",
    "dishes": ["草头圈子", "油爆虾", "八宝辣酱"],
    "contributor": "由 Sarah 添加",
    "featured": true,
    "bgTone": "cream"
  },
  {
    "id": 1002,
    "name": "上海老饭店",
    "address": "上海市黄浦区福佑路242号",
    "coverImage": "https://cdn.example.com/stores/laofandian.jpg",
    "cuisine": "本帮菜",
    "rating": 4.4,
    "distance": "1.2km",
    "description": "老城隍庙旁的经典本帮菜馆，八宝鸭是招牌。",
    "dishes": ["八宝鸭", "虾子大乌参", "扣三丝"],
    "contributor": "由 小明 添加",
    "featured": false,
    "bgTone": "mint"
  },
  {
    "id": 1003,
    "name": "德兴馆",
    "address": "上海市老西门中华路1711号",
    "coverImage": "",
    "cuisine": "本帮面馆",
    "rating": 4.5,
    "distance": "2.3km",
    "description": "创始于1883年的老面馆，焖肉面一绝。",
    "dishes": ["焖肉面", "爆鱼面", "辣肉面"],
    "contributor": "由 阿花 添加",
    "featured": false,
    "bgTone": "rose"
  }
]
```

---

## 3. GET /library/collections/:id/collaborators (getCollaborators)

Fields consumed by `normalizeCollaboratorsPreview` + `splitCollaboratorsPreview`: `id`, `nickname`, `avatar`, `role`.

```json
{
  "success": true,
  "code": 200,
  "message": "OK",
  "data": {
    "items": [
      {
        "id": 1,
        "nickname": "Sarah",
        "avatar": "https://cdn.example.com/avatars/sarah_001.jpg",
        "role": "owner"
      },
      {
        "id": 2,
        "nickname": "小明",
        "avatar": "https://cdn.example.com/avatars/xiaoming_001.jpg",
        "role": "editor"
      },
      {
        "id": 3,
        "nickname": "阿花",
        "avatar": "https://cdn.example.com/avatars/ahua_001.jpg",
        "role": "viewer"
      }
    ]
  }
}
```

After `splitCollaboratorsPreview`:

**ownerCollaboratorsPreview:**

```json
[
  {
    "id": 1,
    "name": "Sarah",
    "avatarUrl": "https://cdn.example.com/avatars/sarah_001.jpg",
    "avatarText": "S",
    "role": "owner"
  }
]
```

**memberCollaboratorsPreview:**

```json
[
  {
    "id": 2,
    "name": "小明",
    "avatarUrl": "https://cdn.example.com/avatars/xiaoming_001.jpg",
    "avatarText": "小",
    "role": "editor"
  },
  {
    "id": 3,
    "name": "阿花",
    "avatarUrl": "https://cdn.example.com/avatars/ahua_001.jpg",
    "avatarText": "阿",
    "role": "viewer"
  }
]
```

---

## 4. GET /library/collections/:id/permissions (getPermissions)

Fields consumed by `normalizeEntryPermissions`.

```json
{
  "success": true,
  "code": 200,
  "message": "OK",
  "data": {
    "canEditPlaces": true,
    "canRemovePlace": true,
    "canSeeSaveAction": true,
    "canManageMembers": true,
    "canExitCollaboration": false
  }
}
```

Normalized permissions:

```json
{
  "canEditPlaces": true,
  "canRemovePlace": true,
  "canSeeSaveAction": true,
  "canManageMembers": true,
  "canExitCollaboration": false
}
```

---

## Derived Page State

| Field | Derived From | Value (this mock) |
|---|---|---|
| `displayState` | loading/error/ready | `"ready"` |
| `pageState` | `derivePageState(permissions, accessDenied, invitePending)` | `"owner_manageable"` |
| `isSubscribed` | collection save status | `false` |
| `contributorActionLabel` | `deriveContributorActionState(...)` | `"3 人协作"` |
| `contributorActionType` | `deriveContributorActionState(...)` | `"tap"` |
| `collaboratorCount` | `ownerCollaboratorsPreview.length + memberCollaboratorsPreview.length` | `3` |
| `accessDenied` | visibility + permissions | `false` |

---

## Field Mapping: API → Page Data → Component

| API response field | Normalizer output | Component |
|---|---|---|
| `title` | `collectionDetail.title` | `t-navbar`, `retro-detail-hero-main-info-block` |
| `city` | `collectionDetail.cityLabel` | `retro-detail-hero-main-info-block` |
| `summary` | `collectionDetail.description` | `retro-detail-hero-main-info-block` |
| `visibility` | `collectionDetail.privacyVariant` | `retro-detail-hero-main-info-block` |
| `visibility` | `collectionDetail.showPrivacyBadge` | `retro-detail-hero-main-info-block` |
| `creator.nickname` | `collectionDetail.creatorLabel` | `retro-detail-hero-main-info-block` |
| `creator.avatar` | `collectionDetail.creatorAvatar` | `retro-detail-hero-main-info-block` |
| — | `collectionDetail.creatorFallback` | `retro-detail-hero-main-info-block` |
| `updatedAt` | `collectionDetail.updatedAtLabel` (relative) | `retro-detail-hero-main-info-block` |
| `recentActivity` | `collectionDetail.recentActivityLabel` | `retro-detail-hero-main-info-block` |
| `places` (count) | `collectionDetail.shopCountLabel` | `retro-hero-bottom-stats-bar` |
| `saves` | `collectionDetail.savedLabel` | `retro-hero-bottom-stats-bar` |
| — | `isSubscribed` | `retro-hero-bottom-stats-bar` |
| — | `contributorActionLabel` | `retro-hero-bottom-stats-bar` |
| — | `contributorActionType` | `retro-hero-bottom-stats-bar` |
| — | `contributorCountLabel` | `retro-hero-bottom-stats-bar` |
| `places[].name` | `storeCards[].name` | `retro-store-card-shell` |
| `places[].address` | `storeCards[].address` | `retro-store-card-shell` |
| `places[].coverImage` | `storeCards[].coverImage` | `retro-store-card-shell` |
| `places[].cuisine` | `storeCards[].cuisine` | `retro-store-card-shell` |
| `places[].rating` | `storeCards[].rating` | `retro-store-card-shell` |
| `places[].distance` | `storeCards[].distance` (formatted) | `retro-store-card-shell` |
| `places[].description` | `storeCards[].description` | `retro-store-card-shell` |
| `places[].dishes` | `storeCards[].dishes` | `retro-store-card-shell` |
| `places[].contributor` | `storeCards[].contributor` (formatted) | `retro-store-card-shell` |
| `places[].featured` | `storeCards[].featured` | `retro-store-card-shell` |
| — | `storeCards[].bgTone` (cycled) | `retro-store-card-shell` |
| — | `permissions.canEditPlaces` | `retro-store-card-shell` (canEdit), `retro-floating-action-button` (visible) |
