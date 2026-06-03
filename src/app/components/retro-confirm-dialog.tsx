import { useEffect } from "react";
import { color, ink, fontFamily, typography, shadow } from "../tokens";

interface Props {
  visible: boolean;
  title: string;
  content: string;
  confirmText?: string;
  cancelText?: string;
  danger?: boolean;
  onConfirm: () => void;
  onCancel: () => void;
}

export function RetroConfirmDialog({
  visible,
  title,
  content,
  confirmText = "确定",
  cancelText = "取消",
  danger,
  onConfirm,
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
    <div className="fixed inset-0 z-[55] flex items-center justify-center px-6">
      <button
        aria-label="关闭"
        onClick={onCancel}
        className="absolute inset-0"
        style={{ background: "rgba(43,31,26,0.45)" }}
      />
      <div
        className="relative w-full max-w-[320px] overflow-hidden"
        style={{
          background: color.paper,
          borderRadius: 12,
          boxShadow: shadow.fab,
        }}
      >
        <div className="px-6 pt-6 pb-2 text-center">
          <h3 style={{ ...typography.sectionTitle, fontSize: 17 }}>{title}</h3>
        </div>
        <div
          className="px-6 pt-1 pb-5 text-center text-[13px] leading-relaxed"
          style={{ color: color.muted }}
        >
          {content}
        </div>
        <div
          className="grid grid-cols-2"
          style={{ borderTop: `1px solid ${ink.rule}` }}
        >
          <button
            onClick={onCancel}
            className="h-12 text-[14px]"
            style={{
              color: color.espresso,
              fontFamily: fontFamily.serif,
              borderRight: `1px solid ${ink.rule}`,
            }}
          >
            {cancelText}
          </button>
          <button
            onClick={onConfirm}
            className="h-12 text-[14px]"
            style={{
              color: danger ? color.tomato : color.espresso,
              fontFamily: fontFamily.serif,
            }}
          >
            {confirmText}
          </button>
        </div>
      </div>
    </div>
  );
}
