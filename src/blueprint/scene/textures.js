import * as THREE from "three";

const MONO = '"JetBrains Mono", ui-monospace, SFMono-Regular, Menlo, monospace';
const SANS = 'Geist, "Outfit", system-ui, sans-serif';

function roundedRect(ctx, x, y, w, h, r) {
  ctx.beginPath();
  ctx.moveTo(x + r, y);
  ctx.arcTo(x + w, y, x + w, y + h, r);
  ctx.arcTo(x + w, y + h, x, y + h, r);
  ctx.arcTo(x, y + h, x, y, r);
  ctx.arcTo(x, y, x + w, y, r);
  ctx.closePath();
}

export function createBoardTexture(tokens, zones, plan) {
  const width = 2048;
  const height = Math.round((width * plan.depth) / plan.width);
  const canvas = document.createElement("canvas");
  canvas.width = width;
  canvas.height = height;
  const ctx = canvas.getContext("2d");
  const px = width / plan.width;
  const toX = (x) => (x + plan.width / 2) * px;
  const toY = (z) => (z + plan.depth / 2) * px;

  ctx.fillStyle = tokens.paper;
  ctx.fillRect(0, 0, width, height);

  const minorStep = px * 0.5;
  const majorStep = px * 2;

  ctx.lineWidth = 1;
  ctx.strokeStyle = tokens.line;
  ctx.globalAlpha = 0.55;
  ctx.beginPath();
  for (let x = 0; x <= width; x += minorStep) {
    ctx.moveTo(x, 0);
    ctx.lineTo(x, height);
  }
  for (let y = 0; y <= height; y += minorStep) {
    ctx.moveTo(0, y);
    ctx.lineTo(width, y);
  }
  ctx.stroke();

  ctx.globalAlpha = 0.8;
  ctx.strokeStyle = tokens.lineStrong;
  ctx.lineWidth = 2;
  ctx.beginPath();
  for (let x = 0; x <= width; x += majorStep) {
    ctx.moveTo(x, 0);
    ctx.lineTo(x, height);
  }
  for (let y = 0; y <= height; y += majorStep) {
    ctx.moveTo(0, y);
    ctx.lineTo(width, y);
  }
  ctx.stroke();
  ctx.globalAlpha = 1;

  const inset = px * 0.55;
  ctx.strokeStyle = tokens.lineStrong;
  ctx.lineWidth = 3;
  ctx.strokeRect(inset, inset, width - inset * 2, height - inset * 2);
  ctx.lineWidth = 1;
  ctx.strokeRect(inset + 10, inset + 10, width - inset * 2 - 20, height - inset * 2 - 20);

  ctx.strokeStyle = tokens.accent;
  ctx.lineWidth = 6;
  const corner = px * 0.9;
  const corners = [
    [inset, inset, 1, 1],
    [width - inset, inset, -1, 1],
    [inset, height - inset, 1, -1],
    [width - inset, height - inset, -1, -1],
  ];
  corners.forEach(([x, y, sx, sy]) => {
    ctx.beginPath();
    ctx.moveTo(x, y + corner * sy);
    ctx.lineTo(x, y);
    ctx.lineTo(x + corner * sx, y);
    ctx.stroke();
  });

  const drawDim = (x1, y1, x2, y2, text) => {
    const horizontal = Math.abs(y2 - y1) < 1;
    ctx.strokeStyle = tokens.muted;
    ctx.fillStyle = tokens.muted;
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(x1, y1);
    ctx.lineTo(x2, y2);
    ctx.stroke();
    const tick = px * 0.16;
    if (horizontal) {
      [x1, x2].forEach((x) => {
        ctx.beginPath();
        ctx.moveTo(x, y1 - tick);
        ctx.lineTo(x, y1 + tick);
        ctx.stroke();
      });
    } else {
      [y1, y2].forEach((y) => {
        ctx.beginPath();
        ctx.moveTo(x1 - tick, y);
        ctx.lineTo(x1 + tick, y);
        ctx.stroke();
      });
    }
    ctx.font = `500 ${Math.round(px * 0.24)}px ${MONO}`;
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.save();
    if (!horizontal) {
      ctx.translate(x1, (y1 + y2) / 2);
      ctx.rotate(-Math.PI / 2);
      ctx.fillText(text, 0, 0);
    } else {
      ctx.fillText(text, (x1 + x2) / 2, y1 - px * 0.28);
    }
    ctx.restore();
  };

  const margin = px * 1.05;
  drawDim(margin, margin * 0.55, width - margin, margin * 0.55, `${plan.width.toFixed(2)} U`);
  drawDim(margin * 0.55, margin, margin * 0.55, height - margin, `${plan.depth.toFixed(2)} U`);

  ctx.setLineDash([px * 0.18, px * 0.12]);
  ctx.strokeStyle = tokens.accent;
  ctx.lineWidth = 2.5;
  zones.forEach((zone) => {
    const x = toX(zone.x - zone.w / 2);
    const y = toY(zone.z - zone.d / 2);
    ctx.strokeRect(x, y, zone.w * px, zone.d * px);
  });
  ctx.setLineDash([]);

  ctx.font = `500 ${Math.round(px * 0.2)}px ${MONO}`;
  ctx.fillStyle = tokens.muted;
  ctx.textAlign = "left";
  ctx.textBaseline = "alphabetic";
  zones.forEach((zone) => {
    ctx.fillText(
      `${zone.code} / ${zone.label.toUpperCase()}`,
      toX(zone.x - zone.w / 2) + px * 0.1,
      toY(zone.z + zone.d / 2) + px * 0.34
    );
  });

  const blockW = px * 9.8;
  const blockH = px * 1.55;
  const blockX = width - margin - blockW;
  const blockY = height - margin - blockH;
  ctx.fillStyle = tokens.paper;
  ctx.strokeStyle = tokens.ink;
  ctx.lineWidth = 3;
  ctx.fillRect(blockX, blockY, blockW, blockH);
  ctx.strokeRect(blockX, blockY, blockW, blockH);

  ctx.fillStyle = tokens.ink;
  ctx.textAlign = "left";
  ctx.textBaseline = "top";
  ctx.font = `600 ${Math.round(px * 0.3)}px ${SANS}`;
  ctx.fillText("RAKHA PUTRA PEBRI YANDRA", blockX + px * 0.25, blockY + px * 0.18);

  ctx.font = `500 ${Math.round(px * 0.19)}px ${MONO}`;
  ctx.fillStyle = tokens.muted;
  ctx.fillText("INFORMATION SYSTEMS GENERALIST", blockX + px * 0.25, blockY + px * 0.62);

  const rows = [
    ["SHEET", "A-01 / BLUEPRINT CV"],
    ["SCALE", "1 : 100   REV 2026.10"],
  ];
  const rowY = blockY + px * 0.95;
  ctx.strokeStyle = tokens.line;
  ctx.lineWidth = 1.5;
  ctx.beginPath();
  ctx.moveTo(blockX, rowY - px * 0.08);
  ctx.lineTo(blockX + blockW, rowY - px * 0.08);
  ctx.stroke();

  ctx.fillStyle = tokens.accent;
  ctx.font = `600 ${Math.round(px * 0.17)}px ${MONO}`;
  rows.forEach(([label, value], index) => {
    const y = rowY + px * 0.1 + index * px * 0.27;
    ctx.fillStyle = tokens.accent;
    ctx.fillText(label, blockX + px * 0.25, y);
    ctx.fillStyle = tokens.muted;
    ctx.fillText(value, blockX + px * 1.35, y);
  });

  const texture = new THREE.CanvasTexture(canvas);
  texture.colorSpace = THREE.SRGBColorSpace;
  texture.anisotropy = 8;
  texture.needsUpdate = true;
  return texture;
}

