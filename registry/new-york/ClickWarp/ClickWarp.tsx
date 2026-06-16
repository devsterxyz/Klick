
"use client"

import { useRef, useEffect, useCallback } from 'react';
import { createPortal } from 'react-dom';
import type { ReactNode } from 'react';

type WarpParticle = {
  x: number;
  y: number;
  angle: number;
  dist: number;
  speed: number;
  accel: number;
  startTime: number;
};

type ClickWarpProps = {
  textColor?: string;
  streakCount?: number;
  baseSpeed?: number;
  acceleration?: number;
  maxLineWidth?: number;
  duration?: number;
  children?: ReactNode;
};

export default function ClickWarp({
  textColor = '#fff',
  streakCount = 30,
  baseSpeed = 1,
  acceleration = 1.1,
  maxLineWidth = 4,
  duration = 1000,
  children,
}: ClickWarpProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const particlesRef = useRef<WarpParticle[]>([]);
  const animIdRef = useRef<number | null>(null);

  // Sync canvas to full viewport
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

        p.speed *= p.accel;

        const oldX = p.x + Math.cos(p.angle) * p.dist;
        const oldY = p.y + Math.sin(p.angle) * p.dist;

        p.dist += p.speed;

        const newX = p.x + Math.cos(p.angle) * p.dist;
        const newY = p.y + Math.sin(p.angle) * p.dist;

        const lineW = Math.min(maxLineWidth, p.speed * 0.15);

        ctx.beginPath();
        ctx.moveTo(oldX, oldY);
        ctx.lineTo(newX, newY);
        ctx.lineWidth = lineW;
        ctx.strokeStyle = textColor;
        ctx.globalAlpha = alpha;
        ctx.stroke();
        ctx.globalAlpha = 1;

        return true;
      });

      animIdRef.current = requestAnimationFrame(draw);
    };

    animIdRef.current = requestAnimationFrame(draw);

    return () => {
      if (animIdRef.current !== null) {
        cancelAnimationFrame(animIdRef.current);
      }
    };
  }, [textColor, duration, maxLineWidth]);

  // clientX/Y maps directly to fixed canvas — no rect offset needed
  const handleClick = useCallback(
    (e: React.MouseEvent) => {
      const now = performance.now();

      const newParticles: WarpParticle[] = Array.from(
        { length: streakCount },
        () => ({
          x: e.clientX,
          y: e.clientY,
          angle: Math.random() * Math.PI * 2,
          dist: 5,
          speed: baseSpeed + Math.random() * baseSpeed,
          accel: acceleration + Math.random() * 0.1,
          startTime: now,
        })
      );

      particlesRef.current.push(...newParticles);
    },
    [streakCount, baseSpeed, acceleration]
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