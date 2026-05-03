import { useRef, useEffect, ReactNode } from 'react';

interface Ring {
  x: number;
  y: number;
  r: number;
  vr: number;
  life: number;
  decay: number;
}

interface ClickDoubleSonarProps {
  color?: string;
  lineWidth?: number;
  speed?: number;
  decay?: number;
  gap?: number;
  children?: ReactNode;
}

const ClickDoubleSonar = ({
  color = '#fff',
  lineWidth = 2,
  speed = 2,
  decay = 0.02,
  gap = 15,
  children,
}: ClickDoubleSonarProps) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const ringsRef = useRef<Ring[]>([]);
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
      if (ringsRef.current.length === 0) {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        isRunningRef.current = false;
        return;
      }

      ctx.clearRect(0, 0, canvas.width, canvas.height);

      ringsRef.current = ringsRef.current.filter((p: Ring) => {
        p.life -= p.decay;
        if (p.life <= 0) return false;

        p.r += p.vr;

        if (p.r > 0) {
          ctx.globalAlpha = Math.max(0, p.life);
          ctx.strokeStyle = color;
          ctx.lineWidth = lineWidth;
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
          ctx.stroke();
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

    // First ring — starts at 0
    ringsRef.current.push({
      x,
      y,
      r: 0,
      vr: speed,
      life: 1.0,
      decay,
    });

    // Second ring — starts with a negative radius to create a delayed effect
    ringsRef.current.push({
      x,
      y,
      r: -gap,
      vr: speed,
      life: 1.0,
      decay,
    });

    startLoop();
  };

  return (
    <div className="relative w-fit h-fit" onClick={handleClick}>
      <canvas
        ref={canvasRef}
        className="w-full h-full block absolute top-0 left-0 select-none pointer-events-none z-10"
      />
      {children}
    </div>
  );
};

export default ClickDoubleSonar;