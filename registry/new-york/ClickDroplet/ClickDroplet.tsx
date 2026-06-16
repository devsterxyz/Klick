
"use client"

import { useRef, useEffect, useCallback } from 'react';
import { createPortal } from 'react-dom';
import type { ReactNode } from 'react';

type SplashParticle = {
  x: number;
  y: number;
  vx: number;
  vy: number;
};

type Particle = {
  x: number;
  y: number;
  vy: number;
  targetY: number;
  state: number;
  ringR: number;
  splash: SplashParticle[];
  startTime: number;
};

type ClickDropletProps = {
  dotColor?: string;
  dropSpeed?: number;
  splashCount?: number;
  splashSpeed?: number;
  ringSpeed?: number;
  duration?: number;
  children?: ReactNode;
};

export default function ClickDroplet({
  dotColor = '#fff',
  dropSpeed = 5,
  splashCount = 6,
  splashSpeed = 4,
  ringSpeed = 2,
  duration = 2000,
  children,
}: ClickDropletProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const particlesRef = useRef<Particle[]>([]);
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

        if (p.state === 0) {
          p.vy += 0.5;
          p.y += p.vy;

          ctx.beginPath();
          ctx.arc(p.x, p.y, 2, 0, Math.PI * 2);
          ctx.fillStyle = dotColor;
          ctx.globalAlpha = alpha;
          ctx.fill();
          ctx.globalAlpha = 1;

          if (p.y >= p.targetY) {
            p.y = p.targetY;
            p.state = 1;

            p.splash = Array.from({ length: splashCount }, (): SplashParticle => ({
              x: p.x,
              y: p.targetY,
              vx: (Math.random() - 0.5) * splashSpeed,
              vy: -1 - Math.random() * splashSpeed,
            }));
          }
        } else {
          p.ringR += ringSpeed;

          ctx.beginPath();
          ctx.arc(p.x, p.targetY, p.ringR, 0, Math.PI * 2);
          ctx.strokeStyle = dotColor;
          ctx.lineWidth = 1;
          ctx.globalAlpha = alpha;
          ctx.stroke();

          for (const s of p.splash) {
            s.vy += 0.2;
            s.x += s.vx;
            s.y += s.vy;

            ctx.beginPath();
            ctx.arc(s.x, s.y, 1.5, 0, Math.PI * 2);
            ctx.fillStyle = dotColor;
            ctx.globalAlpha = alpha;
            ctx.fill();
          }

          ctx.globalAlpha = 1;
        }

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
  }, [dotColor, duration, splashCount, splashSpeed, ringSpeed]);

  // clientX/Y maps directly to fixed canvas — no rect offset needed
  const handleClick = useCallback(
    (e: React.MouseEvent) => {
      const now = performance.now();

      particlesRef.current.push({
        x: e.clientX,
        y: 0,
        vy: dropSpeed,
        targetY: e.clientY,
        state: 0,
        ringR: 0,
        splash: [],
        startTime: now,
      });
    },
    [dropSpeed]
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