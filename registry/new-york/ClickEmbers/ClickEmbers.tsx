// "use client"

// import { useRef, useEffect, useCallback } from 'react';
// import type { ReactNode } from 'react';

// type Particle = {
//   x: number;
//   y: number;
//   vx: number;
//   vy: number;
//   startTime: number;
// };

// type ClickEmbersProps = {
//   className?: string;
//   strokeColor?: string;
//   particleCount?: number;
//   spreadSpeed?: number;
//   minRiseSpeed?: number;
//   maxRiseSpeed?: number;
//   gravity?: number;
//   trailLength?: number;
//   lineWidth?: number;
//   duration?: number;
//   children?: ReactNode;
// };

// export default function ClickEmbers({
//   className,
//   strokeColor = '#fff',
//   particleCount = 30,
//   spreadSpeed = 5,
//   minRiseSpeed = 3,
//   maxRiseSpeed = 6,
//   gravity = 0.15,
//   trailLength = 1.5,
//   lineWidth = 1.5,
//   duration = 1800,
//   children,
// }: ClickEmbersProps) {
//   const canvasRef = useRef<HTMLCanvasElement | null>(null);
//   const particlesRef = useRef<Particle[]>([]);
//   const animIdRef = useRef<number | null>(null);

//   useEffect(() => {
//     const canvas = canvasRef.current;
//     if (!canvas) return;
//     const parent = canvas.parentElement;
//     if (!parent) return;

//     const resize = () => {
//       const { width, height } = parent.getBoundingClientRect();
//       if (canvas.width !== width || canvas.height !== height) {
//         canvas.width = width;
//         canvas.height = height;
//       }
//     };

//     const ro = new ResizeObserver(resize);
//     ro.observe(parent);
//     resize();

//     return () => ro.disconnect();
//   }, []);

//   useEffect(() => {
//     const canvas = canvasRef.current;
//     if (!canvas) return;
//     const ctx = canvas.getContext('2d');
//     if (!ctx) return;

//     const draw = (timestamp: number) => {
//       ctx.clearRect(0, 0, canvas.width, canvas.height);

//       particlesRef.current = particlesRef.current.filter((p) => {
//         const elapsed = timestamp - p.startTime;
//         if (elapsed >= duration) return false;

//         const progress = elapsed / duration;
//         const alpha = Math.max(0, 1 - progress);

//         p.vy += gravity;
//         p.x += p.vx;
//         p.y += p.vy;

//         ctx.beginPath();
//         ctx.moveTo(p.x, p.y);
//         ctx.lineTo(
//           p.x - p.vx * trailLength,
//           p.y - p.vy * trailLength
//         );
//         ctx.lineWidth = lineWidth;
//         ctx.strokeStyle = strokeColor;
//         ctx.globalAlpha = alpha;
//         ctx.stroke();
//         ctx.globalAlpha = 1;

//         return true;
//       });

//       animIdRef.current = requestAnimationFrame(draw);
//     };

//     animIdRef.current = requestAnimationFrame(draw);

//     return () => {
//       if (animIdRef.current !== null) {
//         cancelAnimationFrame(animIdRef.current);
//       }
//     };
//   }, [strokeColor, duration, gravity, trailLength, lineWidth]);

//   const handleClick = useCallback(
//     (e: React.MouseEvent<HTMLDivElement>) => {
//       const canvas = canvasRef.current;
//       if (!canvas) return;
//       const rect = canvas.getBoundingClientRect();
//       const cx = e.clientX - rect.left;
//       const cy = e.clientY - rect.top;
//       const now = performance.now();

//       const newParticles: Particle[] = Array.from(
//         { length: particleCount },
//         () => ({
//           x: cx,
//           y: cy,
//           vx: (Math.random() - 0.5) * spreadSpeed,
//           vy: -(
//             minRiseSpeed +
//             Math.random() * (maxRiseSpeed - minRiseSpeed)
//           ),
//           startTime: now,
//         })
//       );

//       particlesRef.current.push(...newParticles);
//     },
//     [particleCount, spreadSpeed, minRiseSpeed, maxRiseSpeed]
//   );

//   return (
//     <div className={`relative ${className ?? 'w-fit h-fit'}`} onClick={handleClick}>
//       <canvas
//         ref={canvasRef}
//         className="absolute top-0 left-0 w-full h-full pointer-events-none select-none z-10"
//       />
//       {children}
//     </div>
//   );
// };


"use client"

import { useRef, useEffect, useCallback } from 'react';
import { createPortal } from 'react-dom';
import type { ReactNode } from 'react';

type Particle = {
  x: number;
  y: number;
  vx: number;
  vy: number;
  startTime: number;
};

type ClickEmbersProps = {
  strokeColor?: string;
  particleCount?: number;
  spreadSpeed?: number;
  minRiseSpeed?: number;
  maxRiseSpeed?: number;
  gravity?: number;
  trailLength?: number;
  lineWidth?: number;
  duration?: number;
  children?: ReactNode;
};

export default function ClickEmbers({
  strokeColor = '#fff',
  particleCount = 30,
  spreadSpeed = 5,
  minRiseSpeed = 3,
  maxRiseSpeed = 6,
  gravity = 0.15,
  trailLength = 1.5,
  lineWidth = 1.5,
  duration = 1800,
  children,
}: ClickEmbersProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const particlesRef = useRef<Particle[]>([]);
  const animIdRef = useRef<number | null>(null);

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

        p.vy += gravity;
        p.x += p.vx;
        p.y += p.vy;

        ctx.beginPath();
        ctx.moveTo(p.x, p.y);
        ctx.lineTo(
          p.x - p.vx * trailLength,
          p.y - p.vy * trailLength
        );
        ctx.lineWidth = lineWidth;
        ctx.strokeStyle = strokeColor;
        ctx.globalAlpha = alpha;
        ctx.stroke();
        ctx.globalAlpha = 1;

        return true;
      });

      animIdRef.current = requestAnimationFrame(draw);
    };

    animIdRef.current = requestAnimationFrame(draw);

    return () => {
      if (animIdRef.current !== null) {
        cancelAnimationFrame(animIdRef.current);
      }
    };
  }, [strokeColor, duration, gravity, trailLength, lineWidth]);

  // clientX/Y maps directly to fixed canvas — no rect offset needed
  const handleClick = useCallback(
    (e: React.MouseEvent) => {
      const now = performance.now();

      const newParticles: Particle[] = Array.from(
        { length: particleCount },
        () => ({
          x: e.clientX,
          y: e.clientY,
          vx: (Math.random() - 0.5) * spreadSpeed,
          vy: -(minRiseSpeed + Math.random() * (maxRiseSpeed - minRiseSpeed)),
          startTime: now,
        })
      );

      particlesRef.current.push(...newParticles);
    },
    [particleCount, spreadSpeed, minRiseSpeed, maxRiseSpeed]
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