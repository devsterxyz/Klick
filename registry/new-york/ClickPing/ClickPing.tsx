
"use client"

import { useRef, useEffect } from 'react';
import { createPortal } from 'react-dom';
import type { ReactNode } from 'react';

type RingParticle = {
  type: 'ping_ring';
  x: number;
  y: number;
  r: number;
  vr: number;
  lineWidth: number;
  life: number;
  decay: number;
};

type DotParticle = {
  type: 'simple_dot';
  x: number;
  y: number;
  size: number;
  life: number;
  decay: number;
};

type Particle = RingParticle | DotParticle;

type ClickPingProps = {
  color?: string;
  ringSpeed?: number;
  ringLineWidth?: number;
  dotSize?: number;
  ringDecay?: number;
  dotDecay?: number;
  maxRadius?: number;
  children?: ReactNode;
};

export default function ClickPing({
  color = '#fff',
  ringSpeed = 2.5,
  ringLineWidth = 1.5,
  dotSize = 3,
  ringDecay = 0.025,
  dotDecay = 0.05,
  maxRadius = 80,
  children,
}: ClickPingProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const particlesRef = useRef<Particle[]>([]);
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
      if (particlesRef.current.length === 0) {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        isRunningRef.current = false;
        return;
      }

      ctx.clearRect(0, 0, canvas.width, canvas.height);

      particlesRef.current = particlesRef.current.filter((p) => {
        p.life -= p.decay;

        if (p.life <= 0 || (p.type === 'ping_ring' && p.r >= maxRadius)) {
          return false;
        }

        ctx.globalAlpha = Math.max(0, p.life);
        ctx.strokeStyle = color;
        ctx.fillStyle = color;

        if (p.type === 'ping_ring') {
          p.r += p.vr;
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
          ctx.lineWidth = p.lineWidth;
          ctx.stroke();
        } else {
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
          ctx.fill();
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
    particlesRef.current.push({
      type: 'ping_ring',
      x: e.clientX,
      y: e.clientY,
      r: 0,
      vr: ringSpeed,
      lineWidth: ringLineWidth,
      life: 1.0,
      decay: ringDecay,
    });

    particlesRef.current.push({
      type: 'simple_dot',
      x: e.clientX,
      y: e.clientY,
      size: dotSize,
      life: 1.0,
      decay: dotDecay,
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