export function createBlockTexture(zone, tokens) {
  const width = 768;
  const height = Math.round((width * zone.d) / zone.w);
  const canvas = document.createElement("canvas");
  canvas.width = width;
  canvas.height = height;
  const ctx = canvas.getContext("2d");

  ctx.fillStyle = tokens.paper;
  ctx.fillRect(0, 0, width, height);

  ctx.strokeStyle = tokens.line;
  ctx.lineWidth = 2;
  const pad = 26;
  ctx.strokeRect(pad, pad, width - pad * 2, height - pad * 2);

  ctx.fillStyle = tokens.ink;
  ctx.font = `600 ${Math.round(Math.min(width, height) * 0.14)}px ${SANS}`;
  ctx.textAlign = "left";
  ctx.textBaseline = "alphabetic";
  ctx.fillText(zone.label, pad + 22, pad + Math.min(width, height) * 0.2);

  ctx.fillStyle = tokens.accent;
  ctx.font = `600 ${Math.round(Math.min(width, height) * 0.07)}px ${MONO}`;
  ctx.fillText(`${zone.code} · SELECT ZONE`, pad + 22, height - pad - 18);

  const texture = new THREE.CanvasTexture(canvas);
  texture.colorSpace = THREE.SRGBColorSpace;
  texture.anisotropy = 8;
  return texture;
}

export function createLabelTexture(zone, tokens) {
  const canvas = document.createElement("canvas");
  canvas.width = 1024;
  canvas.height = 220;
  const ctx = canvas.getContext("2d");

  roundedRect(ctx, 6, 6, canvas.width - 12, canvas.height - 12, 18);
  ctx.fillStyle = tokens.bg;
  ctx.globalAlpha = 0.96;
  ctx.fill();
  ctx.globalAlpha = 1;
  ctx.strokeStyle = tokens.accent;
  ctx.lineWidth = 6;
  ctx.stroke();

  ctx.fillStyle = tokens.ink;
  ctx.font = `600 84px ${SANS}`;
  ctx.textAlign = "left";
  ctx.textBaseline = "middle";
  ctx.fillText("OPEN →", 48, 92);

  ctx.fillStyle = tokens.accent;
  ctx.font = `600 42px ${MONO}`;
  ctx.fillText(`${zone.code} · ${zone.label.toUpperCase()}`, 48, 162);

  const texture = new THREE.CanvasTexture(canvas);
  texture.colorSpace = THREE.SRGBColorSpace;
  texture.anisotropy = 8;
  texture.needsUpdate = true;
  return texture;
}
