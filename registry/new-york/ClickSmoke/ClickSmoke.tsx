"use client"

import { useRef, useEffect, useCallback } from 'react';
import type { ReactNode } from 'react';

type Particle = {
  x: number;
  y: number;
  vx: number;
  vy: number;
  r: number;
  startTime: number;
};

type ClickSmokeProps = {
  fillColor?: string;
  puffCount?: number;
  spreadX?: number;
  minRiseSpeed?: number;
  maxRiseSpeed?: number;
  driftSpeed?: number;
  minRadius?: number;
  maxRadius?: number;
  growSpeed?: number;
  opacity?: number;
  duration?: number;
  children?: ReactNode;
};

export default function ClickSmoke({
  fillColor = '#fff',
  puffCount = 8,
  spreadX = 10,
  minRiseSpeed = 0.5,
  maxRiseSpeed = 1.5,
  driftSpeed = 1,
  minRadius = 5,
  maxRadius = 15,
  growSpeed = 0.3,
  opacity = 0.15,
  duration = 2500,
  children,
}: ClickSmokeProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const particlesRef = useRef<Particle[]>([]);
  const animIdRef = useRef<number | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const parent = canvas.parentElement;
    if (!parent) return;

    const resize = () => {
      const { width, height } = parent.getBoundingClientRect();
      if (canvas.width !== width || canvas.height !== height) {
        canvas.width = width;
        canvas.height = height;
      }
    };

    const ro = new ResizeObserver(resize);
    ro.observe(parent);
    resize();

    return () => ro.disconnect();
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const draw = (timestamp: number) => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      particlesRef.current = particlesRef.current.filter((p) => {
        const elapsed = timestamp - p.startTime;
        if (elapsed >= duration) return false;

        const progress = elapsed / duration;
        const alpha = Math.max(0, 1 - progress);

        p.x += p.vx;
        p.y += p.vy;

        p.r += growSpeed;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = fillColor;
        ctx.globalAlpha = alpha * opacity;
        ctx.fill();
        ctx.globalAlpha = 1;

        return true;
      });

      animIdRef.current = requestAnimationFrame(draw);
    };

    animIdRef.current = requestAnimationFrame(draw);

    return () => {
      if (animIdRef.current !== null) {
        cancelAnimationFrame(animIdRef.current);
      }
    };
  }, [fillColor, duration, growSpeed, opacity]);

  const handleClick = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      const canvas = canvasRef.current;
      if (!canvas) return;
      const rect = canvas.getBoundingClientRect();
      const cx = e.clientX - rect.left;
      const cy = e.clientY - rect.top;
      const now = performance.now();

      const newParticles: Particle[] = Array.from(
        { length: puffCount },
        () => ({
          x: cx + (Math.random() - 0.5) * spreadX,
          y: cy,
          vx: (Math.random() - 0.5) * driftSpeed,
          vy: -(minRiseSpeed + Math.random() * (maxRiseSpeed - minRiseSpeed)),
          r: minRadius + Math.random() * (maxRadius - minRadius),
          startTime: now,
        })
      );

      particlesRef.current.push(...newParticles);
    },
    [puffCount, spreadX, minRiseSpeed, maxRiseSpeed, driftSpeed, minRadius, maxRadius]
  );

  return (
    <div className="relative w-fit h-fit" onClick={handleClick}>
      <canvas
        ref={canvasRef}
        className="absolute top-0 left-0 w-full h-full pointer-events-none select-none z-10"
      />
      {children}
    </div>
  );
};
