/**
 * Full-colour flat icons, as SVG markup for react-native-svg's <SvgXml>.
 * Line icons (lucide) stay for controls — buttons, chevrons, inputs; these are
 * for content that benefits from a picture: weather, readings, stats, tips.
 * All share a 48×48 viewBox.
 */

const svg = (body: string) =>
  `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48">${body}</svg>`;

const sunBody = (cx: number, cy: number, r: number) => {
  const rays = Array.from({ length: 8 }, (_, i) => {
    const a = (i * Math.PI) / 4;
    const x1 = (cx + Math.cos(a) * (r + 3)).toFixed(1);
    const y1 = (cy + Math.sin(a) * (r + 3)).toFixed(1);
    const x2 = (cx + Math.cos(a) * (r + 7)).toFixed(1);
    const y2 = (cy + Math.sin(a) * (r + 7)).toFixed(1);
    return `<path d="M${x1} ${y1} L${x2} ${y2}" stroke="#FFB300" stroke-width="3" stroke-linecap="round"/>`;
  }).join("");
  return `${rays}<circle cx="${cx}" cy="${cy}" r="${r}" fill="#FFC93C"/><circle cx="${cx - r * 0.3}" cy="${cy - r * 0.3}" r="${r * 0.35}" fill="#FFE08A"/>`;
};

const cloudBody = (dy = 0, body = "#DCE5EE", top = "#F4F8FB", dx = 0) =>
  `<g transform="translate(${dx} ${dy})"><rect x="8" y="26" width="32" height="12" rx="6" fill="${body}"/>` +
  `<circle cx="17" cy="27" r="8" fill="${body}"/><circle cx="28" cy="23" r="11" fill="${body}"/>` +
  `<circle cx="25" cy="19" r="6" fill="${top}"/></g>`;

const moonBody = `<path d="M30 8 a16 16 0 1 0 12 26 a13 13 0 1 1 -12 -26 Z" fill="#FFD966"/><circle cx="21" cy="22" r="2" fill="#F2C44E"/><circle cx="26" cy="31" r="1.4" fill="#F2C44E"/>`;

const drops = (color: string) =>
  [
    [16, 40],
    [24, 42],
    [32, 40],
  ]
    .map(
      ([x, y]) =>
        `<path d="M${x} ${y - 3} q2.6 3.6 0 5.2 q-2.6 -1.6 0 -5.2 Z" fill="${color}"/>`,
    )
    .join("");

/** Weather conditions — for forecast rows and the current-weather badge. */
export const weatherIcons = {
  sun: svg(sunBody(24, 24, 10)),
  moon: svg(
    moonBody +
      `<circle cx="38" cy="10" r="1.6" fill="#FFE9A8"/><circle cx="42" cy="18" r="1" fill="#FFE9A8"/>`,
  ),
  cloud: svg(cloudBody(0, "#C9D5E1", "#E8EEF4")),
  cloudSun: svg(sunBody(18, 17, 7) + cloudBody(4, "#DCE5EE", "#F7FAFC", 4)),
  cloudMoon: svg(
    `<g transform="translate(-6 -4) scale(.8)">${moonBody}</g>` +
      cloudBody(4, "#C9D5E1", "#E8EEF4", 4),
  ),
  rain: svg(cloudBody(-4, "#9FB1C2", "#BCCAD6") + drops("#3FA9F5")),
  storm: svg(
    cloudBody(-4, "#6E7F91", "#8796A6") +
      `<path d="M25 30 L19 41 L24 41 L21 48 L31 37 L26 37 L29 30 Z" fill="#FFC93C"/>`,
  ),
  snow: svg(
    cloudBody(-4, "#C9D5E1", "#E8EEF4") +
      [
        [16, 40],
        [24, 43],
        [32, 40],
      ]
        .map(
          ([x, y]) =>
            `<circle cx="${x}" cy="${y}" r="2.4" fill="#fff" stroke="#8EC5F0" stroke-width="1.4"/>`,
        )
        .join(""),
  ),
  fog: svg(
    cloudBody(-6, "#C9D5E1", "#E8EEF4") +
      `<path d="M10 38 H36 M14 44 H40" stroke="#A9B8C6" stroke-width="3" stroke-linecap="round"/>`,
  ),
} as const;

export type WeatherIconKey = keyof typeof weatherIcons;

/** Readings on the weather details grid. */
export const metricIcons = {
  thermometer: svg(
    `<rect x="19" y="6" width="10" height="28" rx="5" fill="#ECEFF4" stroke="#B8C3CF" stroke-width="2"/>` +
      `<rect x="22" y="16" width="4" height="20" rx="2" fill="#F05A4F"/><circle cx="24" cy="36" r="7" fill="#F05A4F"/>` +
      `<path d="M31 12 h4 M31 18 h4 M31 24 h4" stroke="#B8C3CF" stroke-width="2" stroke-linecap="round"/>`,
  ),
  humidity: svg(
    `<path d="M24 6 C30 15 37 22 37 30 a13 13 0 0 1 -26 0 C11 22 18 15 24 6 Z" fill="#3FA9F5"/>` +
      `<path d="M18 30 a6 6 0 0 0 6 6" stroke="#BFE3FD" stroke-width="3" fill="none" stroke-linecap="round"/>`,
  ),
  wind: svg(
    `<path d="M6 18 H28 a5 5 0 1 0 -5 -5" stroke="#4DB6AC" stroke-width="3.4" fill="none" stroke-linecap="round"/>` +
      `<path d="M6 26 H36 a5 5 0 1 1 -5 5" stroke="#26A69A" stroke-width="3.4" fill="none" stroke-linecap="round"/>` +
      `<path d="M10 34 H22" stroke="#80CBC4" stroke-width="3.4" stroke-linecap="round"/>`,
  ),
  umbrella: svg(
    `<path d="M24 22 V37 a4 4 0 0 1 -8 0" stroke="#5D6B78" stroke-width="2.6" fill="none" stroke-linecap="round"/>` +
      `<path d="M5 24 C7 13 15 7 24 7 C33 7 41 13 43 24 C40 21 36 21 33.5 24 C31 21 27 21 24 24 C21 21 17 21 14.5 24 C12 21 8 21 5 24 Z" fill="#7E57C2"/>` +
      `<path d="M24 7 C20 12 18 18 19 23 M24 7 C28 12 30 18 29 23" stroke="#9575CD" stroke-width="2" fill="none"/>`,
  ),
  uv: svg(
    sunBody(24, 24, 9) +
      `<text x="24" y="27.5" font-size="9" font-weight="700" text-anchor="middle" fill="#B26A00">UV</text>`,
  ),
  pressure: svg(
    `<path d="M8 32 a16 16 0 0 1 32 0" stroke="#E6EBF0" stroke-width="6" fill="none"/>` +
      `<path d="M8 32 a16 16 0 0 1 8 -13.9" stroke="#66BB6A" stroke-width="6" fill="none"/>` +
      `<path d="M16 18.1 a16 16 0 0 1 16 0" stroke="#FFCA28" stroke-width="6" fill="none"/>` +
      `<path d="M32 18.1 a16 16 0 0 1 8 13.9" stroke="#EF5350" stroke-width="6" fill="none"/>` +
      `<path d="M24 32 L31 21" stroke="#37474F" stroke-width="2.6" stroke-linecap="round"/><circle cx="24" cy="32" r="3.4" fill="#37474F"/>`,
  ),
  visibility: svg(
    `<path d="M4 24 C10 14 17 10 24 10 C31 10 38 14 44 24 C38 34 31 38 24 38 C17 38 10 34 4 24 Z" fill="#E3F2FD"/>` +
      `<circle cx="24" cy="24" r="9" fill="#42A5F5"/><circle cx="24" cy="24" r="4.4" fill="#1A3A5C"/><circle cx="21.5" cy="21.5" r="2" fill="#fff"/>`,
  ),
  cloud: weatherIcons.cloud,
  sunrise: svg(
    `<path d="M14 34 a10 10 0 0 1 20 0 Z" fill="#FFC93C"/>` +
      `<path d="M24 6 V16 M19 11 L24 6 L29 11" stroke="#FF8F00" stroke-width="2.8" fill="none" stroke-linecap="round" stroke-linejoin="round"/>` +
      `<path d="M6 34 H42" stroke="#90A4AE" stroke-width="3" stroke-linecap="round"/><path d="M12 40 H36" stroke="#CFD8DC" stroke-width="3" stroke-linecap="round"/>`,
  ),
  sunset: svg(
    `<path d="M14 34 a10 10 0 0 1 20 0 Z" fill="#FF8A50"/>` +
      `<path d="M24 16 V6 M19 11 L24 16 L29 11" stroke="#E65100" stroke-width="2.8" fill="none" stroke-linecap="round" stroke-linejoin="round"/>` +
      `<path d="M6 34 H42" stroke="#90A4AE" stroke-width="3" stroke-linecap="round"/><path d="M12 40 H36" stroke="#CFD8DC" stroke-width="3" stroke-linecap="round"/>`,
  ),
  moon: svg(moonBody),
} as const;

