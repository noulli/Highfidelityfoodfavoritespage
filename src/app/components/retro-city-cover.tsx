import { type ReactNode } from "react";
import { color, ink, fontFamily } from "../tokens";

interface Props {
  city: string;
  variant: "public" | "private";
  number?: string;
}

const STROKE = 1.25;

function ShanghaiArt({ stroke }: { stroke: string }) {
  return (
    <g
      stroke={stroke}
      fill="none"
      strokeWidth={STROKE}
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      {/* 东方明珠：天线 */}
      <line x1="43" y1="6" x2="43" y2="11" />
      {/* 顶部小球 */}
      <circle cx="43" cy="14" r="2.6" />
      {/* 上段塔身 */}
      <line x1="43" y1="17" x2="43" y2="29" />
      {/* 主球(大) */}
      <circle cx="43" cy="35.5" r="6.4" />
      {/* 中段塔身 */}
      <line x1="43" y1="42" x2="43" y2="52" />
      {/* 次球(小) */}
      <circle cx="43" cy="56" r="4" />
      {/* 下段塔身 */}
      <line x1="43" y1="60" x2="43" y2="68" />
      {/* 塔基柱 */}
      <path d="M40 68 L40 78 L46 78 L46 68" />
      {/* 地平线 */}
      <line x1="6" y1="80" x2="80" y2="80" />
      {/* 弄堂屋顶锯齿 */}
      <path d="M6 92 L14 84 L22 92 L30 84 L38 92 L46 84 L54 92 L62 84 L70 92 L78 84" />
      {/* 弄堂屋脚 */}
      <line x1="6" y1="92" x2="80" y2="92" />
    </g>
  );
}

function BeijingArt({ stroke }: { stroke: string }) {
  return (
    <g
      stroke={stroke}
      fill="none"
      strokeWidth={STROKE}
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      {/* 旗杆 + 小旗 */}
      <line x1="43" y1="8" x2="43" y2="20" />
      <path d="M43 9 L50 11 L43 13" fill={stroke} stroke="none" />
      {/* 上层飞檐 */}
      <path d="M26 28 Q43 19 60 28" />
      {/* 上层屋脊 */}
      <path d="M22 32 Q43 28 64 32" />
      {/* 中间隔层 */}
      <line x1="30" y1="35" x2="56" y2="35" />
      {/* 下层飞檐 */}
      <path d="M16 48 Q43 38 70 48" />
      {/* 下层屋脊 */}
      <path d="M14 52 Q43 48 72 52" />
      {/* 城楼墙体(梯形) */}
      <path d="M18 52 L14 88 L72 88 L68 52" />
      {/* 中央拱门 */}
      <path d="M38 88 L38 76 Q43 70 48 76 L48 88" />
      {/* 两侧小拱门 */}
      <path d="M22 88 L22 80 Q26 76 30 80 L30 88" />
      <path d="M56 88 L56 80 Q60 76 64 80 L64 88" />
      {/* 地平线 */}
      <line x1="6" y1="92" x2="80" y2="92" />
    </g>
  );
}

function GuangzhouArt({ stroke }: { stroke: string }) {
  return (
    <g
      stroke={stroke}
      fill="none"
      strokeWidth={STROKE}
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      {/* 广州塔(小蛮腰)— 天线 */}
      <line x1="43" y1="4" x2="43" y2="10" />
      {/* 顶部观光球 */}
      <ellipse cx="43" cy="14" rx="6" ry="2.4" />
      {/* 塔身双曲面 — 左 / 右 */}
      <path d="M30 12 Q44 50 28 86" />
      <path d="M56 12 Q42 50 58 86" />
      {/* 中段束腰横向格栅 */}
      <ellipse cx="42" cy="32" rx="9" ry="1.3" />
      <ellipse cx="40" cy="48" rx="5" ry="1" />
      <ellipse cx="40" cy="60" rx="5" ry="1" />
      <ellipse cx="42" cy="74" rx="8" ry="1.3" />
      {/* 地平线 */}
      <line x1="6" y1="88" x2="80" y2="88" />
      {/* 珠江水波 */}
      <path d="M8 93 Q14 91 20 93 T32 93 T44 93 T56 93 T68 93 T80 93" />
    </g>
  );
}

function ChengduArt({ stroke }: { stroke: string }) {
  return (
    <g
      stroke={stroke}
      fill="none"
      strokeWidth={STROKE}
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      {/* 熊猫头 */}
      <circle cx="42" cy="42" r="20" />
      {/* 左耳(实心) */}
      <circle cx="26" cy="28" r="5" fill={stroke} stroke="none" />
      {/* 右耳(实心) */}
      <circle cx="58" cy="28" r="5" fill={stroke} stroke="none" />
      {/* 左眼眶(实心) */}
      <ellipse cx="34" cy="42" rx="3.4" ry="5" fill={stroke} stroke="none" />
      {/* 右眼眶(实心) */}
      <ellipse cx="50" cy="42" rx="3.4" ry="5" fill={stroke} stroke="none" />
      {/* 鼻 */}
      <ellipse cx="42" cy="50" rx="1.8" ry="1.3" fill={stroke} stroke="none" />
      {/* 嘴 */}
      <path d="M38 54 Q42 56 46 54" />
      {/* 右侧竹枝 */}
      <path d="M72 84 Q74 70 73 56" />
      <path d="M73 68 Q78 66 80 60" />
      <path d="M73 60 Q68 58 64 54" />
      {/* 地平线 */}
      <line x1="6" y1="90" x2="80" y2="90" />
    </g>
  );
}

