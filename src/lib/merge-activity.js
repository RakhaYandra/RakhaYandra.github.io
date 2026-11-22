const quantile = (sorted, p) =>
  sorted[Math.min(sorted.length - 1, Math.floor(p * (sorted.length - 1)))];

export function mergeContributions(lists) {
  const byDate = new Map();

  for (const list of lists) {
    for (const day of list ?? []) {
      const entry = byDate.get(day.date) ?? { date: day.date, count: 0 };
      entry.count += day.count;
      byDate.set(day.date, entry);
    }
  }

  const days = [...byDate.values()].sort((a, b) => a.date.localeCompare(b.date));
  const counts = days
    .map((day) => day.count)
    .filter((count) => count > 0)
    .sort((a, b) => a - b);

  if (!counts.length) return days.map((day) => ({ ...day, level: 0 }));

  const q1 = quantile(counts, 0.25);
  const q2 = quantile(counts, 0.5);
  const q3 = quantile(counts, 0.75);

  return days.map((day) => ({
    ...day,
    level:
      day.count === 0
        ? 0
        : day.count <= q1
          ? 1
          : day.count <= q2
            ? 2
            : day.count <= q3
              ? 3
              : 4,
  }));
}