/** Home stat tiles. */
export const statIcons = {
  orchard: svg(
    `<path d="M22 44 L23 28 h2 L26 44 Z" fill="#8D5A3B"/><circle cx="24" cy="20" r="14" fill="#2E7D32"/>` +
      `<circle cx="17" cy="23" r="8" fill="#4CAF50"/><circle cx="24" cy="15" r="10" fill="#4CAF50"/><circle cx="20" cy="11" r="4" fill="#81C784"/>` +
      `<circle cx="16" cy="22" r="2.4" fill="#E53935"/><circle cx="28" cy="14" r="2.4" fill="#E53935"/><circle cx="30" cy="25" r="2.4" fill="#E53935"/><circle cx="22" cy="28" r="2.4" fill="#E53935"/>`,
  ),
  area: svg(
    `<path d="M24 8 L44 20 L24 32 L4 20 Z" fill="#9CCC65"/><path d="M24 8 L34 14 L14 26 L4 20 Z" fill="#7CB342"/>` +
      `<path d="M4 20 V26 L24 38 V32 Z" fill="#8D6E63"/><path d="M44 20 V26 L24 38 V32 Z" fill="#6D4C41"/>` +
      `<path d="M14 14 L34 26 M19 11 L39 23" stroke="#C5E1A5" stroke-width="1.4"/>`,
  ),
  district: svg(
    `<ellipse cx="24" cy="42" rx="10" ry="3" fill="#000" opacity=".12"/>` +
      `<path d="M24 42 C24 42 10 28 10 18 a14 14 0 0 1 28 0 C38 28 24 42 24 42 Z" fill="#EF5350"/>` +
      `<circle cx="24" cy="18" r="6" fill="#fff"/><path d="M19 20 L22.5 15 L25 18 L27 16 L30 20 Z" fill="#66BB6A"/>`,
  ),
  age: svg(
    `<rect x="6" y="10" width="36" height="32" rx="6" fill="#fff" stroke="#CFD8DC" stroke-width="2"/>` +
      `<path d="M6 16 a6 6 0 0 1 6 -6 h24 a6 6 0 0 1 6 6 v4 H6 Z" fill="#66BB6A"/>` +
      `<path d="M15 6 V13 M33 6 V13" stroke="#455A64" stroke-width="3" stroke-linecap="round"/>` +
      `<path d="M24 38 V28" stroke="#558B2F" stroke-width="2.4" stroke-linecap="round"/>` +
      `<path d="M24 31 C19 31 17 27 17 24 C21 24 24 27 24 31 Z M24 29 C29 29 31 25 31 22 C27 22 24 25 24 29 Z" fill="#7CB342"/>`,
  ),
} as const;

/** Farmer tips — keyed by the advisory API's tip codes, with a fallback. */
export const tipArt: Record<string, string> = {
  "protective-gear": svg(
    `<circle cx="24" cy="24" r="22" fill="#E8F5E9"/>` +
      `<path d="M24 7 L38 12 V23 C38 32 32 38 24 41 C16 38 10 32 10 23 V12 Z" fill="#43A047"/>` +
      `<path d="M24 7 L38 12 V23 C38 32 32 38 24 41 Z" fill="#2E7D32"/>` +
      `<path d="M17 24 L22 29 L31 19" stroke="#fff" stroke-width="3.4" fill="none" stroke-linecap="round" stroke-linejoin="round"/>`,
  ),
  "early-irrigation": svg(
    `<circle cx="24" cy="24" r="22" fill="#E3F2FD"/>` +
      `<path d="M8 38 Q24 32 40 38 V40 Q24 46 8 40 Z" fill="#8D6E63"/>` +
      `<path d="M24 37 V24" stroke="#558B2F" stroke-width="2.4" stroke-linecap="round"/>` +
      `<path d="M24 28 C18 28 15 24 15 20 C20 20 24 23 24 28 Z M24 25 C30 25 33 21 33 17 C28 17 24 20 24 25 Z" fill="#7CB342"/>` +
      `<path d="M14 8 q3 4.5 0 6.5 q-3 -2 0 -6.5 Z M24 5 q3 4.5 0 6.5 q-3 -2 0 -6.5 Z M34 8 q3 4.5 0 6.5 q-3 -2 0 -6.5 Z" fill="#29B6F6"/>`,
  ),
  "organic-fertilizers": svg(
    `<circle cx="24" cy="24" r="22" fill="#FFF8E1"/>` +
      `<path d="M13 16 Q24 11 35 16 L38 40 Q24 44 10 40 Z" fill="#BCAAA4"/>` +
      `<path d="M13 16 Q24 20 35 16 Q24 12 13 16 Z" fill="#A1887F"/>` +
      `<path d="M24 36 C24 30 22 26 18 24 C24 23 27 28 24 36 Z" fill="#7CB342"/><path d="M24 36 C25 29 28 25 32 24 C31 30 28 34 24 36 Z" fill="#558B2F"/>`,
  ),
  "weather-before-spraying": svg(
    `<circle cx="24" cy="24" r="22" fill="#FFF3E0"/>` +
      sunBody(18, 18, 6).replace(/stroke-width="3"/g, 'stroke-width="2.2"') +
      cloudBody(6, "#DCE5EE", "#F7FAFC", 4),
  ),
  default: svg(
    `<circle cx="24" cy="24" r="22" fill="#F1F8E9"/>` +
      `<path d="M24 40 V22" stroke="#558B2F" stroke-width="2.6" stroke-linecap="round"/>` +
      `<path d="M24 30 C15 30 11 23 11 16 C19 16 24 22 24 30 Z" fill="#8BC34A"/><path d="M24 25 C33 25 37 18 37 11 C29 11 24 17 24 25 Z" fill="#7CB342"/>`,
  ),
};

export const getTipArt = (code?: string) =>
  tipArt[code ?? ""] ?? tipArt.default;

type Effect = "clear" | "cloudy" | "fog" | "rain" | "storm" | "snow";

/** The weather icon for a condition, with night versions for clear and cloudy skies. */
export const weatherIconFor = (effect: Effect, isDaylight: boolean): string => {
  if (effect === "clear")
    return isDaylight ? weatherIcons.sun : weatherIcons.moon;
  if (effect === "cloudy")
    return isDaylight ? weatherIcons.cloudSun : weatherIcons.cloudMoon;
  return weatherIcons[effect];
};

