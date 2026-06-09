import { useState } from "react";
import { ChevronLeft, MoreHorizontal, MapPin } from "lucide-react";
import { TNavbar } from "./t-navbar";
import { RetroDoubleDivider } from "./retro-double-divider";
import { RetroDetailHeroMainInfoBlock } from "./retro-detail-hero-main-info-block";
import { RetroHeroBottomStatsBar } from "./retro-hero-bottom-stats-bar";
import { RetroSectionOrnamentBars } from "./retro-section-ornament-bars";
import { RetroStoreCardShell } from "./retro-store-card-shell";
import { RetroFloatingActionButton } from "./retro-floating-action-button";
import { RetroPageStateCard } from "./retro-page-state-card";
import { RetroAddStoreSheet } from "./retro-add-store-sheet";
import { RetroActionSheet, type ActionSheetItem } from "./retro-action-sheet";
import { RetroEditStoreSheet } from "./retro-edit-store-sheet";
import {
  mockCollectionDetail,
  mockStoreCards,
  mockPermissions,
  type StoreCard,
} from "./collection-detail-mock-data";
import { color, ink, typography, fontFamily } from "../tokens";

type DisplayState = "ready" | "loading" | "error" | "denied" | "empty";

interface Props {
  onBack?: () => void;
  displayState?: DisplayState;
}

