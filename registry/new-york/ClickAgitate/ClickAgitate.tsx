"use client"

import { useRef, useEffect, useCallback, ReactNode } from "react";

type Particle = {
  x: number;
  y: number;
  vx: number;
  vy: number;
  amp: number;
  startTime: number;
};

type ClickAgitateProps = {
  strokeColor?: string;
  particleCount?: number;
  duration?: number;
  particleSize?: number;
  children?: ReactNode;
};

export default function ClickAgitate({
  strokeColor = "#ffffff",
  particleCount = 25,
  duration = 1200,
  particleSize = 2,
  children,
}: ClickAgitateProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const particlesRef = useRef<Particle[]>([]);
  const animIdRef = useRef<number | null>(null);

  // physics defaults
  const minSpeed = 2;
  const maxSpeed = 6;
  const jitterAmp = 10;
  const jitterDecay = 0.94;
  const drag = 0.98;
  const trailOpacity = 0.5;

  // resize canvas
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const parent = canvas.parentElement;
    if (!parent) return;

    const resize = () => {
      const { width, height } = parent.getBoundingClientRect();
      canvas.width = width;
      canvas.height = height;
    };

    const ro = new ResizeObserver(resize);
    ro.observe(parent);
    resize();
    return () => ro.disconnect();
  }, []);

  // animation loop
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const draw = (timestamp: number) => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      particlesRef.current = particlesRef.current.filter((p) => {
        const elapsed = timestamp - p.startTime;
        if (elapsed >= duration) return false;

        const progress = elapsed / duration;

        // smoother fade (ease-out)
        const alpha = Math.pow(1 - progress, 1.5);

        // motion
        p.x += p.vx;
        p.y += p.vy;

        // drag (smooth slowdown)
        p.vx *= drag;
        p.vy *= drag;

        // jitter
        p.amp *= jitterDecay;

        const jx = p.x + (Math.random() - 0.5) * p.amp;
        const jy = p.y + (Math.random() - 0.5) * p.amp;

        // particle
        ctx.fillStyle = strokeColor;
        ctx.globalAlpha = alpha;
        ctx.fillRect(jx, jy, particleSize, particleSize);

        // trail
        ctx.beginPath();
        ctx.moveTo(jx, jy);
        ctx.lineTo(
          jx - p.vx * 2 + (Math.random() - 0.5) * p.amp,
          jy - p.vy * 2 + (Math.random() - 0.5) * p.amp
        );
        ctx.lineWidth = 1;
        ctx.strokeStyle = strokeColor;
        ctx.globalAlpha = alpha * trailOpacity;
        ctx.stroke();

        ctx.globalAlpha = 1;

        return true;
      });

      animIdRef.current = requestAnimationFrame(draw);
    };

    animIdRef.current = requestAnimationFrame(draw);
    return () => {
      if (animIdRef.current) cancelAnimationFrame(animIdRef.current);
    };
  }, [strokeColor, duration, particleSize]);

  // click handler
  const handleClick = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      const canvas = canvasRef.current;
      if (!canvas) return;

      const rect = canvas.getBoundingClientRect();
      const cx = e.clientX - rect.left;
      const cy = e.clientY - rect.top;

      const now = performance.now();

      const newParticles: Particle[] = Array.from(
        { length: particleCount },
        () => {
          const angle = Math.random() * Math.PI * 2;
          const speed =
            minSpeed + Math.random() * (maxSpeed - minSpeed);

          return {
            x: cx,
            y: cy,
            vx: Math.cos(angle) * speed,
            vy: Math.sin(angle) * speed,
            amp: jitterAmp,
            startTime: now,
          };
        }
      );

      particlesRef.current.push(...newParticles);
    },
    [particleCount]
  );

  return (
    <div className="relative w-fit h-fit" onClick={handleClick}>
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full pointer-events-none z-10"
      />
      {children}
    </div>
  );
};
