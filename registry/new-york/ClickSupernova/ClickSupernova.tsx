
"use client"

import { useRef, useEffect } from 'react';
import { createPortal } from 'react-dom';
import type { ReactNode } from 'react';

interface NovaRing {
  type: 'ring';
  x: number;
  y: number;
  r: number;
  vr: number;
  life: number;
  decay: number;
}

interface NovaDot {
  type: 'dot';
  x: number;
  y: number;
  vx: number;
  vy: number;
  life: number;
  decay: number;
}

type NovaParticle = NovaRing | NovaDot;

interface ClickSupernovaProps {
  color?: string;
  dotSize?: number;
  dotCount?: number;
  ringSpeed?: number;
  dotDecay?: number;
  ringDecay?: number;
  children?: ReactNode;
}

export default function ClickSupernova({
  color = '#fff',
  dotSize = 1.5,
  dotCount = 30,
  ringSpeed = 4,
  dotDecay = 0.02,
  ringDecay = 0.02,
  children,
}: ClickSupernovaProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const particlesRef = useRef<NovaParticle[]>([]);
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
      if (particlesRef.current.length === 0) {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        isRunningRef.current = false;
        return;
      }

      ctx.clearRect(0, 0, canvas.width, canvas.height);

      particlesRef.current = particlesRef.current.filter((p: NovaParticle) => {
        p.life -= p.decay;
        if (p.life <= 0) return false;

        ctx.globalAlpha = Math.max(0, p.life);

        if (p.type === 'ring') {
          p.r += p.vr;
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
          ctx.lineWidth = 4 * p.life;
          ctx.strokeStyle = color;
          ctx.stroke();
        } else {
          p.x += p.vx;
          p.y += p.vy;
          p.vx *= 0.95;
          p.vy *= 0.95;
          ctx.beginPath();
          ctx.arc(p.x, p.y, dotSize, 0, Math.PI * 2);
          ctx.fillStyle = color;
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
    const x = e.clientX;
    const y = e.clientY;
    const PI2 = Math.PI * 2;

    particlesRef.current.push({
      type: 'ring',
      x,
      y,
      r: 0,
      vr: ringSpeed,
      life: 1.0,
      decay: ringDecay,
    });

    for (let i = 0; i < dotCount; i++) {
      const angle = Math.random() * PI2;
      const speed = 2 + Math.random() * 6;
      particlesRef.current.push({
        type: 'dot',
        x,
        y,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed,
        life: 1.0,
        decay: dotDecay + Math.random() * dotDecay,
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