/** Advisory kinds, each with the pastel its tile sits on. */
export const advisoryKindArt: Record<string, { art: string; tile: string }> = {
  spray: {
    tile: "#E1F5FE",
    art: svg(
      `<path d="M22 30 C30 30 32 22 37 15" stroke="#546E7A" stroke-width="2.6" fill="none" stroke-linecap="round"/>` +
        `<rect x="35" y="11" width="6" height="4" rx="1.5" transform="rotate(-40 38 13)" fill="#37474F"/>` +
        `<circle cx="43" cy="8" r="1.8" fill="#81D4FA"/><circle cx="45" cy="13" r="1.4" fill="#81D4FA"/><circle cx="40" cy="5" r="1.4" fill="#81D4FA"/><circle cx="46" cy="5" r="1" fill="#81D4FA"/>` +
        `<rect x="7" y="14" width="18" height="28" rx="6" fill="#26A69A"/><rect x="7" y="24" width="18" height="5" fill="#00897B"/>` +
        `<rect x="12" y="10" width="8" height="5" rx="2" fill="#37474F"/><path d="M11 18 V36" stroke="#80CBC4" stroke-width="2.4" stroke-linecap="round"/>`,
    ),
  },
  fertigation: {
    tile: "#E3F2FD",
    art: svg(
      `<path d="M4 11 H44" stroke="#0288D1" stroke-width="4.4" stroke-linecap="round"/>` +
        `<rect x="20" y="11" width="8" height="5" rx="1.5" fill="#01579B"/>` +
        `<path d="M24 19 q3.6 5 0 7.4 q-3.6 -2.4 0 -7.4 Z" fill="#29B6F6"/>` +
        `<path d="M8 40 Q24 34 40 40 V43 Q24 47 8 43 Z" fill="#8D6E63"/>` +
        `<path d="M24 39 V30" stroke="#558B2F" stroke-width="2.4" stroke-linecap="round"/>` +
        `<path d="M24 33 C19 33 16 30 16 27 C20 27 24 29 24 33 Z M24 31 C29 31 32 28 32 25 C28 25 24 27 24 31 Z" fill="#7CB342"/>`,
    ),
  },
  pruning: {
    tile: "#FBE9E7",
    art: svg(
      `<path d="M3 22 L22 3" stroke="#8D5A3B" stroke-width="3.2" stroke-linecap="round"/>` +
        `<path d="M8 17 C4 13 5 8 8 6 C11 10 11 14 8 17 Z" fill="#7CB342"/><path d="M14 11 C14 6 17 3 21 3 C21 7 18 10 14 11 Z" fill="#8BC34A"/>` +
        `<path d="M28 25 L9 6 Q15 5 31 21 Z" fill="#CFD8DC"/><path d="M25 28 L6 9 Q5 15 21 31 Z" fill="#90A4AE"/>` +
        `<ellipse cx="36" cy="32" rx="5" ry="9" transform="rotate(-45 36 32)" fill="#E53935"/>` +
        `<ellipse cx="32" cy="36" rx="5" ry="9" transform="rotate(-45 32 36)" fill="#C62828"/>` +
        `<circle cx="26.5" cy="26.5" r="3" fill="#455A64"/><circle cx="26.5" cy="26.5" r="1.1" fill="#CFD8DC"/>`,
    ),
  },
  harvest: {
    tile: "#FFF3E0",
    art: svg(
      `<circle cx="16" cy="20" r="7" fill="#E53935"/><circle cx="32" cy="20" r="7" fill="#EF5350"/><circle cx="24" cy="16" r="7.4" fill="#C62828"/>` +
        `<circle cx="21.5" cy="13.5" r="2" fill="#fff" opacity=".6"/><path d="M24 9 V6" stroke="#6D4129" stroke-width="1.8" stroke-linecap="round"/>` +
        `<path d="M24 7 C27 4 31 5 32 7 C29 9 26 9 24 7 Z" fill="#7CB342"/>` +
        `<path d="M6 24 H42 L38 42 H10 Z" fill="#C68A4E"/><path d="M6 24 H42 V28 H6 Z" fill="#A86F38"/>` +
        `<path d="M14 28 L16 42 M24 28 V42 M34 28 L32 42 M8.6 34 H39.4" stroke="#A86F38" stroke-width="1.6"/>`,
    ),
  },
};

export const getAdvisoryKindArt = (kind?: string) =>
  advisoryKindArt[kind ?? ""] ?? { tile: "#F1F8E9", art: tipArt.default };

/** Larger pictures for advisory empty and error states (120×120). */
export const advisoryArt = {
  empty:
    `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 120 120">` +
    `<circle cx="60" cy="60" r="56" fill="#EEF4E9"/>` +
    `<rect x="32" y="24" width="56" height="74" rx="9" fill="#fff" stroke="#CFD8DC" stroke-width="2"/>` +
    `<rect x="46" y="17" width="28" height="13" rx="5" fill="#78909C"/>` +
    [42, 58, 74]
      .map(
        (y) =>
          `<circle cx="45" cy="${y}" r="5.4" fill="#66BB6A"/><path d="M42.4 ${y} L44.4 ${y + 2} L47.8 ${y - 2}" stroke="#fff" stroke-width="1.8" fill="none" stroke-linecap="round" stroke-linejoin="round"/>` +
          `<rect x="55" y="${y - 2.5}" width="24" height="5" rx="2.5" fill="#E3E8EC"/>`,
      )
      .join("") +
    `<path d="M92 102 V84" stroke="#558B2F" stroke-width="3" stroke-linecap="round"/>` +
    `<path d="M92 92 C84 92 80 86 80 80 C87 80 92 85 92 92 Z M92 88 C100 88 104 82 104 76 C97 76 92 81 92 88 Z" fill="#7CB342"/>` +
    `</svg>`,
  offline:
    `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 120 120">` +
    `<circle cx="60" cy="60" r="56" fill="#F1F4F7"/>` +
    `<rect x="24" y="56" width="72" height="26" rx="13" fill="#C9D5E1"/><circle cx="44" cy="58" r="16" fill="#C9D5E1"/><circle cx="66" cy="50" r="22" fill="#C9D5E1"/><circle cx="60" cy="42" r="11" fill="#E3EAF1"/>` +
    `<path d="M30 30 L90 90" stroke="#EF5350" stroke-width="6" stroke-linecap="round"/>` +
    `<path d="M30 30 L90 90" stroke="#F1F4F7" stroke-width="2" stroke-linecap="round" transform="translate(-4 4)"/>` +
    `</svg>`,
  bell: svg(
    `<path d="M24 6 C16 6 12 12 12 19 V28 L8 34 H40 L36 28 V19 C36 12 32 6 24 6 Z" fill="#FFC93C"/>` +
      `<path d="M24 6 C32 6 36 12 36 19 V28 L40 34 H24 Z" fill="#FFB300"/>` +
      `<path d="M19 37 a5 5 0 0 0 10 0 Z" fill="#8D6E63"/><rect x="21" y="2" width="6" height="5" rx="2.5" fill="#FFB300"/>` +
      `<circle cx="37" cy="10" r="6" fill="#E53935" stroke="#fff" stroke-width="2"/>` +
      `<path d="M15 18 C15 13 18 10 21 9" stroke="#FFE08A" stroke-width="2.4" fill="none" stroke-linecap="round"/>`,
  ),
} as const;

const gearTeeth = Array.from(
  { length: 8 },
  (_, i) =>
    `<rect x="21" y="4" width="6" height="9" rx="2" fill="#78909C" transform="rotate(${i * 45} 24 24)"/>`,
).join("");

/** Profile and menu pictures. */
export const profileArt = {
  /** Cartoon farmer for users without a photo (100×100, fills a circle). */
  avatar:
    `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100">` +
    `<rect width="100" height="100" fill="#E8F5E9"/>` +
    `<path d="M16 100 C16 80 31 70 50 70 C69 70 84 80 84 100 Z" fill="#43A047"/>` +
    `<path d="M42 70 L50 82 L58 70 Z" fill="#2E7D32"/>` +
    `<rect x="44" y="58" width="12" height="14" rx="4" fill="#D9A06C"/>` +
    `<circle cx="50" cy="47" r="16" fill="#F1C08F"/>` +
    `<circle cx="34.5" cy="49" r="3.4" fill="#E5AE7B"/><circle cx="65.5" cy="49" r="3.4" fill="#E5AE7B"/>` +
    `<circle cx="44" cy="48" r="1.9" fill="#3E2723"/><circle cx="56" cy="48" r="1.9" fill="#3E2723"/>` +
    `<path d="M45 55 Q50 59 55 55" stroke="#8D4A2F" stroke-width="2" fill="none" stroke-linecap="round"/>` +
    `<circle cx="40" cy="53" r="2.4" fill="#F4978E" opacity=".55"/><circle cx="60" cy="53" r="2.4" fill="#F4978E" opacity=".55"/>` +
    `<ellipse cx="50" cy="36" rx="27" ry="6" fill="#D9A441"/>` +
    `<path d="M35 36 C35 24 41 19 50 19 C59 19 65 24 65 36 Z" fill="#F2CC6B"/>` +
    `<rect x="35" y="30" width="30" height="4.5" fill="#8D5A3B"/>` +
    `</svg>`,
  personal: svg(
    `<rect x="4" y="10" width="40" height="28" rx="5" fill="#E3F2FD" stroke="#90CAF9" stroke-width="2"/>` +
      `<circle cx="16" cy="21" r="5" fill="#F1C08F"/><path d="M8 33 C8 28 11 26 16 26 C21 26 24 28 24 33 Z" fill="#42A5F5"/>` +
      `<rect x="28" y="17" width="12" height="3" rx="1.5" fill="#64B5F6"/><rect x="28" y="23" width="10" height="3" rx="1.5" fill="#BBDEFB"/><rect x="28" y="29" width="8" height="3" rx="1.5" fill="#BBDEFB"/>`,
  ),
  address: svg(
    `<path d="M6 22 L22 9 L38 22 V42 H6 Z" fill="#FFF3E0"/><path d="M3 23 L22 7 L41 23" stroke="#E53935" stroke-width="4" fill="none" stroke-linecap="round" stroke-linejoin="round"/>` +
      `<rect x="17" y="28" width="10" height="14" rx="2" fill="#8D6E63"/><rect x="9" y="25" width="6" height="6" rx="1" fill="#81D4FA"/>` +
      `<path d="M38 32 C38 32 31 25 31 20 a7 7 0 0 1 14 0 C45 25 38 32 38 32 Z" fill="#43A047"/><circle cx="38" cy="20" r="2.6" fill="#fff"/>`,
  ),
  education: svg(
    `<path d="M24 8 L45 17 L24 26 L3 17 Z" fill="#37474F"/><path d="M12 21 V31 C12 35 18 38 24 38 C30 38 36 35 36 31 V21 L24 26 Z" fill="#546E7A"/>` +
      `<path d="M41 18.6 V30" stroke="#FFC93C" stroke-width="2" stroke-linecap="round"/><circle cx="41" cy="32" r="2.6" fill="#FFC93C"/>`,
  ),
  profession: svg(
    `<path d="M18 13 V10 a3 3 0 0 1 3 -3 h6 a3 3 0 0 1 3 3 V13" stroke="#5D4037" stroke-width="3" fill="none"/>` +
      `<rect x="5" y="13" width="38" height="27" rx="5" fill="#8D6E63"/><rect x="5" y="13" width="38" height="11" rx="5" fill="#A1887F"/>` +
      `<rect x="20" y="21" width="8" height="7" rx="1.6" fill="#FFC93C"/>`,
  ),
} as const;

