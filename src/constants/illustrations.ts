/**
 * Flat vector illustrations, drawn as SVG markup and rendered with
 * react-native-svg's <SvgXml>. Each one is a few KB, stays crisp at any size
 * and needs no network — use these instead of photos for decorative art.
 *
 * Scenes use `preserveAspectRatio="xMidYMax slice"`, so they fill any box like
 * `resizeMode="cover"` and always keep the ground in view.
 */

export type Variant = {
  key: string;
  label: string;
  /** Pastel wash behind a tree tile. */
  tile: string;
  leaf: string;
  leafLight: string;
  leafDark: string;
  fruit: string | null;
};

const variants: Variant[] = [
  {
    key: "apple",
    label: "Apple",
    tile: "#FDECEA",
    leaf: "#4CAF50",
    leafLight: "#81C784",
    leafDark: "#2E7D32",
    fruit: "#E53935",
  },
  {
    key: "cherry",
    label: "Cherry",
    tile: "#FCE4EC",
    leaf: "#43A047",
    leafLight: "#7CC47F",
    leafDark: "#2E6B30",
    fruit: "#B0124F",
  },
  {
    key: "apricot",
    label: "Apricot",
    tile: "#FFF3E0",
    leaf: "#66BB6A",
    leafLight: "#A5D6A7",
    leafDark: "#388E3C",
    fruit: "#FB8C00",
  },
  {
    key: "walnut",
    label: "Walnut",
    tile: "#EFEBE9",
    leaf: "#388E3C",
    leafLight: "#66BB6A",
    leafDark: "#1B5E20",
    fruit: "#9CCC65",
  },
  {
    key: "blossom",
    label: "Blossom",
    tile: "#F3E5F5",
    leaf: "#F48FB1",
    leafLight: "#F8BBD0",
    leafDark: "#EC6F9C",
    fruit: "#FFFFFF",
  },
  {
    key: "pear",
    label: "Pear",
    tile: "#F1F8E9",
    leaf: "#558B2F",
    leafLight: "#8BC34A",
    leafDark: "#33691E",
    fruit: "#FDD835",
  },
];

const TRUNK = "#8D5A3B";

const fruitDots = (cx: number, cy: number, r: number, color: string | null) => {
  if (!color) return "";
  const spots = [
    [-0.55, -0.15],
    [0.2, -0.5],
    [0.6, 0.1],
    [-0.15, 0.35],
    [0.35, 0.55],
    [-0.6, 0.45],
    [0.05, -0.05],
  ];
  const fr = Math.max(1.6, r * 0.13);
  return spots
    .map(([dx, dy]) => {
      const x = (cx + dx * r).toFixed(1);
      const y = (cy + dy * r).toFixed(1);
      return `<circle cx="${x}" cy="${y}" r="${fr.toFixed(1)}" fill="${color}"/><circle cx="${(+x - fr * 0.35).toFixed(1)}" cy="${(+y - fr * 0.35).toFixed(1)}" r="${(fr * 0.35).toFixed(1)}" fill="#fff" opacity=".7"/>`;
    })
    .join("");
};

/** A round fruit tree with its base at (x, y); `s` scales it (1 ≈ 60px tall). */
export function tree(
  x: number,
  y: number,
  s: number,
  v: Variant,
  fruit = true,
) {
  const r = 20 * s;
  const cy = y - 34 * s;
  return [
    `<ellipse cx="${x}" cy="${y}" rx="${16 * s}" ry="${3.2 * s}" fill="#000" opacity=".12"/>`,
    `<path d="M${x - 3.2 * s} ${y} L${x - 2 * s} ${cy + 6 * s} L${x + 2 * s} ${cy + 6 * s} L${x + 3.2 * s} ${y} Z" fill="${TRUNK}"/>`,
    `<path d="M${x} ${cy + 12 * s} L${x - 8 * s} ${cy + 2 * s}" stroke="${TRUNK}" stroke-width="${2 * s}" stroke-linecap="round"/>`,
    `<circle cx="${x}" cy="${cy}" r="${r}" fill="${v.leafDark}"/>`,
    `<circle cx="${x - r * 0.62}" cy="${cy + r * 0.25}" r="${r * 0.6}" fill="${v.leaf}"/>`,
    `<circle cx="${x + r * 0.6}" cy="${cy + r * 0.2}" r="${r * 0.62}" fill="${v.leafDark}"/>`,
    `<circle cx="${x - r * 0.1}" cy="${cy - r * 0.2}" r="${r * 0.82}" fill="${v.leaf}"/>`,
    `<circle cx="${x - r * 0.35}" cy="${cy - r * 0.45}" r="${r * 0.38}" fill="${v.leafLight}"/>`,
    fruit ? fruitDots(x, cy, r, v.fruit) : "",
  ].join("");
}

