import { useMemo, useState } from "react";
import {
  UserCircle2,
  MoreHorizontal,
  Circle,
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
import {
  RetroCollectionFormSheet,
  type CollectionFormValue,
} from "./retro-collection-form-sheet";
import { RetroActionSheet, type ActionSheetItem } from "./retro-action-sheet";
import { RetroConfirmDialog } from "./retro-confirm-dialog";

const CITY_OPTIONS = [
  { code: "shanghai", label: "上海" },
  { code: "beijing", label: "北京" },
  { code: "guangzhou", label: "广州" },
  { code: "shenzhen", label: "深圳" },
  { code: "chengdu", label: "成都" },
  { code: "hangzhou", label: "杭州" },
];

const COLLECTION_ACTION_ITEMS: ActionSheetItem[] = [
  { action: "edit", label: "编辑" },
  { action: "delete", label: "删除", danger: true },
];

type TabKey = "created" | "saved";

function AppEditorial() {
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
      <div className="mx-auto max-w-[480px] min-h-screen pb-28">
        {/* Navbar */}
        <div className="relative flex items-center justify-between h-12 px-4">
          <button>
            <UserCircle2 className="size-6" strokeWidth={1.5} style={{ color: color.espresso }} />
          </button>
          <div className="absolute left-1/2 -translate-x-1/2" style={typography.navTitle}>
            我 的
          </div>
          <div className="flex items-center gap-2">
            <MoreHorizontal className="size-5" strokeWidth={1.5} />
            <Circle className="size-5" strokeWidth={1.5} />
          </div>
        </div>

        {/* Profile row */}
        <div className="px-5 pt-4 pb-6">
          <div className="flex items-center gap-4">
            <button className="relative shrink-0 size-16">
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
                      fontSize: 26,
                      fontWeight: 600,
                      color: color.espresso,
                    }}
                  >
                    {mockProfile.nickname[0]}
                  </span>
                )}
              </div>
              <div
                className="absolute -bottom-0.5 -right-0.5 size-6 rounded-full flex items-center justify-center"
                style={{ background: color.espresso, color: color.paper }}
              >
                <Pencil className="size-3" strokeWidth={2} />
              </div>
            </button>
            <div className="flex-1 min-w-0">
              <div
                style={{
                  fontFamily: fontFamily.serif,
                  fontSize: 22,
                  fontWeight: 600,
                  color: color.espresso,
                }}
              >
                {mockProfile.nickname}
              </div>
              <p className="mt-0.5 text-[12px] leading-snug" style={{ color: color.muted }}>
                {mockProfile.bio}
              </p>
            </div>
          </div>

          {/* Stats inline */}
          <div className="mt-6 flex items-stretch">
            <div className="flex-1">
              <div
                className="flex items-center gap-1.5 text-[12px] mb-1.5"
                style={{ color: color.muted }}
              >
                <Bookmark
                  className="size-3.5"
                  strokeWidth={1.75}
                  style={{ color: color.sage }}
                  fill={color.sage}
                />
                <span className="tracking-[0.3em]">收藏</span>
              </div>
              <span style={typography.statNumber}>
                {String(mockSaved.length).padStart(2, "0")}
              </span>
            </div>
            <div className="w-px" style={{ background: ink.hairline }} />
            <div className="flex-1 pl-5">
              <div
                className="flex items-center gap-1.5 text-[12px] mb-1.5"
                style={{ color: color.muted }}
              >
                <Pencil className="size-3.5" strokeWidth={1.75} style={{ color: color.tomato }} />
                <span className="tracking-[0.3em]">创建</span>
              </div>
              <span style={typography.statNumber}>
                {String(mockCreated.length).padStart(2, "0")}
              </span>
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
                  className="relative pb-3 pt-1 text-[13px] tracking-wider"
                  style={{
                    color: selected ? color.espresso : color.muted,
                    fontWeight: selected ? 500 : 400,
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
          <div className="pb-3 text-[11px] tracking-widest" style={{ color: color.muted }}>
            共 {items.length} 集
          </div>
        </div>

        {/* Groups */}
        <div className="mx-5 mt-5 space-y-7">
          {groups.map(({ city, list }) => {
            const isCollapsed = collapsed[city];
            return (
              <div key={city}>
                <button
                  onClick={() => setCollapsed((s) => ({ ...s, [city]: !s[city] }))}
                  className="w-full flex items-end justify-between pb-2"
                  style={{ borderBottom: `1px solid ${color.espresso}` }}
                >
                  <div className="flex items-baseline gap-3">
                    <div className="flex items-center gap-2" style={typography.groupTitle}>
                      <span className="size-1.5 rotate-45" style={{ background: color.tomato }} />
                      {city}
                    </div>
                    <span className="text-[12px] tracking-widest" style={{ color: color.muted }}>
                      {list.length} 集
                    </span>
                  </div>
                  <ChevronUp
                    className={`size-4 transition-transform ${isCollapsed ? "rotate-180" : ""}`}
                    strokeWidth={1.5}
                    style={{ color: color.espresso }}
                  />
                </button>

                {!isCollapsed && (
                  <div className="mt-4 space-y-5">
                    {list.map((c, idx) => (
                      <EditorialCard
                        key={c.id}
                        c={c}
                        index={idx + 1}
                        showAction={tab === "created"}
                        onMoreClick={() => setActionTarget(c)}
                      />
                    ))}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* FAB */}
        {tab === "created" && (
          <button
            aria-label="新建合集"
            onClick={() => setCreateSheetOpen(true)}
            className="fixed bottom-6 h-12 px-5 inline-flex items-center gap-2 text-[13px] tracking-[0.25em] rounded-full"
            style={{
              right: "max(1rem, calc(50% - 240px + 1rem))",
              background: color.espresso,
              color: color.paper,
              boxShadow: shadow.fab,
              fontFamily: fontFamily.serif,
            }}
          >
            <Plus className="size-4" strokeWidth={2} />
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
          content="删除后不可恢复,确定删除这个合集吗?"
          confirmText="确定"
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
  onMoreClick,
}: {
  c: CollectionItem;
  index: number;
  showAction: boolean;
  onMoreClick?: () => void;
}) {
  return (
    <div className="relative flex gap-4 group cursor-pointer">
      {/* Index number / cover slot */}
      <div
        className="shrink-0 w-20 h-24 flex flex-col items-center justify-center"
        style={{
          background: c.privacy === "private" ? color.privateFill : color.publicFill,
          border: `1px solid ${ink.hairline}`,
        }}
      >
        <div className="text-[9px] tracking-[0.3em] mb-1" style={{ color: color.muted }}>
          NO.
        </div>
        <div style={typography.numeral}>
          {String(index).padStart(2, "0")}
        </div>
      </div>

      <div className="flex-1 min-w-0">
        <div className="flex items-start justify-between gap-2">
          <h3 style={typography.cardTitle}>{c.title}</h3>
          {showAction && (
            <button
              aria-label="更多"
              onClick={(e) => {
                e.stopPropagation();
                onMoreClick?.();
              }}
              className="-mt-1 -mr-1 size-7 flex items-center justify-center"
              style={{ color: color.muted }}
            >
              <MoreVertical className="size-4" strokeWidth={1.5} />
            </button>
          )}
        </div>
        <p
          className="mt-1.5 text-[12px] leading-relaxed line-clamp-2"
          style={{ color: color.muted }}
        >
          {c.summary}
        </p>

        <div
          className="mt-2.5 flex items-center gap-3 text-[11px]"
          style={{ color: color.espresso }}
        >
          <span
            className="inline-flex items-center gap-1"
            style={{ color: c.privacy === "private" ? color.muted : color.sage }}
          >
            {c.privacy === "private" ? (
              <Lock className="size-3" strokeWidth={1.75} />
            ) : (
              <Globe className="size-3" strokeWidth={1.75} />
            )}
            {c.privacy === "private" ? "私密" : "公开"}
          </span>
          <span className="size-0.5 rounded-full" style={{ background: color.muted }} />
          <span className="inline-flex items-center gap-1" style={{ color: color.muted }}>
            <Store className="size-3" strokeWidth={1.75} />
            {c.storeCount}
          </span>
          <span className="inline-flex items-center gap-1" style={{ color: color.tomato }}>
            <Heart className="size-3" strokeWidth={1.75} fill={color.tomato} />
            {c.favorites}
          </span>
          <span className="ml-auto text-[10px]" style={{ color: color.muted }}>
            {c.updatedAt}
          </span>
        </div>
      </div>
    </div>
  );
}

export default AppEditorial;
