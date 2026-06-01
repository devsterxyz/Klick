"use client"

import { useRef, useEffect, ReactNode } from 'react';

interface GenText {
  x: number;
  y: number;
  text: string;
  timer: number;
  life: number;
  decay: number;
}

interface ClickGenerativeProps {
  color?: string;
  decay?: number;
  maxChars?: number;
  charSet?: string;
  children?: ReactNode;
}

export default function ClickGenerative({
  color = '#fff',
  decay = 0.01,
  maxChars = 12,
  charSet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789',
  children,
}: ClickGenerativeProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const particlesRef = useRef<GenText[]>([]);
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

      particlesRef.current = particlesRef.current.filter((p: GenText) => {
        p.life -= p.decay;
        if (p.life <= 0) return false;

        p.timer++;

        // Add a new character every 2 frames until maxChars
        if (p.timer % 2 === 0 && p.text.length < maxChars) {
          p.text += charSet[Math.floor(Math.random() * charSet.length)];
        }

        ctx.globalAlpha = Math.max(0, p.life);
        ctx.fillStyle = color;
        ctx.font = '10px monospace';
        ctx.textAlign = 'left';
        ctx.textBaseline = 'middle';
        ctx.fillText(p.text, p.x, p.y);

        // Blinking cursor
        const textWidth = ctx.measureText(p.text).width;
        if (Math.floor(p.life * 20) % 2 === 0) {
          ctx.fillRect(p.x + textWidth + 2, p.y - 5, 5, 10);
        }

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
      text: '',
      timer: 0,
      life: 1.0,
      decay,
    });

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
