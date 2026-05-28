"use client";

import { useEffect, useRef } from "react";

// ── types ────────────────────────────────────────────────────────────────────

interface Vec2 { x: number; y: number }

interface Node {
  pos: Vec2;
  vel: Vec2;
  label: string;
  radius: number;
  opacity: number;
  targetOpacity: number;
  fadeSpeed: number;
}

interface Edge {
  from: number;
  to: number;
  progress: number;
  speed: number;
  active: boolean;
  pulse: number; // 0-1 travelling dot position
}

interface Bit {
  pos: Vec2;
  vel: Vec2;
  char: string;
  opacity: number;
  size: number;
}

interface CpuBlock {
  pos: Vec2;
  w: number;
  h: number;
  label: string;
  activity: number; // 0-1 fill animation
  activityDir: number;
}

// ── constants ────────────────────────────────────────────────────────────────

const ACCENT = "74, 222, 128";         // rgb components of #4ade80
const NODE_LABELS = [
  "API", "DB", "Cache", "Queue", "Auth", "CDN", "LB",
  "Worker", "Broker", "Shard", "Replica", "Gateway",
  "gRPC", "REST", "WS", "Redis", "S3", "DNS",
];

const CPU_BLOCKS: Array<{ label: string; w: number; h: number }> = [
  { label: "ALU", w: 60, h: 40 },
  { label: "CU", w: 50, h: 35 },
  { label: "Reg", w: 44, h: 28 },
  { label: "L1", w: 36, h: 24 },
  { label: "L2", w: 50, h: 20 },
  { label: "L3", w: 70, h: 18 },
  { label: "RAM", w: 80, h: 26 },
  { label: "BUS", w: 90, h: 14 },
];

function rand(min: number, max: number) {
  return min + Math.random() * (max - min);
}

function pick<T>(arr: T[]): T {
  return arr[Math.floor(Math.random() * arr.length)];
}

// ── initialisation helpers ───────────────────────────────────────────────────

function makeNodes(w: number, h: number, count: number): Node[] {
  return Array.from({ length: count }, () => ({
    pos: { x: rand(40, w - 40), y: rand(40, h - 40) },
    vel: { x: rand(-0.15, 0.15), y: rand(-0.1, 0.1) },
    label: pick(NODE_LABELS),
    radius: rand(14, 22),
    opacity: rand(0.06, 0.18),
    targetOpacity: rand(0.06, 0.18),
    fadeSpeed: rand(0.001, 0.004),
  }));
}

function makeEdges(nodeCount: number, edgeCount: number): Edge[] {
  const edges: Edge[] = [];
  for (let i = 0; i < edgeCount; i++) {
    const from = Math.floor(Math.random() * nodeCount);
    let to = Math.floor(Math.random() * nodeCount);
    while (to === from) to = Math.floor(Math.random() * nodeCount);
    edges.push({
      from,
      to,
      progress: Math.random(),
      speed: rand(0.0008, 0.003),
      active: Math.random() > 0.4,
      pulse: Math.random(),
    });
  }
  return edges;
}

function makeBits(w: number, h: number, count: number): Bit[] {
  return Array.from({ length: count }, () => ({
    pos: { x: rand(0, w), y: rand(0, h) },
    vel: { x: rand(-0.2, 0.2), y: rand(-0.4, -0.08) },
    char: Math.random() > 0.5 ? "1" : "0",
    opacity: rand(0.03, 0.1),
    size: rand(9, 13),
  }));
}

function makeCpuBlocks(w: number, h: number): CpuBlock[] {
  // Place a CPU diagram in a quiet quadrant (top-right)
  const ox = w * 0.72;
  const oy = h * 0.08;
  const gap = 8;
  let cy = oy;
  return CPU_BLOCKS.map((b) => {
    const block: CpuBlock = {
      pos: { x: ox, y: cy },
      w: b.w,
      h: b.h,
      label: b.label,
      activity: Math.random(),
      activityDir: Math.random() > 0.5 ? 1 : -1,
    };
    cy += b.h + gap;
    return block;
  });
}

