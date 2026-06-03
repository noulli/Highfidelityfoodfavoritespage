# My Collections Page — API Mock Data


## 1. GET /me/profile (getCurrentProfile)

Fields consumed by `normalizeProfile`: `nickname` (or `name` / `username`), `bio`, `avatar`.

```json
{
  "nickname": "Sarah",
  "bio": "把收藏和自己创建的合集整理在这里。",
  "avatar": "https://cdn.example.com/avatars/sarah_001.jpg"
}
```

Normalized page data:

```json
{
  "nickname": "Sarah",
  "bio": "把收藏和自己创建的合集整理在这里。",
  "avatar": "https://cdn.example.com/avatars/sarah_001.jpg"
}
```

---

## 2. GET /library/collections/created?page=0&size=50

Fields consumed by `normalizeCollection`: `id`, `title`, `summary`, `city`, `cityCode`, `visibility`, `places`, `saves`, `updatedAt`.

```json
{
  "success": true,
  "code": 200,
  "message": "OK",
  "data": {
    "items": [
      {
        "id": 101,
        "title": "上海本帮菜巡礼",
        "summary": "收集了上海最正宗的本帮菜馆，从老字号到新派融合。",
        "cityCode": "310000",
        "city": "上海",
        "places": 12,
        "saves": 28,
        "visibility": "public",
        "updatedAt": "2026-05-28T10:30:00Z"
      },
      {
        "id": 102,
        "title": "北京胡同小吃",
        "summary": "藏在胡同深处的宝藏小吃，游客很少知道。",
        "cityCode": "110000",
        "city": "北京",
        "places": 8,
        "saves": 15,
        "visibility": "private",
        "updatedAt": "2026-06-01T14:20:00Z"
      },
      {
        "id": 103,
        "title": "上海咖啡地图",
        "summary": "精品咖啡馆合集，按街区整理，适合周末探店。",
        "cityCode": "310000",
        "city": "上海",
        "places": 6,
        "saves": 42,
        "visibility": "public",
        "updatedAt": "2026-06-02T09:15:00Z"
      }
    ]
  }
}
```

Normalized items (via `normalizeCollection(item, 'created')`):

```json
[
  {
    "id": 101,
    "title": "上海本帮菜巡礼",
    "summary": "收集了上海最正宗的本帮菜馆，从老字号到新派融合。",
    "storeCount": 12,
    "favorites": 28,
    "updatedAt": "5 天前更新",
    "privacy": "public",
    "bgClass": "bg-showa-card-cream",
    "source": "created",
    "city": "上海",
    "cityCode": "310000",
    "collectionKey": "collection-created-上海-上海本帮菜巡礼-收集了上海最正宗的本帮菜馆，从老字号到新派融合。-12-28"
  },
  {
    "id": 102,
    "title": "北京胡同小吃",
    "summary": "藏在胡同深处的宝藏小吃，游客很少知道。",
    "storeCount": 8,
    "favorites": 15,
    "updatedAt": "昨天更新",
    "privacy": "private",
    "bgClass": "bg-showa-card-cream",
    "source": "created",
    "city": "北京",
    "cityCode": "110000",
    "collectionKey": "collection-created-北京-北京胡同小吃-藏在胡同深处的宝藏小吃，游客很少知道。-8-15"
  },
  {
    "id": 103,
    "title": "上海咖啡地图",
    "summary": "精品咖啡馆合集，按街区整理，适合周末探店。",
    "storeCount": 6,
    "favorites": 42,
    "updatedAt": "今天更新",
    "privacy": "public",
    "bgClass": "bg-showa-card-cream",
    "source": "created",
    "city": "上海",
    "cityCode": "310000",
    "collectionKey": "collection-created-上海-上海咖啡地图-精品咖啡馆合集，按街区整理，适合周末探店。-6-42"
  }
]
```

---

## 3. GET /library/collections/saved?page=0&size=50

Same field set as created. Fields consumed: `id`, `title`, `summary`, `city`, `cityCode`, `visibility`, `places`, `saves`, `updatedAt`.

```json
{
  "success": true,
  "code": 200,
  "message": "OK",
  "data": {
    "items": [
      {
        "id": 201,
        "title": "广州早茶攻略",
        "summary": "广州本地人推荐的早茶名店，按区域分类。",
        "cityCode": "440100",
        "city": "广州",
        "places": 10,
        "saves": 156,
        "visibility": "public",
        "updatedAt": "2026-05-20T16:00:00Z"
      },
      {
        "id": 202,
        "title": "上海日式拉面盘点",
        "summary": "上海最全的日式拉面店合集，从浓厚豚骨到清淡盐味。",
        "cityCode": "310000",
        "city": "上海",
        "places": 7,
        "saves": 89,
        "visibility": "public",
        "updatedAt": "2026-05-25T11:30:00Z"
      }
    ]
  }
}
```

Normalized items (via `normalizeCollection(item, 'saved')`):

```json
[
  {
    "id": 201,
    "title": "广州早茶攻略",
    "summary": "广州本地人推荐的早茶名店，按区域分类。",
    "storeCount": 10,
    "favorites": 156,
    "updatedAt": "1 周前更新",
    "privacy": "public",
    "bgClass": "bg-showa-card-cream",
    "source": "saved",
    "city": "广州",
    "cityCode": "440100",
    "collectionKey": "collection-saved-广州-广州早茶攻略-广州本地人推荐的早茶名店，按区域分类。-10-156"
  },
  {
    "id": 202,
    "title": "上海日式拉面盘点",
    "summary": "上海最全的日式拉面店合集，从浓厚豚骨到清淡盐味。",
    "storeCount": 7,
    "favorites": 89,
    "updatedAt": "1 周前更新",
    "privacy": "public",
    "bgClass": "bg-showa-card-cream",
    "source": "saved",
    "city": "上海",
    "cityCode": "310000",
    "collectionKey": "collection-saved-上海-上海日式拉面盘点-上海最全的日式拉面店合集，从浓厚豚骨到清淡盐味。-7-89"
  }
]
```

---

## Field mapping: API → page data → component

| API response field      | `normalizeCollection` output | Component                         |
|-------------------------|------------------------------|-----------------------------------|
| `id`                    | `id`                         | `retro-collection-card-shell`     |
| `title`                 | `title`                      | `retro-collection-card-shell`     |
| `summary`               | `summary`                    | `retro-collection-card-shell`     |
| `visibility`            | `privacy`                    | `retro-collection-privacy-tag`    |
| `places`                | `storeCount`                 | `retro-collection-meta-row`       |
| `saves`                 | `favorites`                  | `retro-collection-meta-row`       |
| `updatedAt`             | `updatedAt` (relative)       | `retro-collection-meta-row`       |
| `city`                  | `city`                       | `retro-city-accordion-header`     |
| `cityCode`              | `cityCode`                   | create form                       |
| —                       | `source` (created/saved)     | tab filter, `showAction` logic    |
| —                       | `collectionKey` (derived)    | `wx:key`                          |
| —                       | `savedCount` (derived)       | `retro-profile-stat-item` (收藏)  |
| —                       | `createdCount` (derived)     | `retro-profile-stat-item` (创建)  |
| —                       | `displayCount` (derived)     | tab summary text                  |

| Profile API field       | `normalizeProfile` output    | Component                         |
|-------------------------|------------------------------|-----------------------------------|
| `nickname` / `name`     | `nickname`                   | `retro-profile-text-block`        |
| `bio`                   | `bio`                        | `retro-profile-text-block`        |
| `avatar`                | `avatar`                     | `retro-avatar-edit-block`         |
