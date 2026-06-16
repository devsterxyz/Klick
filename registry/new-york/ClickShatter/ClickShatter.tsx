
"use client"

import { useRef, useEffect, useCallback } from 'react';
import { createPortal } from 'react-dom';
import type { ReactNode } from 'react';

type EasingType = 'linear' | 'ease-in' | 'ease-out' | 'ease-in-out';

type Shard = {
  originX: number;
  originY: number;
  angle: number;
  distance: number;
  size: number;
  initialRotation: number;
  rotationSpeed: number;
  startTime: number;
};

type ClickShatterProps = {
  shardColor?: string;
  shardCount?: number;
  shardSize?: number;
  spreadRadius?: number;
  duration?: number;
  easing?: EasingType;
  gravity?: number;
  children?: ReactNode;
};

export default function ClickShatter({
  shardColor = '#fff',
  shardCount = 12,
  shardSize = 6,
  spreadRadius = 80,
  duration = 700,
  easing = 'ease-out',
  gravity = 0.6,
  children,
}: ClickShatterProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const shardsRef = useRef<Shard[]>([]);

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
        case 'linear':      return t;
        case 'ease-in':     return t * t;
        case 'ease-in-out': return t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t;
        default:            return t * (2 - t);
      }
    },
    [easing]
  );

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationId: number;

    const draw = (timestamp: number) => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      shardsRef.current = shardsRef.current.filter((shard) => {
        const elapsed = timestamp - shard.startTime;
        if (elapsed >= duration) return false;

        const progress = elapsed / duration;
        const eased = easeFunc(progress);

        const x = shard.originX + Math.cos(shard.angle) * eased * shard.distance;
        const y =
          shard.originY +
          Math.sin(shard.angle) * eased * shard.distance +
          gravity * eased * eased * spreadRadius;

        const rotation = shard.initialRotation + shard.rotationSpeed * progress * Math.PI * 4;
        const alpha = progress < 0.6 ? 1 : 1 - (progress - 0.6) / 0.4;

        ctx.save();
        ctx.globalAlpha = Math.max(0, alpha);
        ctx.fillStyle = shardColor;
        ctx.translate(x, y);
        ctx.rotate(rotation);

        const s = shard.size;
        ctx.beginPath();
        ctx.moveTo(0, -s);
        ctx.lineTo(s, s);
        ctx.lineTo(-s, s);
        ctx.closePath();
        ctx.fill();

        ctx.restore();
        return true;
      });

      animationId = requestAnimationFrame(draw);
    };

    animationId = requestAnimationFrame(draw);
    return () => cancelAnimationFrame(animationId);
  }, [shardColor, shardSize, spreadRadius, duration, gravity, easeFunc]);

  // clientX/Y maps directly to fixed canvas — no rect offset needed
  const handleClick = (e: React.MouseEvent) => {
    const now = performance.now();

    const newShards: Shard[] = Array.from({ length: shardCount }, () => ({
      originX: e.clientX,
      originY: e.clientY,
      angle: Math.random() * Math.PI * 2,
      distance: spreadRadius * (0.4 + Math.random() * 0.6),
      size: shardSize * (0.5 + Math.random() * 0.8),
      initialRotation: Math.random() * Math.PI * 2,
      rotationSpeed: (Math.random() - 0.5) * 2,
      startTime: now,
    }));

    shardsRef.current.push(...newShards);
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