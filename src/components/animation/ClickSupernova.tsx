import { useRef, useEffect, ReactNode } from 'react';

interface NovaRing {
  type: 'ring';
  x: number;
  y: number;
  r: number;
  vr: number;
  life: number;
  decay: number;
}

interface NovaDot {
  type: 'dot';
  x: number;
  y: number;
  vx: number;
  vy: number;
  life: number;
  decay: number;
}

type NovaParticle = NovaRing | NovaDot;

interface ClickSupernovaProps {
  color?: string;
  dotSize?: number;
  dotCount?: number;
  ringSpeed?: number;
  dotDecay?: number;
  ringDecay?: number;
  children?: ReactNode;
}

const ClickSupernova = ({
  color = '#fff',
  dotSize = 1.5,
  dotCount = 30,
  ringSpeed = 4,
  dotDecay = 0.02,
  ringDecay = 0.02,
  children,
}: ClickSupernovaProps) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const particlesRef = useRef<NovaParticle[]>([]);
  const isRunningRef = useRef<boolean>(false);
  const animationIdRef = useRef<number | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const parent = canvas.parentElement;
    if (!parent) return;

    let resizeTimeout: ReturnType<typeof setTimeout>;

    const resizeCanvas = () => {
      const { width, height } = parent.getBoundingClientRect();
      if (canvas.width !== width || canvas.height !== height) {
        canvas.width = width;
        canvas.height = height;
      }
    };

    const handleResize = () => {
      clearTimeout(resizeTimeout);
      resizeTimeout = setTimeout(resizeCanvas, 100);
    };

    const ro = new ResizeObserver(handleResize);
    ro.observe(parent);
    resizeCanvas();

    return () => {
      ro.disconnect();
      clearTimeout(resizeTimeout);
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

      particlesRef.current = particlesRef.current.filter((p: NovaParticle) => {
        p.life -= p.decay;
        if (p.life <= 0) return false;

        ctx.globalAlpha = Math.max(0, p.life);

        if (p.type === 'ring') {
          p.r += p.vr;
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
          ctx.lineWidth = 4 * p.life;
          ctx.strokeStyle = color;
          ctx.stroke();
        } else {
          p.x += p.vx;
          p.y += p.vy;
          p.vx *= 0.95;
          p.vy *= 0.95;
          ctx.beginPath();
          ctx.arc(p.x, p.y, dotSize, 0, Math.PI * 2);
          ctx.fillStyle = color;
          ctx.fill();
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

  const handleClick = (e: React.MouseEvent<HTMLDivElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const PI2 = Math.PI * 2;

    // Expanding shockwave ring
    particlesRef.current.push({
      type: 'ring',
      x,
      y,
      r: 0,
      vr: ringSpeed,
      life: 1.0,
      decay: ringDecay,
    });

    // Scattered ejecta dots
    for (let i = 0; i < dotCount; i++) {
      const angle = Math.random() * PI2;
      const speed = 2 + Math.random() * 6;
      particlesRef.current.push({
        type: 'dot',
        x,
        y,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed,
        life: 1.0,
        decay: dotDecay + Math.random() * dotDecay,
      });
    }

    startLoop();
  };

  return (
    <div className="relative w-fit h-fit" onClick={handleClick}>
      <canvas
        ref={canvasRef}
        className="w-full h-full block absolute top-0 left-0 select-none pointer-events-none"
      />
      {children}
    </div>
  );
};

export default ClickSupernova;