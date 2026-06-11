"use client"

import { useRef, useEffect, useCallback } from 'react';
import type { ReactNode } from 'react';

type Particle = {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  startTime: number;
};

type ClickBlastProps = {
  className?: string;
  fillColor?: string;
  particleCount?: number;
  minSpeed?: number;
  maxSpeed?: number;
  spread?: number;
  friction?: number;
  minSize?: number;
  maxSize?: number;
  duration?: number;
  children?: ReactNode;
};

export default function ClickBlast({
  className,
  fillColor = '#fff',
  particleCount = 40,
  minSpeed = 3,
  maxSpeed = 10,
  spread = 1,
  friction = 0.85,
  minSize = 1.5,
  maxSize = 3.5,
  duration = 1200,
  children,
}: ClickBlastProps) {
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

        // spread controls how far particles travel
        p.vx *= friction;
        p.vy *= friction;

        p.x += p.vx * spread;
        p.y += p.vy * spread;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
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
  }, [fillColor, duration, friction, spread]);

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
            size:
              minSize + Math.random() * (maxSize - minSize),
            startTime: now,
          };
        }
      );

      particlesRef.current.push(...newParticles);
    },
    [
      particleCount,
      minSpeed,
      maxSpeed,
      minSize,
      maxSize,
    ]
  );

  return (
    <div className={`relative ${className ?? 'w-fit h-fit'}`} onClick={handleClick}>
      <canvas
        ref={canvasRef}
        className="absolute top-0 left-0 w-full h-full pointer-events-none select-none z-10"
      />
      {children}
    </div>
  );
};
