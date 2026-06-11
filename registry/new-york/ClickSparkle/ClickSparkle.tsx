"use client"

import { useRef, useEffect } from 'react';
import type { ReactNode } from 'react';

type Star = {
  x: number;
  y: number;
  size: number;
  max_size: number;
  growing: boolean;
  life: number;
  decay: number;
};

type ClickSparkleProps = {
  className?: string;
  color?: string;
  lineWidth?: number;
  count?: number;
  scatter?: number;
  minSize?: number;
  maxSize?: number;
  decay?: number;
  children?: ReactNode;
};

export default function ClickSparkle({
  className,
  color = '#fff',
  lineWidth = 1,
  count = 8,
  scatter = 50,
  minSize = 2,
  maxSize = 8,
  decay = 0.02,
  children,
}: ClickSparkleProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const starsRef = useRef<Star[]>([]);
  const isRunningRef = useRef<boolean>(false);
  const animationIdRef = useRef<number | null>(null);

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
      if (starsRef.current.length === 0) {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        isRunningRef.current = false;
        return;
      }

      ctx.clearRect(0, 0, canvas.width, canvas.height);

      starsRef.current = starsRef.current.filter((p) => {
        p.life -= p.decay;
        if (p.life <= 0) return false;

        if (p.growing) {
          p.size += 1;
          if (p.size >= p.max_size) p.growing = false;
        } else {
          p.size -= 0.5;
          if (p.size < 0) p.size = 0;
        }

        ctx.globalAlpha = Math.max(0, p.life);
        ctx.strokeStyle = color;
        ctx.lineWidth = lineWidth;

        ctx.beginPath();
        ctx.moveTo(p.x - p.size, p.y);
        ctx.lineTo(p.x + p.size, p.y);
        ctx.moveTo(p.x, p.y - p.size);
        ctx.lineTo(p.x, p.y + p.size);
        ctx.stroke();

        return true;
      });

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
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    for (let i = 0; i < count; i++) {
      starsRef.current.push({
        x: x + (Math.random() - 0.5) * scatter,
        y: y + (Math.random() - 0.5) * scatter,
        size: 0,
        max_size: minSize + Math.random() * (maxSize - minSize),
        growing: true,
        life: 1.0,
        decay,
      });
    }

    startLoop();
  };

  return (
    <div className={`relative ${className ?? 'w-fit h-fit'}`} onClick={handleClick}>
      <canvas
        ref={canvasRef}
        className="w-full h-full block absolute top-0 left-0 select-none pointer-events-none z-10"
      />
      {children}
    </div>
  );
};
