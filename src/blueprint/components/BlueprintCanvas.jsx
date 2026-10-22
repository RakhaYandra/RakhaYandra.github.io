import { useEffect, useRef } from "react";
import styles from "./BlueprintCanvas.module.css";
import { createBlueprintScene } from "../scene/blueprintScene";
import { readTokens } from "../scene/tokens";
import { PLAN, ZONES } from "../data/zones";

export function BlueprintCanvas({ activeZone, theme, onHover, onSelect, onReady }) {
  const canvasRef = useRef(null);
  const sceneRef = useRef(null);
  const callbacksRef = useRef({ onHover, onSelect, onReady });
  callbacksRef.current = { onHover, onSelect, onReady };

  useEffect(() => {
    const reducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    const scene = createBlueprintScene({
      canvas: canvasRef.current,
      zones: ZONES,
      plan: PLAN,
      tokens: readTokens(),
      reducedMotion,
      onHover: (key) => callbacksRef.current.onHover?.(key),
      onSelect: (key) => callbacksRef.current.onSelect?.(key),
      onReady: () => callbacksRef.current.onReady?.(),
    });
    sceneRef.current = scene;
    return () => {
      scene.dispose();
      sceneRef.current = null;
    };
  }, []);

  useEffect(() => {
    const frame = requestAnimationFrame(() =>
      sceneRef.current?.setTheme(readTokens())
    );
    return () => cancelAnimationFrame(frame);
  }, [theme]);

  useEffect(() => {
    sceneRef.current?.setInteractionEnabled(!activeZone);
    if (activeZone) sceneRef.current?.focus(activeZone);
    else sceneRef.current?.reset();
  }, [activeZone]);

  return (
    <div className={styles.stage}>
      <canvas
        ref={canvasRef}
        className={styles.canvas}
        role="img"
        aria-label="Interactive 3D blueprint of the CV. Use the zone list for keyboard navigation."
      />
    </div>
  );
}
