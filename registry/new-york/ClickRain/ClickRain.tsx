
"use client"

import { useRef, useEffect, useCallback } from 'react';
import { createPortal } from 'react-dom';
import type { ReactNode } from 'react';

type Particle = {
  x: number;
  y: number;
  targetY: number;
  vy: number;
  hit: boolean;
  r: number;
  startTime: number;
};

type ClickRainProps = {
  strokeColor?: string;
  dropCount?: number;
  fallSpeed?: number;
  maxExtraSpeed?: number;
  spreadX?: number;
  streakHeight?: number;
  rippleSpeed?: number;
  rippleSquish?: number;
  duration?: number;
  children?: ReactNode;
};

export default function ClickRain({
  strokeColor = '#fff',
  dropCount = 15,
  fallSpeed = 5,
  maxExtraSpeed = 3,
  spreadX = 120,
  streakHeight = 15,
  rippleSpeed = 1.5,
  rippleSquish = 0.4,
  duration = 2000,
  children,
}: ClickRainProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const particlesRef = useRef<Particle[]>([]);
  const animIdRef = useRef<number | null>(null);

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

        if (!p.hit) {
          p.y += p.vy;

          ctx.beginPath();
          ctx.moveTo(p.x, p.y - streakHeight);
          ctx.lineTo(p.x, p.y);
          ctx.strokeStyle = strokeColor;
          ctx.lineWidth = 1;
          ctx.globalAlpha = alpha;
          ctx.stroke();
          ctx.globalAlpha = 1;

          if (p.y >= p.targetY) {
            p.hit = true;
            p.y = p.targetY;
            p.r = 0;
          }
        } else {
          p.r += rippleSpeed;

          const rippleAlpha = Math.max(0, alpha - progress * 0.5);

          ctx.beginPath();
          ctx.ellipse(p.x, p.targetY, p.r, p.r * rippleSquish, 0, 0, Math.PI * 2);
          ctx.strokeStyle = strokeColor;
          ctx.lineWidth = 1;
          ctx.globalAlpha = rippleAlpha;
          ctx.stroke();
          ctx.globalAlpha = 1;
        }

        return true;
      });

      animIdRef.current = requestAnimationFrame(draw);
    };

    animIdRef.current = requestAnimationFrame(draw);

    return () => {
      if (animIdRef.current !== null) cancelAnimationFrame(animIdRef.current);
    };
  }, [strokeColor, duration, streakHeight, rippleSpeed, rippleSquish]);

  // clientX/Y maps directly to fixed canvas — no rect offset needed
  const handleClick = useCallback(
    (e: React.MouseEvent) => {
      const now = performance.now();

      const newParticles: Particle[] = Array.from(
        { length: dropCount },
        () => ({
          x: e.clientX + (Math.random() - 0.5) * spreadX,
          y: e.clientY - 80 - Math.random() * 50,
          targetY: e.clientY + (Math.random() - 0.5) * 40,
          vy: fallSpeed + Math.random() * maxExtraSpeed,
          hit: false,
          r: 0,
          startTime: now,
        })
      );

      particlesRef.current.push(...newParticles);
    },
    [dropCount, fallSpeed, maxExtraSpeed, spreadX]
  );

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