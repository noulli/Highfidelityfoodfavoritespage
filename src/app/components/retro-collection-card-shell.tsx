import { MoreVertical } from "lucide-react";
import { RetroCollectionPrivacyTag } from "./retro-collection-privacy-tag";
import { RetroCollectionMetaRow } from "./retro-collection-meta-row";

export interface CollectionItem {
  id: number;
  title: string;
  summary: string;
  storeCount: number;
  favorites: number;
  updatedAt: string;
  privacy: "public" | "private";
  city: string;
  source: "created" | "saved";
}

interface Props {
  collection: CollectionItem;
  showAction?: boolean;
  variant?: "default" | "featured";
  onMore?: (c: CollectionItem) => void;
  onOpen?: (c: CollectionItem) => void;
}

export function RetroCollectionCardShell({
  collection,
  showAction,
  onMore,
  onOpen,
}: Props) {
  return (
    <div
      onClick={() => onOpen?.(collection)}
      className="relative bg-white rounded-2xl border border-neutral-100 px-4 pt-4 pb-3.5 shadow-[0_1px_2px_rgba(0,0,0,0.02)] cursor-pointer active:bg-neutral-50/60 transition-colors"
    >
      {showAction && (
        <button
          onClick={(e) => {
            e.stopPropagation();
            onMore?.(collection);
          }}
          aria-label="更多操作"
          className="absolute top-3 right-2 inline-flex items-center justify-center size-8 rounded-full text-neutral-400 hover:bg-neutral-100"
        >
          <MoreVertical className="size-4" strokeWidth={2} />
        </button>
      )}
      <h3 className="text-base font-semibold text-neutral-900 pr-8">
        {collection.title}
      </h3>
      <p className="mt-1 text-sm text-neutral-400 leading-snug line-clamp-2">
        {collection.summary}
      </p>
      <div className="mt-2.5">
        <RetroCollectionPrivacyTag privacy={collection.privacy} />
      </div>
      <div className="mt-3">
        <RetroCollectionMetaRow
          storeCount={collection.storeCount}
          favorites={collection.favorites}
          updatedAt={collection.updatedAt}
        />
      </div>
    </div>
  );
}
