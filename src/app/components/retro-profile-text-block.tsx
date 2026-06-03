interface Props {
  nickname: string;
  bio?: string;
  headingLevel?: "h2" | "h3";
}

export function RetroProfileTextBlock({ nickname, bio, headingLevel = "h2" }: Props) {
  const Heading = headingLevel;
  return (
    <div className="flex-1 min-w-0">
      <Heading className="text-[22px] font-semibold text-neutral-900 truncate">
        {nickname}
      </Heading>
      {bio && (
        <p className="mt-1 text-sm text-neutral-500 leading-snug">{bio}</p>
      )}
    </div>
  );
}
