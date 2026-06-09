import { useEffect, useMemo, useState } from "react";
import { MapPin, Globe, Lock, ChevronRight, Search } from "lucide-react";
import { RetroFormSheet } from "./retro-form-sheet";
import { color, ink, fontFamily, typography } from "../tokens";

export type Visibility = "public" | "private";

export interface CollectionFormValue {
  title: string;
  cityCode: string;
  cityLabel: string;
  summary: string;
  visibility: Visibility;
}

interface Props {
  visible: boolean;
  mode: "create" | "edit";
  initial?: Partial<CollectionFormValue>;
  cityOptions: { code: string; label: string }[];
  onClose: () => void;
  onSubmitted: (form: CollectionFormValue) => void;
}

const EMPTY: CollectionFormValue = {
  title: "",
  cityCode: "",
  cityLabel: "",
  summary: "",
  visibility: "public",
};

const TITLE_MAX = 30;
const SUMMARY_MAX = 200;
type SheetView = "form" | "city";

export function RetroCollectionFormSheet({
  visible,
  mode,
  initial,
  cityOptions,
  onClose,
  onSubmitted,
}: Props) {
  const [form, setForm] = useState<CollectionFormValue>(EMPTY);
  const [errors, setErrors] = useState<{ title?: string; cityCode?: string }>(
    {},
  );
  const [loading, setLoading] = useState(false);
  const [activeView, setActiveView] = useState<SheetView>("form");
  const [cityQuery, setCityQuery] = useState("");

  useEffect(() => {
    if (visible) {
      setForm({ ...EMPTY, ...initial });
      setErrors({});
      setLoading(false);
      setActiveView("form");
      setCityQuery("");
    }
  }, [visible, initial]);

  const validate = () => {
    const next: typeof errors = {};
    if (!form.title.trim()) next.title = "请输入合集标题";
    if (!form.cityCode) next.cityCode = "请选择城市";
    setErrors(next);
    return Object.keys(next).length === 0;
  };

  const handleSubmit = () => {
    if (!validate()) return;
    setLoading(true);
    setTimeout(() => {
      onSubmitted(form);
      setLoading(false);
      onClose();
    }, 400);
  };

  const isEdit = mode === "edit";
  const submitText = isEdit ? "保 存 修 改" : "创 建 合 集";
  const summaryLen = form.summary.length;
  const normalizedCityQuery = cityQuery.trim().toLowerCase();
  const cityResults = useMemo(
    () =>
      normalizedCityQuery
        ? cityOptions.filter((opt) =>
            opt.label.toLowerCase().includes(normalizedCityQuery),
          )
        : cityOptions,
    [cityOptions, normalizedCityQuery],
  );

  const pickCity = (opt: { code: string; label: string }) => {
    setForm((f) => ({ ...f, cityCode: opt.code, cityLabel: opt.label }));
    setErrors((e) => ({ ...e, cityCode: undefined }));
    setCityQuery("");
    setActiveView("form");
  };

  return (
    <RetroFormSheet
      visible={visible}
      title={activeView === "city" ? "城市筛选" : isEdit ? "编辑合集" : "新建合集"}
      showHeaderDivider={activeView === "city"}
      showFooter={activeView === "form"}
      showBack={activeView === "city"}
      backLabel="返回新建合集表单"
      titleAlign={activeView === "city" ? "center" : "left"}
      submitText={submitText}
      submitLoading={loading}
      closeDisabled={loading}
      onBack={() => setActiveView("form")}
      onClose={onClose}
      onSubmit={handleSubmit}
    >
      {activeView === "city" ? (
        <CityPickerDrillIn
          query={cityQuery}
          options={cityResults}
          onQueryChange={setCityQuery}
          onPick={pickCity}
        />
      ) : (
        <>
          <FieldLabel required>标题</FieldLabel>
          <input
            value={form.title}
            maxLength={TITLE_MAX}
            onChange={(e) => setForm((f) => ({ ...f, title: e.target.value }))}
            placeholder="给合集起个名字"
            className="mt-2 w-full h-11 px-3 text-[13px] outline-none rounded focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2"
            style={{
              border: `1px solid ${errors.title ? color.tomato : ink.edge}`,
              background: color.paper,
              color: color.espresso,
              outlineColor: color.espresso,
            }}
          />
          {errors.title && (
            <p className="mt-1.5 text-[12px]" style={{ color: color.tomato }}>
              {errors.title}
            </p>
          )}

          <div className="mt-5">
            <FieldLabel required>城市</FieldLabel>
            {isEdit ? (
              <div
                className="mt-2 w-full h-11 px-3 inline-flex items-center gap-2 rounded text-[13px]"
                style={{
                  border: `1px solid ${ink.rule}`,
                  background: ink.chip,
                  color: color.mutedText,
                }}
              >
                <MapPin className="size-4" strokeWidth={1.5} />
                {form.cityLabel || "—"}
              </div>
            ) : (
              <button
                aria-label="选择城市"
                onClick={() => setActiveView("city")}
                className="mt-2 w-full h-11 px-3 inline-flex items-center justify-between gap-2 rounded text-[13px] text-left focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2"
                style={{
                  border: `1px solid ${errors.cityCode ? color.tomato : ink.edge}`,
                  background: color.paper,
                  color: form.cityLabel ? color.espresso : color.mutedText,
                  outlineColor: color.espresso,
                }}
              >
                <span className="min-w-0 inline-flex items-center gap-2">
                  <MapPin className="size-4 shrink-0" strokeWidth={1.5} />
                  <span className="truncate">
                    {form.cityLabel || "请选择所属城市"}
                  </span>
                </span>
                <ChevronRight
                  className="size-4 shrink-0"
                  strokeWidth={1.5}
                  style={{ color: color.mutedText }}
                  aria-hidden
                />
              </button>
            )}
            {errors.cityCode && (
              <p className="mt-1.5 text-[12px]" style={{ color: color.tomato }}>
                {errors.cityCode}
              </p>
            )}
          </div>

          <div className="mt-5">
            <div className="flex items-baseline gap-2">
              <FieldLabel>简介</FieldLabel>
              <span className="text-[11px]" style={{ color: color.muted }}>
                {summaryLen}/{SUMMARY_MAX}
              </span>
            </div>
            <textarea
              value={form.summary}
              maxLength={SUMMARY_MAX}
              onChange={(e) =>
                setForm((f) => ({ ...f, summary: e.target.value }))
              }
              placeholder="简单介绍一下这个合集"
              className="mt-2 w-full px-3 py-3 text-[13px] outline-none resize-none rounded focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2"
              style={{
                border: `1px solid ${ink.edge}`,
                background: color.paper,
                color: color.espresso,
                minHeight: 110,
                lineHeight: 1.6,
                fontFamily: fontFamily.serif,
                outlineColor: color.espresso,
              }}
            />
          </div>

          <div className="mt-5">
            <FieldLabel>可见性</FieldLabel>
            <div className="mt-2 grid grid-cols-2 gap-2">
              <VisibilityOption
                icon={<Globe className="size-4" strokeWidth={1.5} />}
                label="公开"
                description="所有人都可以查看"
                accent={color.sage}
                selected={form.visibility === "public"}
                onClick={() => setForm((f) => ({ ...f, visibility: "public" }))}
              />
              <VisibilityOption
                icon={<Lock className="size-4" strokeWidth={1.5} />}
                label="私密"
                description="仅自己可见"
                accent={color.espresso}
                selected={form.visibility === "private"}
                onClick={() => setForm((f) => ({ ...f, visibility: "private" }))}
              />
            </div>
          </div>
        </>
      )}
    </RetroFormSheet>
  );
}

