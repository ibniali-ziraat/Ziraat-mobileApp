import type { WeatherEffect } from "@/src/modules/home/utils/weatherPictogram";
import { tree, type Variant } from "./illustrations";

/**
 * Flat valley scenes for the weather cards — one per condition, day and night
 * for clear skies. Drawn as SVG so the whole set costs a few KB instead of a
 * photo per condition. The sky art sits on the right: the cards put their
 * text on the left.
 */

type Palette = {
  sky: [string, string];
  mountain: string;
  snowCaps: boolean;
  hills: [string, string, string];
  trees: Variant;
};

const leaves = (
  leaf: string,
  leafLight: string,
  leafDark: string,
  fruit: string | null = null,
): Variant => ({
  key: "weather",
  label: "",
  tile: "",
  leaf,
  leafLight,
  leafDark,
  fruit,
});

const palettes: Record<
  "clearDay" | "clearNight" | Exclude<WeatherEffect, "clear">,
  Palette
> = {
  clearDay: {
    sky: ["#6EC1F2", "#D9F1FF"],
    mountain: "#8DB6D6",
    snowCaps: true,
    hills: ["#9CCC65", "#7CB342", "#558B2F"],
    trees: leaves("#4CAF50", "#81C784", "#2E7D32", "#E53935"),
  },
  clearNight: {
    sky: ["#0E1A3A", "#2C4277"],
    mountain: "#2B4166",
    snowCaps: true,
    hills: ["#2E5135", "#25452B", "#1A3520"],
    trees: leaves("#2F5A3A", "#3F6E4B", "#20402A"),
  },
  cloudy: {
    sky: ["#97B2C8", "#DDE7EF"],
    mountain: "#93A9BC",
    snowCaps: true,
    hills: ["#93B866", "#739E4A", "#587F37"],
    trees: leaves("#5B9A4A", "#86B874", "#3E7432"),
  },
  fog: {
    sky: ["#C3CED7", "#EAEFF2"],
    mountain: "#B6C4CE",
    snowCaps: false,
    hills: ["#A9BE98", "#8FA87D", "#768F65"],
    trees: leaves("#7E9D6E", "#A0BB91", "#62805A"),
  },
  rain: {
    sky: ["#5B7690", "#A7BACB"],
    mountain: "#71879A",
    snowCaps: false,
    hills: ["#71A04C", "#5A863B", "#456B2D"],
    trees: leaves("#4E8B3F", "#6FA65C", "#356A2C"),
  },
  storm: {
    sky: ["#28344A", "#56677D"],
    mountain: "#465569",
    snowCaps: false,
    hills: ["#4D6E3B", "#3E5C2F", "#304A24"],
    trees: leaves("#3D6B35", "#507F46", "#2A5126"),
  },
  snow: {
    sky: ["#AFC6DD", "#EAF2F9"],
    mountain: "#C9D8E6",
    snowCaps: true,
    hills: ["#FFFFFF", "#EEF3F8", "#E1E9F1"],
    trees: leaves("#3E7B47", "#5E9864", "#2B5E34"),
  },
};

const cloud = (x: number, y: number, s: number, body: string, top: string) =>
  `<g><rect x="${x - 22 * s}" y="${y - 2 * s}" width="${44 * s}" height="${12 * s}" rx="${6 * s}" fill="${body}"/>` +
  `<circle cx="${x - 9 * s}" cy="${y - 1 * s}" r="${9 * s}" fill="${body}"/><circle cx="${x + 6 * s}" cy="${y - 5 * s}" r="${12 * s}" fill="${body}"/>` +
  `<circle cx="${x + 3 * s}" cy="${y - 9 * s}" r="${7 * s}" fill="${top}"/></g>`;

const cap = (x: number, y: number) =>
  `<path d="M${x} ${y} L${x + 14} ${y + 13} L${x + 7} ${y + 11} L${x} ${y + 17} L${x - 7} ${y + 11} L${x - 14} ${y + 13} Z" fill="#fff"/>`;

const snowCap = (x: number, y: number, s: number) =>
  `<ellipse cx="${x - 2 * s}" cy="${y - 48 * s}" rx="${13 * s}" ry="${6 * s}" fill="#fff"/>`;

const BACK_ROW = [20, 60, 100, 140, 180, 220, 260, 300, 340, 380];
const FRONT_ROW = [30, 100, 170, 240, 310, 380];