/** Menu rows, keyed by route label. */
export const menuArt = {
  orders: svg(
    `<path d="M17 16 V13 a7 7 0 0 1 14 0 V16" stroke="#E64A19" stroke-width="3" fill="none" stroke-linecap="round"/>` +
      `<path d="M9 16 H39 L37 41 a3 3 0 0 1 -3 3 H14 a3 3 0 0 1 -3 -3 Z" fill="#FF8A65"/>` +
      `<path d="M9 16 H39 L38.6 21 H9.4 Z" fill="#FF7043"/>` +
      `<circle cx="24" cy="31" r="6" fill="#fff"/><path d="M24 25 C26 23 28 23 29 24 C27 26 25 26 24 25 Z" fill="#66BB6A"/>`,
  ),
  addresses: profileArt.address,
  notifications: advisoryArt.bell,
  discussion: svg(
    `<path d="M5 9 h26 a4 4 0 0 1 4 4 v13 a4 4 0 0 1 -4 4 H15 l-7 6 v-6 H5 a4 4 0 0 1 -4 -4 V13 a4 4 0 0 1 4 -4 Z" fill="#66BB6A"/>` +
      `<circle cx="11" cy="19.5" r="2" fill="#fff"/><circle cx="18" cy="19.5" r="2" fill="#fff"/><circle cx="25" cy="19.5" r="2" fill="#fff"/>` +
      `<path d="M23 22 h19 a4 4 0 0 1 4 4 v9 a4 4 0 0 1 -4 4 h-1 v5 l-6 -5 H23 a4 4 0 0 1 -4 -4 V26 a4 4 0 0 1 4 -4 Z" fill="#42A5F5"/>`,
  ),
  settings: svg(
    gearTeeth +
      `<circle cx="24" cy="24" r="13" fill="#90A4AE"/><circle cx="24" cy="24" r="5.5" fill="#ECEFF1"/>`,
  ),
  page: svg(
    `<path d="M10 4 H30 L39 13 V42 a2 2 0 0 1 -2 2 H10 a2 2 0 0 1 -2 -2 V6 a2 2 0 0 1 2 -2 Z" fill="#fff" stroke="#CFD8DC" stroke-width="2"/>` +
      `<path d="M30 4 V13 H39 Z" fill="#C8E6C9"/>` +
      `<rect x="14" y="19" width="18" height="3" rx="1.5" fill="#66BB6A"/><rect x="14" y="26" width="20" height="3" rx="1.5" fill="#CFD8DC"/><rect x="14" y="33" width="14" height="3" rx="1.5" fill="#CFD8DC"/>`,
  ),
} as const;

/** Server-defined menu pages, matched by name since the API sends no type. */
export const pageArt = {
  help: svg(
    `<circle cx="24" cy="24" r="18" fill="#EF5350"/>` +
      `<path d="M24 6 A18 18 0 0 1 42 24 H34 A10 10 0 0 0 24 14 Z M24 42 A18 18 0 0 1 6 24 H14 A10 10 0 0 0 24 34 Z" fill="#fff"/>` +
      `<circle cx="24" cy="24" r="10" fill="none" stroke="#C62828" stroke-width="1.6"/><circle cx="24" cy="24" r="8" fill="#F7F7F7"/>`,
  ),
  about: svg(
    `<circle cx="24" cy="24" r="18" fill="#43A047"/>` +
      `<circle cx="24" cy="15" r="2.8" fill="#fff"/><rect x="21.4" y="20.5" width="5.2" height="15" rx="2.6" fill="#fff"/>` +
      `<path d="M35 6 C42 6 45 11 44 16 C38 16 34 12 35 6 Z" fill="#9CCC65"/>`,
  ),
  terms: svg(
    `<rect x="9" y="5" width="26" height="36" rx="3" fill="#FFF8E1" stroke="#FFCA28" stroke-width="2"/>` +
      `<rect x="14" y="12" width="16" height="3" rx="1.5" fill="#FFB300"/><rect x="14" y="19" width="16" height="2.6" rx="1.3" fill="#E0D2A8"/><rect x="14" y="25" width="12" height="2.6" rx="1.3" fill="#E0D2A8"/>` +
      `<path d="M30 42 L43 23 L46 25 L33 44 L29 45 Z" fill="#5C6BC0"/><path d="M43 23 L46 25 L47.4 23 L44.4 21 Z" fill="#EF5350"/>`,
  ),
  privacy: svg(
    `<path d="M24 4 L40 10 V22 C40 32 33 39 24 43 C15 39 8 32 8 22 V10 Z" fill="#42A5F5"/>` +
      `<path d="M24 4 L40 10 V22 C40 32 33 39 24 43 Z" fill="#1E88E5"/>` +
      `<rect x="17" y="21" width="14" height="11" rx="2.4" fill="#FFC93C"/>` +
      `<path d="M19.5 21 V18 a4.5 4.5 0 0 1 9 0 V21" stroke="#fff" stroke-width="2.4" fill="none"/><circle cx="24" cy="26.5" r="1.8" fill="#8D6E00"/>`,
  ),
  conditions: svg(
    `<rect x="8" y="8" width="32" height="36" rx="5" fill="#fff" stroke="#CFD8DC" stroke-width="2"/><rect x="17" y="4" width="14" height="8" rx="3" fill="#78909C"/>` +
      [18, 26, 34]
        .map(
          (y) =>
            `<circle cx="15" cy="${y}" r="3" fill="#7E57C2"/><path d="M13.6 ${y} L14.6 ${y + 1} L16.4 ${y - 1}" stroke="#fff" stroke-width="1.2" fill="none"/><rect x="21" y="${y - 1.4}" width="14" height="2.8" rx="1.4" fill="#D1C4E9"/>`,
        )
        .join(""),
  ),
  contact: svg(
    `<path d="M10 26 V22 a14 14 0 0 1 28 0 V26" stroke="#26A69A" stroke-width="3.6" fill="none"/>` +
      `<rect x="6" y="23" width="9" height="14" rx="4" fill="#00897B"/><rect x="33" y="23" width="9" height="14" rx="4" fill="#00897B"/>` +
      `<path d="M38 37 C38 42 33 44 27 44" stroke="#26A69A" stroke-width="2.6" fill="none" stroke-linecap="round"/><rect x="21" y="41" width="8" height="5" rx="2.5" fill="#FF7043"/>`,
  ),
  faq: svg(
    `<path d="M8 6 h32 a5 5 0 0 1 5 5 v19 a5 5 0 0 1 -5 5 H20 l-9 8 v-8 H8 a5 5 0 0 1 -5 -5 V11 a5 5 0 0 1 5 -5 Z" fill="#FFA726"/>` +
      `<path d="M19 16 a5 5 0 1 1 7 4.6 c-1.4 .8 -2 1.6 -2 3.4" stroke="#fff" stroke-width="3" fill="none" stroke-linecap="round"/><circle cx="24" cy="29" r="1.9" fill="#fff"/>`,
  ),
  page: menuArt.page,
} as const;

