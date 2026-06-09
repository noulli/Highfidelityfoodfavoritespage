/**
 * Editorial Foodie — Unified Design Tokens
 *
 * 抽取自 app-editorial(主列表)与 app-collection-detail(合集详情)。
 * 所有杂志风格页面/组件统一从此处引用,避免散落的硬编码 hex 与字号。
 */

/* ---------- 1. Colors ---------- */

export const color = {
  paper: "#FAF8F5",       // 页面底色 / 反白文字色
  espresso: "#2B1F1A",    // 主文字 / 深底
  tomato: "#E85D3C",      // 强调 / 主推 / 创建
  sage: "#8FA181",        // 次强调 / 收藏 / 城市
  muted: "#9C9489",       // 次级文字 / icon
  mutedText: "#675D54",   // AA 次级正文 / meta
  sageText: "#5F6F4B",    // AA 绿色语义文字
  tomatoText: "#A33D27",  // AA 红色语义文字
  warmFill: "#EBE3D7",    // 头像底 / 封面占位
  privateFill: "#EFEAE0", // 私密集子卡片底
  publicFill: "#F1E8DE",  // 公开集子卡片底
  cardSurface: "#FEFCF8", // 状态卡 / 浮层卡片底(比 paper 略亮)
  star: "#F59E0B",        // 仅店铺评分星
} as const;

/* espresso 的常用透明变体,统一只用这五档,避免到处出现 ${espresso}17、25 之类游离值 */
export const ink = {
  hairline: `${color.espresso}15`, // 1px 极细分隔
  rule: `${color.espresso}20`,     // 标准分隔线 / 边框
  edge: `${color.espresso}30`,     // 按钮 / 输入框边框
  chip: `${color.espresso}08`,     // 浅 chip 底色
  softText: `${color.espresso}CC`, // 正文软化色
  solid: color.espresso,           // 标题分隔实线
} as const;

/* ---------- 2. Typography ---------- */

export const fontFamily = {
  serif: '"Songti SC", serif',
  display: '"Playfair Display", serif', // 数字 / 装饰性西文
} as const;

/** 风格预设:直接 spread 到 style={{}} 即可 */
export const typography = {
  /** 顶部导航中文标题(13px 极宽字距) */
  navTitle: {
    fontFamily: fontFamily.serif,
    fontSize: 13,
    letterSpacing: "0.4em",
    color: color.espresso,
    fontWeight: 600,
  },
  /** 详情页 Hero 大标题(32px 宋体) */
  pageHeroTitle: {
    fontFamily: fontFamily.serif,
    fontSize: 32,
    fontWeight: 600,
    letterSpacing: "0.02em",
    color: color.espresso,
    lineHeight: 1.2,
  },
  /** 群组级标题(列表页城市名 24px) */
  groupTitle: {
    fontFamily: fontFamily.serif,
    fontSize: 24,
    fontWeight: 600,
    color: color.espresso,
    lineHeight: 1.1,
  },
  /** 章节标题(18px,带 0.1em tracking,配 ornament-bars 使用) */
  sectionTitle: {
    fontFamily: fontFamily.serif,
    fontSize: 18,
    fontWeight: 600,
    letterSpacing: "0.1em",
    color: color.espresso,
    lineHeight: 1.1,
  },
  /** 卡片标题(列表项 / 店铺) */
  cardTitle: {
    fontFamily: fontFamily.serif,
    fontSize: 18,
    fontWeight: 600,
    color: color.espresso,
    lineHeight: 1.3,
  },
  /** 大数字统计(32px 宋体,tabular) */
  statNumber: {
    fontFamily: fontFamily.serif,
    fontSize: 32,
    fontWeight: 600,
    color: color.espresso,
    fontVariantNumeric: "tabular-nums" as const,
  },
  /** 正文 / 描述 */
  body: {
    fontSize: 14,
    lineHeight: 1.8,
    color: ink.softText,
  },
  /** 次级 meta(地址、菜系、计数) */
  meta: {
    fontSize: 12,
    color: color.mutedText,
  },
  /** 极小标签(NO. / SAVES 等小写字间距标签) */
  microLabel: {
    fontSize: 10,
    letterSpacing: "0.3em",
    color: color.mutedText,
  },
  /** 装饰性编号(NO. 01 italic Playfair) */
  numeral: {
    fontFamily: fontFamily.display,
    fontSize: 28,
    fontStyle: "italic" as const,
    color: color.espresso,
    fontVariantNumeric: "tabular-nums" as const,
  },
  /** 引用 / italic 推荐语 */
  pullQuote: {
    fontFamily: fontFamily.serif,
    fontSize: 13,
    fontStyle: "italic" as const,
    color: color.espresso,
    lineHeight: 1.6,
  },
} as const;

/* ---------- 3. Layout ---------- */

export const layout = {
  pageMaxWidth: 480,
  pageBottomPadding: 112, // pb-28
  navHeight: 48,
  edgePadding: 20,        // 左右 px-5
  edgePaddingWide: 24,    // px-6 (Hero / 编辑用)
} as const;

/* ---------- 4. Section gaps (垂直节奏统一) ---------- */

export const gap = {
  betweenGroups: 28, // 大区块间距(列表 city 组之间)
  betweenSections: 20,
  cardInner: 16,
} as const;

/* ---------- 5. Shadows ---------- */

export const shadow = {
  fab: "0 8px 24px rgba(43,31,26,0.25)",
  card: "0 1px 2px rgba(43,31,26,0.04)",
} as const;

/* ---------- 6. Convenience strings ---------- */

/** 标题章节的双色分隔线渐变(目录章节用) */
export const decorations = {
  sectionRule: `linear-gradient(to right, ${color.espresso} 0, ${color.espresso} 40%, ${ink.edge} 40%, ${ink.edge} 100%)`,
} as const;