// No sun or moon in the sky: every card that shows a scene also shows the
// condition icon over its right side, and the two would read as a pair.
function sky(effect: WeatherEffect, isDaylight: boolean) {
  switch (effect) {
    case "clear":
      return isDaylight
        ? cloud(130, 40, 0.8, "#fff", "#fff") +
            cloud(360, 62, 0.6, "#fff", "#fff")
        : [
            [40, 22, 1.4],
            [92, 46, 1],
            [150, 18, 1.2],
            [200, 40, 0.9],
            [244, 16, 1.3],
            [352, 30, 1],
            [380, 60, 1.2],
            [118, 70, 0.8],
            [228, 66, 0.8],
          ]
            .map(
              ([x, y, r]) =>
                `<circle cx="${x}" cy="${y}" r="${r}" fill="#fff" opacity=".85"/>`,
            )
            .join("");
    case "cloudy":
      return (
        cloud(312, 52, 1.1, "#F4F7FA", "#fff") +
        cloud(200, 34, 0.9, "#E6EDF3", "#F7FAFC") +
        cloud(90, 52, 0.8, "#F4F7FA", "#fff")
      );
    case "fog":
      return cloud(300, 44, 0.9, "#F1F4F6", "#fff");
    case "rain":
      return (
        cloud(90, 30, 1.1, "#8E9DAA", "#A5B2BD") +
        cloud(205, 34, 1.3, "#8E9DAA", "#A5B2BD") +
        cloud(305, 40, 1.7, "#7F909E", "#97A6B2") +
        [
          [272, 62],
          [286, 74],
          [300, 64],
          [314, 76],
          [328, 62],
          [342, 72],
          [190, 54],
          [204, 66],
          [218, 56],
          [76, 48],
          [96, 60],
          [110, 86],
          [360, 90],
          [240, 92],
          [150, 76],
        ]
          .map(
            ([x, y]) =>
              `<path d="M${x} ${y} l-4 10" stroke="#DCEBFA" stroke-width="1.8" stroke-linecap="round" opacity=".85"/>`,
          )
          .join("")
      );
    case "storm":
      return (
        cloud(80, 28, 1.1, "#465364", "#5A6778") +
        cloud(190, 32, 1.35, "#465364", "#5A6778") +
        cloud(300, 38, 1.75, "#3C4858", "#4F5C6C") +
        `<path d="M296 54 L282 82 L294 82 L285 108 L312 72 L299 72 L309 54 Z" fill="#FFD54F"/>` +
        [
          [262, 62],
          [330, 66],
          [346, 58],
          [176, 52],
          [204, 56],
          [70, 44],
          [92, 50],
        ]
          .map(
            ([x, y]) =>
              `<path d="M${x} ${y} l-4 10" stroke="#C9D6E6" stroke-width="1.6" stroke-linecap="round" opacity=".8"/>`,
          )
          .join("")
      );
    case "snow":
      return (
        cloud(300, 40, 1.1, "#F2F6FA", "#fff") +
        [
          [270, 62, 2],
          [292, 74, 1.6],
          [318, 66, 2.2],
          [336, 80, 1.6],
          [60, 40, 1.8],
          [110, 70, 2],
          [160, 30, 1.6],
          [208, 56, 2.2],
          [240, 84, 1.6],
          [372, 50, 1.8],
          [30, 80, 1.6],
          [140, 96, 1.8],
        ]
          .map(
            ([x, y, r]) => `<circle cx="${x}" cy="${y}" r="${r}" fill="#fff"/>`,
          )
          .join("")
      );
  }
}

function build(effect: WeatherEffect, isDaylight: boolean) {
  const key =
    effect === "clear" ? (isDaylight ? "clearDay" : "clearNight") : effect;
  const p = palettes[key];
  const snowy = effect === "snow";

  const backTrees = BACK_ROW.map(
    (x) =>
      tree(x, 112, 0.38, p.trees, !snowy) +
      (snowy ? snowCap(x, 112, 0.38) : ""),
  ).join("");
  const frontTrees = FRONT_ROW.map(
    (x) =>
      tree(x, 134, 0.52, p.trees, !snowy) +
      (snowy ? snowCap(x, 134, 0.52) : ""),
  ).join("");

  const fog =
    effect === "fog"
      ? `<g fill="#fff"><rect x="-20" y="78" width="250" height="12" rx="6" opacity=".55"/><rect x="170" y="96" width="260" height="12" rx="6" opacity=".55"/><rect x="-10" y="116" width="300" height="14" rx="7" opacity=".5"/><rect x="230" y="134" width="200" height="10" rx="5" opacity=".45"/></g>`
      : "";

  return (
    `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 150" preserveAspectRatio="xMidYMid slice">` +
    // Banded, not a gradient fill — see the sky note in illustrations.ts.
    `<rect width="400" height="150" fill="${p.sky[0]}"/>` +
    `<rect y="40" width="400" height="110" fill="${p.sky[1]}" opacity=".35"/>` +
    `<rect y="70" width="400" height="80" fill="${p.sky[1]}" opacity=".55"/>` +
    sky(effect, isDaylight) +
    `<path d="M0 92 L44 58 L80 84 L132 40 L186 88 L238 50 L290 82 L344 46 L400 76 L400 150 L0 150 Z" fill="${p.mountain}"/>` +
    (p.snowCaps
      ? cap(44, 58) + cap(132, 40) + cap(238, 50) + cap(344, 46)
      : "") +
    `<path d="M0 108 Q100 90 200 106 T400 100 L400 150 L0 150 Z" fill="${p.hills[0]}"/>` +
    backTrees +
    `<path d="M0 128 Q120 112 240 128 T400 124 L400 150 L0 150 Z" fill="${p.hills[1]}"/>` +
    frontTrees +
    `<path d="M0 142 Q140 134 260 144 T400 140 L400 150 L0 150 Z" fill="${p.hills[2]}"/>` +
    fog +
    `</svg>`
  );
}

const cache = new Map<string, string>();

/** Valley scene for the current weather; built once per condition. */
export function getWeatherScene(
  effect: WeatherEffect,
  isDaylight: boolean,
): string {
  const key = `${effect}-${effect === "clear" && !isDaylight ? "night" : "day"}`;
  let xml = cache.get(key);
  if (!xml) {
    xml = build(effect, isDaylight);
    cache.set(key, xml);
  }
  return xml;
}
