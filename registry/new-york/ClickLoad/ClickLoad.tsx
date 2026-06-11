"use client"

import { useRef, useEffect } from 'react';
import type { ReactNode } from 'react';

interface LoadParticle {
  x: number;
  y: number;
  timer: number;
  life: number;
  decay: number;
}

interface ClickLoadProps {
  className?: string;
  color?: string;
  decay?: number;
  speed?: number;
  children?: ReactNode;
}

export default function ClickLoad({
  className,
  color = '#fff',
  decay = 0.015,
  speed = 2.5,
  children,
}: ClickLoadProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const particlesRef = useRef<LoadParticle[]>([]);
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
      if (particlesRef.current.length === 0) {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        isRunningRef.current = false;
        return;
      }

      ctx.clearRect(0, 0, canvas.width, canvas.height);

      particlesRef.current = particlesRef.current.filter((p: LoadParticle) => {
        p.life -= p.decay;
        if (p.life <= 0) return false;

        p.timer += speed;

        const pct = Math.min(100, Math.floor(p.timer));

        ctx.globalAlpha = Math.max(0, p.life);
        ctx.fillStyle = color;
        ctx.font = 'bold 12px monospace';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText(`[${pct}%]`, p.x, p.y);

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

    particlesRef.current.push({
      x,
      y,
      timer: 0,
      life: 1.0,
      decay,
    });

    startLoop();
  };

  return (
    <div className={`relative ${className ?? 'w-fit h-fit'}`} onClick={handleClick}>
      <canvas
        ref={canvasRef}
        className="w-full h-full block absolute top-0 left-0 select-none pointer-events-none z-10 "
      />
      {children}
    </div>
  );
};