const pageMatchers: [RegExp, keyof typeof pageArt][] = [
  [/faq|question/i, "faq"],
  [/privacy/i, "privacy"],
  [/contact|support/i, "contact"],
  [/help/i, "help"],
  [/about/i, "about"],
  [/condition/i, "conditions"],
  [/term|policy|legal/i, "terms"],
];

export const getPageArt = (name: string) =>
  pageArt[pageMatchers.find(([re]) => re.test(name))?.[1] ?? "page"];

/** Home section badges and the tips illustration. */
export const homeArt = {
  glance: statIcons.area,
  records: pageArt.conditions,
  trending: svg(
    `<path d="M24 44 C14 44 8 37 8 29 C8 21 14 16 16 9 C19 13 20 16 20 20 C23 15 27 9 26 3 C35 9 40 18 40 28 C40 37 34 44 24 44 Z" fill="#FF7043"/>` +
      `<path d="M24 44 C18.5 44 15 40 15 35 C15 30 19 27 20 23 C22 26 23 28 23 31 C25 28 27 25 27 21 C31 25 33 30 33 35 C33 40 29 44 24 44 Z" fill="#FFCA28"/>`,
  ),
  deals: svg(
    `<path d="M6 8 a2 2 0 0 1 2 -2 H22 L43 27 a3 3 0 0 1 0 4.2 L31.2 43 a3 3 0 0 1 -4.2 0 L6 22 Z" fill="#EC407A"/>` +
      `<path d="M6 8 a2 2 0 0 1 2 -2 H22 L43 27 L35 35 Z" fill="#F06292" opacity=".6"/>` +
      `<circle cx="15" cy="15" r="3.6" fill="#fff"/>` +
      `<text x="27" y="31" font-size="11" font-weight="700" text-anchor="middle" fill="#fff" transform="rotate(45 27 28)">%</text>`,
  ),
  tips: svg(
    `<circle cx="24" cy="19" r="13" fill="#FFD54F"/><circle cx="24" cy="19" r="13" fill="none" stroke="#FFB300" stroke-width="2"/>` +
      `<path d="M24 28 V19" stroke="#558B2F" stroke-width="2" stroke-linecap="round"/>` +
      `<path d="M24 22 C20 22 18 19 18 16 C21 16 24 18 24 22 Z M24 20 C28 20 30 17 30 14 C27 14 24 16 24 20 Z" fill="#558B2F"/>` +
      `<rect x="18" y="32" width="12" height="4" rx="2" fill="#90A4AE"/><rect x="19" y="37.5" width="10" height="4" rx="2" fill="#78909C"/><rect x="21.5" y="43" width="5" height="2.6" rx="1.3" fill="#607D8B"/>`,
  ),
  /** Large lightbulb-with-sprout for the empty tips card (120×120). */
  tipsEmpty:
    `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 120 120">` +
    `<circle cx="60" cy="60" r="56" fill="#FFF8E1"/>` +
    [0, 45, 90, 135, 180, 225, 270, 315]
      .map(
        (a) =>
          `<rect x="58" y="10" width="4" height="10" rx="2" fill="#FFCA28" transform="rotate(${a} 60 48)"/>`,
      )
      .join("") +
    `<circle cx="60" cy="48" r="24" fill="#FFE082"/><circle cx="60" cy="48" r="24" fill="none" stroke="#FFB300" stroke-width="3"/>` +
    `<path d="M60 66 V48" stroke="#558B2F" stroke-width="3.4" stroke-linecap="round"/>` +
    `<path d="M60 54 C52 54 47 49 47 42 C54 42 60 46 60 54 Z" fill="#7CB342"/><path d="M60 50 C68 50 73 45 73 38 C66 38 60 42 60 50 Z" fill="#558B2F"/>` +
    `<rect x="48" y="76" width="24" height="7" rx="3.5" fill="#90A4AE"/><rect x="50" y="85" width="20" height="7" rx="3.5" fill="#78909C"/><rect x="54" y="94" width="12" height="5" rx="2.5" fill="#607D8B"/>` +
    `</svg>`,
} as const;

/** Pastel wash behind each tip card, keyed like `tipArt`. */
export const tipTint: Record<string, string> = {
  "protective-gear": "#EEF7EE",
  "early-irrigation": "#EDF6FD",
  "organic-fertilizers": "#FFF9E8",
  "weather-before-spraying": "#FFF4E8",
  default: "#F3F8EC",
};

/** Product categories and the products tab. */
export const productArt = {
  all: advisoryKindArt.harvest.art,
  sprays: advisoryKindArt.spray.art,
  irrigation: advisoryKindArt.fertigation.art,
  tools: advisoryKindArt.pruning.art,
  fertilizers: svg(
    `<path d="M10 12 Q24 6 38 12 L41 40 Q24 45 7 40 Z" fill="#BCAAA4"/>` +
      `<path d="M10 12 Q24 17 38 12 Q24 7 10 12 Z" fill="#A1887F"/>` +
      `<rect x="14" y="22" width="20" height="12" rx="3" fill="#fff"/>` +
      `<path d="M24 32 C24 28 22 26 19 25 C23 24 25 27 24 32 Z" fill="#7CB342"/><path d="M24 32 C25 27 27 25 30 24 C29 28 27 30 24 32 Z" fill="#558B2F"/>`,
  ),
  seeds: svg(
    `<path d="M6 40 Q24 33 42 40 V44 Q24 48 6 44 Z" fill="#8D6E63"/>` +
      `<path d="M24 40 V22" stroke="#558B2F" stroke-width="3" stroke-linecap="round"/>` +
      `<path d="M24 30 C15 30 11 24 11 17 C19 17 24 22 24 30 Z" fill="#8BC34A"/><path d="M24 25 C33 25 37 19 37 12 C29 12 24 17 24 25 Z" fill="#7CB342"/>`,
  ),
  other: svg(
    `<path d="M24 5 L42 14 V34 L24 43 L6 34 V14 Z" fill="#FFCC80"/><path d="M24 23 L42 14 V34 L24 43 Z" fill="#FFB74D"/>` +
      `<path d="M6 14 L24 23 L42 14 L24 5 Z" fill="#FFE0B2"/><path d="M15 9.5 L33 18.5 V25 L28 27.5 V21 L10 12 Z" fill="#E8A75A"/>`,
  ),
  /** Empty crate with a magnifier, for "no products found" (120×120). */
  empty:
    `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 120 120">` +
    `<circle cx="60" cy="60" r="56" fill="#F3F8EC"/>` +
    `<path d="M24 54 H90 L84 92 H30 Z" fill="#C68A4E"/><path d="M24 54 H90 V61 H24 Z" fill="#A86F38"/>` +
    `<path d="M40 61 L42 92 M57 61 V92 M74 61 L72 92 M27 76 H87" stroke="#A86F38" stroke-width="2.4"/>` +
    `<circle cx="80" cy="44" r="16" fill="#E3F2FD" stroke="#546E7A" stroke-width="5"/>` +
    `<path d="M92 56 L104 68" stroke="#546E7A" stroke-width="7" stroke-linecap="round"/>` +
    `<path d="M72 38 a9 9 0 0 1 8 -4" stroke="#fff" stroke-width="3" fill="none" stroke-linecap="round"/>` +
    `</svg>`,
} as const;

const categoryMatchers: [RegExp, keyof typeof productArt][] = [
  [/pestic|insectic|fungic|herbic|spray|chemical|protect/i, "sprays"],
  [/fertil|manure|nutrient|compost|organic|urea|npk/i, "fertilizers"],
  [/seed|plant|sapling|nursery|rootstock/i, "seeds"],
  [/irrigat|drip|water|pipe|sprinkler/i, "irrigation"],
  [/tool|equip|machin|prun|implement|hardware/i, "tools"],
];

