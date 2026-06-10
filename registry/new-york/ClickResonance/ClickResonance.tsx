"use client"

import { useEffect, useRef, useCallback } from "react";

// ── Types ─────────────────────────────────────────────────────────
interface StringParticle {
  x: number;       // click x (control point anchor)
  y: number;       // click y (string rest position)
  phase: number;   // current oscillation phase
  amp: number;     // current amplitude (dampens over time)
  life: number;
  decay: number;
}

interface ResonanceProps {
  width?: number;
  height?: number;
  /** Number of strings that fire per click */
  stringsPerClick?: number;
  /** Starting amplitude in px */
  amplitude?: number;
  /** Phase increment per frame — controls oscillation speed */
  phaseSpeed?: number;
  /** Amplitude dampening factor per frame (0.9 = fast, 0.99 = slow) */
  dampen?: number;
  /** Stroke color */
  color?: string;
  /** Background */
  background?: string;
  className?: string;
}

export default function Resonance({
  width = 400,
  height = 240,
  stringsPerClick = 3,
  amplitude = 40,
  phaseSpeed = 0.5,
  dampen = 0.95,
  color = "#ffffff",
  background = "#050505",
  className = "",
}: ResonanceProps) {
  const canvasRef  = useRef<HTMLCanvasElement>(null);
  const particles  = useRef<StringParticle[]>([]);
  const rafRef     = useRef<number | null>(null);
  const isRunning  = useRef<boolean>(false);

  // ── Draw a single resonating string ───────────────────────────
  const drawString = useCallback(
    (
      ctx: CanvasRenderingContext2D,
      p: StringParticle,
      canvasWidth: number,
    ) => {
      // Control point oscillates vertically around the click y
      const controlY = p.y + Math.sin(p.phase) * p.amp;

      ctx.beginPath();
      ctx.moveTo(0, p.y);
      ctx.quadraticCurveTo(p.x, controlY, canvasWidth, p.y);
      ctx.lineWidth = 1.5;
      ctx.strokeStyle = color;
      ctx.globalAlpha = Math.max(0, p.life);
      ctx.stroke();

      // Draw a small node dot at the pluck point
      ctx.beginPath();
      ctx.arc(p.x, controlY, 2.5, 0, Math.PI * 2);
      ctx.fillStyle = color;
      ctx.globalAlpha = Math.max(0, p.life * 0.8);
      ctx.fill();
    },
    [color],
  );

  // ── Animation loop ────────────────────────────────────────────
  const animate = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    if (particles.current.length === 0) {
      isRunning.current = false;
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      return;
    }

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    for (let i = particles.current.length - 1; i >= 0; i--) {
      const p = particles.current[i];

      // Advance oscillation & dampen
      p.phase += phaseSpeed;
      p.amp   *= dampen;
      p.life  -= p.decay;

      if (p.life <= 0) {
        particles.current.splice(i, 1);
        continue;
      }

      drawString(ctx, p, canvas.width);
    }

    ctx.globalAlpha = 1;
    rafRef.current = requestAnimationFrame(animate);
  }, [phaseSpeed, dampen, drawString]);

  // ── Spawn strings at click point ──────────────────────────────
  const spawnStrings = useCallback(
    (x: number, y: number) => {
      for (let i = 0; i < stringsPerClick; i++) {
        // Spread the strings vertically around the click point
        const offsetY = (i - Math.floor(stringsPerClick / 2)) * 18;
        const particle: StringParticle = {
          x,
          y: y + offsetY,
          phase: Math.random() * Math.PI * 2,   // random start phase
          amp: amplitude * (0.6 + Math.random() * 0.6),
          life: 1.0,
          decay: 0.012 + Math.random() * 0.006, // slight variation
        };
        particles.current.push(particle);
      }

      if (!isRunning.current) {
        isRunning.current = true;
        rafRef.current = requestAnimationFrame(animate);
      }
    },
    [stringsPerClick, amplitude, animate],
  );

  // ── Mouse / touch handlers ────────────────────────────────────
  const handleMouseDown = useCallback(
    (e: React.MouseEvent<HTMLCanvasElement>) => {
      const rect = canvasRef.current?.getBoundingClientRect();
      if (!rect) return;
      spawnStrings(e.clientX - rect.left, e.clientY - rect.top);
    },
    [spawnStrings],
  );

  const handleTouchStart = useCallback(
    (e: React.TouchEvent<HTMLCanvasElement>) => {
      e.preventDefault();
      const rect = canvasRef.current?.getBoundingClientRect();
      if (!rect) return;
      const touch = e.touches[0];
      spawnStrings(touch.clientX - rect.left, touch.clientY - rect.top);
    },
    [spawnStrings],
  );

  // ── Size canvas ───────────────────────────────────────────────
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    canvas.width  = width;
    canvas.height = height;
  }, [width, height]);

  // ── Cleanup ───────────────────────────────────────────────────
  useEffect(() => {
    return () => {
      if (rafRef.current !== null) cancelAnimationFrame(rafRef.current);
    };
  }, []);

  return (
    <div
      className={className}
      style={{
        position: "relative",
        width,
        height,
        background,
        overflow: "hidden",
      }}
    >
      {/* Idle hint */}
      <span
        style={{
          position: "absolute",
          inset: 0,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          color: "#222",
          fontSize: 10,
          letterSpacing: "0.4em",
          fontFamily: "monospace",
          pointerEvents: "none",
          userSelect: "none",
        }}
      >
        CLICK
      </span>

      <canvas
        ref={canvasRef}
        style={{ position: "absolute", inset: 0, display: "block" }}
        onMouseDown={handleMouseDown}
        onTouchStart={handleTouchStart}
      />
    </div>
  );
}
