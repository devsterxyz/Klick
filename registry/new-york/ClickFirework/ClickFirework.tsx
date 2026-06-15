// "use client"

// import { useRef, useEffect } from 'react';
// import type { ReactNode } from 'react';

// type Particle = {
//   x: number;
//   y: number;
//   vx: number;
//   vy: number;
//   life: number;
//   decay: number;
//   gravity: number;
//   friction: number;
// };

// type ClickFireworkProps = {
//   className?: string;
//   color?: string;
//   count?: number;
//   speed?: number;
//   gravity?: number;
//   friction?: number;
//   children?: ReactNode;
// };

// export default function ClickFirework({
//   className,
//   color = '#fff',
//   count = 35,
//   speed = 6,
//   gravity = 0.08,
//   friction = 0.96,
//   children,
// }: ClickFireworkProps) {
//   const canvasRef = useRef<HTMLCanvasElement | null>(null);
//   const dotsRef = useRef<Particle[]>([]);
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
//       if (dotsRef.current.length === 0) {
//         ctx.clearRect(0, 0, canvas.width, canvas.height);
//         isRunningRef.current = false;
//         return;
//       }

//       ctx.clearRect(0, 0, canvas.width, canvas.height);

//       dotsRef.current = dotsRef.current.filter((p) => {
//         p.life -= p.decay;
//         if (p.life <= 0) return false;

//         p.vx *= p.friction;
//         p.vy *= p.friction;
//         p.vy += p.gravity;
//         p.x += p.vx;
//         p.y += p.vy;

//         ctx.globalAlpha = Math.max(0, p.life);
//         ctx.fillStyle = color;
//         ctx.beginPath();
//         ctx.arc(p.x, p.y, 0.1 + Math.random(), 0, Math.PI * 2);
//         ctx.fill();

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

//     const newDots: Particle[] = Array.from({ length: count }, () => {
//       const angle = Math.random() * PI2;
//       const s = 2 + Math.random() * speed;

//       return {
//         x,
//         y,
//         vx: Math.cos(angle) * s,
//         vy: Math.sin(angle) * s,
//         life: 1.0,
//         decay: 0.012 + Math.random() * 0.015,
//         gravity,
//         friction,
//       };
//     });

//     dotsRef.current.push(...newDots);
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

type Particle = {
  x: number;
  y: number;
  vx: number;
  vy: number;
  life: number;
  decay: number;
  gravity: number;
  friction: number;
};

type ClickFireworkProps = {
  color?: string;
  count?: number;
  speed?: number;
  gravity?: number;
  friction?: number;
  children?: ReactNode;
};

export default function ClickFirework({
  color = '#fff',
  count = 35,
  speed = 6,
  gravity = 0.08,
  friction = 0.96,
  children,
}: ClickFireworkProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const dotsRef = useRef<Particle[]>([]);
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
      if (dotsRef.current.length === 0) {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        isRunningRef.current = false;
        return;
      }

      ctx.clearRect(0, 0, canvas.width, canvas.height);

      dotsRef.current = dotsRef.current.filter((p) => {
        p.life -= p.decay;
        if (p.life <= 0) return false;

        p.vx *= p.friction;
        p.vy *= p.friction;
        p.vy += p.gravity;
        p.x += p.vx;
        p.y += p.vy;

        ctx.globalAlpha = Math.max(0, p.life);
        ctx.fillStyle = color;
        ctx.beginPath();
        ctx.arc(p.x, p.y, 0.1 + Math.random(), 0, Math.PI * 2);
        ctx.fill();

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

    const newDots: Particle[] = Array.from({ length: count }, () => {
      const angle = Math.random() * PI2;
      const s = 2 + Math.random() * speed;

      return {
        x,
        y,
        vx: Math.cos(angle) * s,
        vy: Math.sin(angle) * s,
        life: 1.0,
        decay: 0.012 + Math.random() * 0.015,
        gravity,
        friction,
      };
    });

    dotsRef.current.push(...newDots);
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