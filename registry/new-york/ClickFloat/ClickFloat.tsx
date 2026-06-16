
"use client"

import { useRef, useEffect, useCallback } from 'react';
import { createPortal } from 'react-dom';
import type { ReactNode } from 'react';

type Particle = {
  originX: number;
  y: number;
  vy: number;
  phase: number;
  amp: number;
  startTime: number;
};

type ClickFloatProps = {
  fillColor?: string;
  particleCount?: number;
  spreadX?: number;
  minRiseSpeed?: number;
  maxRiseSpeed?: number;
  minAmplitude?: number;
  maxAmplitude?: number;
  phaseSpeed?: number;
  dotRadius?: number;
  duration?: number;
  children?: ReactNode;
};

export default function ClickFloat({
  fillColor = '#fff',
  particleCount = 25,
  spreadX = 40,
  minRiseSpeed = 0.5,
  maxRiseSpeed = 1.5,
  minAmplitude = 1,
  maxAmplitude = 3,
  phaseSpeed = 0.05,
  dotRadius = 1.5,
  duration = 3000,
  children,
}: ClickFloatProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const particlesRef = useRef<Particle[]>([]);
  const animIdRef = useRef<number | null>(null);

  // canvas is fixed full-viewport, so just sync size to window
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const syncSize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    syncSize();
    window.addEventListener('resize', syncSize);

    return () => {
      window.removeEventListener('resize', syncSize);
    };
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

        p.y += p.vy;
        p.phase += phaseSpeed;

        const fx = p.originX + Math.sin(p.phase) * p.amp;

        ctx.beginPath();
        ctx.arc(fx, p.y, dotRadius, 0, Math.PI * 2);
        ctx.fillStyle = fillColor;
        ctx.globalAlpha = alpha;
        ctx.fill();
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
  }, [fillColor, duration, dotRadius, phaseSpeed]);

  // click coordinates map directly to fixed canvas coords
  const handleClick = useCallback(
    (e: React.MouseEvent) => {
      const cx = e.clientX;
      const cy = e.clientY;
      const now = performance.now();

      const newParticles: Particle[] = Array.from(
        { length: particleCount },
        () => ({
          originX: cx + (Math.random() - 0.5) * spreadX,
          y: cy,
          vy: -(
            minRiseSpeed +
            Math.random() * (maxRiseSpeed - minRiseSpeed)
          ),
          phase: Math.random() * Math.PI * 2,
          amp:
            minAmplitude +
            Math.random() * (maxAmplitude - minAmplitude),
          startTime: now,
        })
      );

      particlesRef.current.push(...newParticles);
    },
    [
      particleCount,
      spreadX,
      minRiseSpeed,
      maxRiseSpeed,
      minAmplitude,
      maxAmplitude,
    ]
  );

  return (
    <>
      {/* display:contents — invisible to layout, children participate in parent flex/grid directly */}
      <div style={{ display: 'contents' }} onClick={handleClick}>
        {children}
      </div>

      {/* canvas portalled to body — position:fixed, full viewport, above everything */}
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