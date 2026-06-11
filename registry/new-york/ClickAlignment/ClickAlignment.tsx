"use client"

import { useRef, useEffect } from 'react';
import type { ReactNode } from 'react';

interface AlignDot {
  x: number;
  y: number;
  tx: number;
  ty: number;
  life: number;
  decay: number;
}


interface ClickAlignmentProps {
  className?: string;
  color?: string;
  dotSize?: number;
  count?: number;
  spread?: number;
  children?: ReactNode;
}

export default function ClickAlignment({
  className,
  color = '#fff',
  dotSize = 2,
  count = 20,
  spread = 80,
  children,
}: ClickAlignmentProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const dotsRef = useRef<AlignDot[]>([]);
  const isRunningRef = useRef<boolean>(false);
  const animationIdRef = useRef<number | null>(null);
  const optionsRef = useRef({ color, dotSize, count, spread });

  // KEEPING EVERYTHING ELSE EXACTLY THE SAME
  const decay = 0.015;
  const gridSize = 15;
  const easeSpeed = 0.15;

  useEffect(() => {
    optionsRef.current = { color, dotSize, count, spread };
  }, [color, dotSize, count, spread]);

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
      if (dotsRef.current.length === 0) {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        isRunningRef.current = false;
        return;
      }

      ctx.clearRect(0, 0, canvas.width, canvas.height);
      const { color: currentColor, dotSize: currentDotSize } =
        optionsRef.current;

      dotsRef.current = dotsRef.current.filter((p: AlignDot) => {
        p.life -= p.decay;
        if (p.life <= 0) return false;

        p.x += (p.tx - p.x) * easeSpeed;
        p.y += (p.ty - p.y) * easeSpeed;

        ctx.globalAlpha = Math.max(0, p.life);
        ctx.fillStyle = currentColor;
        ctx.fillRect(
          p.x - currentDotSize,
          p.y - currentDotSize,
          currentDotSize * 2,
          currentDotSize * 2
        );

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
    const cx = e.clientX - rect.left;
    const cy = e.clientY - rect.top;
    const { count: currentCount, spread: currentSpread } = optionsRef.current;

    for (let i = 0; i < currentCount; i++) {
      const startX = cx + (Math.random() - 0.5) * currentSpread;
      const startY = cy + (Math.random() - 0.5) * currentSpread;

      const tx =
        Math.round((cx + (Math.random() - 0.5) * currentSpread) / gridSize) *
        gridSize;

      const ty =
        Math.round((cy + (Math.random() - 0.5) * currentSpread) / gridSize) *
        gridSize;

      dotsRef.current.push({
        x: startX,
        y: startY,
        tx,
        ty,
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
