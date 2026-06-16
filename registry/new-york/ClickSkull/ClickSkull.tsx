
"use client"

import { useRef, useEffect } from 'react';
import { createPortal } from 'react-dom';
import type { ReactNode } from 'react';

type Skull = {
  x: number;
  y: number;
  vx: number;
  vy: number;
  gravity: number;
  rot: number;
  vrot: number;
  size: number;
  life: number;
  decay: number;
};

type ClickSkullProps = {
  color?: string;
  count?: number;
  speedMin?: number;
  speedMax?: number;
  sizeMin?: number;
  sizeMax?: number;
  gravity?: number;
  decay?: number;
  children?: ReactNode;
};

export default function ClickSkull({
  color = '#fff',
  count = 5,
  speedMin = 2,
  speedMax = 5,
  sizeMin = 14,
  sizeMax = 24,
  gravity = 0.2,
  decay = 0.015,
  children,
}: ClickSkullProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const skullsRef = useRef<Skull[]>([]);
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

  const drawSkull = (
    ctx: CanvasRenderingContext2D,
    s: number,
    fillColor: string
  ) => {
    ctx.beginPath();
    ctx.arc(0, -s * 0.15, s * 0.52, Math.PI, 0);
    ctx.bezierCurveTo(s * 0.52, s * 0.28, s * 0.28, s * 0.48, 0, s * 0.48);
    ctx.bezierCurveTo(-s * 0.28, s * 0.48, -s * 0.52, s * 0.28, -s * 0.52, s * 0.1);
    ctx.closePath();
    ctx.fillStyle = fillColor;
    ctx.fill();

    ctx.beginPath();
    ctx.rect(-s * 0.36, s * 0.38, s * 0.72, s * 0.26);
    ctx.fillStyle = fillColor;
    ctx.fill();

    ctx.beginPath();
    ctx.arc(0, s * 0.64, s * 0.36, 0, Math.PI);
    ctx.fillStyle = fillColor;
    ctx.fill();

    ctx.beginPath();
    ctx.ellipse(-s * 0.18, s * 0.04, s * 0.13, s * 0.15, 0, 0, Math.PI * 2);
    ctx.fillStyle = 'rgba(0,0,0,0.85)';
    ctx.fill();

    ctx.beginPath();
    ctx.ellipse(s * 0.18, s * 0.04, s * 0.13, s * 0.15, 0, 0, Math.PI * 2);
    ctx.fillStyle = 'rgba(0,0,0,0.85)';
    ctx.fill();

    ctx.beginPath();
    ctx.moveTo(-s * 0.06, s * 0.26);
    ctx.lineTo(0, s * 0.18);
    ctx.lineTo(s * 0.06, s * 0.26);
    ctx.closePath();
    ctx.fillStyle = 'rgba(0,0,0,0.85)';
    ctx.fill();

    const teethX = [-s * 0.22, -s * 0.07, s * 0.07, s * 0.22];
    teethX.forEach((tx) => {
      ctx.beginPath();
      ctx.rect(tx - s * 0.065, s * 0.42, s * 0.1, s * 0.18);
      ctx.fillStyle = 'rgba(0,0,0,0.85)';
      ctx.fill();
    });
  };

  const startLoop = () => {
    if (isRunningRef.current) return;
    isRunningRef.current = true;

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const draw = () => {
      if (skullsRef.current.length === 0) {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        isRunningRef.current = false;
        return;
      }

      ctx.clearRect(0, 0, canvas.width, canvas.height);

      skullsRef.current = skullsRef.current.filter((p) => {
        p.life -= p.decay;
        if (p.life <= 0) return false;

        p.vy += p.gravity;
        p.x += p.vx;
        p.y += p.vy;
        p.rot += p.vrot;

        ctx.save();
        ctx.globalAlpha = Math.max(0, p.life);
        ctx.translate(p.x, p.y);
        ctx.rotate(p.rot);
        drawSkull(ctx, p.size, color);
        ctx.restore();

        return true;
      });

      ctx.globalAlpha = 1;
      animationIdRef.current = requestAnimationFrame(draw);
    };

    animationIdRef.current = requestAnimationFrame(draw);
  };

  // clientX/Y maps directly to fixed canvas — no rect offset needed
  const handleClick = (e: React.MouseEvent) => {
    const newSkulls: Skull[] = Array.from({ length: count }, () => ({
      x: e.clientX + (Math.random() - 0.5) * 20,
      y: e.clientY,
      vx: (Math.random() - 0.5) * 6,
      vy: -(speedMin + Math.random() * (speedMax - speedMin)),
      gravity,
      rot: (Math.random() - 0.5) * 0.4,
      vrot: (Math.random() - 0.5) * 0.12,
      size: sizeMin + Math.random() * (sizeMax - sizeMin),
      life: 1.0,
      decay,
    }));

    skullsRef.current.push(...newSkulls);
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