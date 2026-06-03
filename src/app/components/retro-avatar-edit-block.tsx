import { Pencil, User } from "lucide-react";

interface Props {
  avatar?: string;
  fallbackInitial?: string;
  onEdit?: () => void;
}

export function RetroAvatarEditBlock({ avatar, fallbackInitial, onEdit }: Props) {
  return (
    <button
      onClick={onEdit}
      className="relative shrink-0 size-[88px] rounded-full"
      aria-label="编辑头像"
    >
      <div className="absolute inset-0 rounded-full border-2 border-neutral-200" />
      <div className="absolute inset-[6px] rounded-full bg-neutral-50 flex items-center justify-center overflow-hidden">
        {avatar ? (
          <img src={avatar} alt="" className="size-full object-cover" />
        ) : fallbackInitial ? (
          <span className="text-2xl font-medium text-neutral-700">
            {fallbackInitial}
          </span>
        ) : (
          <User className="size-10 text-neutral-400" strokeWidth={1.5} />
        )}
      </div>
      <div className="absolute -bottom-0.5 right-1 size-7 rounded-full bg-white border border-neutral-200 flex items-center justify-center shadow-sm">
        <Pencil className="size-3.5 text-neutral-600" strokeWidth={2} />
      </div>
    </button>
  );
}
