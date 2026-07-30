export const VARIETIES_OPTIONS = [
  "Red Delicious",
  "Golden Delicious",
  "Gala",
  "Fuji",
  "Honeycrisp",
  "Ambri",
  "Other",
].map((v) => ({ label: v, value: v }));

export const EQUIPMENT_OPTIONS = [
  "Tractor",
  "Sprayer",
  "Grading Line",
  "Power Weeder",
  "Weather Station",
  "Sensors",
  "Rotavator",
  "Plough",
  "Other",
].map((x) => ({ label: x, value: x }));

export const STORAGE_OPTIONS = [
  "Cold Storage",
  "CA Storage",
  "Open Storage",
  "On-farm Shed",
  "Other",
].map((x) => ({ label: x, value: x }));

export const LABOR_OPTIONS = ["Permanent", "Seasonal", "Contract-based"].map(
  (x) => ({
    label: x,
    value: x,
  }),
);
export const YES_NO_OPTIONS = [
  { value: true, label: "Yes" },
  { value: false, label: "No" },
];

export const applicationModeOptions = [
  "Soil Application",
  "Foliar Application",
].map((v) => ({ label: v, value: v }));
export const equipmentOptions = [
  "Tractor",
  "Sprayer",
  "Grading Line",
  "Power Weeder",
  "Weather Station",
  "Sensors",
  "Rotavator",
  "Plough",
  "Other",
].map((x) => ({ label: x, value: x }));

export const storageOptions = [
  "Cold Storage",
  "CA Storage",
  "Open Storage",
  "On-farm Shed",
  "Other",
].map((x) => ({ label: x, value: x }));

export const laborOptions = ["Permanent", "Seasonal", "Contract-based"].map(
  (x) => ({
    label: x,
    value: x,
  }),
);

export const TOOLS = ["Tractor", "Hoe", "Other"].map((x) => ({
  label: x,
  value: x,
}));
export const schemeOptions = [
  "Subsidy",
  "Crop Insurance",
  "Horticulture Mission Support",
  "PM-Kisan Support",
  "Other",
] as const;

export const certificationOptions = [
  "Organic",
  "GAP",
  "Fair Trade",
  "Global GAP",
  "Other",
] as const;

export const digitalToolOptions = [
  "Weather Apps",
  "Advisory Apps",
  "Farm Management Tools",
  "Soil Health Apps",
  "Mobile-based Irrigation Advisory",
  "Other",
] as const;
export const digitalToolOpt = digitalToolOptions.map((x) => ({
  label: x,
  value: x,
}));
export const certOpts = certificationOptions.map((x) => ({
  label: x,
  value: x,
}));
// export const yesNoOpt = yesNoOptions.map((x) => ({ label: x, value: x }));

export const GOVT_SCHEMES = [
  "Subsidy",
  "Crop Insurance",
  "Horticulture Mission Support",
  "PM-Kisan Support",
  "Other",
].map((x) => ({ label: x, value: x }));
export const supplierOptions = [
  "Village Level",
  "From Town",
  "From City",
  "Online Mostly",
].map((x) => ({
  label: x,
  value: x,
}));

export const paymentOptions = ["Credit Purchase", "Cash Purchase", "Mixed"].map(
  (x) => ({
    label: x,
    value: x,
  }),
);

export const creditOptions = ["Month", "Crop Season", "No Limits"].map((x) => ({
  label: x,
  value: x,
}));
export const DISEASE_LIST = [
  "Scab",
  "Alternaria",
  "Powdery Mildew",
  "Fire Blight",
  "Marssonina",
  "Root Rot",
].map((x) => ({ label: x, value: x }));

export const PEST_LIST = [
  "Aphids",
  "Mites",
  "Codling Moth",
  "Leaf Miner",
  "San Jose Scale",
  "Borers",
].map((x) => ({ label: x, value: x }));
export const VARIETIES_LIST = [
  "Red Delicious",
  "Golden Delicious",
  "Gala",
  "Fuji",
  "Honeycrisp",
  "Ambri",
  "Other",
].map((v) => ({ label: v, value: v }));

/**
 * Every ownership type an orchard can be registered under. Used both by the
 * registration form and by the orchard-list filter, so the filter can never
 * drift out of sync with what the form can actually produce.
 */
export const OWNERSHIP_TYPES = [
  "Self-Owned",
  "Joint",
  "Leased",
  "Rented",
  "Other",
] as const;

export const OWNERSHIP_TYPE_OPTIONS = OWNERSHIP_TYPES.map((x) => ({
  label: x,
  value: x,
}));
