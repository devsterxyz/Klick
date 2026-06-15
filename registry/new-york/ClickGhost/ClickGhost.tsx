// "use client"

// import { useRef, useEffect } from 'react';
// import type { ReactNode } from 'react';

// type Ghost = {
//   x: number;
//   y: number;
//   vy: number;
//   phase: number;
//   size: number;
//   life: number;
//   decay: number;
// };

// type GhostColor =
//   | 'white'
//   | 'red'
//   | 'blue'
//   | 'green'
//   | 'yellow'
//   | 'purple'
//   | 'pink'
//   | 'cyan'
//   | 'random';

// type ClickGhostProps = {
//   className?: string;
//   count?: number;
//   scatter?: number;
//   minSpeed?: number;
//   maxSpeed?: number;
//   size?: number;
//   wobble?: number;
//   decay?: number;
//   color?: GhostColor;
//   children?: ReactNode;
// };

// export default function ClickGhost({
//   className,
//   count = 6,
//   scatter = 40,
//   minSpeed = 1,
//   maxSpeed = 3,
//   size = 24,
//   wobble = 1.5,
//   decay = 0.015,
//   children,
// }: ClickGhostProps) {
//   const canvasRef = useRef<HTMLCanvasElement | null>(null);
//   const ghostsRef = useRef<Ghost[]>([]);
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
//       if (ghostsRef.current.length === 0) {
//         ctx.clearRect(0, 0, canvas.width, canvas.height);
//         isRunningRef.current = false;
//         return;
//       }

//       ctx.clearRect(0, 0, canvas.width, canvas.height);

//       ghostsRef.current = ghostsRef.current.filter((p) => {
//         p.life -= p.decay;
//         if (p.life <= 0) return false;

//         p.y -= p.vy;
//         p.x += Math.sin(p.phase + p.life * 10) * wobble;

//         ctx.filter = 'none';
//         ctx.font = `${p.size}px Arial`;
//         ctx.textAlign = 'center';
//         ctx.textBaseline = 'middle';
//         ctx.fillText('👻', p.x, p.y);
//         ctx.filter = 'none';

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
//     const PI2 = Math.PI * 2;

//     for (let i = 0; i < count; i++) {
//       ghostsRef.current.push({
//         x: x + (Math.random() - 0.5) * scatter,
//         y: y,
//         vy: minSpeed + Math.random() * (maxSpeed - minSpeed),
//         phase: Math.random() * PI2,
//         size,
//         life: 1.0,
//         decay,
//       });
//     }

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

type Ghost = {
  x: number;
  y: number;
  vy: number;
  phase: number;
  size: number;
  life: number;
  decay: number;
};

type GhostColor =
  | 'white'
  | 'red'
  | 'blue'
  | 'green'
  | 'yellow'
  | 'purple'
  | 'pink'
  | 'cyan'
  | 'random';

type ClickGhostProps = {
  count?: number;
  scatter?: number;
  minSpeed?: number;
  maxSpeed?: number;
  size?: number;
  wobble?: number;
  decay?: number;
  color?: GhostColor;
  children?: ReactNode;
};

export default function ClickGhost({
  count = 6,
  scatter = 40,
  minSpeed = 1,
  maxSpeed = 3,
  size = 24,
  wobble = 1.5,
  decay = 0.015,
  children,
}: ClickGhostProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const ghostsRef = useRef<Ghost[]>([]);
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
      if (ghostsRef.current.length === 0) {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        isRunningRef.current = false;
        return;
      }

      ctx.clearRect(0, 0, canvas.width, canvas.height);

      ghostsRef.current = ghostsRef.current.filter((p) => {
        p.life -= p.decay;
        if (p.life <= 0) return false;

        p.y -= p.vy;
        p.x += Math.sin(p.phase + p.life * 10) * wobble;

        ctx.filter = 'none';
        ctx.font = `${p.size}px Arial`;
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText('👻', p.x, p.y);
        ctx.filter = 'none';

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
    const x = e.clientX;
    const y = e.clientY;
    const PI2 = Math.PI * 2;

    for (let i = 0; i < count; i++) {
      ghostsRef.current.push({
        x: x + (Math.random() - 0.5) * scatter,
        y: y,
        vy: minSpeed + Math.random() * (maxSpeed - minSpeed),
        phase: Math.random() * PI2,
        size,
        life: 1.0,
        decay,
      });
    }

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