// PatternIcons.tsx
import React from "react";

type IconProps = {
  className?: string;
  strokeWidth?: number;
};

const base = {
  viewBox: "0 0 64 64",
  fill: "none" as const,
  stroke: "currentColor" as const,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
};

export function IconRett({
  className = "w-14 h-14",
  strokeWidth = 1.4,
  plankW = 9.5, // 👈 narrower = more “plank-like”
  plankH = 27, // 👈 longer = more “pattern-like”
  gap = 1, // spacing (visual grout/gap)
  stagger = 0.5, // 0.5 = half-length offset (classic running bond)
}: {
  className?: string;
  strokeWidth?: number;
  plankW?: number;
  plankH?: number;
  gap?: number;
  stagger?: number;
}) {
  const x0 = 6;
  const y0 = 6;
  const w = 52;
  const h = 52;

  const stepX = plankW + gap;
  const stepY = plankH + gap;

  const cols = Math.ceil(w / stepX) + 1;
  const rows = Math.ceil(h / stepY) + 2;

  const clipId = React.useId();

  return (
    <svg {...base} className={className} strokeWidth={strokeWidth}>
      {/* Frame (kept consistent with other icons) */}

      <defs>
        <clipPath id={clipId}>
          <rect x={x0} y={y0} width={w} height={h} />
        </clipPath>
      </defs>

      <g clipPath={`url(#${clipId})`}>
        {Array.from({ length: cols }).map((_, c) => {
          const x = x0 + c * stepX;

          // Offset every second column (running bond)
          const offsetY = (c % 2) * (plankH * stagger);

          return Array.from({ length: rows }).map((_, r) => {
            const y = y0 + r * stepY - offsetY;

            return (
              <rect
                key={`${c}-${r}`}
                x={x}
                y={y}
                width={plankW}
                height={plankH}
                rx={0.5} // subtle softening (optional)
              />
            );
          });
        })}
      </g>
    </svg>
  );
}

export function IconDiagonal({
  className = "w-14 h-14",
  strokeWidth = 1.4,
  angleDeg = 45, // 45° to the right
  plankW = 10, // plank width (thickness)
  plankH = 22, // plank length
  gap = 1, // grout/spacing
  stagger = 0.5, // offset every second “band” (0.5 = half-length)
}: {
  className?: string;
  strokeWidth?: number;
  angleDeg?: number;
  plankW?: number;
  plankH?: number;
  gap?: number;
  stagger?: number;
}) {
  const x0 = 6;
  const y0 = 6;
  const w = 52;
  const h = 52;

  const clipId = React.useId();

  const theta = (angleDeg * Math.PI) / 180;

  // Plank axis (u) and perpendicular axis (v)
  const ux = Math.cos(theta);
  const uy = Math.sin(theta);
  const vx = -uy;
  const vy = ux;

  // Steps in the local coordinate system (u = length, v = width)
  const stepU = plankH + gap;
  const stepV = plankW + gap;

  // Center of the work area (keeps the pattern nicely placed)
  const centerX = x0 + w / 2;
  const centerY = y0 + h / 2;

  // Overscan range so the clipped square has no empty corners
  const R = Math.sqrt(w * w + h * h) / 2; // half diagonal
  const uMin = -R * 1.6;
  const uMax = R * 1.6;
  const vMin = -R * 1.6;
  const vMax = R * 1.6;

  const cols = Math.ceil((vMax - vMin) / stepV) + 2;
  const rows = Math.ceil((uMax - uMin) / stepU) + 2;

  const vStart = vMin;
  const uStart = uMin;

  return (
    <svg {...base} className={className} strokeWidth={strokeWidth}>
      <defs>
        <clipPath id={clipId}>
          <rect x={x0} y={y0} width={w} height={h} />
        </clipPath>
      </defs>

      <g clipPath={`url(#${clipId})`}>
        {Array.from({ length: cols }).map((_, c) => {
          const v = vStart + c * stepV;

          // Running bond: offset every second band by stagger * length
          const offsetU = (c % 2) * (plankH * stagger);

          return Array.from({ length: rows }).map((_, r) => {
            const u = uStart + r * stepU - offsetU;

            // Map (u, v) -> (x, y)
            const cx = centerX + u * ux + v * vx;
            const cy = centerY + u * uy + v * vy;

            // Axis-aligned rect, rotated around its center
            const x = cx - plankW / 2;
            const y = cy - plankH / 2;

            return (
              <rect
                key={`${c}-${r}`}
                x={x}
                y={y}
                width={plankW}
                height={plankH}
                transform={`rotate(${angleDeg} ${cx} ${cy})`}
              />
            );
          });
        })}
      </g>
    </svg>
  );
}

