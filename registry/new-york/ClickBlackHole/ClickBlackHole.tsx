"use client"

import { useRef, useEffect } from 'react';
import type { ReactNode } from 'react';

interface BlackHoleParticle {
  cx: number;
  cy: number;
  angle: number;
  dist: number;
  life: number;
  decay: number;
}

interface ClickBlackHoleProps {
  color?: string;
  dotSize?: number;
  count?: number;
  decay?: number;
  minDist?: number;
  maxDist?: number;
  accretion?: number;
  coreRadius?: number;
  children?: ReactNode;
}

export default function ClickBlackHole({
  color = '#fff',
  dotSize = 2,
  count = 40,
  decay = 0.01,
  minDist = 60,
  maxDist = 40,
  accretion = 0.93,
  coreRadius = 8,
  children,
}: ClickBlackHoleProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const particlesRef = useRef<BlackHoleParticle[]>([]);
  const isRunningRef = useRef<boolean>(false);
  const animationIdRef = useRef<number | null>(null);
  const optionsRef = useRef({
    color,
    dotSize,
    count,
    decay,
    minDist,
    maxDist,
    accretion,
    coreRadius,
  });

  useEffect(() => {
    optionsRef.current = {
      color,
      dotSize,
      count,
      decay,
      minDist,
      maxDist,
      accretion,
      coreRadius,
    };
  }, [color, dotSize, count, decay, minDist, maxDist, accretion, coreRadius]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const parent = canvas.parentElement;
    if (!parent) return;

    let resizeTimeout: ReturnType<typeof setTimeout>;

    const resizeCanvas = () => {
      const { width, height } = parent.getBoundingClientRect();
      if (canvas.width !== width || canvas.height !== height) {
        canvas.width = width;
        canvas.height = height;
      }
    };

    const handleResize = () => {
      clearTimeout(resizeTimeout);
      resizeTimeout = setTimeout(resizeCanvas, 100);
    };

    const ro = new ResizeObserver(handleResize);
    ro.observe(parent);
    resizeCanvas();

    return () => {
      ro.disconnect();
      clearTimeout(resizeTimeout);
    };
  }, []);

  const startLoop = () => {
    if (isRunningRef.current) return;
    isRunningRef.current = true;

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const draw = () => {
      if (particlesRef.current.length === 0) {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        isRunningRef.current = false;
        return;
      }

      ctx.clearRect(0, 0, canvas.width, canvas.height);
      const {
        color: currentColor,
        dotSize: currentDotSize,
        accretion: currentAccretion,
        coreRadius: currentCoreRadius,
      } = optionsRef.current;

      // Collect unique centers to draw cores
      const centers = new Map<string, { cx: number; cy: number; life: number }>();

      particlesRef.current = particlesRef.current.filter((p: BlackHoleParticle) => {
        p.life -= p.decay;
        if (p.life <= 0) return false;

        // Accretion — spiral inward
        p.dist *= currentAccretion;

        // Keplerian-like speed: faster as dist shrinks
        p.angle += 3 / Math.max(5, p.dist);

        const px = p.cx + Math.cos(p.angle) * p.dist;
        const py = p.cy + Math.sin(p.angle) * p.dist;

        ctx.globalAlpha = Math.max(0, p.life);
        ctx.fillStyle = currentColor;
        ctx.beginPath();
        ctx.arc(px, py, currentDotSize, 0, Math.PI * 2);
        ctx.fill();

        // Track center for core drawing
        const key = `${p.cx},${p.cy}`;
        if (!centers.has(key) || centers.get(key)!.life < p.life) {
          centers.set(key, { cx: p.cx, cy: p.cy, life: p.life });
        }

        return true;
      });

      // Draw event horizon core for each active black hole
      for (const { cx, cy, life } of centers.values()) {
        ctx.globalAlpha = Math.max(0, life * 0.5);
        ctx.beginPath();
        ctx.arc(cx, cy, currentCoreRadius, 0, Math.PI * 2);
        ctx.strokeStyle = currentColor;
        ctx.lineWidth = 1;
        ctx.stroke();
      }

      ctx.globalAlpha = 1;
      animationIdRef.current = requestAnimationFrame(draw);
    };

    animationIdRef.current = requestAnimationFrame(draw);
  };

  useEffect(() => {
    return () => {
      if (animationIdRef.current !== null) {
        cancelAnimationFrame(animationIdRef.current);
      }
    };
  }, []);

  const handleClick = (e: React.MouseEvent<HTMLDivElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const rect = canvas.getBoundingClientRect();
    const cx = e.clientX - rect.left;
    const cy = e.clientY - rect.top;
    const {
      count: currentCount,
      minDist: currentMinDist,
      maxDist: currentMaxDist,
      decay: currentDecay,
    } = optionsRef.current;

    for (let i = 0; i < currentCount; i++) {
      particlesRef.current.push({
        cx,
        cy,
        angle: Math.random() * Math.PI * 2,
        dist: currentMinDist + Math.random() * currentMaxDist,
        life: 1.0,
        decay: currentDecay,
      });
    }

    startLoop();
  };

  return (
    <div className="relative w-fit h-fit" onClick={handleClick}>
      <canvas
        ref={canvasRef}
        className="w-full h-full block absolute top-0 left-0 select-none pointer-events-none z-10 "
      />
      {children}
    </div>
  );
};
