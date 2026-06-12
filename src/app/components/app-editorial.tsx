import { useMemo, useState } from "react";
import {
  Bookmark,
  Pencil,
  Plus,
  ChevronUp,
  Lock,
  Globe,
  Store,
  Heart,
  MoreVertical,
} from "lucide-react";
import { mockProfile, mockCreated, mockSaved, groupByCity } from "./mock-data";
import type { CollectionItem } from "./retro-collection-card-shell";
import { color, ink, typography, fontFamily, shadow } from "../tokens";
import { RetroPageStateCard } from "./retro-page-state-card";
import {
  RetroCollectionFormSheet,
  type CollectionFormValue,
} from "./retro-collection-form-sheet";
import { RetroActionSheet, type ActionSheetItem } from "./retro-action-sheet";
import { RetroConfirmDialog } from "./retro-confirm-dialog";
import { RetroCityCover } from "./retro-city-cover";

const CITY_OPTIONS = [
  { code: "shanghai", label: "上海" },
  { code: "beijing", label: "北京" },
  { code: "guangzhou", label: "广州" },
  { code: "shenzhen", label: "深圳" },
  { code: "chengdu", label: "成都" },
  { code: "hangzhou", label: "杭州" },
];

const COLLECTION_ACTION_ITEMS: ActionSheetItem[] = [
  { action: "edit", label: "编辑合集" },
  { action: "delete", label: "删除合集", danger: true },
];

type TabKey = "created" | "saved";

interface AppEditorialProps {
  onOpenCollection?: (collection: CollectionItem) => void;
}

