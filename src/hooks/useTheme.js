import { useCallback, useEffect, useState } from "react";

const STORAGE_KEY = "porto-theme";
const DARK_BG = "#000000";
const LIGHT_BG = "#fbfbfb";

function systemPrefersDark() {
  return (
    typeof window !== "undefined" &&
    typeof window.matchMedia === "function" &&
    window.matchMedia("(prefers-color-scheme: dark)").matches
  );
}

function readStored() {
  try {
    const v = localStorage.getItem(STORAGE_KEY);
    return v === "dark" || v === "light" ? v : null;
  } catch {
    return null;
  }
}

export function resolveTheme() {
  const stored = readStored();
  if (stored) return stored;
  return systemPrefersDark() ? "dark" : "light";
}

export function applyTheme(theme) {
  const root = document.documentElement;
  root.setAttribute("data-theme", theme);
  root.classList.toggle("dark", theme === "dark");
  const meta = document.querySelector('meta[name="theme-color"]');
  if (meta) meta.setAttribute("content", theme === "dark" ? DARK_BG : LIGHT_BG);
}

export function useTheme() {
  const [theme, setTheme] = useState(() => resolveTheme());

  useEffect(() => {
    applyTheme(theme);
  }, [theme]);

  // Ikuti OS bila user belum override manual
  useEffect(() => {
    if (typeof window === "undefined" || typeof window.matchMedia !== "function")
      return;
    const mq = window.matchMedia("(prefers-color-scheme: dark)");
    const onChange = (e) => {
      if (!readStored()) setTheme(e.matches ? "dark" : "light");
    };
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);

  const toggle = useCallback(() => {
    setTheme((prev) => {
      const next = prev === "dark" ? "light" : "dark";
      try {
        localStorage.setItem(STORAGE_KEY, next);
      } catch {
        /* abaikan */
      }
      return next;
    });
  }, []);

  return { theme, toggle };
}
