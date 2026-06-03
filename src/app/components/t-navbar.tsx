import { ReactNode } from "react";
import { color, typography } from "../tokens";

interface Props {
  title: string;
  left?: ReactNode;
  right?: ReactNode;
}

export function TNavbar({ title, left, right }: Props) {
  return (
    <div
      className="relative flex items-center justify-between h-12 px-3"
      style={{ background: color.paper }}
    >
      <div className="flex items-center gap-1 min-w-[40px]">{left}</div>
      <h1
        className="absolute left-1/2 -translate-x-1/2"
        style={{ ...typography.navTitle, fontSize: 15, letterSpacing: "0.2em" }}
      >
        {title}
      </h1>
      <div className="flex items-center gap-1 min-w-[40px] justify-end">{right}</div>
    </div>
  );
}