function AppEditorial({ onOpenCollection }: AppEditorialProps) {
  const [tab, setTab] = useState<TabKey>("created");
  const [collapsed, setCollapsed] = useState<Record<string, boolean>>({});
  const [created, setCreated] = useState<CollectionItem[]>(mockCreated);
  const [saved] = useState<CollectionItem[]>(mockSaved);
  const items = tab === "created" ? created : saved;
  const groups = useMemo(() => groupByCity(items), [items]);

  const [createSheetOpen, setCreateSheetOpen] = useState(false);
  const [editTarget, setEditTarget] = useState<CollectionItem | null>(null);
  const [actionTarget, setActionTarget] = useState<CollectionItem | null>(null);
  const [deleteTarget, setDeleteTarget] = useState<CollectionItem | null>(null);

  const cityCodeFor = (label: string) =>
    CITY_OPTIONS.find((c) => c.label === label)?.code ?? "";

  const handleCreated = (form: CollectionFormValue) => {
    const next: CollectionItem = {
      id: Date.now(),
      title: form.title,
      summary: form.summary,
      storeCount: 0,
      favorites: 0,
      updatedAt: "刚刚创建",
      privacy: form.visibility,
      city: form.cityLabel,
      source: "created",
    };
    setCreated((prev) => [next, ...prev]);
    setTab("created");
  };

  const handleEdited = (id: number, form: CollectionFormValue) => {
    setCreated((prev) =>
      prev.map((c) =>
        c.id === id
          ? {
              ...c,
              title: form.title,
              summary: form.summary,
              privacy: form.visibility,
              updatedAt: "刚刚更新",
            }
          : c,
      ),
    );
  };

  const handleAction = (action: string) => {
    const target = actionTarget;
    setActionTarget(null);
    if (!target) return;
    if (action === "edit") setEditTarget(target);
    else if (action === "delete") setDeleteTarget(target);
  };

  const confirmDelete = () => {
    if (!deleteTarget) return;
    setCreated((prev) => prev.filter((c) => c.id !== deleteTarget.id));
    setDeleteTarget(null);
  };

  return (
    <div className="min-h-full w-full" style={{ background: color.paper, color: color.espresso }}>
      <div className="mx-auto max-w-[480px] min-h-screen pb-32">
        {/* Navbar */}
        <div className="relative flex items-center justify-between h-12 px-4">
          <div className="size-10" aria-hidden />
          <div className="absolute left-1/2 -translate-x-1/2" style={typography.navTitle}>
            我 的
          </div>
          <div className="size-10" aria-hidden />
        </div>

        {/* Profile row */}
        <div className="px-5 pt-2 pb-4">
          <div className="flex items-center gap-3.5">
            <button
              aria-label="编辑个人资料"
              className="relative shrink-0 size-14 rounded-full focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2"
              style={{ outlineColor: color.espresso }}
            >
              <div
                className="absolute inset-0 rounded-full flex items-center justify-center overflow-hidden"
                style={{ background: color.warmFill }}
              >
                {mockProfile.avatar ? (
                  <img src={mockProfile.avatar} alt="" className="size-full object-cover" />
                ) : (
                  <span
                    style={{
                      fontFamily: fontFamily.serif,
                      fontSize: 24,
                      fontWeight: 600,
                      color: color.espresso,
                    }}
                  >
                    {mockProfile.nickname[0]}
                  </span>
                )}
              </div>
              <div
                className="absolute -bottom-0.5 -right-0.5 size-5 rounded-full flex items-center justify-center"
                style={{ background: color.espresso, color: color.paper }}
              >
                <Pencil className="size-2.5" strokeWidth={2} aria-hidden />
              </div>
            </button>
            <div className="flex-1 min-w-0">
              <div
                style={{
                  fontFamily: fontFamily.serif,
                  fontSize: 21,
                  fontWeight: 600,
                  color: color.espresso,
                }}
              >
                {mockProfile.nickname}
              </div>
              <p className="mt-0.5 text-[12px] leading-snug line-clamp-2" style={{ color: color.mutedText }}>
                {mockProfile.bio}
              </p>
            </div>
          </div>

          {/* Stats strip */}
          <div className="mt-4 grid grid-cols-2 border-y py-2" style={{ borderColor: ink.hairline }}>
            <div className="flex items-center gap-2">
              <div className="flex size-7 items-center justify-center">
                <Bookmark
                  className="size-3.5"
                  strokeWidth={1.75}
                  style={{ color: color.sageText }}
                  fill={color.sage}
                  aria-hidden
                />
              </div>
              <div className="min-w-0">
                <div className="text-[11px] tracking-[0.22em]" style={{ color: color.mutedText }}>
                  收藏
                </div>
                <div
                  style={{
                    fontFamily: fontFamily.serif,
                    fontSize: 24,
                    fontWeight: 600,
                    color: color.espresso,
                    fontVariantNumeric: "tabular-nums",
                    lineHeight: 1.05,
                  }}
                >
                  {String(mockSaved.length).padStart(2, "0")}
                </div>
              </div>
            </div>
            <div className="flex items-center gap-2 border-l pl-4" style={{ borderColor: ink.hairline }}>
              <div className="flex size-7 items-center justify-center">
                <Pencil
                  className="size-3.5"
                  strokeWidth={1.75}
                  style={{ color: color.tomatoText }}
                  aria-hidden
                />
              </div>
              <div className="min-w-0">
                <div className="text-[11px] tracking-[0.22em]" style={{ color: color.mutedText }}>
                  创建
                </div>
                <div
                  style={{
                    fontFamily: fontFamily.serif,
                    fontSize: 24,
                    fontWeight: 600,
                    color: color.espresso,
                    fontVariantNumeric: "tabular-nums",
                    lineHeight: 1.05,
                  }}
                >
                  {String(mockCreated.length).padStart(2, "0")}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="mx-5 flex items-end justify-between border-b" style={{ borderColor: ink.rule }}>
          <div className="flex gap-6">
            {(["created", "saved"] as const).map((k) => {
              const selected = tab === k;
              return (
                <button
                  key={k}
                  onClick={() => setTab(k)}
                  className="relative min-h-10 pb-2.5 pt-1 text-[13px] tracking-wider focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2"
                  style={{
                    color: selected ? color.espresso : color.mutedText,
                    fontWeight: selected ? 600 : 400,
                    outlineColor: color.espresso,
                  }}
                >
                  {k === "created" ? "我的创建" : "我的收藏"}
                  {selected && (
                    <span
                      className="absolute left-0 right-0 -bottom-px h-[2px]"
                      style={{ background: color.espresso }}
                    />
                  )}
                </button>
              );
            })}
          </div>
          <div className="pb-2.5 text-[11px] tracking-widest" style={{ color: color.mutedText }}>
            共 {items.length} 集
          </div>
        </div>

        {/* Groups */}
        <div className="mx-5 mt-4 space-y-6">
          {groups.length === 0 ? (
            <div className="-mx-5 mt-6">
              <RetroPageStateCard
                title={tab === "created" ? "还没有创建合集" : "还没有收藏合集"}
                subtitle={
                  tab === "created"
                    ? "先创建一个城市合集,把最近想整理的店铺收进去。"
                    : "收藏的合集会按城市整理在这里,方便之后继续查看。"
                }
                showActions={tab === "created"}
              >
                {tab === "created" && (
                  <button
                    onClick={() => setCreateSheetOpen(true)}
                    className="h-11 px-6 text-[12px] tracking-[0.2em] rounded-full focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2"
                    style={{
                      background: color.espresso,
                      color: color.paper,
                      fontFamily: fontFamily.serif,
                      outlineColor: color.espresso,
                    }}
                  >
                    新 建 合 集
                  </button>
                )}
              </RetroPageStateCard>
            </div>
          ) : (
            groups.map(({ city, list }) => {
              const isCollapsed = collapsed[city];
              return (
                <div key={city}>
                  <button
                    onClick={() => setCollapsed((s) => ({ ...s, [city]: !s[city] }))}
                    aria-expanded={!isCollapsed}
                    aria-label={`${isCollapsed ? "展开" : "收起"}${city}合集`}
                    className="relative w-full min-h-10 flex items-end justify-between pb-2 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2"
                    style={{
                      borderBottom: `1px solid ${ink.rule}`,
                      outlineColor: color.espresso,
                    }}
                  >
                    <div className="flex items-baseline gap-3">
                      <div
                        className="flex items-center gap-2"
                        style={{ ...typography.groupTitle, fontSize: 22 }}
                      >
                        <span
                          className="size-1.5 shrink-0 rotate-45"
                          style={{ background: color.tomatoText }}
                        />
                        {city}
                      </div>
                      <span
                        className="text-[12px] tracking-widest"
                        style={{ color: color.mutedText }}
                      >
                        {list.length} 集
                      </span>
                    </div>
                    <span
                      aria-hidden
                      className="absolute bottom-[-1px] left-0 h-px w-20"
                      style={{ background: color.espresso }}
                    />
                    <ChevronUp
                      className={`size-4 transition-transform ${isCollapsed ? "rotate-180" : ""}`}
                      strokeWidth={1.5}
                      style={{ color: color.espresso }}
                      aria-hidden
                    />
                  </button>

                  {!isCollapsed && (
                    <div className="mt-3.5 space-y-4">
                      {list.map((c, idx) => (
                        <EditorialCard
                          key={c.id}
                          c={c}
                          index={idx + 1}
                          showAction={tab === "created"}
                          onOpen={() => onOpenCollection?.(c)}
                          onMoreClick={() => setActionTarget(c)}
                        />
                      ))}
                    </div>
                  )}
                </div>
              );
            })
          )}
        </div>

        {/* FAB */}
        {tab === "created" && (
          <button
            aria-label="新建合集"
            onClick={() => setCreateSheetOpen(true)}
            className="fixed bottom-6 h-12 px-5 inline-flex items-center gap-2 text-[13px] tracking-[0.12em] rounded-full focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2"
            style={{
              right: "max(1rem, calc(50% - 240px + 1rem))",
              background: color.espresso,
              color: color.paper,
              boxShadow: shadow.fab,
              fontFamily: fontFamily.serif,
              outlineColor: color.espresso,
            }}
          >
            <Plus className="size-4" strokeWidth={2} aria-hidden />
            新建
          </button>
        )}

        <RetroCollectionFormSheet
          visible={createSheetOpen}
          mode="create"
          cityOptions={CITY_OPTIONS}
          onClose={() => setCreateSheetOpen(false)}
          onSubmitted={handleCreated}
        />

        <RetroCollectionFormSheet
          visible={!!editTarget}
          mode="edit"
          cityOptions={CITY_OPTIONS}
          initial={
            editTarget
              ? {
                  title: editTarget.title,
                  summary: editTarget.summary,
                  visibility: editTarget.privacy,
                  cityCode: cityCodeFor(editTarget.city),
                  cityLabel: editTarget.city,
                }
              : undefined
          }
          onClose={() => setEditTarget(null)}
          onSubmitted={(form) => editTarget && handleEdited(editTarget.id, form)}
        />

        <RetroActionSheet
          visible={!!actionTarget}
          title={actionTarget?.title}
          items={COLLECTION_ACTION_ITEMS}
          onAction={handleAction}
          onCancel={() => setActionTarget(null)}
        />

        <RetroConfirmDialog
          visible={!!deleteTarget}
          title="删除合集"
          content="删除后不可恢复,确定要删除这个合集吗?"
          confirmText="删除合集"
          danger
          onConfirm={confirmDelete}
          onCancel={() => setDeleteTarget(null)}
        />
      </div>
    </div>
  );
}