const cloud = (x: number, y: number, s: number) =>
  `<g fill="#fff" opacity=".92"><ellipse cx="${x}" cy="${y}" rx="${18 * s}" ry="${8 * s}"/><circle cx="${x - 6 * s}" cy="${y - 5 * s}" r="${8 * s}"/><circle cx="${x + 6 * s}" cy="${y - 7 * s}" r="${10 * s}"/></g>`;

// Banded rather than a gradient fill: gradients are referenced by id, and on
// web a duplicate id in a hidden screen makes them paint nothing.
const sky = `<rect width="400" height="200" fill="#BFE6FF"/><rect y="50" width="400" height="150" fill="#CDEBFA"/><rect y="90" width="400" height="110" fill="#DCF1F4"/><rect y="120" width="400" height="80" fill="#EAF7EE"/>`;

const sun = `<circle cx="318" cy="70" r="30" fill="#FFE59A" opacity=".45"/><circle cx="318" cy="70" r="18" fill="#FFCA3A"/>`;

/** Snow-capped peaks — the valley this app grows in. */
const mountains =
  `<path d="M0 118 L48 74 L84 102 L138 50 L196 108 L248 62 L300 100 L352 58 L400 92 L400 200 L0 200 Z" fill="#A9C8DE"/>` +
  `<path d="M138 50 L154 65 L146 63 L138 70 L130 63 L122 65 Z M248 62 L262 75 L254 73 L247 79 L240 73 L234 75 Z M352 58 L366 71 L358 69 L351 75 L344 69 L338 71 Z M48 74 L60 85 L53 84 L47 89 L41 84 L36 85 Z" fill="#fff"/>`;

/** `clear` is a list of [from, to] x-ranges the front row leaves empty. */
function scene(v: Variant, extras = "", clear: [number, number][] = []) {
  const back = [40, 78, 116, 154, 192, 230, 268, 306, 344, 382]
    .map((x) => tree(x, 146, 0.42, v))
    .join("");
  const mid = [18, 66, 114, 162, 210, 258, 306, 354]
    .filter((x) => !clear.some(([from, to]) => x >= from && x <= to))
    .map((x, i) => tree(x, 168, i % 2 ? 0.58 : 0.64, v))
    .join("");
  return (
    `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 200" preserveAspectRatio="xMidYMax slice">` +
    sky +
    sun +
    cloud(80, 66, 1.1) +
    cloud(210, 56, 0.8) +
    mountains +
    `<path d="M0 140 Q100 116 200 136 T400 128 L400 200 L0 200 Z" fill="#A5D46A"/>` +
    back +
    `<path d="M0 160 Q120 140 240 158 T400 152 L400 200 L0 200 Z" fill="#7CB342"/>` +
    mid +
    extras +
    `<path d="M0 182 Q140 170 260 184 T400 180 L400 200 L0 200 Z" fill="#558B2F"/>` +
    `</svg>`
  );
}

const barn =
  `<g transform="translate(286 128)">` +
  `<rect x="44" y="-8" width="16" height="48" rx="8" fill="#CFD8DC"/><rect x="44" y="-8" width="16" height="10" rx="5" fill="#90A4AE"/>` +
  `<path d="M0 14 L24 -6 L48 14 Z" fill="#8E1F1A"/><rect x="3" y="12" width="42" height="28" fill="#C62828"/>` +
  `<rect x="15" y="20" width="18" height="20" fill="#fff"/><path d="M15 20 L33 40 M33 20 L15 40" stroke="#C62828" stroke-width="2.4"/>` +
  `<rect x="20" y="2" width="8" height="7" fill="#FFF3C4"/></g>`;

const tractor =
  `<g transform="translate(40 158)">` +
  `<rect x="6" y="0" width="30" height="13" rx="3" fill="#2E7D32"/><rect x="22" y="-12" width="14" height="14" rx="2" fill="#388E3C"/>` +
  `<rect x="25" y="-9" width="8" height="8" fill="#B3E5FC"/><rect x="10" y="-6" width="3" height="7" fill="#424242"/>` +
  `<circle cx="30" cy="15" r="9" fill="#37474F"/><circle cx="30" cy="15" r="3.5" fill="#FDD835"/>` +
  `<circle cx="9" cy="17" r="6" fill="#37474F"/><circle cx="9" cy="17" r="2.4" fill="#FDD835"/></g>`;

