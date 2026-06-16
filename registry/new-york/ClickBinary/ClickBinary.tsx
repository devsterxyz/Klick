
"use client"

import { useRef, useEffect, useCallback } from 'react';
import { createPortal } from 'react-dom';
import type { ReactNode } from 'react';

type Particle = {
  originX: number;
  originY: number;
  char: string;
  angle: number;
  distance: number;
  startTime: number;
};

type EasingType = 'linear' | 'ease-in' | 'ease-out' | 'ease-in-out';

type ClickBinaryProps = {
  textColor?: string;
  fontSize?: number;
  particleCount?: number;
  spreadRadius?: number;
  duration?: number;
  easing?: EasingType;
  chars?: string[];
  children?: ReactNode;
};

export default function ClickBinary({
  textColor = '#fff',
  fontSize = 12,
  particleCount = 10,
  spreadRadius = 60,
  duration = 800,
  easing = 'ease-out',
  chars = ['0', '1'],
  children,
}: ClickBinaryProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const particlesRef = useRef<Particle[]>([]);

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

  const easeFunc = useCallback(
    (t: number): number => {
      switch (easing) {
        case 'linear':     return t;
        case 'ease-in':    return t * t;
        case 'ease-in-out': return t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t;
        default:           return t * (2 - t); // ease-out
      }
    },
    [easing]
  );

  // render loop
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationId: number;

    const draw = (timestamp: number) => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.font = `${fontSize}px monospace`;

      particlesRef.current = particlesRef.current.filter((p) => {
        const elapsed = timestamp - p.startTime;
        if (elapsed >= duration) return false;

        const progress = elapsed / duration;
        const eased = easeFunc(progress);

        const x = p.originX + Math.cos(p.angle) * eased * p.distance;
        const y =
          p.originY +
          Math.sin(p.angle) * eased * p.distance -
          eased * spreadRadius * 0.3;

        const alpha = progress < 0.5 ? 1 : 1 - (progress - 0.5) * 2;

        ctx.globalAlpha = Math.max(0, alpha);
        ctx.fillStyle = textColor;
        ctx.fillText(p.char, x, y);

        return true;
      });

      ctx.globalAlpha = 1;
      animationId = requestAnimationFrame(draw);
    };

    animationId = requestAnimationFrame(draw);
    return () => cancelAnimationFrame(animationId);
  }, [textColor, fontSize, spreadRadius, duration, easeFunc]);

  // clientX/Y maps directly to fixed canvas — no rect offset needed
  const handleClick = (e: React.MouseEvent) => {
    const now = performance.now();

    const newParticles: Particle[] = Array.from(
      { length: particleCount },
      () => ({
        originX: e.clientX,
        originY: e.clientY,
        char: chars[Math.floor(Math.random() * chars.length)],
        angle: Math.random() * Math.PI * 2,
        distance: spreadRadius * (0.4 + Math.random() * 0.6),
        startTime: now,
      })
    );

    particlesRef.current.push(...newParticles);
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