function FieldLabel({
  children,
  required,
}: {
  children: React.ReactNode;
  required?: boolean;
}) {
  return (
    <div
      className="inline-flex items-baseline gap-1 text-[12px] tracking-[0.2em]"
      style={{ color: color.espresso, fontFamily: fontFamily.serif }}
    >
      {children}
      {required && <span style={{ color: color.tomato }}>*</span>}
    </div>
  );
}

function VisibilityOption({
  icon,
  label,
  description,
  accent,
  selected,
  onClick,
}: {
  icon: React.ReactNode;
  label: string;
  description: string;
  accent: string;
  selected: boolean;
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className="flex flex-col items-start gap-1.5 p-3 rounded text-left transition-colors"
      style={{
        border: `1px solid ${selected ? accent : ink.edge}`,
        background: selected ? `${accent}10` : color.paper,
      }}
    >
      <div
        className="inline-flex items-center gap-1.5 text-[13px]"
        style={{
          color: selected ? accent : color.espresso,
          fontFamily: fontFamily.serif,
        }}
      >
        {icon}
        {label}
      </div>
      <div className="text-[11px]" style={{ color: color.muted }}>
        {description}
      </div>
    </button>
  );
}

function CityPickerDrillIn({
  query,
  options,
  onQueryChange,
  onPick,
}: {
  query: string;
  options: { code: string; label: string }[];
  onQueryChange: (query: string) => void;
  onPick: (opt: { code: string; label: string }) => void;
}) {
  return (
    <div className="-mx-5 -my-5">
      <div className="px-5 py-4">
        <div
          className="h-11 px-4 inline-flex w-full items-center gap-2 rounded-full"
          style={{
            border: `1px solid ${ink.rule}`,
            background: color.cardSurface,
            color: color.mutedText,
          }}
        >
          <Search className="size-4 shrink-0" strokeWidth={1.5} aria-hidden />
          <input
            value={query}
            onChange={(e) => onQueryChange(e.target.value)}
            placeholder="搜索城市或区县"
            className="min-w-0 flex-1 bg-transparent text-[13px] outline-none"
            style={{ color: color.espresso }}
            autoFocus
          />
        </div>
      </div>

      <div
        className="h-px"
        style={{
          background: `linear-gradient(to right, transparent, ${ink.rule}, transparent)`,
        }}
      />

      <div className="px-5 pt-5 pb-8">
        <div className="mb-3 flex items-center gap-2">
          <span
            className="size-1.5 rounded-full"
            style={{ background: color.tomato }}
            aria-hidden
          />
          <div className="text-[13px]" style={{ color: color.mutedText }}>
            {query.trim() ? "搜索结果" : "热门城市"}
          </div>
        </div>

        {options.length > 0 ? (
          <div className="grid grid-cols-3 gap-2.5">
            {options.map((opt) => (
              <button
                key={opt.code}
                onClick={() => onPick(opt)}
                className="h-[42px] min-w-0 rounded-lg px-2 text-[14px] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2"
                style={{
                  border: `1px solid ${ink.rule}`,
                  background: color.paper,
                  color: color.espresso,
                  fontFamily: fontFamily.serif,
                  outlineColor: color.espresso,
                }}
              >
                <span className="block truncate">{opt.label}</span>
              </button>
            ))}
          </div>
        ) : (
          <div
            className="flex min-h-32 items-center justify-center text-[13px]"
            style={{ color: color.mutedText }}
          >
            没有找到相关城市
          </div>
        )}
      </div>
    </div>
  );
}
