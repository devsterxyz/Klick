
"use client"

import { useRef, useEffect } from 'react';
import { createPortal } from 'react-dom';
import type { ReactNode } from 'react';

interface Ring {
  x: number;
  y: number;
  r: number;
  vr: number;
  life: number;
  decay: number;
}

interface ClickDoubleSonarProps {
  color?: string;
  lineWidth?: number;
  speed?: number;
  decay?: number;
  gap?: number;
  children?: ReactNode;
}

export default function ClickDoubleSonar({
  color = '#fff',
  lineWidth = 2,
  speed = 2,
  decay = 0.02,
  gap = 15,
  children,
}: ClickDoubleSonarProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const ringsRef = useRef<Ring[]>([]);
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
      if (ringsRef.current.length === 0) {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        isRunningRef.current = false;
        return;
      }

      ctx.clearRect(0, 0, canvas.width, canvas.height);

      ringsRef.current = ringsRef.current.filter((p: Ring) => {
        p.life -= p.decay;
        if (p.life <= 0) return false;

        p.r += p.vr;

        if (p.r > 0) {
          ctx.globalAlpha = Math.max(0, p.life);
          ctx.strokeStyle = color;
          ctx.lineWidth = lineWidth;
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
          ctx.stroke();
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
    const x = e.clientX;
    const y = e.clientY;

    ringsRef.current.push({ x, y, r: 0, vr: speed, life: 1.0, decay });
    ringsRef.current.push({ x, y, r: -gap, vr: speed, life: 1.0, decay });

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