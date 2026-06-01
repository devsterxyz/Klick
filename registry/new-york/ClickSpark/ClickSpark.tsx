"use client"

import { useRef, useEffect, ReactNode } from 'react';

type Spark = {
  x: number;
  y: number;
  originX: number;
  originY: number;
  vx: number;
  vy: number;
  len: number;
  life: number;
  decay: number;
};

type ClickSparkProps = {
  color?: string;
  count?: number;
  speedMin?: number;
  speedMax?: number;
  lenMin?: number;
  lenMax?: number;
  decay?: number;
  maxRadius?: number;
  children?: ReactNode;
};

export default function ClickSpark({
  color = '#fff',
  count = 20,
  speedMin = 4,
  speedMax = 12,
  lenMin = 5,
  lenMax = 20,
  decay = 0.03,
  maxRadius = 80,
  children,
}: ClickSparkProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const sparksRef = useRef<Spark[]>([]);
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
      if (sparksRef.current.length === 0) {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        isRunningRef.current = false;
        return;
      }

      ctx.clearRect(0, 0, canvas.width, canvas.height);

      sparksRef.current = sparksRef.current.filter((p) => {
        p.life -= p.decay;
        if (p.life <= 0) return false;

        p.x += p.vx;
        p.y += p.vy;

        const dx = p.x - p.originX;
        const dy = p.y - p.originY;
        const dist = Math.sqrt(dx * dx + dy * dy);

        if (p.life <= 0 || dist >= maxRadius) return false;

        const tailX = p.x - p.vx * p.len * 0.1;
        const tailY = p.y - p.vy * p.len * 0.1;

        ctx.globalAlpha = Math.max(0, p.life);
        ctx.strokeStyle = color;
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.moveTo(tailX, tailY);
        ctx.lineTo(p.x, p.y);
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
    const PI2 = Math.PI * 2;

    const newSparks: Spark[] = Array.from({ length: count }, () => {
      const angle = Math.random() * PI2;
      const speed = speedMin + Math.random() * (speedMax - speedMin);
      const len = lenMin + Math.random() * (lenMax - lenMin);
      return {
        x,
        y,
        originX: x,
        originY: y,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed,
        len,
        life: 1.0,
        decay,
      };
    });

    sparksRef.current.push(...newSparks);
    startLoop();
  };

  return (
    <div className="relative w-fit h-fit" onClick={handleClick}>
      <canvas
        ref={canvasRef}
        className="w-full h-full block absolute top-0 left-0 select-none pointer-events-none z-10"
      />
      {children}
    </div>
  );
};
