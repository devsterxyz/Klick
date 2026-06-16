
"use client"

import { useRef, useEffect, useCallback } from 'react';
import { createPortal } from 'react-dom';
import type { ReactNode } from 'react';

type Particle = {
  cx: number;
  cy: number;
  x: number;
  y: number;
  timer: number;
  startTime: number;
};

type ClickQuantumProps = {
  strokeColor?: string;
  particleCount?: number;
  spreadRadius?: number;
  crossSize?: number;
  teleportInterval?: number;
  duration?: number;
  children?: ReactNode;
};

export default function ClickQuantum({
  strokeColor = '#fff',
  particleCount = 15,
  spreadRadius = 80,
  crossSize = 3,
  teleportInterval = 10,
  duration = 1500,
  children,
}: ClickQuantumProps) {
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

        p.timer--;
        if (p.timer <= 0) {
          p.x = p.cx + (Math.random() - 0.5) * spreadRadius;
          p.y = p.cy + (Math.random() - 0.5) * spreadRadius;
          p.timer = Math.random() * teleportInterval;
        }

        ctx.beginPath();
        ctx.moveTo(p.x - crossSize, p.y);
        ctx.lineTo(p.x + crossSize, p.y);
        ctx.moveTo(p.x, p.y - crossSize);
        ctx.lineTo(p.x, p.y + crossSize);
        ctx.lineWidth = 1;
        ctx.strokeStyle = strokeColor;
        ctx.globalAlpha = alpha;
        ctx.stroke();
        ctx.globalAlpha = 1;

        return true;
      });

      animIdRef.current = requestAnimationFrame(draw);
    };

    animIdRef.current = requestAnimationFrame(draw);

    return () => {
      if (animIdRef.current !== null) cancelAnimationFrame(animIdRef.current);
    };
  }, [strokeColor, duration, crossSize, teleportInterval, spreadRadius]);

  // clientX/Y maps directly to fixed canvas — no rect offset needed
  const handleClick = useCallback(
    (e: React.MouseEvent) => {
      const now = performance.now();

      const newParticles: Particle[] = Array.from(
        { length: particleCount },
        () => ({
          cx: e.clientX,
          cy: e.clientY,
          x: e.clientX,
          y: e.clientY,
          timer: Math.random() * teleportInterval,
          startTime: now,
        })
      );

      particlesRef.current.push(...newParticles);
    },
    [particleCount, teleportInterval]
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