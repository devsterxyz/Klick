"use client"

import { useRef, useEffect } from 'react';
import type { ReactNode } from 'react';

type Ring = {
  x: number;
  y: number;
  r: number;
  maxRadius: number;
  life: number;
  decay: number;
  vr: number;
  delay: number;
  frame: number;
};

type ClickRippleProps = {
  className?: string;
  color?: string;
  lineWidth?: number;
  maxRadius?: number;
  duration?: number;
  rippleCount?: number;
  children?: ReactNode;
};

export default function ClickRipple({
  className,
  color = '#fff',
  lineWidth = 0.5,
  maxRadius = 50,
  duration = 600,
  rippleCount = 5,
  children,
}: ClickRippleProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const ringsRef = useRef<Ring[]>([]);
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
      if (ringsRef.current.length === 0) {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        isRunningRef.current = false;
        return;
      }

      ctx.clearRect(0, 0, canvas.width, canvas.height);

      ringsRef.current = ringsRef.current.filter((p) => {
        p.life -= p.decay;
        if (p.life <= 0) return false;

        p.r += p.vr;

        ctx.globalAlpha = Math.max(0, p.life);
        ctx.strokeStyle = color;
        ctx.lineWidth = lineWidth;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
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

    const frameRate = 60;
    const totalFrames = (duration / 1000) * frameRate;

    for (let i = 0; i < rippleCount; i++) {
      const delayFactor = i * 0.15;

      ringsRef.current.push({
        x,
        y,
        r: 0,
        maxRadius,
        life: 1,
        decay: 1 / totalFrames,
        vr: maxRadius / totalFrames,
        delay: delayFactor * totalFrames,
        frame: 0,
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
