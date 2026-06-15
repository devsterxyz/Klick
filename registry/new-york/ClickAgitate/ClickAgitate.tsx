// "use client"

// import { useRef, useEffect, useCallback } from "react";
// import type { ReactNode } from "react";

// type Particle = {
//   x: number;
//   y: number;
//   vx: number;
//   vy: number;
//   amp: number;
//   startTime: number;
// };

// type ClickAgitateProps = {
//   className?: string;
//   strokeColor?: string;
//   particleCount?: number;
//   duration?: number;
//   particleSize?: number;
//   children?: ReactNode;
// };

// export default function ClickAgitate({
//   className,
//   strokeColor = "#ffffff",
//   particleCount = 25,
//   duration = 1200,
//   particleSize = 2,
//   children,
// }: ClickAgitateProps) {
//   const canvasRef = useRef<HTMLCanvasElement | null>(null);
//   const particlesRef = useRef<Particle[]>([]);
//   const animIdRef = useRef<number | null>(null);

//   // physics defaults
//   const minSpeed = 2;
//   const maxSpeed = 6;
//   const jitterAmp = 10;
//   const jitterDecay = 0.94;
//   const drag = 0.98;
//   const trailOpacity = 0.5;

//   // resize canvas
//   useEffect(() => {
//     const canvas = canvasRef.current;
//     if (!canvas) return;
//     const parent = canvas.parentElement;
//     if (!parent) return;

//     const resize = () => {
//       const { width, height } = parent.getBoundingClientRect();
//       canvas.width = width;
//       canvas.height = height;
//     };

//     const ro = new ResizeObserver(resize);
//     ro.observe(parent);
//     resize();
//     return () => ro.disconnect();
//   }, []);

//   // animation loop
//   useEffect(() => {
//     const canvas = canvasRef.current;
//     if (!canvas) return;
//     const ctx = canvas.getContext("2d");
//     if (!ctx) return;

//     const draw = (timestamp: number) => {
//       ctx.clearRect(0, 0, canvas.width, canvas.height);

//       particlesRef.current = particlesRef.current.filter((p) => {
//         const elapsed = timestamp - p.startTime;
//         if (elapsed >= duration) return false;

//         const progress = elapsed / duration;

//         // smoother fade (ease-out)
//         const alpha = Math.pow(1 - progress, 1.5);

//         // motion
//         p.x += p.vx;
//         p.y += p.vy;

//         // drag (smooth slowdown)
//         p.vx *= drag;
//         p.vy *= drag;

//         // jitter
//         p.amp *= jitterDecay;

//         const jx = p.x + (Math.random() - 0.5) * p.amp;
//         const jy = p.y + (Math.random() - 0.5) * p.amp;

//         // particle
//         ctx.fillStyle = strokeColor;
//         ctx.globalAlpha = alpha;
//         ctx.fillRect(jx, jy, particleSize, particleSize);

//         // trail
//         ctx.beginPath();
//         ctx.moveTo(jx, jy);
//         ctx.lineTo(
//           jx - p.vx * 2 + (Math.random() - 0.5) * p.amp,
//           jy - p.vy * 2 + (Math.random() - 0.5) * p.amp
//         );
//         ctx.lineWidth = 1;
//         ctx.strokeStyle = strokeColor;
//         ctx.globalAlpha = alpha * trailOpacity;
//         ctx.stroke();

//         ctx.globalAlpha = 1;

//         return true;
//       });

//       animIdRef.current = requestAnimationFrame(draw);
//     };

//     animIdRef.current = requestAnimationFrame(draw);
//     return () => {
//       if (animIdRef.current) cancelAnimationFrame(animIdRef.current);
//     };
//   }, [strokeColor, duration, particleSize]);

//   // click handler
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
//         () => {
//           const angle = Math.random() * Math.PI * 2;
//           const speed =
//             minSpeed + Math.random() * (maxSpeed - minSpeed);

//           return {
//             x: cx,
//             y: cy,
//             vx: Math.cos(angle) * speed,
//             vy: Math.sin(angle) * speed,
//             amp: jitterAmp,
//             startTime: now,
//           };
//         }
//       );

//       particlesRef.current.push(...newParticles);
//     },
//     [particleCount]
//   );