// ── draw helpers ─────────────────────────────────────────────────────────────

function drawNode(ctx: CanvasRenderingContext2D, node: Node) {
  const { pos, radius, label, opacity } = node;
  ctx.save();
  ctx.globalAlpha = opacity;

  // outer ring
  ctx.beginPath();
  ctx.arc(pos.x, pos.y, radius, 0, Math.PI * 2);
  ctx.strokeStyle = `rgb(${ACCENT})`;
  ctx.lineWidth = 0.8;
  ctx.stroke();

  // inner dot
  ctx.beginPath();
  ctx.arc(pos.x, pos.y, 2.5, 0, Math.PI * 2);
  ctx.fillStyle = `rgb(${ACCENT})`;
  ctx.fill();

  // label
  ctx.font = `9px monospace`;
  ctx.fillStyle = `rgb(${ACCENT})`;
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  ctx.fillText(label, pos.x, pos.y + radius + 9);

  ctx.restore();
}

function drawEdge(ctx: CanvasRenderingContext2D, edge: Edge, nodes: Node[]) {
  if (!edge.active) return;
  const a = nodes[edge.from];
  const b = nodes[edge.to];
  const baseOpacity = Math.min(a.opacity, b.opacity) * 0.6;

  ctx.save();
  ctx.globalAlpha = baseOpacity;
  ctx.beginPath();
  ctx.moveTo(a.pos.x, a.pos.y);
  ctx.lineTo(b.pos.x, b.pos.y);
  ctx.strokeStyle = `rgb(${ACCENT})`;
  ctx.lineWidth = 0.5;
  ctx.setLineDash([3, 6]);
  ctx.stroke();
  ctx.setLineDash([]);

  // travelling packet dot
  const px = a.pos.x + (b.pos.x - a.pos.x) * edge.pulse;
  const py = a.pos.y + (b.pos.y - a.pos.y) * edge.pulse;
  ctx.globalAlpha = baseOpacity * 2;
  ctx.beginPath();
  ctx.arc(px, py, 2, 0, Math.PI * 2);
  ctx.fillStyle = `rgb(${ACCENT})`;
  ctx.fill();

  ctx.restore();
}

function drawBit(ctx: CanvasRenderingContext2D, bit: Bit) {
  ctx.save();
  ctx.globalAlpha = bit.opacity;
  ctx.font = `${bit.size}px monospace`;
  ctx.fillStyle = `rgb(${ACCENT})`;
  ctx.fillText(bit.char, bit.pos.x, bit.pos.y);
  ctx.restore();
}

function drawCpuBlocks(ctx: CanvasRenderingContext2D, blocks: CpuBlock[]) {
  const baseOp = 0.07;
  ctx.save();

  // bus line connecting all blocks
  const busBlock = blocks[blocks.length - 1];
  ctx.globalAlpha = baseOp * 0.8;
  ctx.strokeStyle = `rgb(${ACCENT})`;
  ctx.lineWidth = 0.6;
  ctx.setLineDash([2, 4]);
  blocks.forEach((b, i) => {
    if (i < blocks.length - 1) {
      const cx = b.pos.x + b.w / 2;
      const by = b.pos.y + b.h;
      const bcy = blocks[i + 1].pos.y;
      ctx.beginPath();
      ctx.moveTo(cx, by);
      ctx.lineTo(cx, bcy);
      ctx.stroke();
    }
  });
  ctx.setLineDash([]);

  blocks.forEach((b) => {
    // fill bar (activity indicator)
    ctx.globalAlpha = baseOp * 0.5;
    ctx.fillStyle = `rgb(${ACCENT})`;
    ctx.fillRect(b.pos.x, b.pos.y, b.w * b.activity, b.h);

    // border
    ctx.globalAlpha = baseOp;
    ctx.strokeStyle = `rgb(${ACCENT})`;
    ctx.lineWidth = 0.7;
    ctx.strokeRect(b.pos.x, b.pos.y, b.w, b.h);

    // label
    ctx.globalAlpha = baseOp * 1.4;
    ctx.font = "8px monospace";
    ctx.fillStyle = `rgb(${ACCENT})`;
    ctx.textAlign = "left";
    ctx.textBaseline = "middle";
    ctx.fillText(b.label, b.pos.x + 4, b.pos.y + b.h / 2);
  });

  // bus label
  ctx.globalAlpha = baseOp;
  ctx.font = "7px monospace";
  ctx.fillStyle = `rgb(${ACCENT})`;
  ctx.textAlign = "center";
  ctx.fillText("SYSTEM BUS", busBlock.pos.x + busBlock.w / 2, busBlock.pos.y + busBlock.h + 10);

  ctx.restore();

  // void: suppress unused warning
  void busBlock;
}

