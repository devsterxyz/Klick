
"use client"

import { useRef, useEffect, useCallback } from 'react';
import { createPortal } from 'react-dom';
import type { ReactNode } from 'react';

type Point3D = [number, number, number];

type Particle = {
  x: number;
  y: number;
  pts: Point3D[];
  size: number;
  rotX: number;
  rotY: number;
  startTime: number;
};

type ClickHoloSphereProps = {
  dotColor?: string;
  pointCount?: number;
  maxSize?: number;
  growSpeed?: number;
  rotSpeedX?: number;
  rotSpeedY?: number;
  dotSize?: number;
  duration?: number;
  children?: ReactNode;
};

export default function ClickHoloSphere({
  dotColor = '#fff',
  pointCount = 40,
  maxSize = 40,
  growSpeed = 2,
  rotSpeedX = 0.02,
  rotSpeedY = 0.03,
  dotSize = 1.5,
  duration = 2000,
  children,
}: ClickHoloSphereProps) {
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

      particlesRef.current = particlesRef.current.filter((p) => {
        const elapsed = timestamp - p.startTime;
        if (elapsed >= duration) return false;

        const progress = elapsed / duration;
        const alpha = Math.max(0, 1 - progress);

        if (p.size < maxSize) p.size += growSpeed;

        p.rotX += rotSpeedX;
        p.rotY += rotSpeedY;

        for (const [sx, sy, sz] of p.pts) {
          const py = sy * Math.cos(p.rotX) - sz * Math.sin(p.rotX);
          const pz = sy * Math.sin(p.rotX) + sz * Math.cos(p.rotX);
          const px = sx * Math.cos(p.rotY) - pz * Math.sin(p.rotY);
          const depth = (pz + 1) / 2;

          ctx.fillStyle = dotColor;
          ctx.globalAlpha = alpha * depth;
          ctx.fillRect(p.x + px * p.size, p.y + py * p.size, dotSize, dotSize);
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
  }, [dotColor, duration, maxSize, growSpeed, rotSpeedX, rotSpeedY, dotSize]);

  // clientX/Y maps directly to fixed canvas — no rect offset needed
  const handleClick = useCallback(
    (e: React.MouseEvent) => {
      const now = performance.now();

      const pts: Point3D[] = Array.from({ length: pointCount }, () => {
        const theta = Math.random() * Math.PI * 2;
        const phi = Math.acos(2 * Math.random() - 1);
        return [
          Math.cos(theta) * Math.sin(phi),
          Math.cos(phi),
          Math.sin(theta) * Math.sin(phi),
        ];
      });

      particlesRef.current.push({
        x: e.clientX,
        y: e.clientY,
        pts,
        size: 0,
        rotX: 0,
        rotY: 0,
        startTime: now,
      });
    },
    [pointCount]
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