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

// type ClickFlowFieldProps = {
//   className?: string;
//   dotColor?: string;
//   dotCount?: number;
//   initialSpeed?: number;
//   fieldStrength?: number;
//   fieldScale?: number;
//   dotRadius?: number;
//   duration?: number;
//   children?: ReactNode;
// };

// export default function ClickFlowField({
//   className,
//   dotColor = '#fff',
//   dotCount = 40,
//   initialSpeed = 4,
//   fieldStrength = 0.2,
//   fieldScale = 0.05,
//   dotRadius = 1.5,
//   duration = 2000,
//   children,
// }: ClickFlowFieldProps) {
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

//         p.vx += Math.sin(p.y * fieldScale) * fieldStrength;
//         p.vy += Math.cos(p.x * fieldScale) * fieldStrength;

//         p.x += p.vx;
//         p.y += p.vy;

//         ctx.beginPath();
//         ctx.arc(p.x, p.y, dotRadius, 0, Math.PI * 2);
//         ctx.fillStyle = dotColor;
//         ctx.globalAlpha = alpha;
//         ctx.fill();
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
//   }, [dotColor, duration, dotRadius, fieldStrength, fieldScale]);

//   const handleClick = useCallback(
//     (e: React.MouseEvent<HTMLDivElement>) => {
//       const canvas = canvasRef.current;
//       if (!canvas) return;
//       const rect = canvas.getBoundingClientRect();
//       const cx = e.clientX - rect.left;
//       const cy = e.clientY - rect.top;
//       const now = performance.now();

//       const newParticles: Particle[] = Array.from(
//         { length: dotCount },
//         () => ({
//           x: cx,
//           y: cy,
//           vx: (Math.random() - 0.5) * initialSpeed,
//           vy: (Math.random() - 0.5) * initialSpeed,
//           startTime: now,
//         })
//       );

//       particlesRef.current.push(...newParticles);
//     },
//     [dotCount, initialSpeed]
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

type ClickFlowFieldProps = {
  dotColor?: string;
  dotCount?: number;
  initialSpeed?: number;
  fieldStrength?: number;
  fieldScale?: number;
  dotRadius?: number;
  duration?: number;
  children?: ReactNode;
};

export default function ClickFlowField({
  dotColor = '#fff',
  dotCount = 40,
  initialSpeed = 4,
  fieldStrength = 0.2,
  fieldScale = 0.05,
  dotRadius = 1.5,
  duration = 2000,
  children,
}: ClickFlowFieldProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const particlesRef = useRef<Particle[]>([]);
  const animIdRef = useRef<number | null>(null);

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

        p.vx += Math.sin(p.y * fieldScale) * fieldStrength;
        p.vy += Math.cos(p.x * fieldScale) * fieldStrength;

        p.x += p.vx;
        p.y += p.vy;

        ctx.beginPath();
        ctx.arc(p.x, p.y, dotRadius, 0, Math.PI * 2);
        ctx.fillStyle = dotColor;
        ctx.globalAlpha = alpha;
        ctx.fill();
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
  }, [dotColor, duration, dotRadius, fieldStrength, fieldScale]);

  // click coordinates map directly to fixed canvas coords
  const handleClick = useCallback(
    (e: React.MouseEvent) => {
      const cx = e.clientX;
      const cy = e.clientY;
      const now = performance.now();

      const newParticles: Particle[] = Array.from(
        { length: dotCount },
        () => ({
          x: cx,
          y: cy,
          vx: (Math.random() - 0.5) * initialSpeed,
          vy: (Math.random() - 0.5) * initialSpeed,
          startTime: now,
        })
      );

      particlesRef.current.push(...newParticles);
    },
    [dotCount, initialSpeed]
  );

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