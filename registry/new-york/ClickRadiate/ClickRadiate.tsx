
"use client"

import { useRef, useEffect, useCallback } from 'react';
import { createPortal } from 'react-dom';
import type { ReactNode } from 'react';

type Particle = {
  x: number;
  y: number;
  angle: number;
  length: number;
  vlength: number;
  startTime: number;
};

type ClickRadiateProps = {
  strokeColor?: string;
  rayCount?: number;
  minSpeed?: number;
  maxSpeed?: number;
  lineWidth?: number;
  duration?: number;
  children?: ReactNode;
};

export default function ClickRadiate({
  strokeColor = '#fff',
  rayCount = 15,
  minSpeed = 8,
  maxSpeed = 13,
  lineWidth = 1.5,
  duration = 1000,
  children,
}: ClickRadiateProps) {
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

        p.length += p.vlength;

        const startDist = p.length * 0.5;
        const x1 = p.x + Math.cos(p.angle) * startDist;
        const y1 = p.y + Math.sin(p.angle) * startDist;
        const x2 = p.x + Math.cos(p.angle) * p.length;
        const y2 = p.y + Math.sin(p.angle) * p.length;

        ctx.beginPath();
        ctx.moveTo(x1, y1);
        ctx.lineTo(x2, y2);
        ctx.lineWidth = lineWidth;
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
  }, [strokeColor, duration, lineWidth]);

  // clientX/Y maps directly to fixed canvas — no rect offset needed
  const handleClick = useCallback(
    (e: React.MouseEvent) => {
      const now = performance.now();

      const newParticles: Particle[] = Array.from(
        { length: rayCount },
        () => ({
          x: e.clientX,
          y: e.clientY,
          angle: Math.random() * Math.PI * 2,
          length: 0,
          vlength: minSpeed + Math.random() * (maxSpeed - minSpeed),
          startTime: now,
        })
      );

      particlesRef.current.push(...newParticles);
    },
    [rayCount, minSpeed, maxSpeed]
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