// ── main component ───────────────────────────────────────────────────────────

export function HeroCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let raf: number;
    let w = 0;
    let h = 0;

    let nodes: Node[] = [];
    let edges: Edge[] = [];
    let bits: Bit[] = [];
    let cpuBlocks: CpuBlock[] = [];

    function init() {
      w = window.innerWidth;
      h = window.innerHeight;
      canvas!.width = w;
      canvas!.height = h;

      const nodeCount = Math.max(10, Math.floor((w * h) / 28000));
      const edgeCount = Math.floor(nodeCount * 1.4);
      const bitCount = Math.max(30, Math.floor((w * h) / 8000));

      nodes = makeNodes(w, h, nodeCount);
      edges = makeEdges(nodeCount, edgeCount);
      bits = makeBits(w, h, bitCount);
      cpuBlocks = makeCpuBlocks(w, h);
    }

    function tick() {
      if (!ctx || !canvas) return;
      ctx.clearRect(0, 0, w, h);

      // ── update nodes ──
      nodes.forEach((n) => {
        n.pos.x += n.vel.x;
        n.pos.y += n.vel.y;
        if (n.pos.x < -30) n.pos.x = w + 30;
        if (n.pos.x > w + 30) n.pos.x = -30;
        if (n.pos.y < -30) n.pos.y = h + 30;
        if (n.pos.y > h + 30) n.pos.y = -30;

        // fade in/out
        n.opacity += (n.targetOpacity - n.opacity) * n.fadeSpeed * 20;
        if (Math.abs(n.opacity - n.targetOpacity) < 0.005) {
          n.targetOpacity = rand(0.04, 0.18);
        }
      });

      // ── update edge pulses ──
      edges.forEach((e) => {
        if (!e.active) return;
        e.pulse += e.speed;
        if (e.pulse > 1) {
          e.pulse = 0;
          // randomly deactivate/reactivate
          if (Math.random() > 0.7) e.active = false;
        }
      });
      // randomly reactivate dormant edges
      edges.forEach((e) => {
        if (!e.active && Math.random() < 0.002) e.active = true;
      });

      // ── update bits ──
      bits.forEach((b) => {
        b.pos.x += b.vel.x;
        b.pos.y += b.vel.y;
        if (b.pos.y < -20) {
          b.pos.y = h + 10;
          b.pos.x = rand(0, w);
          b.char = Math.random() > 0.5 ? "1" : "0";
        }
        if (b.pos.x < 0) b.pos.x = w;
        if (b.pos.x > w) b.pos.x = 0;
      });

      // ── update cpu activity bars ──
      cpuBlocks.forEach((b) => {
        b.activity += b.activityDir * 0.003;
        if (b.activity >= 1) { b.activity = 1; b.activityDir = -1; }
        if (b.activity <= 0) { b.activity = 0; b.activityDir = 1; }
      });

      // ── draw ──
      bits.forEach((b) => drawBit(ctx, b));
      drawCpuBlocks(ctx, cpuBlocks);
      edges.forEach((e) => drawEdge(ctx, e, nodes));
      nodes.forEach((n) => drawNode(ctx, n));

      raf = requestAnimationFrame(tick);
    }

    init();
    tick();

    const onResize = () => { init(); };
    window.addEventListener("resize", onResize);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", onResize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: "fixed",
        inset: 0,
        width: "100%",
        height: "100%",
        pointerEvents: "none",
        zIndex: 0,
      }}
      aria-hidden
    />
  );
}
