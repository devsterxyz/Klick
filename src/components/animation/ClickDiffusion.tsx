import { useRef, useEffect, ReactNode } from 'react';

interface DiffusionPoint {
  x: number;
  y: number;
  tx: number;
  ty: number;
  life: number;
  decay: number;
}

interface DiffusionSystem {
  points: DiffusionPoint[];
  life: number;
  decay: number;
}

interface ClickDiffusionProps {
  color?: string;
  dotSize?: number;
  count?: number;
  decay?: number;
  radius?: number;
  easeSpeed?: number;
  children?: ReactNode;
}

const ClickDiffusion = ({
  color = '#fff',
  dotSize = 1.5,
  count = 30,
  decay = 0.015,
  radius = 25,
  easeSpeed = 0.1,
  children,
}: ClickDiffusionProps) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const systemsRef = useRef<DiffusionSystem[]>([]);
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
      if (systemsRef.current.length === 0) {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        isRunningRef.current = false;
        return;
      }

      ctx.clearRect(0, 0, canvas.width, canvas.height);

      systemsRef.current = systemsRef.current.filter((sys: DiffusionSystem) => {
        sys.life -= sys.decay;
        if (sys.life <= 0) return false;

        ctx.globalAlpha = Math.max(0, sys.life);
        ctx.fillStyle = color;

        for (const p of sys.points) {
          // Ease each point toward its target on the ring
          p.x += (p.tx - p.x) * easeSpeed;
          p.y += (p.ty - p.y) * easeSpeed;

          ctx.beginPath();
          ctx.arc(p.x, p.y, dotSize, 0, Math.PI * 2);
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
    const cx = e.clientX - rect.left;
    const cy = e.clientY - rect.top;

    const PI2 = Math.PI * 2;
    const points: DiffusionPoint[] = [];

    for (let i = 0; i < count; i++) {
      // Targets are evenly spaced on a ring
      const angle = (i / count) * PI2;
      points.push({
        // Start scattered randomly around click point
        x: cx + (Math.random() - 0.5) * 100,
        y: cy + (Math.random() - 0.5) * 100,
        // Converge to ring
        tx: cx + Math.cos(angle) * radius,
        ty: cy + Math.sin(angle) * radius,
        life: 1.0,
        decay,
      });
    }

    systemsRef.current.push({
      points,
      life: 1.0,
      decay,
    });

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

export default ClickDiffusion;