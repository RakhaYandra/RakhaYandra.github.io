export const PLAN = { width: 22, depth: 14 };

export const ZONES = [
  { key: "about", label: "About", code: "Z-01", x: -6.6, z: -3.6, w: 6.2, d: 3.6 },
  { key: "experience", label: "Experience", code: "Z-02", x: 0.2, z: -3.6, w: 6.4, d: 3.6 },
  { key: "skills", label: "Skills", code: "Z-03", x: 6.9, z: -3.6, w: 4.8, d: 3.6 },
  { key: "projects", label: "Projects", code: "Z-04", x: -4.4, z: 2.4, w: 9.6, d: 4.2 },
  { key: "other", label: "Other", code: "Z-05", x: 5.4, z: 2.4, w: 7.0, d: 4.2 },
];

export const ZONE_INDEX = Object.fromEntries(ZONES.map((zone) => [zone.key, zone]));