function EditorialCard({
  c,
  index,
  showAction,
  onOpen,
  onMoreClick,
}: {
  c: CollectionItem;
  index: number;
  showAction: boolean;
  onOpen?: () => void;
  onMoreClick?: () => void;
}) {
  const canOpen = Boolean(onOpen);

  return (
    <article
      className={`relative flex gap-3.5 group rounded-sm transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 ${
        canOpen ? "cursor-pointer active:opacity-80" : ""
      }`}
      style={{ outlineColor: color.espresso }}
    >
      {canOpen && (
        <button
          aria-label={`打开合集：${c.title}`}
          onClick={onOpen}
          className="absolute inset-0 z-0 rounded-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4"
          style={{ outlineColor: color.espresso }}
        />
      )}
      <CollectionCoverSlot collection={c} index={index} />

      <div className="relative z-[1] flex-1 min-w-0 pointer-events-none">
        <div className="flex items-start justify-between gap-2">
          <h3
            className={`line-clamp-2 ${showAction ? "pr-7" : ""}`}
            style={{ ...typography.cardTitle, lineHeight: 1.2 }}
          >
            {c.title}
          </h3>
          {showAction && (
            <button
              aria-label={`管理合集：${c.title}`}
              onClick={(e) => {
                e.stopPropagation();
                onMoreClick?.();
              }}
              className="pointer-events-auto relative z-10 -mt-2 -mr-2 size-11 flex items-center justify-center rounded-full focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2"
              style={{ color: color.mutedText, outlineColor: color.espresso }}
            >
              <MoreVertical className="size-4" strokeWidth={1.5} aria-hidden />
            </button>
          )}
        </div>
        <p
          className="mt-1.5 text-[12px] leading-relaxed line-clamp-2"
          style={{ color: color.mutedText }}
        >
          {c.summary}
        </p>

        <div
          className="mt-2.5 flex flex-wrap items-center gap-x-2 gap-y-1 text-[11px]"
          style={{ color: color.espresso }}
        >
          <span
            className="inline-flex items-center gap-1"
            style={{ color: c.privacy === "private" ? color.mutedText : color.sageText }}
          >
            {c.privacy === "private" ? (
              <Lock className="size-3" strokeWidth={1.75} aria-hidden />
            ) : (
              <Globe className="size-3" strokeWidth={1.75} aria-hidden />
            )}
            {c.privacy === "private" ? "私密" : "公开"}
          </span>
          <MetaDot />
          <span
            className="inline-flex items-center gap-1"
            style={{ color: color.mutedText }}
            aria-label={`${c.storeCount} 家店铺`}
          >
            <Store className="size-3" strokeWidth={1.75} aria-hidden />
            {c.storeCount} 店
          </span>
          <span
            className="inline-flex items-center gap-1"
            style={{ color: color.tomatoText }}
            aria-label={`${c.favorites} 次收藏`}
          >
            <Heart className="size-3" strokeWidth={1.75} fill={color.tomato} aria-hidden />
            {c.favorites} 收藏
          </span>
          <MetaDot />
          <span className="text-[11px]" style={{ color: color.mutedText }}>
            {c.updatedAt}
          </span>
        </div>
      </div>
    </article>
  );
}

