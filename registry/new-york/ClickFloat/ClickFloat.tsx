"use client"

import { useRef, useEffect, useCallback } from 'react';
import type { ReactNode } from 'react';

type Particle = {
  originX: number;
  y: number;
  vy: number;
  phase: number;
  amp: number;
  startTime: number;
};

type ClickFloatProps = {
  fillColor?: string;
  particleCount?: number;
  spreadX?: number;
  minRiseSpeed?: number;
  maxRiseSpeed?: number;
  minAmplitude?: number;
  maxAmplitude?: number;
  phaseSpeed?: number;
  dotRadius?: number;
  duration?: number;
  children?: ReactNode;
};

export default function ClickFloat({
  fillColor = '#fff',
  particleCount = 25,
  spreadX = 40,
  minRiseSpeed = 0.5,
  maxRiseSpeed = 1.5,
  minAmplitude = 1,
  maxAmplitude = 3,
  phaseSpeed = 0.05,
  dotRadius = 1.5,
  duration = 3000,
  children,
}: ClickFloatProps) {
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

        p.y += p.vy;
        p.phase += phaseSpeed;

        const fx = p.originX + Math.sin(p.phase) * p.amp;

        ctx.beginPath();
        ctx.arc(fx, p.y, dotRadius, 0, Math.PI * 2);
        ctx.fillStyle = fillColor;
        ctx.globalAlpha = alpha;
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
  }, [fillColor, duration, dotRadius, phaseSpeed]);

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
        () => ({
          originX: cx + (Math.random() - 0.5) * spreadX,
          y: cy,
          vy: -(
            minRiseSpeed +
            Math.random() * (maxRiseSpeed - minRiseSpeed)
          ),
          phase: Math.random() * Math.PI * 2,
          amp:
            minAmplitude +
            Math.random() * (maxAmplitude - minAmplitude),
          startTime: now,
        })
      );

      particlesRef.current.push(...newParticles);
    },
    [
      particleCount,
      spreadX,
      minRiseSpeed,
      maxRiseSpeed,
      minAmplitude,
      maxAmplitude,
    ]
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
