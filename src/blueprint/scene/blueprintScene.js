import { animate } from "motion";
import {
  EffectComposer,
  EffectPass,
  RenderPass,
  SelectiveBloomEffect,
} from "postprocessing";
import * as THREE from "three";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";
import {
  CSS2DObject,
  CSS2DRenderer,
} from "three/addons/renderers/CSS2DRenderer.js";
import { createBlockTexture, createBoardTexture } from "./textures.js";
import "./labels.css";

const FOV = 32;
const BLOCK_HEIGHT = 0.36;
const HOVER_LIFT = 0.9;
const MOVE_DURATION = 700;
const CAM_DIR = new THREE.Vector3(0, 1.05, 1).normalize();

const lerp = (a, b, t) => a + (b - a) * t;

export function createBlueprintScene({
  canvas,
  zones,
  plan,
  tokens,
  reducedMotion = false,
  onHover = () => {},
  onSelect = () => {},
  onReady = () => {},
}) {
  const renderer = new THREE.WebGLRenderer({
    canvas,
    antialias: true,
    alpha: false,
    powerPreference: "high-performance",
  });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));

  const scene = new THREE.Scene();
  scene.background = new THREE.Color(tokens.bg);

  const labelRenderer = new CSS2DRenderer();
  labelRenderer.domElement.className = "bp-labels";
  canvas.parentElement.appendChild(labelRenderer.domElement);

  const camera = new THREE.PerspectiveCamera(FOV, 1, 0.1, 300);
  const controls = new OrbitControls(camera, canvas);
  controls.enableRotate = false;
  controls.enablePan = true;
  controls.screenSpacePanning = true;
  controls.enableDamping = true;
  controls.dampingFactor = 0.09;
  controls.zoomSpeed = 0.8;
  controls.minDistance = 7;
  controls.maxDistance = 110;
  controls.mouseButtons = {
    LEFT: THREE.MOUSE.PAN,
    MIDDLE: THREE.MOUSE.DOLLY,
    RIGHT: THREE.MOUSE.PAN,
  };
  controls.touches = { ONE: THREE.TOUCH.PAN, TWO: THREE.TOUCH.DOLLY_PAN };

  const homeTarget = new THREE.Vector3(0, 0, 0.4);
  const board = new THREE.Mesh(
    new THREE.PlaneGeometry(plan.width, plan.depth),
    new THREE.MeshBasicMaterial({ map: createBoardTexture(tokens, zones, plan) })
  );
  board.rotation.x = -Math.PI / 2;
  scene.add(board);

  const blocks = new Map();
  const meshes = [];
  const edgeLines = [];

  zones.forEach((zone) => {
    const group = new THREE.Group();
    group.position.set(zone.x, 0, zone.z);

    const geometry = new THREE.BoxGeometry(zone.w, BLOCK_HEIGHT, zone.d);
    const side = new THREE.MeshBasicMaterial({ color: tokens.paper });
    const top = new THREE.MeshBasicMaterial({
      map: createBlockTexture(zone, tokens),
    });
    const mesh = new THREE.Mesh(geometry, [
      side,
      side,
      top,
      side,
      side,
      side,
    ]);
    mesh.position.y = BLOCK_HEIGHT / 2;
    mesh.userData.zone = zone.key;

    const edges = new THREE.LineSegments(
      new THREE.EdgesGeometry(geometry),
      new THREE.LineBasicMaterial({ color: tokens.accent })
    );
    edges.position.y = mesh.position.y;

    const labelElement = document.createElement("button");
    labelElement.type = "button";
    labelElement.className = "bp-label";
    labelElement.tabIndex = -1;
    labelElement.setAttribute("aria-hidden", "true");
    labelElement.innerHTML =
      '<span class="bp-label-title">OPEN →</span>' +
      `<span class="bp-label-code">${zone.code} · ${zone.label.toUpperCase()}</span>`;
    labelElement.addEventListener("click", () => onSelect(zone.key));

    const label = new CSS2DObject(labelElement);
    label.center.set(0.5, 1);
    label.position.set(0, BLOCK_HEIGHT + 0.95, 0);
    label.visible = false;

    edgeLines.push(edges);
    group.add(mesh, edges, label);
    scene.add(group);
    blocks.set(zone.key, {
      group,
      mesh,
      edges,
      label,
      side,
      top,
      lift: 0,
      target: 0,
    });
    meshes.push(mesh);

    labelElement.addEventListener("pointerleave", () => {
      if (activeKey === zone.key) return;
      hovered = null;
      label.visible = false;
      blocks.get(zone.key).target = 0;
      onHover(null);
    });
  });

  let composer = null;

  function ensureComposer() {
    if (composer) return;
    const size = renderer.getSize(new THREE.Vector2());
    composer = new EffectComposer(renderer);
    composer.setSize(size.x, size.y);
    composer.addPass(new RenderPass(scene, camera));

    const bloom = new SelectiveBloomEffect(scene, camera, {
      intensity: 0.75,
      luminanceThreshold: 0.18,
      luminanceSmoothing: 0.25,
      mipmapBlur: true,
      radius: 0.65,
    });
    bloom.selection.set(edgeLines);
    composer.addPass(new EffectPass(camera, bloom));
  }

  function homeDistance() {
    return Math.min(fitDistance(plan.width, plan.depth) * 1.06, 78);
  }

  function fitDistance(w, d) {
    const tan = Math.tan(THREE.MathUtils.degToRad(FOV / 2));
    const tilt = Math.cos(Math.atan(CAM_DIR.y / CAM_DIR.z));
    const horizontal = (w * 0.55) / (tan * camera.aspect);
    const vertical = (d * 0.6 * tilt) / tan;
    return Math.max(horizontal, vertical, 6);
  }

  let tweening = false;
  let stopTween = null;
  let activeKey = null;

  function placeCamera(target, distance) {
    camera.position.copy(target).addScaledVector(CAM_DIR, distance);
    controls.target.copy(target);
    controls.update();
  }

  function finishMove() {
    tweening = false;
    stopTween = null;
    controls.enabled = interacting;
  }

  function moveTo(target, distance) {
    stopTween?.stop?.();
    stopTween = null;

    if (reducedMotion) {
      placeCamera(target, distance);
      tweening = false;
      controls.enabled = interacting;
      return;
    }

    const fromPosition = camera.position.clone();
    const fromTarget = controls.target.clone();
    const toTarget = target.clone();
    const toPosition = toTarget.clone().addScaledVector(CAM_DIR, distance);

    controls.enabled = false;
    tweening = true;
    stopTween = animate(0, 1, {
      duration: MOVE_DURATION / 1000,
      ease: [0.65, 0, 0.35, 1],
      onUpdate: (progress) => {
        camera.position.lerpVectors(fromPosition, toPosition, progress);
        controls.target.lerpVectors(fromTarget, toTarget, progress);
      },
      onComplete: finishMove,
      onStop: finishMove,
    });
  }

  function reset() {
    activeKey = null;
    blocks.forEach((block) => {
      block.target = 0;
      block.label.visible = false;
    });
    moveTo(homeTarget, homeDistance());
    onHover(null);
  }

  function focus(key) {
    const zone = zones.find((item) => item.key === key);
    if (!zone) return;
    activeKey = key;
    blocks.forEach((block, blockKey) => {
      block.target = blockKey === key ? 1 : 0;
      block.label.visible = false;
    });
    const wide = camera.aspect > 1.15;
    const distance = fitDistance(zone.w * 1.15, zone.d) * (wide ? 1.45 : 1);
    const target = new THREE.Vector3(zone.x, 0, zone.z);
    if (wide) {
      const right = new THREE.Vector3()
        .crossVectors(new THREE.Vector3(0, 1, 0), CAM_DIR)
        .normalize();
      target.addScaledVector(right, distance * 0.12);
    }
    moveTo(target, distance);
  }

  const raycaster = new THREE.Raycaster();
  const pointer = new THREE.Vector2();
  let interacting = true;
  let hovered = null;
  let press = null;

  function setPointer(event) {
    const rect = canvas.getBoundingClientRect();
    pointer.x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
    pointer.y = -((event.clientY - rect.top) / rect.height) * 2 + 1;
  }

  function pick(event) {
    setPointer(event);
    raycaster.setFromCamera(pointer, camera);
    const hit = raycaster.intersectObjects(meshes, false)[0];
    return hit ? hit.object.userData.zone : null;
  }

  function handlePointerMove(event) {
    if (!interacting || press) return;
    const key = pick(event);
    if (key === hovered) return;
    hovered = key;
    blocks.forEach((block, blockKey) => {
      const isOpen = blockKey === activeKey;
      block.target = blockKey === key || isOpen ? 1 : 0;
      if (!isOpen) block.label.visible = blockKey === key;
    });
    canvas.style.cursor = key ? "pointer" : "grab";
    onHover(key);
  }

  function handlePointerLeave(event) {
    if (press) return;
    if (
      event.relatedTarget instanceof Element &&
      event.relatedTarget.closest(".bp-label")
    ) {
      return;
    }
    hovered = null;
    blocks.forEach((block, blockKey) => {
      block.target = blockKey === activeKey ? 1 : 0;
      if (blockKey !== activeKey) block.label.visible = false;
    });
    onHover(null);
  }

  function handlePointerDown(event) {
    press = { x: event.clientX, y: event.clientY };
    canvas.style.cursor = "grabbing";
  }

  function handlePointerUp(event) {
    const start = press;
    press = null;
    canvas.style.cursor = hovered ? "pointer" : "grab";
    if (!interacting || !start) return;
    const moved = Math.hypot(event.clientX - start.x, event.clientY - start.y);
    if (moved > 8) return;
    const key = pick(event);
    if (key) onSelect(key);
  }

  canvas.addEventListener("pointermove", handlePointerMove);
  canvas.addEventListener("pointerleave", handlePointerLeave);
  canvas.addEventListener("pointerdown", handlePointerDown);
  canvas.addEventListener("pointerup", handlePointerUp);
  canvas.style.cursor = "grab";
  canvas.style.touchAction = "none";

  const resizeObserver = new ResizeObserver(() => {
    const parent = canvas.parentElement;
    if (!parent) return;
    const width = parent.clientWidth;
    const height = parent.clientHeight;
    renderer.setSize(width, height, false);
    composer?.setSize(width, height);
    labelRenderer.setSize(width, height);
    camera.aspect = width / Math.max(height, 1);
    camera.updateProjectionMatrix();
    if (!activeKey && !tweening) placeCamera(homeTarget, homeDistance());
  });
  resizeObserver.observe(canvas.parentElement);
  {
    const parent = canvas.parentElement;
    const width = parent.clientWidth || window.innerWidth;
    const height = parent.clientHeight || window.innerHeight;
    renderer.setSize(width, height, false);
    labelRenderer.setSize(width, height);
    camera.aspect = width / Math.max(height, 1);
    camera.updateProjectionMatrix();
    placeCamera(homeTarget, homeDistance());
  }

  function setTheme(next) {
    tokens = next;
    scene.background = new THREE.Color(tokens.bg);
    board.material.map.dispose();
    board.material.map = createBoardTexture(tokens, zones, plan);
    board.material.needsUpdate = true;
    blocks.forEach((block, key) => {
      block.side.color = new THREE.Color(tokens.paper);
      block.edges.material.color = new THREE.Color(tokens.accent);
      block.top.map.dispose();
      const zone = zones.find((item) => item.key === key);
      block.top.map = createBlockTexture(zone, tokens);
      block.top.needsUpdate = true;
    });
  }

  function setInteractionEnabled(enabled) {
    interacting = enabled;
    controls.enabled = enabled;
    if (!enabled) {
      hovered = null;
      onHover(null);
      canvas.style.cursor = "default";
    } else {
      canvas.style.cursor = "grab";
    }
  }

  let frame = 0;
  let disposed = false;

  function renderFrame() {
    if (disposed) return;
    frame = requestAnimationFrame(renderFrame);

    if (!tweening) controls.update();

    blocks.forEach((block) => {
      const goal = block.target ? HOVER_LIFT : 0;
      block.lift = reducedMotion ? goal : lerp(block.lift, goal, 0.14);
      block.group.position.y = block.lift;
    });

    if (tokens.dark) {
      ensureComposer();
      composer.render();
    } else {
      renderer.render(scene, camera);
    }
    labelRenderer.render(scene, camera);
  }

  frame = requestAnimationFrame(renderFrame);
  if (onReady) requestAnimationFrame(() => onReady());

  function dispose() {
    disposed = true;
    stopTween?.stop?.();
    cancelAnimationFrame(frame);
    resizeObserver.disconnect();
    canvas.removeEventListener("pointermove", handlePointerMove);
    canvas.removeEventListener("pointerleave", handlePointerLeave);
    canvas.removeEventListener("pointerdown", handlePointerDown);
    canvas.removeEventListener("pointerup", handlePointerUp);
    controls.dispose();
    composer?.dispose();
    blocks.forEach((block) => {
      block.label.element?.remove();
    });
    labelRenderer.domElement.remove();
    scene.traverse((object) => {
      if (object.geometry) object.geometry.dispose();
      if (object.material) {
        const materials = Array.isArray(object.material)
          ? object.material
          : [object.material];
        materials.forEach((material) => {
          if (material.map) material.map.dispose();
          material.dispose();
        });
      }
    });
    renderer.dispose();
  }

  return { focus, reset, setTheme, setInteractionEnabled, dispose };
}
