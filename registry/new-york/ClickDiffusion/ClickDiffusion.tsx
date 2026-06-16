
"use client"

import { useRef, useEffect } from 'react';
import { createPortal } from 'react-dom';
import type { ReactNode } from 'react';

interface DiffusionPoint {
  x: number;
  y: number;
  tx: number;
  ty: number;
  life: number;
  decay: number;
}

interface DiffusionSystem {
  points: DiffusionPoint[];
  life: number;
  decay: number;
}

interface ClickDiffusionProps {
  color?: string;
  dotSize?: number;
  count?: number;
  decay?: number;
  radius?: number;
  easeSpeed?: number;
  children?: ReactNode;
}

export default function ClickDiffusion({
  color = '#fff',
  dotSize = 1.5,
  count = 30,
  decay = 0.015,
  radius = 25,
  easeSpeed = 0.1,
  children,
}: ClickDiffusionProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const systemsRef = useRef<DiffusionSystem[]>([]);
  const isRunningRef = useRef<boolean>(false);
  const animationIdRef = useRef<number | null>(null);

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

  const startLoop = () => {
    if (isRunningRef.current) return;
    isRunningRef.current = true;

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const draw = () => {
      if (systemsRef.current.length === 0) {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        isRunningRef.current = false;
        return;
      }

      ctx.clearRect(0, 0, canvas.width, canvas.height);

      systemsRef.current = systemsRef.current.filter((sys: DiffusionSystem) => {
        sys.life -= sys.decay;
        if (sys.life <= 0) return false;

        ctx.globalAlpha = Math.max(0, sys.life);
        ctx.fillStyle = color;

        for (const p of sys.points) {
          p.x += (p.tx - p.x) * easeSpeed;
          p.y += (p.ty - p.y) * easeSpeed;

          ctx.beginPath();
          ctx.arc(p.x, p.y, dotSize, 0, Math.PI * 2);
          ctx.fill();
        }

        return true;
      });

      ctx.globalAlpha = 1;
      animationIdRef.current = requestAnimationFrame(draw);
    };

    animationIdRef.current = requestAnimationFrame(draw);
  };

  useEffect(() => {
    return () => {
      if (animationIdRef.current !== null) {
        cancelAnimationFrame(animationIdRef.current);
      }
    };
  }, []);

  // clientX/Y maps directly to fixed canvas — no rect offset needed
  const handleClick = (e: React.MouseEvent) => {
    const cx = e.clientX;
    const cy = e.clientY;

    const PI2 = Math.PI * 2;
    const points: DiffusionPoint[] = [];

    for (let i = 0; i < count; i++) {
      const angle = (i / count) * PI2;
      points.push({
        x: cx + (Math.random() - 0.5) * 100,
        y: cy + (Math.random() - 0.5) * 100,
        tx: cx + Math.cos(angle) * radius,
        ty: cy + Math.sin(angle) * radius,
        life: 1.0,
        decay,
      });
    }

    systemsRef.current.push({ points, life: 1.0, decay });
    startLoop();
  };

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