/** Icon for a product category, matched by name since the API sends no type. */
export const getCategoryArt = (name: string) =>
  name === "All"
    ? productArt.all
    : productArt[
        categoryMatchers.find(([re]) => re.test(name))?.[1] ?? "other"
      ];

/** Home "Explore" shortcuts. */
export const exploreArt = {
  shop: svg(
    `<rect x="8" y="20" width="32" height="22" rx="2" fill="#FFF3E0"/>` +
      `<path d="M5 12 H43 L41 21 H7 Z" fill="#EF5350"/>` +
      `<path d="M12 12 L11 21 M19.5 12 L19 21 M28.5 12 L29 21 M36 12 L37 21" stroke="#fff" stroke-width="3"/>` +
      `<path d="M7 21 q3.4 4 6.8 0 q3.4 4 6.8 0 q3.4 4 6.8 0 q3.4 4 6.8 0 q3.4 4 6.8 0" fill="#C62828"/>` +
      `<rect x="13" y="28" width="9" height="14" rx="1.5" fill="#8D6E63"/><rect x="26" y="28" width="10" height="8" rx="1.5" fill="#81D4FA"/>` +
      `<rect x="10" y="6" width="28" height="6" rx="2" fill="#43A047"/>`,
  ),
  wishlist: svg(
    `<path d="M24 42 C24 42 5 30 5 17 a10 10 0 0 1 19 -4.4 A10 10 0 0 1 43 17 C43 30 24 42 24 42 Z" fill="#EC407A"/>` +
      `<path d="M12 14 a5 5 0 0 1 5 -3" stroke="#F8BBD0" stroke-width="3" fill="none" stroke-linecap="round"/>`,
  ),
  dashboard: svg(
    `<rect x="5" y="6" width="38" height="36" rx="6" fill="#fff" stroke="#CFD8DC" stroke-width="2"/>` +
      `<rect x="11" y="26" width="6" height="10" rx="1.5" fill="#81C784"/><rect x="21" y="18" width="6" height="18" rx="1.5" fill="#43A047"/><rect x="31" y="12" width="6" height="24" rx="1.5" fill="#2E7D32"/>` +
      `<path d="M10 22 L20 15 L28 17 L38 9" stroke="#FFB300" stroke-width="2.4" fill="none" stroke-linecap="round" stroke-linejoin="round"/>`,
  ),
} as const;

const miniTree = (x: number, y: number) =>
  `<path d="M${x - 1.4} ${y + 12} h2.8 v8 h-2.8 Z" fill="#8D5A3B"/><circle cx="${x}" cy="${y + 7}" r="8.5" fill="#43A047"/><circle cx="${x - 3}" cy="${y + 4}" r="3.2" fill="#81C784"/><circle cx="${x + 3}" cy="${y + 9}" r="1.6" fill="#E53935"/>`;

/** Orchard list controls: add button and filter sheet. */
export const filterArt = {
  add: svg(
    `<path d="M6 40 Q22 34 38 40 V44 Q22 48 6 44 Z" fill="#8D6E63"/>` +
      `<path d="M22 40 V24" stroke="#558B2F" stroke-width="3" stroke-linecap="round"/>` +
      `<path d="M22 31 C14 31 10 26 10 20 C17 20 22 24 22 31 Z" fill="#8BC34A"/><path d="M22 27 C30 27 34 22 34 16 C27 16 22 20 22 27 Z" fill="#7CB342"/>` +
      `<circle cx="37" cy="11" r="9" fill="#FFB300"/><path d="M37 6.5 V15.5 M32.5 11 H41.5" stroke="#fff" stroke-width="2.8" stroke-linecap="round"/>`,
  ),
  funnel: svg(
    `<path d="M5 8 H43 L28 25 V39 L20 44 V25 Z" fill="#66BB6A"/><path d="M5 8 H43 L39 12.5 H9 Z" fill="#43A047"/>` +
      `<path d="M12 14 L20 23" stroke="#C8E6C9" stroke-width="2.4" stroke-linecap="round"/>`,
  ),
  ownership: svg(
    `<circle cx="16" cy="18" r="11" fill="#FFC93C"/><circle cx="16" cy="18" r="4.4" fill="#FFF8E1"/>` +
      `<path d="M24 25 L41 42" stroke="#FFB300" stroke-width="6" stroke-linecap="round"/>` +
      `<path d="M33 34 L37 30 M37 38 L41 34" stroke="#FFB300" stroke-width="4.6" stroke-linecap="round"/>`,
  ),
  location: statIcons.district,
  pattern: svg(
    miniTree(13, 1) + miniTree(35, 1) + miniTree(13, 24) + miniTree(35, 24),
  ),
  sort: svg(
    `<path d="M15 40 V10 M7 18 L15 9 L23 18" stroke="#42A5F5" stroke-width="4" fill="none" stroke-linecap="round" stroke-linejoin="round"/>` +
      `<path d="M33 8 V38 M25 30 L33 39 L41 30" stroke="#FF7043" stroke-width="4" fill="none" stroke-linecap="round" stroke-linejoin="round"/>`,
  ),
} as const;