//   return (
//     <div className={`relative ${className ?? 'w-fit h-fit'}`} onClick={handleClick}>
//       <canvas
//         ref={canvasRef}
//         className="absolute inset-0 w-full h-full pointer-events-none z-10"
//       />
//       {children}
//     </div>
//   );
// };


"use client"

import { useRef, useEffect, useCallback } from "react";
import { createPortal } from "react-dom";
import type { ReactNode } from "react";

type Particle = {
  x: number;
  y: number;
  vx: number;
  vy: number;
  amp: number;
  startTime: number;
};

type ClickAgitateProps = {
  strokeColor?: string;
  particleCount?: number;
  duration?: number;
  particleSize?: number;
  children?: ReactNode;
};

// physics constants
const MIN_SPEED = 2;
const MAX_SPEED = 6;
const JITTER_AMP = 10;
const JITTER_DECAY = 0.94;
const DRAG = 0.98;
const TRAIL_OPACITY = 0.5;

export default function ClickAgitate({
  strokeColor = "#ffffff",
  particleCount = 25,
  duration = 1200,
  particleSize = 2,
  children,
}: ClickAgitateProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const particlesRef = useRef<Particle[]>([]);
  const animIdRef = useRef<number | null>(null);

  // animation loop — canvas is fixed full-viewport, so no resize logic needed
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const syncSize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    syncSize();
    window.addEventListener("resize", syncSize);

    const draw = (timestamp: number) => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      particlesRef.current = particlesRef.current.filter((p) => {
        const elapsed = timestamp - p.startTime;
        if (elapsed >= duration) return false;

        const progress = elapsed / duration;
        const alpha = Math.pow(1 - progress, 1.5);

        p.x += p.vx;
        p.y += p.vy;
        p.vx *= DRAG;
        p.vy *= DRAG;
        p.amp *= JITTER_DECAY;

        const jx = p.x + (Math.random() - 0.5) * p.amp;
        const jy = p.y + (Math.random() - 0.5) * p.amp;

        ctx.fillStyle = strokeColor;
        ctx.globalAlpha = Math.max(0, alpha);
        ctx.fillRect(jx, jy, particleSize, particleSize);

        ctx.beginPath();
        ctx.moveTo(jx, jy);
        ctx.lineTo(
          jx - p.vx * 2 + (Math.random() - 0.5) * p.amp,
          jy - p.vy * 2 + (Math.random() - 0.5) * p.amp
        );
        ctx.lineWidth = 1;
        ctx.strokeStyle = strokeColor;
        ctx.globalAlpha = Math.max(0, alpha * TRAIL_OPACITY);
        ctx.stroke();

        ctx.globalAlpha = 1;
        return true;
      });

      animIdRef.current = requestAnimationFrame(draw);
    };

    animIdRef.current = requestAnimationFrame(draw);

    return () => {
      window.removeEventListener("resize", syncSize);
      if (animIdRef.current) cancelAnimationFrame(animIdRef.current);
    };
  }, [strokeColor, duration, particleSize]);

  // click handler — clientX/Y maps directly to fixed canvas coords
  const handleClick = useCallback(
    (e: React.MouseEvent) => {
      const now = performance.now();

      const newParticles: Particle[] = Array.from(
        { length: particleCount },
        () => {
          const angle = Math.random() * Math.PI * 2;
          const speed = MIN_SPEED + Math.random() * (MAX_SPEED - MIN_SPEED);
          return {
            x: e.clientX,
            y: e.clientY,
            vx: Math.cos(angle) * speed,
            vy: Math.sin(angle) * speed,
            amp: JITTER_AMP,
            startTime: now,
          };
        }
      );

      particlesRef.current.push(...newParticles);
    },
    [particleCount]
  );

  return (
    <>
      {/* display:contents — invisible to layout, children participate in parent flex/grid directly */}
      <div style={{ display: "contents" }} onClick={handleClick}>
        {children}
      </div>

      {/* canvas portalled to body — position:fixed, full viewport, above everything */}
      {typeof window !== "undefined" &&
        createPortal(
          <canvas
            ref={canvasRef}
            style={{
              position: "fixed",
              top: 0,
              left: 0,
              width: "100vw",
              height: "100vh",
              pointerEvents: "none",
              zIndex: 9999,
            }}
          />,
          document.body
        )}
    </>
  );
}