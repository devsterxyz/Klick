"use client"

import { useRef, useEffect, useCallback, ReactNode } from 'react';

type Particle = {
  x: number;
  y: number;
  startTime: number;
};

type ClickFissionProps = {
  fillColor?: string;
  duration?: number;
  maxSpread?: number;
  children?: ReactNode;
};

export default function ClickFission({
  fillColor = '#fff',
  duration = 1500,
  maxSpread = 40,
  children,
}: ClickFissionProps) {
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

        const life = 1 - progress;

        let splits: number, radius: number, spread: number;
        if (life > 0.6) {
          splits = 1;
          radius = 8;
          spread = 0;
        } else if (life > 0.3) {
          splits = 3;
          radius = 4;
          spread = (1 - life) * maxSpread;
        } else {
          splits = 9;
          radius = 2;
          spread = (1 - life) * maxSpread;
        }

        const spinAngle = life * 5;

        for (let i = 0; i < splits; i++) {
          const angle = i * ((Math.PI * 2) / splits) + spinAngle;
          const sx =
            p.x + (splits > 1 ? Math.cos(angle) * spread : 0);
          const sy =
            p.y + (splits > 1 ? Math.sin(angle) * spread : 0);

          ctx.beginPath();
          ctx.arc(sx, sy, radius, 0, Math.PI * 2);
          ctx.fillStyle = fillColor;
          ctx.globalAlpha = alpha;
          ctx.fill();
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
  }, [fillColor, duration, maxSpread]);

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
        startTime: now,
      });
    },
    []
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