/** Farm dashboard metrics. */
const dashIcons = {
  warning: svg(
    `<path d="M24 5 L45 41 a2 2 0 0 1 -1.7 3 H4.7 A2 2 0 0 1 3 41 Z" fill="#FFB300"/>` +
      `<rect x="21.6" y="17" width="4.8" height="14" rx="2.4" fill="#fff"/><circle cx="24" cy="36.5" r="2.7" fill="#fff"/>`,
  ),
  book: svg(
    `<path d="M24 12 C18 8 10 8 4 10 V40 C10 38 18 38 24 42 Z" fill="#42A5F5"/><path d="M24 12 C30 8 38 8 44 10 V40 C38 38 30 38 24 42 Z" fill="#1E88E5"/>` +
      `<path d="M9 17 C13 16 17 16 20 18 M9 23 C13 22 17 22 20 24 M28 18 C31 16 35 16 39 17 M28 24 C31 22 35 22 39 23" stroke="#BBDEFB" stroke-width="2" fill="none" stroke-linecap="round"/>`,
  ),
  bug: svg(
    `<path d="M16 12 L12 6 M32 12 L36 6 M9 24 H3 M45 24 H39 M10 34 L4 38 M38 34 L44 38" stroke="#37474F" stroke-width="2.6" stroke-linecap="round"/>` +
      `<circle cx="24" cy="15" r="7" fill="#37474F"/><ellipse cx="24" cy="29" rx="15" ry="15" fill="#E53935"/>` +
      `<path d="M24 14 V44" stroke="#37474F" stroke-width="2.4"/><circle cx="17" cy="26" r="3" fill="#37474F"/><circle cx="31" cy="26" r="3" fill="#37474F"/><circle cx="18" cy="36" r="2.4" fill="#37474F"/><circle cx="30" cy="36" r="2.4" fill="#37474F"/>`,
  ),
  clock: svg(
    `<circle cx="24" cy="24" r="19" fill="#fff" stroke="#5C6BC0" stroke-width="4"/>` +
      `<path d="M24 13 V24 L31 29" stroke="#3949AB" stroke-width="3.4" fill="none" stroke-linecap="round" stroke-linejoin="round"/><circle cx="24" cy="24" r="2.4" fill="#3949AB"/>`,
  ),
  coins: svg(
    `<ellipse cx="20" cy="36" rx="14" ry="5" fill="#F9A825"/><rect x="6" y="28" width="28" height="8" fill="#F9A825"/><ellipse cx="20" cy="28" rx="14" ry="5" fill="#FFCA28"/>` +
      `<circle cx="32" cy="18" r="12" fill="#FFC107"/><circle cx="32" cy="18" r="8.6" fill="#FFD54F"/>` +
      `<text x="32" y="22.4" font-size="12" font-weight="700" text-anchor="middle" fill="#B26A00">₹</text>`,
  ),
  photo: svg(
    `<rect x="4" y="9" width="40" height="30" rx="5" fill="#E3F2FD"/><circle cx="34" cy="18" r="4" fill="#FFCA28"/>` +
      `<path d="M4 34 L17 21 L27 31 L32 26 L44 36 V34 a5 5 0 0 1 -5 5 H9 a5 5 0 0 1 -5 -5 Z" fill="#66BB6A"/>`,
  ),
  percent: svg(
    `<circle cx="24" cy="24" r="20" fill="#AB47BC"/><circle cx="17" cy="17" r="4.4" fill="#fff"/><circle cx="31" cy="31" r="4.4" fill="#fff"/>` +
      `<path d="M32 15 L16 33" stroke="#fff" stroke-width="3.6" stroke-linecap="round"/>`,
  ),
  piggy: svg(
    `<ellipse cx="23" cy="27" rx="17" ry="13" fill="#F48FB1"/><circle cx="38" cy="26" r="6" fill="#F8BBD0"/>` +
      `<circle cx="37" cy="25" r="1.2" fill="#AD1457"/><circle cx="40" cy="26" r="1.2" fill="#AD1457"/><circle cx="31" cy="21" r="1.8" fill="#4A148C"/>` +
      `<path d="M14 15 L17 9 L21 14 Z" fill="#EC407A"/><rect x="12" y="36" width="5" height="7" rx="2" fill="#EC407A"/><rect x="26" y="36" width="5" height="7" rx="2" fill="#EC407A"/>` +
      `<rect x="18" y="13" width="9" height="3" rx="1.5" fill="#AD1457"/><circle cx="22.5" cy="7" r="4" fill="#FFCA28"/>`,
  ),
  recycle: svg(
    `<path d="M24 6 L32 19 H16 Z" fill="#43A047"/><path d="M42 36 L34 49 L26 36 Z" fill="#66BB6A" transform="translate(0 -6)"/><path d="M6 36 L14 23 L22 36 Z" fill="#2E7D32" transform="translate(0 2)"/>` +
      `<path d="M30 14 L38 28 M34 38 H16 M11 30 L19 16" stroke="#81C784" stroke-width="3.4" stroke-linecap="round"/>`,
  ),
  tractor: svg(
    `<rect x="8" y="18" width="22" height="12" rx="3" fill="#43A047"/><rect x="22" y="8" width="13" height="14" rx="2" fill="#2E7D32"/><rect x="25" y="11" width="7" height="7" rx="1" fill="#B3E5FC"/>` +
      `<rect x="10" y="10" width="3" height="9" fill="#455A64"/><circle cx="31" cy="34" r="9" fill="#37474F"/><circle cx="31" cy="34" r="3.6" fill="#FDD835"/>` +
      `<circle cx="12" cy="36" r="6" fill="#37474F"/><circle cx="12" cy="36" r="2.4" fill="#FDD835"/>`,
  ),
  trend: svg(
    `<rect x="4" y="4" width="40" height="40" rx="8" fill="#E8F5E9"/>` +
      `<path d="M10 34 L19 24 L26 29 L38 15" stroke="#43A047" stroke-width="4" fill="none" stroke-linecap="round" stroke-linejoin="round"/>` +
      `<path d="M30 14 H39 V23" stroke="#43A047" stroke-width="4" fill="none" stroke-linecap="round" stroke-linejoin="round"/>`,
  ),
  users: svg(
    `<circle cx="32" cy="16" r="6" fill="#FFCC80"/><path d="M22 40 C22 31 26 27 32 27 C38 27 42 31 42 40 Z" fill="#42A5F5"/>` +
      `<circle cx="17" cy="17" r="7" fill="#F1C08F"/><path d="M5 42 C5 32 10 28 17 28 C24 28 29 32 29 42 Z" fill="#43A047"/>`,
  ),
  wallet: svg(
    `<rect x="5" y="12" width="38" height="28" rx="6" fill="#8D6E63"/><path d="M9 12 L30 5 L34 12 Z" fill="#66BB6A"/>` +
      `<rect x="28" y="21" width="15" height="10" rx="3" fill="#6D4C41"/><circle cx="34" cy="26" r="2.4" fill="#FFCA28"/>`,
  ),
  wheat: svg(
    `<path d="M24 44 V14" stroke="#C9A227" stroke-width="2.6" stroke-linecap="round"/>` +
      [12, 19, 26, 33]
        .map(
          (y) =>
            `<ellipse cx="19" cy="${y}" rx="5" ry="3" transform="rotate(-35 19 ${y})" fill="#FBC02D"/><ellipse cx="29" cy="${y}" rx="5" ry="3" transform="rotate(35 29 ${y})" fill="#F9A825"/>`,
        )
        .join("") +
      `<ellipse cx="24" cy="7" rx="3" ry="5" fill="#FBC02D"/>`,
  ),
} as const;

/** Colour icon for a dashboard metric, keyed by the lucide name the sections already use. */
const dashboardIconByName: Record<string, string> = {
  Activity: exploreArt.dashboard,
  AlertCircle: dashIcons.warning,
  AlertTriangle: dashIcons.warning,
  Bell: advisoryArt.bell,
  BellRing: advisoryArt.bell,
  BookOpen: dashIcons.book,
  Bug: dashIcons.bug,
  Calendar: statIcons.age,
  Clock: dashIcons.clock,
  CloudRain: weatherIcons.rain,
  DollarSign: dashIcons.coins,
  Droplets: metricIcons.humidity,
  Gauge: metricIcons.pressure,
  GaugeCircle: metricIcons.pressure,
  Image: dashIcons.photo,
  Leaf: productArt.seeds,
  MessageCircle: menuArt.discussion,
  Percent: dashIcons.percent,
  PiggyBank: dashIcons.piggy,
  Recycle: dashIcons.recycle,
  Shield: advisoryKindArt.spray.art,
  ShieldHalf: tipArt["protective-gear"],
  Tractor: dashIcons.tractor,
  TrendingUp: dashIcons.trend,
  Users: dashIcons.users,
  Wallet: dashIcons.wallet,
  Wheat: dashIcons.wheat,
};

export const getDashboardIcon = (name?: string) =>
  (name && dashboardIconByName[name]) || exploreArt.dashboard;

/** Detail-page tabs. */
export const dashboardTabArt = {
  resources: dashIcons.tractor,
  pestDisease: dashIcons.bug,
  nutrients: productArt.fertilizers,
  financial: dashIcons.wallet,
  advisory: menuArt.discussion,
  alerts: advisoryArt.bell,
} as const;

/** Pastel washes cycled across dashboard tiles. */
export const dashboardTints = [
  "#EAF5E4",
  "#FFF4E5",
  "#E6F3FC",
  "#FCE8F0",
  "#F1ECFA",
  "#FFF8E1",
];

/** Wishlist and cart. */
export const shoppingArt = {
  cart: svg(
    `<path d="M3 8 H10 L15 32 H38 L43 14 H12" stroke="#455A64" stroke-width="3.2" fill="none" stroke-linecap="round" stroke-linejoin="round"/>` +
      `<path d="M12.5 15 H41.5 L37.4 30 H15.6 Z" fill="#66BB6A"/>` +
      `<circle cx="18" cy="40" r="3.6" fill="#455A64"/><circle cx="35" cy="40" r="3.6" fill="#455A64"/>` +
      `<path d="M27 15 V10 M27 12 C24 9 21 10 20 11 C22 13 25 13 27 12 Z" stroke="#558B2F" stroke-width="1.6" fill="#8BC34A"/>`,
  ),
  /** Plain outline heart, matching the heart button on product cards. */
  heart: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" fill="none" stroke="#2d6b06" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>`,
  /** Empty-state pictures (120×120). */
  emptyCart:
    `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 120 120">` +
    `<circle cx="60" cy="60" r="56" fill="#EAF5E4"/>` +
    `<path d="M18 30 H30 L40 80 H88 L98 44 H34" stroke="#455A64" stroke-width="5" fill="none" stroke-linecap="round" stroke-linejoin="round"/>` +
    `<path d="M35 46 H95 L87.6 74 H41 Z" fill="#fff" stroke="#A5D6A7" stroke-width="2.4"/>` +
    `<path d="M52 46 L54 74 M66 46 V74 M80 46 L78 74 M38 60 H91" stroke="#C8E6C9" stroke-width="2"/>` +
    `<circle cx="46" cy="92" r="6.4" fill="#455A64"/><circle cx="82" cy="92" r="6.4" fill="#455A64"/>` +
    `<path d="M66 44 V28" stroke="#558B2F" stroke-width="3" stroke-linecap="round"/>` +
    `<path d="M66 36 C58 36 54 31 54 25 C61 25 66 29 66 36 Z" fill="#8BC34A"/><path d="M66 32 C74 32 78 27 78 21 C71 21 66 25 66 32 Z" fill="#7CB342"/>` +
    `</svg>`,
} as const;

