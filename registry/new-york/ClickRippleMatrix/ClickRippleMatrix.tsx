"use client"

import { useRef, useEffect, useCallback } from 'react';
import type { ReactNode } from 'react';

type Particle = {
  x: number;
  y: number;
  phase: number;
  startTime: number;
};

type ClickRippleMatrixProps = {
  className?: string;
  dotColor?: string;
  gridRadius?: number;
  gridSpacing?: number;
  waveSpeed?: number;
  maxDotRadius?: number;
  duration?: number;
  children?: ReactNode;
};

export default function ClickRippleMatrix({
  className,
  dotColor = '#fff',
  gridRadius = 3,
  gridSpacing = 15,
  waveSpeed = 0.2,
  maxDotRadius = 3,
  duration = 2000,
  children,
}: ClickRippleMatrixProps) {
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

        p.phase -= waveSpeed;

        for (let ix = -gridRadius; ix <= gridRadius; ix++) {
          for (let iy = -gridRadius; iy <= gridRadius; iy++) {
            const dist = Math.sqrt(ix * ix + iy * iy);

            const size = Math.max(
              0,
              Math.sin(dist * 1 - p.phase) *
                maxDotRadius *
                alpha
            );

            if (size <= 0) continue;

            ctx.beginPath();
            ctx.arc(
              p.x + ix * gridSpacing,
              p.y + iy * gridSpacing,
              size,
              0,
              Math.PI * 2
            );
            ctx.fillStyle = dotColor;
            ctx.globalAlpha = alpha;
            ctx.fill();
          }
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
  }, [dotColor, duration, gridRadius, gridSpacing, waveSpeed, maxDotRadius]);

  const handleClick = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      const canvas = canvasRef.current;
      if (!canvas) return;
      const rect = canvas.getBoundingClientRect();
      const cx = e.clientX - rect.left;
      const cy = e.clientY - rect.top;
      const now = performance.now();

      particlesRef.current.push({
        x: cx,
        y: cy,
        phase: 0,
        startTime: now,
      });
    },
    []
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
