
"use client"

import { useRef, useEffect, useCallback } from 'react';
import { createPortal } from 'react-dom';
import type { ReactNode } from 'react';

type Particle = {
  x: number;
  y: number;
  phase: number;
  startTime: number;
};

type ClickRippleMatrixProps = {
  dotColor?: string;
  gridRadius?: number;
  gridSpacing?: number;
  waveSpeed?: number;
  maxDotRadius?: number;
  duration?: number;
  children?: ReactNode;
};

export default function ClickRippleMatrix({
  dotColor = '#fff',
  gridRadius = 3,
  gridSpacing = 15,
  waveSpeed = 0.2,
  maxDotRadius = 3,
  duration = 2000,
  children,
}: ClickRippleMatrixProps) {
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

        p.phase -= waveSpeed;

        for (let ix = -gridRadius; ix <= gridRadius; ix++) {
          for (let iy = -gridRadius; iy <= gridRadius; iy++) {
            const dist = Math.sqrt(ix * ix + iy * iy);
            const size = Math.max(0, Math.sin(dist * 1 - p.phase) * maxDotRadius * alpha);

            if (size <= 0) continue;

            ctx.beginPath();
            ctx.arc(p.x + ix * gridSpacing, p.y + iy * gridSpacing, size, 0, Math.PI * 2);
            ctx.fillStyle = dotColor;
            ctx.globalAlpha = alpha;
            ctx.fill();
          }
        }

        ctx.globalAlpha = 1;
        return true;
      });

      animIdRef.current = requestAnimationFrame(draw);
    };

    animIdRef.current = requestAnimationFrame(draw);

    return () => {
      if (animIdRef.current !== null) cancelAnimationFrame(animIdRef.current);
    };
  }, [dotColor, duration, gridRadius, gridSpacing, waveSpeed, maxDotRadius]);

  // clientX/Y maps directly to fixed canvas — no rect offset needed
  const handleClick = useCallback((e: React.MouseEvent) => {
    particlesRef.current.push({
      x: e.clientX,
      y: e.clientY,
      phase: 0,
      startTime: performance.now(),
    });
  }, []);

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