/** Orders: status icons and empty states. */
export const orderArt = {
  truck: svg(
    `<rect x="3" y="12" width="26" height="20" rx="3" fill="#43A047"/><path d="M29 18 H37 L44 26 V32 H29 Z" fill="#2E7D32"/>` +
      `<path d="M31 20 H36 L40.5 25.5 H31 Z" fill="#B3E5FC"/><rect x="7" y="16" width="10" height="3" rx="1.5" fill="#A5D6A7"/>` +
      `<circle cx="12" cy="35" r="5" fill="#37474F"/><circle cx="12" cy="35" r="2" fill="#ECEFF1"/><circle cx="36" cy="35" r="5" fill="#37474F"/><circle cx="36" cy="35" r="2" fill="#ECEFF1"/>`,
  ),
  delivered: svg(
    `<circle cx="24" cy="24" r="19" fill="#43A047"/><path d="M15 24.5 L21.5 31 L33.5 18" stroke="#fff" stroke-width="4.4" fill="none" stroke-linecap="round" stroke-linejoin="round"/>`,
  ),
  cancelled: svg(
    `<circle cx="24" cy="24" r="19" fill="#E53935"/><path d="M17 17 L31 31 M31 17 L17 31" stroke="#fff" stroke-width="4.4" stroke-linecap="round"/>`,
  ),
  packed: productArt.other,
  pending: dashIcons.clock,
  all: menuArt.orders,
  /** Open parcel with a sprout, for "no orders yet" (120×120). */
  empty:
    `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 120 120">` +
    `<circle cx="60" cy="60" r="56" fill="#FFF4E5"/>` +
    `<path d="M26 52 L60 64 V100 L26 88 Z" fill="#E8A75A"/><path d="M94 52 L60 64 V100 L94 88 Z" fill="#D18B3E"/>` +
    `<path d="M26 52 L14 66 L48 78 L60 64 Z" fill="#FFCC80"/><path d="M94 52 L106 66 L72 78 L60 64 Z" fill="#FFB74D"/>` +
    `<path d="M60 62 V38" stroke="#558B2F" stroke-width="3.4" stroke-linecap="round"/>` +
    `<path d="M60 50 C51 50 46 44 46 37 C54 37 60 42 60 50 Z" fill="#8BC34A"/><path d="M60 46 C69 46 74 40 74 33 C66 33 60 38 60 46 Z" fill="#7CB342"/>` +
    `</svg>`,
} as const;

const orderStatusMatchers: [RegExp, keyof typeof orderArt, string][] = [
  [/cancel|reject|fail|return/i, "cancelled", "#FDECEC"],
  [/deliver|complete/i, "delivered", "#EAF5E4"],
  [/ship|dispatch|transit|out for/i, "truck", "#E6F3FC"],
  [/pack|process|confirm|accept/i, "packed", "#FFF4E5"],
  [/pend|place|new|await/i, "pending", "#F1ECFA"],
];

/** Icon and pastel for an order status, matched by its name from the API. */
export const getOrderStatusArt = (name?: string | null) => {
  if (!name || name === "All") return { art: orderArt.all, tint: "#FFEDE8" };
  const match = orderStatusMatchers.find(([re]) => re.test(name));
  return match
    ? { art: orderArt[match[1]], tint: match[2] }
    : { art: orderArt.packed, tint: "#FFF4E5" };
};

/** Notifications. */
export const notificationArt = {
  /** Sleeping bell, for an empty inbox (120×120). */
  empty:
    `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 120 120">` +
    `<circle cx="60" cy="60" r="56" fill="#FFF8E1"/>` +
    `<path d="M60 26 C46 26 39 37 39 49 V64 L32 74 H88 L81 64 V49 C81 37 74 26 60 26 Z" fill="#FFC93C"/>` +
    `<path d="M60 26 C74 26 81 37 81 49 V64 L88 74 H60 Z" fill="#FFB300"/>` +
    `<path d="M51 80 a9 9 0 0 0 18 0 Z" fill="#8D6E63"/><rect x="56" y="19" width="8" height="9" rx="4" fill="#FFB300"/>` +
    `<path d="M50 52 q4 3 8 0 M64 52 q4 3 8 0" stroke="#8D6E00" stroke-width="2.4" fill="none" stroke-linecap="round"/>` +
    `<text x="90" y="36" font-size="13" font-weight="700" fill="#90A4AE">z</text><text x="98" y="26" font-size="10" font-weight="700" fill="#B0BEC5">z</text>` +
    `</svg>`,
};

const notificationMatchers: [RegExp, () => { art: string; tint: string }][] = [
  [
    /spray|pesticide|fungicide/i,
    () => ({
      art: advisoryKindArt.spray.art,
      tint: advisoryKindArt.spray.tile,
    }),
  ],
  [
    /fertig|fertili|nutrient/i,
    () => ({
      art: advisoryKindArt.fertigation.art,
      tint: advisoryKindArt.fertigation.tile,
    }),
  ],
  [
    /prun/i,
    () => ({
      art: advisoryKindArt.pruning.art,
      tint: advisoryKindArt.pruning.tile,
    }),
  ],
  [
    /harvest/i,
    () => ({
      art: advisoryKindArt.harvest.art,
      tint: advisoryKindArt.harvest.tile,
    }),
  ],
  [/deliver/i, () => ({ art: orderArt.delivered, tint: "#EAF5E4" })],
  [/ship|dispatch|transit/i, () => ({ art: orderArt.truck, tint: "#E6F3FC" })],
  [/order|payment|refund/i, () => ({ art: menuArt.orders, tint: "#FFEDE8" })],
  [/snow|frost/i, () => ({ art: weatherIcons.snow, tint: "#E6F3FC" })],
  [/storm|thunder|hail/i, () => ({ art: weatherIcons.storm, tint: "#ECEFF1" })],
  [
    /rain|weather|forecast/i,
    () => ({ art: weatherIcons.rain, tint: "#E6F3FC" }),
  ],
  [/advisor/i, () => ({ art: menuArt.discussion, tint: "#E9F7EF" })],
];

/** Icon and pastel for a notification, picked from its title and body. */
export const getNotificationArt = (title = "", body = "") => {
  const text = `${title} ${body}`;
  const match = notificationMatchers.find(([re]) => re.test(text));
  return match ? match[1]() : { art: advisoryArt.bell, tint: "#FFF8E1" };
};

/** Payment methods, keyed by the API's method values. */
export const paymentArt: Record<string, string> = {
  BuyOnCredit: svg(
    `<rect x="4" y="11" width="40" height="27" rx="5" fill="#5C6BC0"/><rect x="4" y="17" width="40" height="6" fill="#283593"/>` +
      `<rect x="9" y="28" width="12" height="4" rx="2" fill="#C5CAE9"/><circle cx="33" cy="30.5" r="4" fill="#FFB300"/><circle cx="37.5" cy="30.5" r="4" fill="#FF7043" opacity=".85"/>`,
  ),
  CashOnDelivery: svg(
    `<rect x="7" y="9" width="36" height="22" rx="4" fill="#81C784"/>` +
      `<rect x="4" y="14" width="36" height="22" rx="4" fill="#43A047"/><circle cx="22" cy="25" r="5.4" fill="#A5D6A7"/>` +
      `<text x="22" y="28.4" font-size="8" font-weight="700" text-anchor="middle" fill="#1B5E20">₹</text>` +
      `<circle cx="36" cy="38" r="7" fill="#FFC107"/><circle cx="36" cy="38" r="4.6" fill="#FFD54F"/>`,
  ),
  RazorPay: svg(
    `<rect x="13" y="4" width="22" height="40" rx="5" fill="#37474F"/><rect x="15.5" y="9" width="17" height="28" rx="2" fill="#E3F2FD"/>` +
      `<circle cx="24" cy="40.5" r="1.6" fill="#90A4AE"/>` +
      `<circle cx="24" cy="21" r="6" fill="#1E88E5"/><path d="M21.2 21 L23.2 23 L26.8 19" stroke="#fff" stroke-width="1.8" fill="none" stroke-linecap="round" stroke-linejoin="round"/>` +
      `<rect x="18.5" y="30" width="11" height="2.4" rx="1.2" fill="#90CAF9"/>`,
  ),
};
paymentArt.CoD = paymentArt.CashOnDelivery;
