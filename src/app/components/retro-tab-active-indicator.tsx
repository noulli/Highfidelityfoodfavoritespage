interface Props {
  active: boolean;
}

export function RetroTabActiveIndicator({ active }: Props) {
  if (!active) return null;
  return <div className="mx-auto mt-1 h-[2px] w-6 bg-neutral-700 rounded-full" />;
}
