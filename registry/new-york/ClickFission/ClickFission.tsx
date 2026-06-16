
"use client"

import { useRef, useEffect, useCallback } from 'react';
import { createPortal } from 'react-dom';
import type { ReactNode } from 'react';

type Particle = {
  x: number;
  y: number;
  startTime: number;
};

type ClickFissionProps = {
  fillColor?: string;
  duration?: number;
  maxSpread?: number;
  children?: ReactNode;
};

export default function ClickFission({
  fillColor = '#fff',
  duration = 1500,
  maxSpread = 40,
  children,
}: ClickFissionProps) {
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

        const life = 1 - progress;

        let splits: number, radius: number, spread: number;
        if (life > 0.6) {
          splits = 1;
          radius = 8;
          spread = 0;
        } else if (life > 0.3) {
          splits = 3;
          radius = 4;
          spread = (1 - life) * maxSpread;
        } else {
          splits = 9;
          radius = 2;
          spread = (1 - life) * maxSpread;
        }

        const spinAngle = life * 5;

        for (let i = 0; i < splits; i++) {
          const angle = i * ((Math.PI * 2) / splits) + spinAngle;
          const sx =
            p.x + (splits > 1 ? Math.cos(angle) * spread : 0);
          const sy =
            p.y + (splits > 1 ? Math.sin(angle) * spread : 0);

          ctx.beginPath();
          ctx.arc(sx, sy, radius, 0, Math.PI * 2);
          ctx.fillStyle = fillColor;
          ctx.globalAlpha = alpha;
          ctx.fill();
        }

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
  }, [fillColor, duration, maxSpread]);

  // click coordinates map directly to fixed canvas coords
  const handleClick = useCallback((e: React.MouseEvent) => {
    const now = performance.now();

    particlesRef.current.push({
      x: e.clientX,
      y: e.clientY,
      startTime: now,
    });
  }, []);

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