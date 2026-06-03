import { ReactNode, useEffect } from "react";
import { ChevronLeft, X } from "lucide-react";
import { color, ink, fontFamily, typography, shadow } from "../tokens";

interface Props {
  visible: boolean;
  title: string;
  subtitle?: string;
  showHeaderDivider?: boolean;
  showFooterDivider?: boolean;
  showBack?: boolean;
  backDisabled?: boolean;
  submitText: string;
  submitDisabled?: boolean;
  submitLoading?: boolean;
  closeDisabled?: boolean;
  panelBackground?: string;
  onClose?: () => void;
  onBack?: () => void;
  onSubmit?: () => void;
  children?: ReactNode;
}

export function RetroFormSheet({
  visible,
  title,
  subtitle,
  showHeaderDivider = true,
  showFooterDivider = true,
  showBack,
  backDisabled,
  submitText,
  submitDisabled,
  submitLoading,
  closeDisabled,
  panelBackground,
  onClose,
  onBack,
  onSubmit,
  children,
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
        onClick={() => !closeDisabled && onClose?.()}
        className="absolute inset-0"
        style={{ background: "rgba(43,31,26,0.45)" }}
      />

      <div
        className="relative w-full max-w-[480px] flex flex-col"
        style={{
          background: panelBackground ?? color.paper,
          color: color.espresso,
          maxHeight: "88vh",
          borderTopLeftRadius: 20,
          borderTopRightRadius: 20,
          boxShadow: shadow.fab,
          animation: "retro-sheet-up 220ms ease-out",
        }}
      >
        <style>{`@keyframes retro-sheet-up { from { transform: translateY(8%); opacity: 0 } to { transform: none; opacity: 1 } }`}</style>

        <div className="pt-3 pb-2 flex justify-center">
          <div
            className="h-1 w-10 rounded-full"
            style={{ background: ink.edge }}
          />
        </div>

        <div className="px-5 pt-2 pb-3">
          <div className="relative flex items-center min-h-9">
            {showBack && (
              <button
                onClick={() => !backDisabled && onBack?.()}
                disabled={backDisabled}
                aria-label="返回上一步"
                className="absolute left-0 size-9 -ml-2 flex items-center justify-center"
                style={{ color: backDisabled ? color.muted : color.espresso }}
              >
                <ChevronLeft className="size-5" strokeWidth={1.5} />
              </button>
            )}
            <h2
              style={{
                ...typography.sectionTitle,
                fontSize: 17,
                letterSpacing: "0.15em",
                marginLeft: showBack ? 32 : 0,
              }}
            >
              {title}
            </h2>
            <button
              onClick={() => !closeDisabled && onClose?.()}
              disabled={closeDisabled}
              aria-label="关闭"
              className="absolute right-0 size-9 -mr-2 flex items-center justify-center"
              style={{ color: color.espresso }}
            >
              <X className="size-5" strokeWidth={1.5} />
            </button>
          </div>
          {subtitle && (
            <p className="mt-1.5 text-[12px]" style={{ color: color.muted }}>
              {subtitle}
            </p>
          )}
        </div>

        {showHeaderDivider && (
          <div className="mx-5 h-px" style={{ background: ink.rule }} />
        )}

        <div className="flex-1 overflow-y-auto px-5 py-5">{children}</div>

        {showFooterDivider && (
          <div className="mx-5 h-px" style={{ background: ink.rule }} />
        )}

        <div className="px-5 pt-4 pb-6">
          <button
            onClick={() => !submitDisabled && !submitLoading && onSubmit?.()}
            disabled={submitDisabled || submitLoading}
            className="w-full h-12 inline-flex items-center justify-center text-[13px] tracking-[0.3em] rounded-full transition-opacity"
            style={{
              background: color.espresso,
              color: color.paper,
              fontFamily: fontFamily.serif,
              opacity: submitDisabled || submitLoading ? 0.4 : 1,
            }}
          >
            {submitLoading ? "提 交 中..." : submitText}
          </button>
        </div>
      </div>
    </div>
  );
}
