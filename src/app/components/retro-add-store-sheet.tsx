import { useEffect, useId, useState, type ReactNode } from "react";
import { AlertCircle, CheckCircle2, Lightbulb, MapPin } from "lucide-react";
import { RetroFormSheet } from "./retro-form-sheet";
import { RetroDishTags } from "./retro-dish-tags";
import { color, ink, fontFamily, typography } from "../tokens";

type Step = "link" | "detail";

interface ParsedStore {
  name: string;
  address: string;
}

interface AddForm {
  rawInput: string;
  name: string;
  address: string;
  reason: string;
  dishes: string[];
}

interface Props {
  visible: boolean;
  onClose: () => void;
  onSubmitted?: (form: AddForm) => void;
}

const INITIAL: AddForm = {
  rawInput: "",
  name: "",
  address: "",
  reason: "",
  dishes: [],
};

const parseLink = (raw: string): ParsedStore | null => {
  if (!raw.trim()) return null;
  // mock parser: in real app calls API to extract store info
  return {
    name: "肉本家·炭烤肉(下沙宝龙店)",
    address: "25号大街宝龙广场二期31幢106号(25号大街与学林街交叉口南30米路东)",
  };
};

export function RetroAddStoreSheet({ visible, onClose, onSubmitted }: Props) {
  const linkInputId = useId();
  const reasonInputId = useId();
  const nameInputId = useId();
  const addressInputId = useId();
  const [step, setStep] = useState<Step>("link");
  const [form, setForm] = useState<AddForm>(INITIAL);
  const [error, setError] = useState<string>("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (visible) return;
    reset();
  }, [visible]);

  const reset = () => {
    setStep("link");
    setForm(INITIAL);
    setError("");
    setLoading(false);
  };

  const handleClose = () => {
    reset();
    onClose();
  };

  const updateForm = <K extends keyof AddForm>(key: K, value: AddForm[K]) => {
    setForm((f) => ({ ...f, [key]: value }));
    if (error) setError("");
  };

  const handleParse = () => {
    setError("");
    const parsed = parseLink(form.rawInput);
    if (!parsed) {
      setError("请粘贴有效的点评链接");
      return;
    }
    setLoading(true);
    setTimeout(() => {
      setForm((f) => ({ ...f, name: parsed.name, address: parsed.address }));
      setStep("detail");
      setLoading(false);
    }, 400);
  };

  const handleSubmit = () => {
    if (!form.name.trim()) {
      setError("请填写店铺名称");
      return;
    }
    if (!form.address.trim()) {
      setError("请填写店铺地址");
      return;
    }
    setError("");
    setLoading(true);
    setTimeout(() => {
      onSubmitted?.(form);
      reset();
      onClose();
    }, 400);
  };

  if (step === "link") {
    return (
      <RetroFormSheet
        visible={visible}
        title="添加店铺"
        subtitle="粘贴餐厅分享链接，先识别店铺信息，再补充你的推荐。"
        submitText="解 析 并 继 续"
        submitDisabled={!form.rawInput.trim() || loading}
        submitLoading={loading}
        closeDisabled={loading}
        onClose={handleClose}
        onSubmit={handleParse}
      >
        <FieldCss />
        <FieldLabel htmlFor={linkInputId}>粘贴点评链接</FieldLabel>
        <textarea
          id={linkInputId}
          value={form.rawInput}
          onChange={(e) => updateForm("rawInput", e.target.value)}
          disabled={loading}
          aria-invalid={Boolean(error)}
          aria-describedby={error ? `${linkInputId}-error` : `${linkInputId}-hint`}
          placeholder="将点评里的餐厅链接粘贴到这里"
          className="retro-add-store-field mt-2 w-full resize-none rounded px-3 py-3 text-[13px] outline-none transition duration-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 disabled:cursor-not-allowed disabled:opacity-60"
          style={{
            border: `1px solid ${ink.edge}`,
            background: color.paper,
            color: color.espresso,
            minHeight: 140,
            lineHeight: 1.6,
            outlineColor: color.espresso,
          }}
        />

        {error && (
          <InlineMessage id={`${linkInputId}-error`} tone="error">
            {error}
          </InlineMessage>
        )}

        <HelpPanel id={`${linkInputId}-hint`}>
          打开点评 App，找到想添加的餐厅，点击“分享”并复制链接到这里。
        </HelpPanel>
      </RetroFormSheet>
    );
  }

  return (
    <RetroFormSheet
      visible={visible}
      title="店铺详情"
      subtitle="确认识别结果，补上推荐理由和招牌菜。"
      showBack
      backDisabled={loading}
      submitText="提 交 添 加"
      submitDisabled={!form.name.trim() || !form.address.trim() || loading}
      submitLoading={loading}
      closeDisabled={loading}
      onClose={handleClose}
      onBack={() => setStep("link")}
      onSubmit={handleSubmit}
    >
      <FieldCss />
      <div
        className="flex items-start gap-3 rounded-lg border p-3"
        style={{ borderColor: ink.rule, background: color.cardSurface }}
      >
        <div
          className="flex size-10 shrink-0 items-center justify-center rounded-full"
          style={{ background: `${color.sage}18`, color: color.sageText }}
        >
          <MapPin className="size-5" strokeWidth={1.6} />
        </div>
        <div className="flex-1 min-w-0">
          <div className="break-words" style={{ ...typography.cardTitle, fontSize: 17 }}>
            {form.name || "未识别到店铺名称"}
          </div>
          <div
            className="mt-1 text-[12px] leading-relaxed"
            style={{ color: color.mutedText }}
          >
            {form.address || "未识别到地址"}
          </div>
          {form.name && form.address && (
            <div
              className="mt-2 inline-flex h-7 items-center gap-1.5 rounded-full border px-2.5 text-[11px]"
              style={{
                background: `${color.sage}14`,
                borderColor: `${color.sage}40`,
                color: color.sageText,
                fontFamily: fontFamily.serif,
                letterSpacing: "0.06em",
              }}
            >
              <CheckCircle2 className="size-3.5" strokeWidth={1.8} />
              已识别
            </div>
          )}
        </div>
      </div>

      {!form.name && (
        <Field
          label="店铺名称"
          id={nameInputId}
          value={form.name}
          placeholder="请输入店铺名称"
          error={error.includes("店铺名称") ? error : ""}
          disabled={loading}
          onChange={(v) => updateForm("name", v)}
        />
      )}

      {!form.address && (
        <Field
          label="店铺地址"
          id={addressInputId}
          value={form.address}
          placeholder="请输入店铺地址"
          error={error.includes("店铺地址") ? error : ""}
          disabled={loading}
          onChange={(v) => updateForm("address", v)}
        />
      )}

      <div className="mt-5">
        <FieldLabel htmlFor={reasonInputId}>推荐理由（可选）</FieldLabel>
        <textarea
          id={reasonInputId}
          value={form.reason}
          onChange={(e) => updateForm("reason", e.target.value)}
          disabled={loading}
          placeholder="写下你会推荐它的具体原因"
          className="retro-add-store-field mt-2 w-full resize-none rounded px-3 py-3 text-[13px] outline-none transition duration-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 disabled:cursor-not-allowed disabled:opacity-60"
          style={{
            border: `1px solid ${ink.edge}`,
            background: color.paper,
            color: color.espresso,
            minHeight: 100,
            lineHeight: 1.6,
            fontFamily: fontFamily.serif,
            outlineColor: color.espresso,
          }}
        />
      </div>

      <div className="mt-5">
        <FieldLabel>推荐菜</FieldLabel>
        <div className="mt-2">
          <RetroDishTags
            dishes={form.dishes}
            onChange={(dishes) => setForm((f) => ({ ...f, dishes }))}
          />
        </div>
      </div>

      {error && !error.includes("店铺名称") && !error.includes("店铺地址") && (
        <InlineMessage tone="error">
          {error}
        </InlineMessage>
      )}
    </RetroFormSheet>
  );
}

