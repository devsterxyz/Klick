"use client"

import { useRef, useEffect, useCallback, ReactNode } from 'react';

type Particle = {
  x: number;
  y: number;
  vx: number;
  vy: number;
  startTime: number;
};

type ClickFlowFieldProps = {
  dotColor?: string;
  dotCount?: number;
  initialSpeed?: number;
  fieldStrength?: number;
  fieldScale?: number;
  dotRadius?: number;
  duration?: number;
  children?: ReactNode;
};

export default function ClickFlowField({
  dotColor = '#fff',
  dotCount = 40,
  initialSpeed = 4,
  fieldStrength = 0.2,
  fieldScale = 0.05,
  dotRadius = 1.5,
  duration = 2000,
  children,
}: ClickFlowFieldProps) {
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

        p.vx += Math.sin(p.y * fieldScale) * fieldStrength;
        p.vy += Math.cos(p.x * fieldScale) * fieldStrength;

        p.x += p.vx;
        p.y += p.vy;

        ctx.beginPath();
        ctx.arc(p.x, p.y, dotRadius, 0, Math.PI * 2);
        ctx.fillStyle = dotColor;
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
  }, [dotColor, duration, dotRadius, fieldStrength, fieldScale]);

  const handleClick = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      const canvas = canvasRef.current;
      if (!canvas) return;
      const rect = canvas.getBoundingClientRect();
      const cx = e.clientX - rect.left;
      const cy = e.clientY - rect.top;
      const now = performance.now();

      const newParticles: Particle[] = Array.from(
        { length: dotCount },
        () => ({
          x: cx,
          y: cy,
          vx: (Math.random() - 0.5) * initialSpeed,
          vy: (Math.random() - 0.5) * initialSpeed,
          startTime: now,
        })
      );

      particlesRef.current.push(...newParticles);
    },
    [dotCount, initialSpeed]
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
