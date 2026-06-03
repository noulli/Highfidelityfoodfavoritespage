import { useEffect, useState } from "react";
import { MapPin } from "lucide-react";
import { RetroFormSheet } from "./retro-form-sheet";
import { RetroDishTags } from "./retro-dish-tags";
import { color, ink, fontFamily, typography } from "../tokens";

interface EditTarget {
  storeId: number;
  storeName: string;
  storeAddressDisplay: string;
  reason: string;
  dishes: string[];
}

interface EditForm {
  reason: string;
  dishes: string[];
}

interface Props {
  visible: boolean;
  target: EditTarget | null;
  onClose: () => void;
  onSubmitted?: (storeId: number, form: EditForm) => void;
}

export function RetroEditStoreSheet({
  visible,
  target,
  onClose,
  onSubmitted,
}: Props) {
  const [form, setForm] = useState<EditForm>({ reason: "", dishes: [] });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (target) {
      setForm({ reason: target.reason, dishes: target.dishes });
      setError("");
      setLoading(false);
    }
  }, [target]);

  const handleSubmit = () => {
    if (!target) return;
    setError("");
    setLoading(true);
    setTimeout(() => {
      onSubmitted?.(target.storeId, form);
      setLoading(false);
      onClose();
    }, 400);
  };

  return (
    <RetroFormSheet
      visible={visible && !!target}
      title="编辑店铺"
      submitText="提 交 编 辑"
      submitLoading={loading}
      onClose={onClose}
      onSubmit={handleSubmit}
    >
      {target && (
        <>
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
              <div style={typography.cardTitle}>{target.storeName}</div>
              <div
                className="mt-1 text-[12px] leading-snug"
                style={{ color: color.muted }}
              >
                {target.storeAddressDisplay}
              </div>
            </div>
          </div>

          <div className="mt-5">
            <div
              className="text-[12px] tracking-[0.2em]"
              style={{ color: color.espresso, fontFamily: fontFamily.serif }}
            >
              推荐理由
            </div>
            <textarea
              value={form.reason}
              onChange={(e) =>
                setForm((f) => ({ ...f, reason: e.target.value }))
              }
              placeholder="更新推荐理由"
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
            <div
              className="text-[12px] tracking-[0.2em]"
              style={{ color: color.espresso, fontFamily: fontFamily.serif }}
            >
              推荐菜
            </div>
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
        </>
      )}
    </RetroFormSheet>
  );
}
