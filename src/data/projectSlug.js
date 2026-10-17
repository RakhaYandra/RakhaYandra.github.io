// Stable anchor ids so the CV can deep-link flagship case studies.
export const projectSlug = (title) => {
  if (title.startsWith("Fukurou —")) return "project-fukurou";
  if (title.startsWith("Kage —")) return "project-kage";
  if (title.startsWith("Mamori —")) return "project-mamori";
  if (title.startsWith("Neko —")) return "project-neko";
  if (title.startsWith("Omarchy-neko —")) return "project-omarchy-neko";
  if (title.startsWith("Tora —")) return "project-tora";
  if (title.startsWith("Ookami —")) return "project-ookami";
  if (title.startsWith("Kitsune —")) return "project-kitsune";
  if (title.startsWith("Tanuki —")) return "project-tanuki";
  if (title.startsWith("LANBox —")) return "project-lanbox";
  if (title.startsWith("Pulse —")) return "project-pulse";
  if (title.startsWith("Shiftbase —")) return "project-shiftbase";
  if (title.startsWith("LifeOS —")) return "project-lifeos";
  if (title.startsWith("Air Quality")) return "project-thesis";
  if (title.startsWith("KosManager —")) return "project-kosmanager-dotnet";
  if (title.startsWith("Horticultural")) return "project-capstone";
  return undefined;
};
