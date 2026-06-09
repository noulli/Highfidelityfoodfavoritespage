import type { CollectionItem } from "./retro-collection-card-shell";

export const mockProfile = {
  nickname: "Sarah",
  bio: "把收藏和自己创建的合集整理在这里。",
  avatar: "",
  fallbackInitial: "S",
};

export const mockCreated: CollectionItem[] = [
  {
    id: 101,
    title: "上海本帮菜巡礼",
    summary: "收集了上海最正宗的本帮菜馆，从老字号到新派融合。",
    coverImage:
      "https://images.unsplash.com/photo-1551218808-94e220e084d2?auto=format&fit=crop&w=320&q=80",
    storeCount: 12,
    favorites: 28,
    updatedAt: "5 天前更新",
    privacy: "public",
    city: "上海",
    source: "created",
  },
  {
    id: 103,
    title: "上海咖啡地图",
    summary: "精品咖啡馆合集，按街区整理，适合周末探店。",
    coverImage:
      "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?auto=format&fit=crop&w=320&q=80",
    storeCount: 6,
    favorites: 42,
    updatedAt: "今天更新",
    privacy: "public",
    city: "上海",
    source: "created",
  },
  {
    id: 102,
    title: "北京胡同小吃",
    summary: "藏在胡同深处的宝藏小吃，游客很少知道。",
    storeCount: 8,
    favorites: 15,
    updatedAt: "昨天更新",
    privacy: "private",
    city: "北京",
    source: "created",
  },
];

export const mockSaved: CollectionItem[] = [
  {
    id: 201,
    title: "广州早茶攻略",
    summary: "广州本地人推荐的早茶名店，按区域分类。",
    coverImage:
      "https://images.unsplash.com/photo-1563245372-f21724e3856d?auto=format&fit=crop&w=320&q=80",
    storeCount: 10,
    favorites: 156,
    updatedAt: "1 周前更新",
    privacy: "public",
    city: "广州",
    source: "saved",
  },
  {
    id: 202,
    title: "上海日式拉面盘点",
    summary: "上海最全的日式拉面店合集，从浓厚豚骨到清淡盐味。",
    storeCount: 7,
    favorites: 89,
    updatedAt: "1 周前更新",
    privacy: "public",
    city: "上海",
    source: "saved",
  },
];

export function groupByCity(items: CollectionItem[]) {
  const map = new Map<string, CollectionItem[]>();
  for (const it of items) {
    if (!map.has(it.city)) map.set(it.city, []);
    map.get(it.city)!.push(it);
  }
  return Array.from(map.entries()).map(([city, list]) => ({ city, list }));
}
