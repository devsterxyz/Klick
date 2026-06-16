
"use client"

import { useRef, useEffect, useCallback } from 'react';
import { createPortal } from 'react-dom';
import type { ReactNode } from 'react';

type Particle = {
  x: number;
  y: number;
  vy: number;
  startTime: number;
};

type ClickMatrixRainProps = {
  textColor?: string;
  columnCount?: number;
  fallSpeed?: number;
  trailLength?: number;
  fontSize?: number;
  duration?: number;
  spreadRadius?: number;
  children?: ReactNode;
};

const KATA = 'ｱｲｳｴｵｶｷｸｹｺｻｼｽｾｿﾀﾁﾂﾃﾄﾅﾆﾇﾈﾉﾊﾋﾌﾍﾎﾏﾐﾑﾒﾓﾔﾕﾖﾗﾘﾙﾚﾛﾜﾝ0123456789';

export default function ClickMatrixRain({
  textColor = '#fff',
  columnCount = 10,
  fallSpeed = 3,
  trailLength = 8,
  fontSize = 14,
  duration = 1200,
  spreadRadius = 120,
  children,
}: ClickMatrixRainProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const particlesRef = useRef<Particle[]>([]);
  const animIdRef = useRef<number | null>(null);

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

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const draw = (timestamp: number) => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.font = `${fontSize}px monospace`;
      ctx.textAlign = 'center';

      particlesRef.current = particlesRef.current.filter((p) => {
        const elapsed = timestamp - p.startTime;
        if (elapsed >= duration) return false;

        const progress = elapsed / duration;
        const traveled = p.vy * (elapsed / 16.67);
        const headY = p.y + traveled;

        for (let j = 0; j < trailLength; j++) {
          const charY = headY - j * (fontSize + 2);
          const trailAlpha = Math.max(0, (1 - j / trailLength) * (1 - progress));

          ctx.fillStyle = textColor;
          ctx.globalAlpha = j === 0 ? trailAlpha : trailAlpha * 0.8;

          const char = KATA[Math.floor(Math.random() * KATA.length)];
          ctx.fillText(char, p.x, charY);
        }

        ctx.globalAlpha = 1;
        return true;
      });

      animIdRef.current = requestAnimationFrame(draw);
    };

    animIdRef.current = requestAnimationFrame(draw);

    return () => {
      if (animIdRef.current !== null) cancelAnimationFrame(animIdRef.current);
    };
  }, [textColor, fontSize, trailLength, duration]);

  // clientX/Y maps directly to fixed canvas — no rect offset needed
  const handleClick = useCallback(
    (e: React.MouseEvent) => {
      const now = performance.now();

      const newParticles: Particle[] = Array.from(
        { length: columnCount },
        (_, i) => ({
          x: e.clientX + (Math.random() - 0.5) * spreadRadius,
          y: e.clientY - Math.random() * 50,
          vy: fallSpeed + Math.random() * (fallSpeed * 0.7),
          startTime: now + i * 30,
        })
      );

      particlesRef.current.push(...newParticles);
    },
    [columnCount, fallSpeed, spreadRadius]
  );

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