"use client"

import { useEffect, useRef, useCallback } from "react";

// ── Types ─────────────────────────────────────────────────────────
interface RippleParticle {
  x: number;
  y: number;
  r: number;
  vr: number;
  life: number;
  decay: number;
  rippleWidth: number;
  rippleHeight: number;
}

interface SolidRippleProps {
  /** Width of the canvas panel in px */
  width?: number;
  /** Height of the canvas panel in px */
  height?: number;
  /** Ripple expansion speed (px per frame) */
  speed?: number;
  /** How fast the ripple fades out (0.01 = slow, 0.1 = fast) */
  decay?: number;
  /** Final width of the ripple animation in px */
  rippleWidth?: number;
  /** Final height of the ripple animation in px */
  rippleHeight?: number;
  /** Fill color of the ripple */
  color?: string;
  /** Background color of the panel */
  background?: string;
  className?: string;
}

export default function ClickSolidRipple({
  width = 320,
  height = 200,
  speed = 4,
  decay = 0.03,
  rippleWidth = 180,
  rippleHeight = 180,
  color = "#ffffff",
  background = "#050505",
  className = "",
}: SolidRippleProps) {
  const canvasRef  = useRef<HTMLCanvasElement>(null);
  const particles  = useRef<RippleParticle[]>([]);
  const rafRef     = useRef<number | null>(null);
  const isRunning  = useRef<boolean>(false);

  // ── Animation loop ────────────────────────────────────────────
  const animate = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Stop if nothing left to draw
    if (particles.current.length === 0) {
      isRunning.current = false;
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      return;
    }

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    for (let i = particles.current.length - 1; i >= 0; i--) {
      const p = particles.current[i];
      p.life -= p.decay;

      if (p.life <= 0) {
        particles.current.splice(i, 1);
        continue;
      }

      // Expand radius
      p.r += p.vr;
      const progress = Math.min(1, p.r / Math.max(p.rippleWidth, p.rippleHeight));

      // Draw solid filled ripple without resizing the panel
      ctx.globalAlpha = Math.max(0, p.life * 0.25); // translucent fill like original
      ctx.beginPath();
      ctx.ellipse(
        p.x,
        p.y,
        Math.max(0, (p.rippleWidth / 2) * progress),
        Math.max(0, (p.rippleHeight / 2) * progress),
        0,
        0,
        Math.PI * 2,
      );
      ctx.fillStyle = color;
      ctx.fill();
    }

    ctx.globalAlpha = 1;
    rafRef.current = requestAnimationFrame(animate);
  }, [color]);

  // ── Spawn a ripple at click coordinates ───────────────────────
  const spawnRipple = useCallback(
    (x: number, y: number) => {
      const particle: RippleParticle = {
        x,
        y,
        r: 0,
        vr: speed,
        life: 1.0,
        decay,
        rippleWidth,
        rippleHeight,
      };
      particles.current.push(particle);

      if (!isRunning.current) {
        isRunning.current = true;
        rafRef.current = requestAnimationFrame(animate);
      }
    },
    [speed, decay, rippleWidth, rippleHeight, animate],
  );

  // ── Mouse handler ─────────────────────────────────────────────
  const handleMouseDown = useCallback(
    (e: React.MouseEvent<HTMLCanvasElement>) => {
      const rect = canvasRef.current?.getBoundingClientRect();
      if (!rect) return;
      spawnRipple(e.clientX - rect.left, e.clientY - rect.top);
    },
    [spawnRipple],
  );

  // ── Touch handler ─────────────────────────────────────────────
  const handleTouchStart = useCallback(
    (e: React.TouchEvent<HTMLCanvasElement>) => {
      e.preventDefault();
      const rect = canvasRef.current?.getBoundingClientRect();
      if (!rect) return;
      const touch = e.touches[0];
      spawnRipple(touch.clientX - rect.left, touch.clientY - rect.top);
    },
    [spawnRipple],
  );

  // ── Resize canvas to match layout size ───────────────────────
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    canvas.width  = width;
    canvas.height = height;
  }, [width, height]);

  // ── Cleanup on unmount ────────────────────────────────────────
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
        cursor: "crosshair",
        border: "1px solid #222",
      }}
    >
      {/* Idle hint label */}
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
        style={{
          position: "absolute",
          inset: 0,
          display: "block",
        }}
        onMouseDown={handleMouseDown}
        onTouchStart={handleTouchStart}
      />
    </div>
  );
}
