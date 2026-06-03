import { useEffect, useState } from "react";
import { MapPin, Globe, Lock } from "lucide-react";
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
  const [cityPickerOpen, setCityPickerOpen] = useState(false);

  useEffect(() => {
    if (visible) {
      setForm({ ...EMPTY, ...initial });
      setErrors({});
      setLoading(false);
      setCityPickerOpen(false);
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

  return (
    <>
      <RetroFormSheet
        visible={visible}
        title={isEdit ? "编辑合集" : "新建合集"}
        showHeaderDivider={false}
        submitText={submitText}
        submitLoading={loading}
        closeDisabled={loading}
        onClose={onClose}
        onSubmit={handleSubmit}
      >
        <FieldLabel required>标题</FieldLabel>
        <input
          value={form.title}
          maxLength={TITLE_MAX}
          onChange={(e) => setForm((f) => ({ ...f, title: e.target.value }))}
          placeholder="给合集起个名字"
          className="mt-2 w-full h-11 px-3 text-[13px] outline-none rounded"
          style={{
            border: `1px solid ${errors.title ? color.tomato : ink.edge}`,
            background: color.paper,
            color: color.espresso,
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
                color: color.muted,
              }}
            >
              <MapPin className="size-4" strokeWidth={1.5} />
              {form.cityLabel || "—"}
            </div>
          ) : (
            <button
              onClick={() => setCityPickerOpen(true)}
              className="mt-2 w-full h-11 px-3 inline-flex items-center gap-2 rounded text-[13px] text-left"
              style={{
                border: `1px solid ${errors.cityCode ? color.tomato : ink.edge}`,
                background: color.paper,
                color: form.cityLabel ? color.espresso : color.muted,
              }}
            >
              <MapPin className="size-4" strokeWidth={1.5} />
              {form.cityLabel || "请选择所属城市"}
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
            className="mt-2 w-full px-3 py-3 text-[13px] outline-none resize-none rounded"
            style={{
              border: `1px solid ${ink.edge}`,
              background: color.paper,
              color: color.espresso,
              minHeight: 110,
              lineHeight: 1.6,
              fontFamily: fontFamily.serif,
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
      </RetroFormSheet>

      <CityPickerSheet
        visible={cityPickerOpen}
        options={cityOptions}
        onClose={() => setCityPickerOpen(false)}
        onPick={(opt) => {
          setForm((f) => ({ ...f, cityCode: opt.code, cityLabel: opt.label }));
          setErrors((e) => ({ ...e, cityCode: undefined }));
          setCityPickerOpen(false);
        }}
      />
    </>
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

function CityPickerSheet({
  visible,
  options,
  onClose,
  onPick,
}: {
  visible: boolean;
  options: { code: string; label: string }[];
  onClose: () => void;
  onPick: (opt: { code: string; label: string }) => void;
}) {
  if (!visible) return null;
  return (
    <div className="fixed inset-0 z-[60] flex items-end justify-center">
      <button
        aria-label="关闭"
        onClick={onClose}
        className="absolute inset-0"
        style={{ background: "rgba(43,31,26,0.45)" }}
      />
      <div
        className="relative w-full max-w-[480px]"
        style={{
          background: color.paper,
          borderTopLeftRadius: 20,
          borderTopRightRadius: 20,
          maxHeight: "70vh",
        }}
      >
        <div className="pt-3 pb-2 flex justify-center">
          <div
            className="h-1 w-10 rounded-full"
            style={{ background: ink.edge }}
          />
        </div>
        <div
          className="px-5 py-3"
          style={{
            ...typography.sectionTitle,
            fontSize: 16,
            letterSpacing: "0.15em",
            borderBottom: `1px solid ${ink.rule}`,
          }}
        >
          选择城市
        </div>
        <div className="overflow-y-auto" style={{ maxHeight: "50vh" }}>
          {options.map((opt) => (
            <button
              key={opt.code}
              onClick={() => onPick(opt)}
              className="w-full px-5 h-12 flex items-center text-[14px]"
              style={{
                borderBottom: `1px solid ${ink.hairline}`,
                color: color.espresso,
                fontFamily: fontFamily.serif,
              }}
            >
              {opt.label}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
