"use client"

import { useRef, useEffect, useCallback, ReactNode } from 'react';

type Particle = {
  x: number;
  y: number;
  angle: number;
  length: number;
  vlength: number;
  startTime: number;
};

type ClickRadiateProps = {
  strokeColor?: string;
  rayCount?: number;
  minSpeed?: number;
  maxSpeed?: number;
  lineWidth?: number;
  duration?: number;
  children?: ReactNode;
};

export default function ClickRadiate({
  strokeColor = '#fff',
  rayCount = 15,
  minSpeed = 8,
  maxSpeed = 13,
  lineWidth = 1.5,
  duration = 1000,
  children,
}: ClickRadiateProps) {
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

        p.length += p.vlength;

        const startDist = p.length * 0.5;
        const x1 = p.x + Math.cos(p.angle) * startDist;
        const y1 = p.y + Math.sin(p.angle) * startDist;
        const x2 = p.x + Math.cos(p.angle) * p.length;
        const y2 = p.y + Math.sin(p.angle) * p.length;

        ctx.beginPath();
        ctx.moveTo(x1, y1);
        ctx.lineTo(x2, y2);
        ctx.lineWidth = lineWidth;
        ctx.strokeStyle = strokeColor;
        ctx.globalAlpha = alpha;
        ctx.stroke();
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
  }, [strokeColor, duration, lineWidth]);

  const handleClick = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      const canvas = canvasRef.current;
      if (!canvas) return;
      const rect = canvas.getBoundingClientRect();
      const cx = e.clientX - rect.left;
      const cy = e.clientY - rect.top;
      const now = performance.now();

      const newParticles: Particle[] = Array.from(
        { length: rayCount },
        () => ({
          x: cx,
          y: cy,
          angle: Math.random() * Math.PI * 2,
          length: 0,
          vlength: minSpeed + Math.random() * (maxSpeed - minSpeed),
          startTime: now,
        })
      );

      particlesRef.current.push(...newParticles);
    },
    [rayCount, minSpeed, maxSpeed]
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