function FieldCss() {
  return (
    <style>{`
      .retro-add-store-field::placeholder {
        color: ${color.mutedText};
        opacity: 1;
      }
    `}</style>
  );
}

function FieldLabel({ children, htmlFor }: { children: ReactNode; htmlFor?: string }) {
  const labelStyle = {
    color: color.espresso,
    fontFamily: fontFamily.serif,
  };

  if (htmlFor) {
    return (
      <label htmlFor={htmlFor} className="text-[12px] tracking-[0.18em]" style={labelStyle}>
        {children}
      </label>
    );
  }

  return (
    <div className="text-[12px] tracking-[0.18em]" style={labelStyle}>
      {children}
    </div>
  );
}

function HelpPanel({ children, id }: { children: ReactNode; id?: string }) {
  return (
    <div
      id={id}
      className="mt-5 flex items-start gap-2 rounded-lg border p-3 text-[12px] leading-relaxed"
      style={{ background: ink.chip, borderColor: ink.hairline, color: color.espresso }}
    >
      <Lightbulb
        className="mt-0.5 size-4 shrink-0"
        strokeWidth={1.6}
        style={{ color: color.sageText }}
      />
      <span>{children}</span>
    </div>
  );
}

function InlineMessage({
  children,
  id,
  tone,
}: {
  children: ReactNode;
  id?: string;
  tone: "error";
}) {
  return (
    <p
      id={id}
      role="alert"
      className="mt-2 flex items-start gap-1.5 text-[12px] leading-relaxed"
      style={{ color: tone === "error" ? color.tomatoText : color.mutedText }}
    >
      <AlertCircle className="mt-0.5 size-3.5 shrink-0" strokeWidth={1.8} />
      <span>{children}</span>
    </p>
  );
}

function Field({
  label,
  id,
  value,
  placeholder,
  error,
  disabled,
  onChange,
}: {
  label: string;
  id: string;
  value: string;
  placeholder?: string;
  error?: string;
  disabled?: boolean;
  onChange: (v: string) => void;
}) {
  return (
    <div className="mt-5">
      <FieldLabel htmlFor={id}>{label}</FieldLabel>
      <input
        id={id}
        value={value}
        disabled={disabled}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        aria-invalid={Boolean(error)}
        aria-describedby={error ? `${id}-error` : undefined}
        className="retro-add-store-field mt-2 h-11 w-full rounded px-3 text-[13px] outline-none transition duration-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 disabled:cursor-not-allowed disabled:opacity-60"
        style={{
          border: `1px solid ${error ? color.tomatoText : ink.edge}`,
          background: color.paper,
          color: color.espresso,
          outlineColor: error ? color.tomatoText : color.espresso,
        }}
      />
      {error && (
        <InlineMessage id={`${id}-error`} tone="error">
          {error}
        </InlineMessage>
      )}
    </div>
  );
}
