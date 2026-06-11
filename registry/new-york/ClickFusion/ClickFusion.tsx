"use client"

import { useRef, useEffect, useCallback } from 'react';
import type { ReactNode } from 'react';

type Particle = {
  cx: number;
  cy: number;
  x: number;
  y: number;
  speed: number;
  arrived: boolean;
};

type ParticleGroup = {
  cx: number;
  cy: number;
  particles: Particle[];
  burstR: number;
  startTime: number;
};

type ClickFusionProps = {
  className?: string;
  strokeColor?: string;
  particleCount?: number;
  minSpread?: number;
  maxSpread?: number;
  speed?: number;
  burstRadius?: number;
  duration?: number;
  children?: ReactNode;
};

export default function ClickFusion({
  className,
  strokeColor = '#fff',
  particleCount = 20,
  minSpread = 50,
  maxSpread = 100,
  speed = 4,
  burstRadius = 40,
  duration = 1500,
  children,
}: ClickFusionProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const particlesRef = useRef<ParticleGroup[]>([]);
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

      particlesRef.current = particlesRef.current.filter((group) => {
        const elapsed = timestamp - group.startTime;
        if (elapsed >= duration) return false;

        const progress = elapsed / duration;
        const alpha = Math.max(0, 1 - progress);

        let allArrived = true;

        for (const p of group.particles) {
          if (!p.arrived) {
            const dx = p.cx - p.x;
            const dy = p.cy - p.y;
            const dist = Math.sqrt(dx * dx + dy * dy);

            if (dist > p.speed) {
              p.x += (dx / dist) * p.speed;
              p.y += (dy / dist) * p.speed;
              allArrived = false;

              ctx.beginPath();
              ctx.arc(p.x, p.y, 2, 0, Math.PI * 2);
              ctx.fillStyle = strokeColor;
              ctx.globalAlpha = alpha;
              ctx.fill();
            } else {
              p.arrived = true;
              p.x = p.cx;
              p.y = p.cy;
            }
          }
        }

        if (allArrived) {
          group.burstR = Math.min(group.burstR + 2, burstRadius);
          ctx.beginPath();
          ctx.arc(group.cx, group.cy, group.burstR, 0, Math.PI * 2);
          ctx.lineWidth = 1.5;
          ctx.strokeStyle = strokeColor;
          ctx.globalAlpha = alpha;
          ctx.stroke();
        }

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
  }, [strokeColor, duration, burstRadius, speed]);

  const handleClick = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      const canvas = canvasRef.current;
      if (!canvas) return;
      const rect = canvas.getBoundingClientRect();
      const cx = e.clientX - rect.left;
      const cy = e.clientY - rect.top;
      const now = performance.now();

      const particles: Particle[] = Array.from(
        { length: particleCount },
        () => {
          const angle = Math.random() * Math.PI * 2;
          const dist =
            minSpread + Math.random() * (maxSpread - minSpread);

          return {
            cx,
            cy,
            x: cx + Math.cos(angle) * dist,
            y: cy + Math.sin(angle) * dist,
            speed: speed + Math.random() * 2,
            arrived: false,
          };
        }
      );

      particlesRef.current.push({
        cx,
        cy,
        particles,
        burstR: 0,
        startTime: now,
      });
    },
    [particleCount, minSpread, maxSpread, speed]
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
