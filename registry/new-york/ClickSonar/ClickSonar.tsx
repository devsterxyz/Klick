
"use client"

import { useRef, useEffect } from 'react';
import { createPortal } from 'react-dom';
import type { ReactNode } from 'react';

interface SonarDot {
  x: number;
  y: number;
}

interface SonarSystem {
  x: number;
  y: number;
  r: number;
  dots: SonarDot[];
  life: number;
  decay: number;
}

interface ClickSonarProps {
  color?: string;
  dotCount?: number;
  dotSpread?: number;
  speed?: number;
  decay?: number;
  dotSize?: number;
  children?: ReactNode;
}

export default function ClickSonar({
  color = '#fff',
  dotCount = 20,
  dotSpread = 80,
  speed = 2.5,
  decay = 0.015,
  dotSize = 2,
  children,
}: ClickSonarProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const systemsRef = useRef<SonarSystem[]>([]);
  const isRunningRef = useRef<boolean>(false);
  const animationIdRef = useRef<number | null>(null);

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

  // cleanup on unmount
  useEffect(() => {
    return () => {
      if (animationIdRef.current !== null) {
        cancelAnimationFrame(animationIdRef.current);
      }
    };
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

      systemsRef.current = systemsRef.current.filter((sys: SonarSystem) => {
        sys.life -= sys.decay;
        if (sys.life <= 0) return false;

        sys.r += speed;

        ctx.globalAlpha = Math.max(0, sys.life * 0.4);
        ctx.strokeStyle = color;
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.arc(sys.x, sys.y, sys.r, 0, Math.PI * 2);
        ctx.stroke();

        ctx.fillStyle = color;
        for (const d of sys.dots) {
          const dist = Math.hypot(d.x, d.y);
          if (dist < sys.r) {
            const timeSinceSweep = Math.max(0, 1 - (sys.r - dist) / dotSpread);
            ctx.globalAlpha = Math.max(0, sys.life * timeSinceSweep);
            ctx.fillRect(sys.x + d.x, sys.y + d.y, dotSize, dotSize);
          }
        }

        return true;
      });

      ctx.globalAlpha = 1;
      animationIdRef.current = requestAnimationFrame(draw);
    };

    animationIdRef.current = requestAnimationFrame(draw);
  };

  // clientX/Y maps directly to fixed canvas — no rect offset needed
  const handleClick = (e: React.MouseEvent) => {
    const dots: SonarDot[] = Array.from({ length: dotCount }, () => ({
      x: (Math.random() - 0.5) * dotSpread * 2,
      y: (Math.random() - 0.5) * dotSpread * 2,
    }));

    systemsRef.current.push({
      x: e.clientX,
      y: e.clientY,
      r: 0,
      dots,
      life: 1.0,
      decay,
    });

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