
"use client"

import { useRef, useEffect } from 'react';
import { createPortal } from 'react-dom';
import type { ReactNode } from 'react';

type Ring = {
  x: number;
  y: number;
  r: number;
  maxRadius: number;
  life: number;
  decay: number;
  vr: number;
  delay: number;
  frame: number;
};

type ClickRippleProps = {
  color?: string;
  lineWidth?: number;
  maxRadius?: number;
  duration?: number;
  rippleCount?: number;
  children?: ReactNode;
};

export default function ClickRipple({
  color = '#fff',
  lineWidth = 0.5,
  maxRadius = 50,
  duration = 600,
  rippleCount = 5,
  children,
}: ClickRippleProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const ringsRef = useRef<Ring[]>([]);
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
      if (ringsRef.current.length === 0) {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        isRunningRef.current = false;
        return;
      }

      ctx.clearRect(0, 0, canvas.width, canvas.height);

      ringsRef.current = ringsRef.current.filter((p) => {
        p.life -= p.decay;
        if (p.life <= 0) return false;

        p.r += p.vr;

        ctx.globalAlpha = Math.max(0, p.life);
        ctx.strokeStyle = color;
        ctx.lineWidth = lineWidth;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.stroke();

        return true;
      });

      ctx.globalAlpha = 1;
      animationIdRef.current = requestAnimationFrame(draw);
    };

    animationIdRef.current = requestAnimationFrame(draw);
  };

  // clientX/Y maps directly to fixed canvas — no rect offset needed
  const handleClick = (e: React.MouseEvent) => {
    const frameRate = 60;
    const totalFrames = (duration / 1000) * frameRate;

    for (let i = 0; i < rippleCount; i++) {
      const delayFactor = i * 0.15;

      ringsRef.current.push({
        x: e.clientX,
        y: e.clientY,
        r: 0,
        maxRadius,
        life: 1,
        decay: 1 / totalFrames,
        vr: maxRadius / totalFrames,
        delay: delayFactor * totalFrames,
        frame: 0,
      });
    }

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