function CollectionCoverSlot({
  collection,
  index,
}: {
  collection: CollectionItem;
  index: number;
}) {
  const number = String(index).padStart(2, "0");

  if (collection.coverImage) {
    return (
      <div
        className="relative z-[1] h-28 w-[86px] shrink-0 overflow-hidden pointer-events-none"
        style={{
          background: collection.privacy === "private" ? color.privateFill : color.publicFill,
          border: `1px solid ${ink.hairline}`,
        }}
      >
        <img
          src={collection.coverImage}
          alt=""
          className="size-full object-cover"
          loading="lazy"
        />
        <div
          className="absolute inset-x-0 bottom-0 flex items-center justify-between px-2 py-1"
          style={{
            background:
              "linear-gradient(to top, rgba(43,31,26,0.74), rgba(43,31,26,0.08))",
            color: color.paper,
          }}
        >
          <span className="text-[8px] tracking-[0.24em]">NO.</span>
          <span
            style={{
              fontFamily: fontFamily.display,
              fontSize: 18,
              fontStyle: "italic",
              fontVariantNumeric: "tabular-nums",
              lineHeight: 1,
            }}
          >
            {number}
          </span>
        </div>
      </div>
    );
  }

  return (
    <div className="relative z-[1] h-28 w-[86px] shrink-0">
      <RetroCityCover
        city={collection.city}
        variant={collection.privacy}
        number={number}
      />
    </div>
  );
}

function MetaDot() {
  return (
    <span
      aria-hidden
      className="size-0.5 rounded-full"
      style={{ background: color.mutedText }}
    />
  );
}

export default AppEditorial;
