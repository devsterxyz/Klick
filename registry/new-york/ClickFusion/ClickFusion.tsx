
"use client"

import { useRef, useEffect, useCallback } from 'react';
import { createPortal } from 'react-dom';
import type { ReactNode } from 'react';

type Particle = {
  cx: number;
  cy: number;
  x: number;
  y: number;
  speed: number;
  arrived: boolean;
};

type ParticleGroup = {
  cx: number;
  cy: number;
  particles: Particle[];
  burstR: number;
  startTime: number;
};

type ClickFusionProps = {
  strokeColor?: string;
  particleCount?: number;
  minSpread?: number;
  maxSpread?: number;
  speed?: number;
  burstRadius?: number;
  duration?: number;
  children?: ReactNode;
};

export default function ClickFusion({
  strokeColor = '#fff',
  particleCount = 20,
  minSpread = 50,
  maxSpread = 100,
  speed = 4,
  burstRadius = 40,
  duration = 1500,
  children,
}: ClickFusionProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const particlesRef = useRef<ParticleGroup[]>([]);
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

      particlesRef.current = particlesRef.current.filter((group) => {
        const elapsed = timestamp - group.startTime;
        if (elapsed >= duration) return false;

        const progress = elapsed / duration;
        const alpha = Math.max(0, 1 - progress);

        let allArrived = true;

        for (const p of group.particles) {
          if (!p.arrived) {
            const dx = p.cx - p.x;
            const dy = p.cy - p.y;
            const dist = Math.sqrt(dx * dx + dy * dy);

            if (dist > p.speed) {
              p.x += (dx / dist) * p.speed;
              p.y += (dy / dist) * p.speed;
              allArrived = false;

              ctx.beginPath();
              ctx.arc(p.x, p.y, 2, 0, Math.PI * 2);
              ctx.fillStyle = strokeColor;
              ctx.globalAlpha = alpha;
              ctx.fill();
            } else {
              p.arrived = true;
              p.x = p.cx;
              p.y = p.cy;
            }
          }
        }

        if (allArrived) {
          group.burstR = Math.min(group.burstR + 2, burstRadius);
          ctx.beginPath();
          ctx.arc(group.cx, group.cy, group.burstR, 0, Math.PI * 2);
          ctx.lineWidth = 1.5;
          ctx.strokeStyle = strokeColor;
          ctx.globalAlpha = alpha;
          ctx.stroke();
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
  }, [strokeColor, duration, burstRadius, speed]);

  // click coordinates map directly to fixed canvas coords
  const handleClick = useCallback(
    (e: React.MouseEvent) => {
      const cx = e.clientX;
      const cy = e.clientY;
      const now = performance.now();

      const particles: Particle[] = Array.from(
        { length: particleCount },
        () => {
          const angle = Math.random() * Math.PI * 2;
          const dist =
            minSpread + Math.random() * (maxSpread - minSpread);

          return {
            cx,
            cy,
            x: cx + Math.cos(angle) * dist,
            y: cy + Math.sin(angle) * dist,
            speed: speed + Math.random() * 2,
            arrived: false,
          };
        }
      );

      particlesRef.current.push({
        cx,
        cy,
        particles,
        burstR: 0,
        startTime: now,
      });
    },
    [particleCount, minSpread, maxSpread, speed]
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