export function IconMosaic({ className = "w-14 h-14", strokeWidth = 2 }: IconProps) {
  // Mosaic / squares = basket weave (as in the reference PNG)
  // 2x2 modules, each module is "3 planks" alternating horizontal/vertical
  return (
    <svg {...base} className={className} strokeWidth={strokeWidth}>
      <rect x="3.5" y="3.5" width="57" height="57" />

      {/* Top-left: horizontal */}
      <rect x="6" y="6" width="26" height="26" />
      <line x1="6" y1="14.5" x2="32" y2="14.5" opacity="0.6" />
      <line x1="6" y1="23.5" x2="32" y2="23.5" opacity="0.6" />

      {/* Top-right: vertical */}
      <rect x="34" y="6" width="24" height="26" />
      <line x1="42" y1="6" x2="42" y2="32" opacity="0.6" />
      <line x1="50" y1="6" x2="50" y2="32" opacity="0.6" />

      {/* Bottom-left: vertical */}
      <rect x="6" y="34" width="26" height="24" />
      <line x1="14.5" y1="34" x2="14.5" y2="58" opacity="0.6" />
      <line x1="23.5" y1="34" x2="23.5" y2="58" opacity="0.6" />

      {/* Bottom-right: horizontal */}
      <rect x="34" y="34" width="24" height="24" />
      <line x1="34" y1="42" x2="58" y2="42" opacity="0.6" />
      <line x1="34" y1="50" x2="58" y2="50" opacity="0.6" />
    </svg>
  );
}

export function IconChevron({
  className = "w-14 h-14",
  strokeWidth = 2,
  n = 4,
  angleDeg = 50,
  plankLength = 22, // 👈 length control
  cx = 32,
  startY = 10,
}: {
  className?: string;
  strokeWidth?: number;
  n?: number;
  angleDeg?: number;
  plankLength?: number;
  cx?: number;
  startY?: number;
}) {
  const theta = (angleDeg * Math.PI) / 180;

  const dx = plankLength * Math.cos(theta);
  const dy = plankLength * Math.sin(theta);

  return (
    <svg
      viewBox="0 0 64 64"
      fill="none"
      stroke="currentColor"
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      {/* Center axis */}
      <line x1={cx} y1={startY - 4} x2={cx} y2={startY + dy * n + 4} />

      {Array.from({ length: n }).map((_, i) => {
        const y = startY + i * dy;

        return (
          <g key={i}>
            {/* Left plank */}
            <line x1={cx} y1={y} x2={cx - dx} y2={y + dy} />

            {/* Right plank */}
            <line x1={cx} y1={y} x2={cx + dx} y2={y + dy} />
          </g>
        );
      })}
    </svg>
  );
}

export function IconFiskeben({
  className = "w-14 h-14",
  strokeWidth = 2,
  n = 3,
  angleDeg = 45,
  plankLength = 51,
  plankWidth = 16,
  cx = 32,
  startY = 9,
  open = 0,
}: {
  className?: string;
  strokeWidth?: number;
  n?: number;
  angleDeg?: number;
  plankLength?: number;
  plankWidth?: number;
  cx?: number;
  startY?: number;
  open?: number;
}) {
  const theta = (angleDeg * Math.PI) / 180;

  const dx = plankLength * Math.cos(theta);
  const dy = plankLength * Math.sin(theta);

  // Normal (perpendicular) to plank direction – used for plank width
  const nx = -Math.sin(theta);
  const ny = Math.cos(theta);
  const hw = plankWidth / 2;

  // “Chevron-like” vertical step between successive V shapes
  const rowStep = dy * 0.62;

  // Side repeats (clipped), matching the reference pattern feel
  const sideShift = dx * 0.92;

  const clipId = React.useId();

  const plankOutline = (x1: number, y1: number, x2: number, y2: number) => {
    // Rectangle outline around segment (x1,y1) -> (x2,y2)
    const ax = x1 + nx * hw;
    const ay = y1 + ny * hw;
    const bx = x1 - nx * hw;
    const by = y1 - ny * hw;
    const cx2 = x2 - nx * hw;
    const cy2 = y2 - ny * hw;
    const dx2 = x2 + nx * hw;
    const dy2 = y2 + ny * hw;

    // Close the shape (last point = first point)
    return `${ax},${ay} ${bx},${by} ${cx2},${cy2} ${dx2},${dy2} ${ax},${ay}`;
  };

  return (
    <svg {...base} className={className} strokeWidth={strokeWidth}>
      <defs>
        <clipPath id={clipId}>
          <rect x="6" y="6" width="52" height="52" />
        </clipPath>
      </defs>

      <g clipPath={`url(#${clipId})`}>
        {Array.from({ length: n }).map((_, i) => {
          const y = startY + i * rowStep;

          // Apex like Chevron (optionally “opened”)
          const apexX = cx;
          const apexY = y;

          // Left plank (down-left)
          const l1x = apexX + open;
          const l1y = apexY;
          const l2x = l1x - dx;
          const l2y = l1y + dy;

          // Right plank (down-right)
          const r1x = apexX - open;
          const r1y = apexY;
          const r2x = r1x + dx;
          const r2y = r1y + dy;

          return (
            <g key={i}>
              {/* Center V */}
              <polyline points={plankOutline(l1x, l1y, l2x, l2y)} />
              <polyline points={plankOutline(r1x, r1y, r2x, r2y)} />

              {/* Side planks clipped at the edges (like the reference) */}
              <polyline
                points={plankOutline(l1x - sideShift, l1y, l2x - sideShift, l2y)}
                opacity="0.95"
              />
              <polyline
                points={plankOutline(r1x + sideShift, r1y, r2x + sideShift, r2y)}
                opacity="0.95"
              />
            </g>
          );
        })}
      </g>
    </svg>
  );
}