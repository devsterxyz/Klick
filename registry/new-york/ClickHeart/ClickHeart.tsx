
"use client"

import { useRef, useEffect } from 'react';
import { createPortal } from 'react-dom';
import type { ReactNode } from 'react';

type Heart = {
  x: number;
  y: number;
  vy: number;
  size: number;
  phase: number;
  life: number;
  decay: number;
};

type ClickHeartProps = {
  count?: number;
  speedMin?: number;
  speedMax?: number;
  sizeMin?: number;
  sizeMax?: number;
  decay?: number;
  children?: ReactNode;
};

const MAX_PARTICLES = 120;
const CLICK_DELAY = 60;

export default function ClickHeart({
  count = 5,
  speedMin = 2,
  speedMax = 4,
  sizeMin = 18,
  sizeMax = 28,
  decay = 0.02,
  children,
}: ClickHeartProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const heartsRef = useRef<Heart[]>([]);
  const isRunningRef = useRef<boolean>(false);
  const animationIdRef = useRef<number | null>(null);
  const lastClickRef = useRef<number>(0);

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
      if (heartsRef.current.length === 0) {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        isRunningRef.current = false;
        return;
      }

      ctx.clearRect(0, 0, canvas.width, canvas.height);

      const hearts = heartsRef.current;
      let writeIndex = 0;

      for (let i = 0; i < hearts.length; i++) {
        const p = hearts[i];

        p.life -= p.decay;
        if (p.life <= 0) continue;

        p.y -= p.vy;
        p.x += Math.sin(p.phase + p.life * 10) * 1.5;

        ctx.save();
        ctx.globalAlpha = p.life;
        ctx.translate(p.x, p.y);
        ctx.font = `${p.size}px Arial`;
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText('❤️', 0, 0);
        ctx.restore();

        hearts[writeIndex++] = p;
      }

      hearts.length = writeIndex;
      ctx.globalAlpha = 1;

      animationIdRef.current = requestAnimationFrame(draw);
    };

    animationIdRef.current = requestAnimationFrame(draw);
  };

  // clientX/Y maps directly to fixed canvas — no rect offset needed
  const handleClick = (e: React.MouseEvent) => {
    const now = performance.now();
    if (now - lastClickRef.current < CLICK_DELAY) return;
    lastClickRef.current = now;

    if (heartsRef.current.length > MAX_PARTICLES) {
      heartsRef.current.splice(0, count);
    }

    for (let i = 0; i < count; i++) {
      heartsRef.current.push({
        x: e.clientX + (Math.random() - 0.5) * 30,
        y: e.clientY,
        vy: speedMin + Math.random() * (speedMax - speedMin),
        size: sizeMin + Math.random() * (sizeMax - sizeMin),
        phase: Math.random() * Math.PI * 2,
        life: 1,
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