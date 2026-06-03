import { useEffect } from "react";
import { color, ink, fontFamily, typography, shadow } from "../tokens";

export interface ActionSheetItem {
  action: string;
  label: string;
  danger?: boolean;
}

interface Props {
  visible: boolean;
  title?: string;
  items: ActionSheetItem[];
  cancelText?: string;
  onAction?: (action: string) => void;
  onCancel?: () => void;
}

export function RetroActionSheet({
  visible,
  title,
  items,
  cancelText = "取消",
  onAction,
  onCancel,
}: Props) {
  useEffect(() => {
    if (!visible) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [visible]);

  if (!visible) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center">
      <button
        aria-label="关闭"
        onClick={onCancel}
        className="absolute inset-0"
        style={{ background: "rgba(43,31,26,0.45)" }}
      />

      <div
        className="relative w-full max-w-[480px] px-3 pb-4"
        style={{
          animation: "retro-sheet-up 200ms ease-out",
        }}
      >
        <style>{`@keyframes retro-sheet-up { from { transform: translateY(10%); opacity: 0 } to { transform: none; opacity: 1 } }`}</style>

        <div
          className="rounded-2xl overflow-hidden"
          style={{
            background: color.paper,
            boxShadow: shadow.fab,
          }}
        >
          {title && (
            <div
              className="px-5 py-3 text-center"
              style={{
                ...typography.meta,
                fontFamily: fontFamily.serif,
                borderBottom: `1px solid ${ink.rule}`,
              }}
            >
              {title}
            </div>
          )}

          {items.map((item, idx) => (
            <button
              key={item.action}
              onClick={() => onAction?.(item.action)}
              className="w-full h-14 text-[15px] flex items-center justify-center transition-colors"
              style={{
                color: item.danger ? color.tomato : color.espresso,
                fontFamily: fontFamily.serif,
                borderTop: idx === 0 && !title ? "none" : `1px solid ${ink.hairline}`,
              }}
            >
              {item.label}
            </button>
          ))}
        </div>

        <button
          onClick={onCancel}
          className="mt-2 w-full h-14 rounded-2xl text-[15px]"
          style={{
            background: color.paper,
            color: color.espresso,
            fontFamily: fontFamily.serif,
            boxShadow: shadow.card,
          }}
        >
          {cancelText}
        </button>
      </div>
    </div>
  );
}
