
"use client"

import { useRef, useEffect, useCallback } from 'react';
import { createPortal } from 'react-dom';
import type { ReactNode } from 'react';

type Particle = {
  x: number;
  y: number;
  vx: number;
  vy: number;
  r: number;
  startTime: number;
};

type ClickSmokeProps = {
  fillColor?: string;
  puffCount?: number;
  spreadX?: number;
  minRiseSpeed?: number;
  maxRiseSpeed?: number;
  driftSpeed?: number;
  minRadius?: number;
  maxRadius?: number;
  growSpeed?: number;
  opacity?: number;
  duration?: number;
  children?: ReactNode;
};

export default function ClickSmoke({
  fillColor = '#fff',
  puffCount = 8,
  spreadX = 10,
  minRiseSpeed = 0.5,
  maxRiseSpeed = 1.5,
  driftSpeed = 1,
  minRadius = 5,
  maxRadius = 15,
  growSpeed = 0.3,
  opacity = 0.15,
  duration = 2500,
  children,
}: ClickSmokeProps) {
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

        p.x += p.vx;
        p.y += p.vy;
        p.r += growSpeed;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = fillColor;
        ctx.globalAlpha = alpha * opacity;
        ctx.fill();
        ctx.globalAlpha = 1;

        return true;
      });

      animIdRef.current = requestAnimationFrame(draw);
    };

    animIdRef.current = requestAnimationFrame(draw);

    return () => {
      if (animIdRef.current !== null) cancelAnimationFrame(animIdRef.current);
    };
  }, [fillColor, duration, growSpeed, opacity]);

  // clientX/Y maps directly to fixed canvas — no rect offset needed
  const handleClick = useCallback(
    (e: React.MouseEvent) => {
      const now = performance.now();

      const newParticles: Particle[] = Array.from({ length: puffCount }, () => ({
        x: e.clientX + (Math.random() - 0.5) * spreadX,
        y: e.clientY,
        vx: (Math.random() - 0.5) * driftSpeed,
        vy: -(minRiseSpeed + Math.random() * (maxRiseSpeed - minRiseSpeed)),
        r: minRadius + Math.random() * (maxRadius - minRadius),
        startTime: now,
      }));

      particlesRef.current.push(...newParticles);
    },
    [puffCount, spreadX, minRiseSpeed, maxRiseSpeed, driftSpeed, minRadius, maxRadius]
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