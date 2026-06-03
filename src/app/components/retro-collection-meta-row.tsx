import { Store, Heart, Clock } from "lucide-react";

interface Props {
  storeCount: number;
  favorites: number;
  updatedAt: string;
}

export function RetroCollectionMetaRow({ storeCount, favorites, updatedAt }: Props) {
  return (
    <div className="flex items-center gap-3 text-xs text-neutral-400">
      <span className="inline-flex items-center gap-1">
        <Store className="size-3.5" strokeWidth={1.75} />
        {storeCount} 家店
      </span>
      <span className="inline-flex items-center gap-1">
        <Heart className="size-3.5" strokeWidth={1.75} />
        {favorites} 收藏
      </span>
      <span className="inline-flex items-center gap-1">
        <Clock className="size-3.5" strokeWidth={1.75} />
        {updatedAt}
      </span>
    </div>
  );
}