function HangzhouArt({ stroke }: { stroke: string }) {
  return (
    <g
      stroke={stroke}
      fill="none"
      strokeWidth={STROKE}
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      {/* 远山一层 */}
      <path d="M0 44 L20 30 L36 40 L52 26 L70 38 L86 30" />
      {/* 雷峰塔(山顶 3 层简笔) */}
      <line x1="52" y1="18" x2="52" y2="22" />
      <line x1="48" y1="24" x2="56" y2="24" />
      <line x1="46" y1="30" x2="58" y2="30" />
      <line x1="44" y1="36" x2="60" y2="36" />
      <line x1="49" y1="24" x2="49" y2="36" />
      <line x1="55" y1="24" x2="55" y2="36" />
      {/* 近山 */}
      <path d="M0 58 L14 50 L30 58 L46 46 L62 58 L78 50 L86 56" />
      {/* 湖面分隔 */}
      <line x1="6" y1="68" x2="80" y2="68" />
      {/* 三潭印月 */}
      <circle cx="22" cy="78" r="2.4" />
      <circle cx="42" cy="78" r="2.4" />
      <circle cx="62" cy="78" r="2.4" />
      {/* 水面波纹 */}
      <path d="M8 90 Q14 88 20 90 T32 90 T44 90 T56 90 T68 90 T80 90" />
    </g>
  );
}

function ShenzhenArt({ stroke }: { stroke: string }) {
  return (
    <g
      stroke={stroke}
      fill="none"
      strokeWidth={STROKE}
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      {/* 平安金融中心:细长四棱锥 */}
      <path d="M48 6 L54 86 L42 86 Z" />
      {/* 塔身分层 */}
      <line x1="46" y1="30" x2="51" y2="30" />
      <line x1="45" y1="48" x2="52" y2="48" />
      <line x1="44" y1="66" x2="53" y2="66" />
      {/* 配楼(右后) */}
      <path d="M60 86 L60 50 L72 50 L72 86 Z" />
      <line x1="60" y1="60" x2="72" y2="60" />
      <line x1="60" y1="70" x2="72" y2="70" />
      <line x1="60" y1="80" x2="72" y2="80" />
      <line x1="66" y1="50" x2="66" y2="86" />
      {/* 棕榈树干 */}
      <path d="M18 86 Q20 70 20 52" />
      {/* 棕榈叶(放射) */}
      <path d="M20 52 Q14 48 8 52" />
      <path d="M20 52 Q16 44 10 40" />
      <path d="M20 52 Q22 42 24 34" />
      <path d="M20 52 Q28 46 34 46" />
      <path d="M20 52 Q26 54 32 58" />
      {/* 地平线 */}
      <line x1="6" y1="88" x2="80" y2="88" />
      {/* 海面波纹 */}
      <path d="M8 92 Q14 90 20 92 T32 92 T44 92 T56 92 T68 92 T80 92" />
    </g>
  );
}

const CITY_ART: Record<string, (props: { stroke: string }) => ReactNode> = {
  上海: ShanghaiArt,
  北京: BeijingArt,
  广州: GuangzhouArt,
  成都: ChengduArt,
  杭州: HangzhouArt,
  深圳: ShenzhenArt,
};

export function RetroCityCover({ city, variant, number }: Props) {
  const bg = variant === "private" ? color.privateFill : color.publicFill;
  const Art = CITY_ART[city];

  return (
    <div
      className="relative h-full w-full overflow-hidden pointer-events-none"
      style={{ background: bg, border: `1px solid ${ink.hairline}` }}
    >
      <svg
        viewBox="0 0 86 112"
        preserveAspectRatio="xMidYMid meet"
        className="absolute inset-0 h-full w-full"
        role="img"
        aria-label={`${city}默认封面`}
      >
        {Art ? (
          <Art stroke={color.espresso} />
        ) : (
          <FallbackArt stroke={color.espresso} city={city} />
        )}
      </svg>

      {/* 底部 NO. 编号条 */}
      {number && (
        <div
          className="absolute inset-x-0 bottom-0 flex items-center justify-between px-2 py-1"
          style={{
            background:
              "linear-gradient(to top, rgba(43,31,26,0.74), rgba(43,31,26,0.08))",
            color: color.paper,
          }}
        >
          <span className="text-[8px] tracking-[0.24em]">NO.</span>
          <span
            style={{
              fontFamily: fontFamily.display,
              fontSize: 18,
              fontStyle: "italic",
              fontVariantNumeric: "tabular-nums",
              lineHeight: 1,
            }}
          >
            {number}
          </span>
        </div>
      )}

    </div>
  );
}

function FallbackArt({ stroke, city }: { stroke: string; city: string }) {
  return (
    <g
      stroke={stroke}
      fill="none"
      strokeWidth={STROKE}
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      {/* 一只简笔筷子 + 碗 */}
      <line x1="28" y1="22" x2="36" y2="52" />
      <line x1="34" y1="20" x2="42" y2="50" />
      <path d="M22 56 L60 56 Q60 76 41 78 Q22 76 22 56 Z" />
      <text
        x="43"
        y="92"
        textAnchor="middle"
        fontSize="9"
        fontFamily={fontFamily.serif}
        fill={stroke}
        stroke="none"
        letterSpacing="2"
      >
        {city}
      </text>
    </g>
  );
}