/** Square tile: one fruit tree on a pastel wash. For list thumbnails. */
function treeTile(v: Variant) {
  return (
    `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" preserveAspectRatio="xMidYMid slice">` +
    `<rect width="100" height="100" fill="${v.tile}"/>` +
    `<circle cx="78" cy="22" r="9" fill="#FFCA3A" opacity=".9"/>` +
    `<path d="M0 84 Q50 74 100 84 L100 100 L0 100 Z" fill="#9CCC65"/>` +
    tree(50, 86, 1.2, v) +
    `<path d="M14 86 l2 -6 l2 6 M80 88 l2 -5 l2 5" stroke="#558B2F" stroke-width="1.6" fill="none" stroke-linecap="round"/>` +
    `</svg>`
  );
}

export const illustrations = {
  /** Wide valley scene with a barn, silo and tractor — the farm overview. */
  farm: scene(variants[0], barn + tractor, [
    [0, 80],
    [280, 360],
  ]),
  /**
   * The farm without its tractor, for profile covers: the avatar sits over
   * the bottom-left corner, where the tractor would be hidden anyway.
   */
  profileCover: scene(variants[0], barn, [[280, 360]]),
  /** Sapling being watered, for "nothing here yet" states. */
  sapling:
    `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200">` +
    `<circle cx="100" cy="100" r="96" fill="#EEF4E9"/>` +
    `<circle cx="52" cy="62" r="22" fill="#FFE59A" opacity=".45"/><circle cx="52" cy="62" r="14" fill="#FFCA3A"/>` +
    cloud(92, 40, 0.8).replace('opacity=".92"', 'opacity="1"') +
    `<path d="M22 150 Q100 120 178 150 Q178 186 100 192 Q22 186 22 150 Z" fill="#8D6E63"/>` +
    `<path d="M30 150 Q100 126 170 150 Q100 140 30 150 Z" fill="#A1887F"/>` +
    `<path d="M100 146 C100 120 98 104 100 86" stroke="#558B2F" stroke-width="5" fill="none" stroke-linecap="round"/>` +
    `<path d="M100 106 C82 104 68 92 66 74 C86 74 98 86 100 106 Z" fill="#7CB342"/>` +
    `<path d="M100 96 C116 92 130 78 132 60 C112 60 100 74 100 96 Z" fill="#8BC34A"/>` +
    `<path d="M100 104 C88 98 78 90 70 78" stroke="#558B2F" stroke-width="1.6" fill="none"/>` +
    `<path d="M100 94 C110 86 120 76 128 64" stroke="#558B2F" stroke-width="1.6" fill="none"/>` +
    `<g transform="translate(150 38) rotate(-30)">` +
    `<path d="M0 10 L34 10 L30 40 L4 40 Z" fill="#29B6F6"/><rect x="-2" y="6" width="38" height="6" rx="3" fill="#0288D1"/>` +
    `<path d="M34 16 Q46 14 44 30" stroke="#0288D1" stroke-width="4" fill="none"/>` +
    `<path d="M4 18 L-22 6" stroke="#0288D1" stroke-width="5" stroke-linecap="round"/><circle cx="-24" cy="5" r="5" fill="#0288D1"/></g>` +
    `<g fill="#4FC3F7"><path d="M128 62 q3 5 0 7 q-3 -2 0 -7 Z"/><path d="M122 70 q3 5 0 7 q-3 -2 0 -7 Z"/><path d="M131 74 q3 5 0 7 q-3 -2 0 -7 Z"/><path d="M116 80 q3 5 0 7 q-3 -2 0 -7 Z"/></g>` +
    `</svg>`,
};

const sceneByVariant = Object.fromEntries(
  variants.map((v) => [v.key, scene(v)]),
);
const tileByVariant = Object.fromEntries(
  variants.map((v) => [v.key, treeTile(v)]),
);

type OrchardLike = { id?: string | number; orchardProfileId?: string | number };

/**
 * The tree an orchard is drawn with, picked from its id so the same orchard
 * shows the same art on every screen. The API has no crop field to go by.
 */
function variantFor(orchard?: OrchardLike | null): Variant {
  const key = String(orchard?.id ?? orchard?.orchardProfileId ?? "");
  let hash = 0;
  for (let i = 0; i < key.length; i++)
    hash = (hash * 31 + key.charCodeAt(i)) | 0;
  return variants[Math.abs(hash) % variants.length];
}

/** Square tree tile for list thumbnails. */
export const getOrchardTile = (orchard?: OrchardLike | null) =>
  tileByVariant[variantFor(orchard).key];

/** Wide valley scene for banners, matching the orchard's tile. */
export const getOrchardScene = (orchard?: OrchardLike | null) =>
  sceneByVariant[variantFor(orchard).key];
