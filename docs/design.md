---
version: "1.0.0"
name: "Atom Minimalist System"
description: "A high-contrast, dark-mode design system utilizing rigid grid lines, glass effects, and monochromatic aesthetics."
colors:
  background: "#08090A"
  surface: "rgba(8, 9, 10, 0.6)"
  primary-text: "#F5F5F5"
  secondary-text: "#A1A1AA"
  muted-text: "#52525B"
  border: "rgba(255, 255, 255, 0.1)"
  accent-blue: "#3B82F6"
  selection: "#27272A"
typography:
  display:
    family: "Geist, sans-serif"
    weight: "600"
    size: "72px"
    lineHeight: "0.95"
    letterSpacing: "-0.05em"
  heading:
    family: "Geist, sans-serif"
    weight: "600"
    size: "30px"
    lineHeight: "1.2"
  body:
    family: "Geist, sans-serif"
    weight: "300"
    size: "18px"
    lineHeight: "1.625"
  mono:
    family: "Inter, monospace"
    weight: "400"
    size: "10px"
    letterSpacing: "0.1em"
spacing:
  xs: "4px"
  sm: "8px"
  md: "16px"
  lg: "24px"
  xl: "32px"
  hero: "96px"
rounded:
  none: "0px"
  sm: "2px"
  default: "4px"
  full: "999px"
components:
  header:
    sticky: true
    height: "64px"
    blur: "12px"
    border: "bottom"
  project-card:
    padding: "48px"
    hover: "rgba(255, 255, 255, 0.02)"
    transition: "300ms ease"
  action-button:
    padding: "10px 20px"
    text: "uppercase"
    weight: "500"
  status-badge:
    size: "10px"
    border: "1px solid"
    case: "uppercase"
motion:
  infinite-scroll: "40s linear infinite"
  hover-reveal: "500ms transition-opacity"
  pulse: "2s cubic-bezier(0.4, 0, 0.6, 1) infinite"
---
## Overview
The system uses a 12-column grid layout enforced by literal border lines (dividers). It evokes a blueprint or technical drawing feel through visible structural axes and monochromatic depth.

## Colors
Concentrated on deep blacks and varied shades of zinc/neutral gray. The core palette uses transparency for glass effects (glass-panel) and subtle background patterns (linear-gradient grid) to create depth without vibrant color.

## Typography
Relies heavily on the 'Geist' typeface for a modern, engineering-focused look. Typography is hierarchical: massive display sizes for headers, comfortable sans-serif for reading, and wide-spaced monospace for technical metadata and labels.

## Spacing
Based on a modular scale where 8px is the base unit. Hero sections utilize significant vertical padding (96px+) to create air and focus, while UI elements use tight internal spacing for a precise, compact feel.

## Layout
Uses a 'Global Wrapper' restricted to 1400px with a persistent center-aligned container. Vertical and horizontal borders define the visual architecture (divide-y and divide-x), effectively turning the layout into a responsive spreadsheet of content blocks.

## Elevation & Depth
Depth is achieved through backdrop filters (12px blur) rather than drop shadows. The background features a fixed 60px grid pattern that remains stationary while content scrolls over it, creating a multi-layered parallax effect.

## Shapes
Predominantly sharp corners. Rounded tokens are used sparingly for small utility badges (4px) or full circular pills for status indicators. This maintains a professional, 'architectural' aesthetic.

## Components
- Navigation: Sticky glass panel with equidistant links and a pulsed contact indicator.
- Experience Sidebar: A vertical stack of high-density text blocks with metadata labels.
- Horizontal Scroller: An auto-scrolling gallery using masking gradients to fade out edges.
- Project Tiles: Interactive zones that feature icon backgrounds and transform-based arrow indicators on hover.

## Motion
Subtle but persistent. Includes an infinite-scroll marquee for portfolios, a heartbeat pulse for availability markers, and grayscale-to-color transitions for imagery to reward user interaction.

## Do's and Don'ts
- Do use uppercase for secondary labels and buttons.
- Do keep border widths consistent at 1px.
- Don't introduce vibrant gradients; stick to white/black transparency shifts.
- Don't break the vertical line alignment between the header and main content sections.

## Accessibility
Text contrast is maintained via Neutral-100 on Black. Interactive states should provide both a color change and a transform (like the arrow rotation) to ensure affordances are visible to all users.