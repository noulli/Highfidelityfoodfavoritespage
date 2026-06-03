import { LucideIcon } from "lucide-react";

interface Props {
  icon: LucideIcon;
  onClick?: () => void;
  ariaLabel?: string;
}

export function RetroTopBarIconButton({ icon: Icon, onClick, ariaLabel }: Props) {
  return (
    <button
      onClick={onClick}
      aria-label={ariaLabel}
      className="inline-flex items-center justify-center size-10 rounded-full text-neutral-700 hover:bg-neutral-100 active:bg-neutral-200 transition-colors"
    >
      <Icon className="size-6" strokeWidth={1.5} />
    </button>
  );
}
