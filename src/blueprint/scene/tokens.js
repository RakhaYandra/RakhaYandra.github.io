export function readTokens() {
  const styles = getComputedStyle(document.documentElement);
  const get = (name) => styles.getPropertyValue(name).trim();
  return {
    dark: document.documentElement.getAttribute("data-theme") === "dark",
    bg: get("--color-bg-primary"),
    paper: get("--color-bg-secondary"),
    ink: get("--color-text-primary"),
    muted: get("--color-text-muted"),
    line: get("--color-border"),
    lineStrong: get("--color-border-strong"),
    accent: get("--color-accent"),
  };
}
