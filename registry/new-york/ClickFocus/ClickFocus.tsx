// "use client"

// import { useRef, useEffect } from 'react';
// import type { ReactNode } from 'react';

// type Bracket = {
//   x: number;
//   y: number;
//   dist: number;
//   vdist: number;
//   size: number;
//   life: number;
//   decay: number;
// };

// type ClickFocusProps = {
//   className?: string;
//   color?: string;
//   lineWidth?: number;
//   startDist?: number;
//   convergeSpeed?: number;
//   bracketSize?: number;
//   decay?: number;
//   children?: ReactNode;
// };

// export default function ClickFocus({
//   className,
//   color = '#fff',
//   lineWidth = 1,
//   startDist = 40,
//   convergeSpeed = -1.5,
//   bracketSize = 10,
//   decay = 0.02,
//   children,
// }: ClickFocusProps) {
//   const canvasRef = useRef<HTMLCanvasElement | null>(null);
//   const bracketsRef = useRef<Bracket[]>([]);
//   const isRunningRef = useRef<boolean>(false);
//   const animationIdRef = useRef<number | null>(null);

//   useEffect(() => {
//     const canvas = canvasRef.current;
//     if (!canvas) return;
//     const parent = canvas.parentElement;
//     if (!parent) return;

//     let resizeTimeout: ReturnType<typeof setTimeout>;

//     const resizeCanvas = () => {
//       const { width, height } = parent.getBoundingClientRect();
//       if (canvas.width !== width || canvas.height !== height) {
//         canvas.width = width;
//         canvas.height = height;
//       }
//     };

//     const handleResize = () => {
//       clearTimeout(resizeTimeout);
//       resizeTimeout = setTimeout(resizeCanvas, 100);
//     };

//     const ro = new ResizeObserver(handleResize);
//     ro.observe(parent);
//     resizeCanvas();

//     return () => {
//       ro.disconnect();
//       clearTimeout(resizeTimeout);
//     };
//   }, []);

//   const startLoop = () => {
//     if (isRunningRef.current) return;
//     isRunningRef.current = true;

//     const canvas = canvasRef.current;
//     if (!canvas) return;
//     const ctx = canvas.getContext('2d');
//     if (!ctx) return;

//     const draw = () => {
//       if (bracketsRef.current.length === 0) {
//         ctx.clearRect(0, 0, canvas.width, canvas.height);
//         isRunningRef.current = false;
//         return;
//       }

//       ctx.clearRect(0, 0, canvas.width, canvas.height);

//       bracketsRef.current = bracketsRef.current.filter((p) => {
//         p.life -= p.decay;
//         if (p.life <= 0) return false;

//         p.dist += p.vdist;

//         if (p.dist <= 2) return false;

//         const d = Math.max(0, p.dist);
//         const s = p.size;

//         ctx.globalAlpha = Math.max(0, p.life);
//         ctx.strokeStyle = color;
//         ctx.lineWidth = lineWidth;
//         ctx.beginPath();

//         ctx.moveTo(p.x - d, p.y - d + s);
//         ctx.lineTo(p.x - d, p.y - d);
//         ctx.lineTo(p.x - d + s, p.y - d);

//         ctx.moveTo(p.x + d - s, p.y - d);
//         ctx.lineTo(p.x + d, p.y - d);
//         ctx.lineTo(p.x + d, p.y - d + s);

//         ctx.moveTo(p.x - d, p.y + d - s);
//         ctx.lineTo(p.x - d, p.y + d);
//         ctx.lineTo(p.x - d + s, p.y + d);

//         ctx.moveTo(p.x + d - s, p.y + d);
//         ctx.lineTo(p.x + d, p.y + d);
//         ctx.lineTo(p.x + d, p.y + d - s);

//         ctx.stroke();

//         return true;
//       });

//       ctx.globalAlpha = 1;
//       animationIdRef.current = requestAnimationFrame(draw);
//     };

//     animationIdRef.current = requestAnimationFrame(draw);
//   };

//   useEffect(() => {
//     return () => {
//       if (animationIdRef.current !== null) {
//         cancelAnimationFrame(animationIdRef.current);
//       }
//     };
//   }, []);

//   const handleClick = (e: React.MouseEvent<HTMLDivElement>) => {
//     const canvas = canvasRef.current;
//     if (!canvas) return;
//     const rect = canvas.getBoundingClientRect();
//     const x = e.clientX - rect.left;
//     const y = e.clientY - rect.top;

//     bracketsRef.current.push({
//       x,
//       y,
//       dist: startDist,
//       vdist: convergeSpeed,
//       size: bracketSize,
//       life: 1.0,
//       decay,
//     });

//     startLoop();
//   };

//   return (
//     <div className={`relative ${className ?? 'w-fit h-fit'}`} onClick={handleClick}>
//       <canvas
//         ref={canvasRef}
//         className="w-full h-full block absolute top-0 left-0 select-none pointer-events-none z-10"
//       />
//       {children}
//     </div>
//   );
// };


"use client"

import { useRef, useEffect } from 'react';
import { createPortal } from 'react-dom';
import type { ReactNode } from 'react';

type Bracket = {
  x: number;
  y: number;
  dist: number;
  vdist: number;
  size: number;
  life: number;
  decay: number;
};

type ClickFocusProps = {
  color?: string;
  lineWidth?: number;
  startDist?: number;
  convergeSpeed?: number;
  bracketSize?: number;
  decay?: number;
  children?: ReactNode;
};

export default function ClickFocus({
  color = '#fff',
  lineWidth = 1,
  startDist = 40,
  convergeSpeed = -1.5,
  bracketSize = 10,
  decay = 0.02,
  children,
}: ClickFocusProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const bracketsRef = useRef<Bracket[]>([]);
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
      if (bracketsRef.current.length === 0) {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        isRunningRef.current = false;
        return;
      }

      ctx.clearRect(0, 0, canvas.width, canvas.height);

      bracketsRef.current = bracketsRef.current.filter((p) => {
        p.life -= p.decay;
        if (p.life <= 0) return false;

        p.dist += p.vdist;

        if (p.dist <= 2) return false;

        const d = Math.max(0, p.dist);
        const s = p.size;

        ctx.globalAlpha = Math.max(0, p.life);
        ctx.strokeStyle = color;
        ctx.lineWidth = lineWidth;
        ctx.beginPath();

        ctx.moveTo(p.x - d, p.y - d + s);
        ctx.lineTo(p.x - d, p.y - d);
        ctx.lineTo(p.x - d + s, p.y - d);

        ctx.moveTo(p.x + d - s, p.y - d);
        ctx.lineTo(p.x + d, p.y - d);
        ctx.lineTo(p.x + d, p.y - d + s);

        ctx.moveTo(p.x - d, p.y + d - s);
        ctx.lineTo(p.x - d, p.y + d);
        ctx.lineTo(p.x - d + s, p.y + d);

        ctx.moveTo(p.x + d - s, p.y + d);
        ctx.lineTo(p.x + d, p.y + d);
        ctx.lineTo(p.x + d, p.y + d - s);

        ctx.stroke();

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
    bracketsRef.current.push({
      x: e.clientX,
      y: e.clientY,
      dist: startDist,
      vdist: convergeSpeed,
      size: bracketSize,
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