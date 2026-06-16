
"use client"

import { useRef, useEffect } from 'react';
import { createPortal } from 'react-dom';
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

  // clientX/Y maps directly to fixed canvas — no rect offset needed
  const handleClick = (e: React.MouseEvent) => {
    for (let i = 0; i < count; i++) {
      starsRef.current.push({
        x: e.clientX + (Math.random() - 0.5) * scatter,
        y: e.clientY + (Math.random() - 0.5) * scatter,
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