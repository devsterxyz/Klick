
"use client"

import { useRef, useEffect } from 'react';
import { createPortal } from 'react-dom';
import type { ReactNode } from 'react';

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

  // sync canvas to full viewport
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const syncSize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    syncSize();
    window.addEventListener('resize', syncSize);
    return () => window.removeEventListener('resize', syncSize);
  }, []);

  // cleanup on unmount
  useEffect(() => {
    return () => {
      if (animationIdRef.current !== null) {
        cancelAnimationFrame(animationIdRef.current);
      }
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

        if (dist >= maxRadius) return false;

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

  // clientX/Y maps directly to fixed canvas — no rect offset needed
  const handleClick = (e: React.MouseEvent) => {
    const PI2 = Math.PI * 2;

    const newSparks: Spark[] = Array.from({ length: count }, () => {
      const angle = Math.random() * PI2;
      const speed = speedMin + Math.random() * (speedMax - speedMin);
      const len = lenMin + Math.random() * (lenMax - lenMin);
      return {
        x: e.clientX,
        y: e.clientY,
        originX: e.clientX,
        originY: e.clientY,
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
    <>
      <div style={{ display: 'contents' }} onClick={handleClick}>
        {children}
      </div>

      {typeof window !== 'undefined' &&
        createPortal(
          <canvas
            ref={canvasRef}
            style={{
              position: 'fixed',
              top: 0,
              left: 0,
              width: '100vw',
              height: '100vh',
              pointerEvents: 'none',
              zIndex: 9999,
            }}
          />,
          document.body
        )}
    </>
  );
}