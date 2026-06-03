interface Props {
  label: string;
  selected: boolean;
  onClick?: () => void;
}

export function RetroTabPillButton({ label, selected, onClick }: Props) {
  return (
    <button
      onClick={onClick}
      className={`relative px-5 py-1.5 rounded-full text-sm transition-colors ${
        selected
          ? "bg-neutral-400/80 text-white"
          : "bg-transparent text-neutral-500 hover:text-neutral-700"
      }`}
    >
      {label}
    </button>
  );
}
