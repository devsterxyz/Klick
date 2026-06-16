
"use client"

import { useRef, useEffect } from 'react';
import { createPortal } from 'react-dom';
import type { ReactNode } from 'react';

interface GenText {
  x: number;
  y: number;
  text: string;
  timer: number;
  life: number;
  decay: number;
}

interface ClickGenerativeProps {
  color?: string;
  decay?: number;
  maxChars?: number;
  charSet?: string;
  children?: ReactNode;
}

export default function ClickGenerative({
  color = '#fff',
  decay = 0.01,
  maxChars = 12,
  charSet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789',
  children,
}: ClickGenerativeProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const particlesRef = useRef<GenText[]>([]);
  const isRunningRef = useRef<boolean>(false);
  const animationIdRef = useRef<number | null>(null);

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

      particlesRef.current = particlesRef.current.filter((p: GenText) => {
        p.life -= p.decay;
        if (p.life <= 0) return false;

        p.timer++;

        // Add a new character every 2 frames until maxChars
        if (p.timer % 2 === 0 && p.text.length < maxChars) {
          p.text += charSet[Math.floor(Math.random() * charSet.length)];
        }

        ctx.globalAlpha = Math.max(0, p.life);
        ctx.fillStyle = color;
        ctx.font = '10px monospace';
        ctx.textAlign = 'left';
        ctx.textBaseline = 'middle';
        ctx.fillText(p.text, p.x, p.y);

        // Blinking cursor
        const textWidth = ctx.measureText(p.text).width;
        if (Math.floor(p.life * 20) % 2 === 0) {
          ctx.fillRect(p.x + textWidth + 2, p.y - 5, 5, 10);
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

  // click coordinates map directly to fixed canvas coords
  const handleClick = (e: React.MouseEvent) => {
    particlesRef.current.push({
      x: e.clientX,
      y: e.clientY,
      text: '',
      timer: 0,
      life: 1.0,
      decay,
    });

    startLoop();
  };

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