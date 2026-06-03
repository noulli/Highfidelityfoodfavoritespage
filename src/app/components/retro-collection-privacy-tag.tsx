import { Lock, Globe } from "lucide-react";

interface Props {
  privacy: "public" | "private";
}

export function RetroCollectionPrivacyTag({ privacy }: Props) {
  const isPrivate = privacy === "private";
  const Icon = isPrivate ? Lock : Globe;
  const label = isPrivate ? "私密合集" : "公开合集";
  return (
    <span className="inline-flex items-center gap-1 px-2 py-1 rounded-full bg-neutral-100 text-xs text-neutral-500">
      <Icon className="size-3" strokeWidth={2} />
      {label}
    </span>
  );
}