function AppCollectionDetail({ onBack, displayState = "ready" }: Props) {
  const detail = mockCollectionDetail;
  const permissions = mockPermissions;
  const [stores, setStores] = useState(mockStoreCards);
  const [addSheetVisible, setAddSheetVisible] = useState(false);
  const [collectionActionSheetVisible, setCollectionActionSheetVisible] = useState(false);
  const [privacyVariant, setPrivacyVariant] = useState(detail.privacyVariant);
  const [actionTarget, setActionTarget] = useState<StoreCard | null>(null);
  const [editTarget, setEditTarget] = useState<StoreCard | null>(null);
  const isCreatorMode = permissions.canEditPlaces || permissions.canRemovePlace;

  const buildCollectionActionSheetItems = (): ActionSheetItem[] => {
    const items: ActionSheetItem[] = [];
    if (permissions.canEditPlaces) items.push({ action: "addStore", label: "添加店铺" });
    if (permissions.canEditPlaces)
      items.push({
        action: "toggleVisibility",
        label: privacyVariant === "public" ? "设为私密" : "设为公开",
      });
    if (permissions.canExitCollaboration)
      items.push({ action: "exitCollaboration", label: "退出协作", danger: true });
    return items;
  };

  const buildStoreActionSheetItems = (): ActionSheetItem[] => {
    const items: ActionSheetItem[] = [];
    if (permissions.canEditPlaces) items.push({ action: "edit", label: "编辑" });
    if (permissions.canRemovePlace)
      items.push({ action: "delete", label: "删除", danger: true });
    return items;
  };

  const handleStoreAction = (action: string) => {
    const target = actionTarget;
    setActionTarget(null);
    if (!target) return;
    if (action === "edit") {
      setEditTarget(target);
    } else if (action === "delete") {
      setStores((prev) => prev.filter((s) => s.id !== target.id));
    }
  };

  const handleCollectionAction = (action: string) => {
    setCollectionActionSheetVisible(false);
    if (action === "addStore") {
      setAddSheetVisible(true);
    } else if (action === "toggleVisibility") {
      setPrivacyVariant((prev) => (prev === "public" ? "private" : "public"));
    }
  };

  const effectiveState: DisplayState =
    displayState === "ready" && stores.length === 0 ? "empty" : displayState;

  return (
    <div className="min-h-full w-full" style={{ background: color.paper, color: color.espresso }}>
      <div className="mx-auto max-w-[480px] min-h-screen pb-36">
        <TNavbar
          title={detail.title}
          left={
            <button
              onClick={onBack}
              aria-label="返回"
              className="size-10 flex items-center justify-center rounded-full focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2"
              style={{ outlineColor: color.espresso }}
            >
              <ChevronLeft className="size-6" strokeWidth={1.5} style={{ color: color.espresso }} />
            </button>
          }
          right={
            <div className="flex items-center pr-1">
              <button
                aria-label="合集管理"
                onClick={() => setCollectionActionSheetVisible(true)}
                className="size-10 flex items-center justify-center rounded-full focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2"
                style={{ outlineColor: color.espresso }}
              >
                <MoreHorizontal
                  className="size-5"
                  strokeWidth={1.5}
                  style={{ color: color.espresso }}
                />
              </button>
            </div>
          }
        />

        <RetroDoubleDivider />

        {effectiveState === "loading" && (
          <div className="mt-8">
            <RetroPageStateCard title="加载中" subtitle="正在获取合集详情与店铺列表..." />
          </div>
        )}

        {effectiveState === "error" && (
          <div className="mt-8">
            <RetroPageStateCard
              title="加载失败"
              subtitle="网络异常,请稍后重试。"
              showActions
            >
              <button
                className="px-6 h-11 text-[12px] tracking-[0.2em]"
                style={{
                  background: color.espresso,
                  color: color.paper,
                  fontFamily: fontFamily.serif,
                }}
              >
                重 试
              </button>
            </RetroPageStateCard>
          </div>
        )}

        {(effectiveState === "ready" ||
          effectiveState === "denied" ||
          effectiveState === "empty") && (
          <>
            <RetroDetailHeroMainInfoBlock
              title={detail.title}
              cityLabel={detail.cityLabel}
              description={detail.description}
              creatorAvatar={detail.creatorAvatar}
              creatorFallback={detail.creatorFallback}
              creatorLabel={detail.creatorLabel}
              updatedAtLabel={detail.updatedAtLabel}
              recentActivityLabel={detail.recentActivityLabel}
              roleLabel={isCreatorMode ? "协作管理" : undefined}
              privacyVariant={privacyVariant}
              showPrivacyBadge={detail.showPrivacyBadge || privacyVariant === "private"}
            />

            <RetroHeroBottomStatsBar
              savedLabel={detail.savedLabel}
              contributorCountLabel={detail.contributorCountLabel}
              shopCountLabel={detail.shopCountLabel}
              canSeeSaveAction={permissions.canSeeSaveAction && !isCreatorMode}
            />
          </>
        )}

        {effectiveState === "denied" && (
          <div className="mt-8">
            <RetroPageStateCard
              title="暂无访问权限"
              subtitle="该私密合集暂不对当前身份开放,请联系创建者。"
              showActions
            >
              <button
                onClick={onBack}
                className="px-6 h-11 text-[12px] tracking-[0.2em]"
                style={{
                  border: `1px solid ${color.espresso}`,
                  color: color.espresso,
                  fontFamily: fontFamily.serif,
                }}
              >
                返 回 合 集
              </button>
            </RetroPageStateCard>
          </div>
        )}

        {(effectiveState === "ready" || effectiveState === "empty") && (
          <div className="mx-5 mt-7">
            <div
              className="flex items-center justify-between gap-4 pb-3.5"
              style={{ borderBottom: `1px solid ${ink.hairline}` }}
            >
              <div className="flex min-w-0 items-center">
                <RetroSectionOrnamentBars />
                <h2 style={typography.sectionTitle}>店铺列表</h2>
              </div>
              <button
                type="button"
                aria-label="查看地图"
                className="inline-flex h-9 shrink-0 items-center gap-1.5 rounded-full px-3 text-[12px] transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2"
                style={{
                  background: ink.chip,
                  color: color.espresso,
                  outlineColor: color.espresso,
                }}
              >
                <MapPin className="size-4" strokeWidth={1.75} />
                地图
              </button>
            </div>
          </div>
        )}

        {effectiveState === "ready" && (
          <div className="mx-5 mt-2">
            {stores.map((s, idx) => (
              <RetroStoreCardShell
                key={s.id}
                {...s}
                index={idx + 1}
                canEdit={permissions.canEditPlaces || permissions.canRemovePlace}
                onEditClick={() => setActionTarget(s)}
              />
            ))}
          </div>
        )}

        {effectiveState === "empty" && (
          <div className="mt-6">
            <RetroPageStateCard
              title="暂无店铺"
              subtitle={
                permissions.canEditPlaces
                  ? "还没有添加店铺,点击下方按钮开始收录第一家。"
                  : "创建者还没有添加任何店铺。"
              }
              showActions={permissions.canEditPlaces}
            >
              <button
                onClick={() => setAddSheetVisible(true)}
                className="px-6 h-11 text-[12px] tracking-[0.2em]"
                style={{
                  background: color.espresso,
                  color: color.paper,
                  fontFamily: fontFamily.serif,
                }}
              >
                添 加 店 铺
              </button>
            </RetroPageStateCard>
          </div>
        )}

        {effectiveState === "ready" && permissions.canEditPlaces && (
          <RetroFloatingActionButton
            label="添加店铺"
            onClick={() => setAddSheetVisible(true)}
          />
        )}

        <RetroAddStoreSheet
          visible={addSheetVisible}
          onClose={() => setAddSheetVisible(false)}
          onSubmitted={(form) => {
            const newStore: StoreCard = {
              id: Date.now(),
              name: form.name,
              address: form.address,
              coverImage: "",
              cuisine: "新增",
              rating: 0,
              distance: "—",
              description: form.reason || "暂无推荐理由。",
              dishes: form.dishes,
              contributor: "由 你 添加",
              featured: false,
              bgTone: "cream",
            };
            setStores((prev) => [...prev, newStore]);
          }}
        />

        <RetroActionSheet
          visible={collectionActionSheetVisible}
          title="合集管理"
          items={buildCollectionActionSheetItems()}
          onAction={handleCollectionAction}
          onCancel={() => setCollectionActionSheetVisible(false)}
        />

        <RetroActionSheet
          visible={!!actionTarget}
          title={actionTarget?.name}
          items={buildStoreActionSheetItems()}
          onAction={handleStoreAction}
          onCancel={() => setActionTarget(null)}
        />

        <RetroEditStoreSheet
          visible={!!editTarget}
          target={
            editTarget
              ? {
                  storeId: editTarget.id,
                  storeName: editTarget.name,
                  storeAddressDisplay: editTarget.address,
                  reason: editTarget.description,
                  dishes: editTarget.dishes,
                }
              : null
          }
          onClose={() => setEditTarget(null)}
          onSubmitted={(storeId, form) => {
            setStores((prev) =>
              prev.map((s) =>
                s.id === storeId
                  ? { ...s, description: form.reason, dishes: form.dishes }
                  : s,
              ),
            );
          }}
        />
      </div>
    </div>
  );
}

export default AppCollectionDetail;
