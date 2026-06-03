import { useState } from "react";
import { MapPin, Lightbulb } from "lucide-react";
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
  const [step, setStep] = useState<Step>("link");
  const [form, setForm] = useState<AddForm>(INITIAL);
  const [error, setError] = useState<string>("");
  const [loading, setLoading] = useState(false);

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
        submitText="解 析 并 继 续"
        submitDisabled={!form.rawInput.trim()}
        submitLoading={loading}
        onClose={handleClose}
        onSubmit={handleParse}
      >
        <FieldLabel>粘贴点评链接</FieldLabel>
        <textarea
          value={form.rawInput}
          onChange={(e) =>
            setForm((f) => ({ ...f, rawInput: e.target.value }))
          }
          placeholder="将点评里的餐厅链接粘贴到这里..."
          className="mt-2 w-full px-3 py-3 text-[13px] outline-none resize-none rounded"
          style={{
            border: `1px solid ${ink.edge}`,
            background: color.paper,
            color: color.espresso,
            minHeight: 140,
            lineHeight: 1.6,
          }}
        />

        {error && (
          <p className="mt-2 text-[12px]" style={{ color: color.tomato }}>
            {error}
          </p>
        )}

        <div
          className="mt-5 p-3 rounded flex items-start gap-2 text-[12px] leading-relaxed"
          style={{ background: ink.chip, color: color.espresso }}
        >
          <Lightbulb
            className="size-4 shrink-0 mt-0.5"
            strokeWidth={1.5}
            style={{ color: color.sage }}
          />
          <span>
            打开点评 App,找到想添加的餐厅,点击"分享"并复制链接到这里。
          </span>
        </div>
      </RetroFormSheet>
    );
  }

  return (
    <RetroFormSheet
      visible={visible}
      title="店铺详情"
      showBack
      backDisabled={loading}
      submitText="提 交 添 加"
      submitLoading={loading}
      onClose={handleClose}
      onBack={() => setStep("link")}
      onSubmit={handleSubmit}
    >
      <div
        className="flex items-start gap-3 p-3 rounded"
        style={{ border: `1px solid ${ink.rule}`, background: ink.chip }}
      >
        <div
          className="shrink-0 size-10 rounded-full flex items-center justify-center"
          style={{ background: color.warmFill }}
        >
          <MapPin
            className="size-5"
            strokeWidth={1.5}
            style={{ color: color.espresso }}
          />
        </div>
        <div className="flex-1 min-w-0">
          <div style={typography.cardTitle}>
            {form.name || "未识别到店铺名称"}
          </div>
          <div
            className="mt-1 text-[12px] leading-snug"
            style={{ color: color.muted }}
          >
            {form.address || "未识别到地址"}
          </div>
        </div>
      </div>

      {!form.name && (
        <Field
          label="店铺名称"
          value={form.name}
          placeholder="请输入店铺名称"
          onChange={(v) => setForm((f) => ({ ...f, name: v }))}
        />
      )}

      {!form.address && (
        <Field
          label="店铺地址"
          value={form.address}
          placeholder="请输入店铺地址"
          onChange={(v) => setForm((f) => ({ ...f, address: v }))}
        />
      )}

      <div className="mt-5">
        <FieldLabel>推荐理由(可选)</FieldLabel>
        <textarea
          value={form.reason}
          onChange={(e) => setForm((f) => ({ ...f, reason: e.target.value }))}
          placeholder="补充推荐理由"
          className="mt-2 w-full px-3 py-3 text-[13px] outline-none resize-none rounded"
          style={{
            border: `1px solid ${ink.edge}`,
            background: color.paper,
            color: color.espresso,
            minHeight: 100,
            lineHeight: 1.6,
            fontFamily: fontFamily.serif,
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

      {error && (
        <p className="mt-4 text-[12px]" style={{ color: color.tomato }}>
          {error}
        </p>
      )}
    </RetroFormSheet>
  );
}

function FieldLabel({ children }: { children: React.ReactNode }) {
  return (
    <div
      className="text-[12px] tracking-[0.2em]"
      style={{ color: color.espresso, fontFamily: fontFamily.serif }}
    >
      {children}
    </div>
  );
}

function Field({
  label,
  value,
  placeholder,
  onChange,
}: {
  label: string;
  value: string;
  placeholder?: string;
  onChange: (v: string) => void;
}) {
  return (
    <div className="mt-5">
      <FieldLabel>{label}</FieldLabel>
      <input
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="mt-2 w-full h-11 px-3 text-[13px] outline-none rounded"
        style={{
          border: `1px solid ${ink.edge}`,
          background: color.paper,
          color: color.espresso,
        }}
      />
    </div>
  );
}
