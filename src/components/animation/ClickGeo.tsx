import { useRef, useEffect, ReactNode } from 'react';

type ShapeType = 'square' | 'triangle';

type Shape = {
  shape: ShapeType;
  x: number;
  y: number;
  r: number;
  vr: number;
  rot: number;
  vrot: number;
  life: number;
  decay: number;
};

type ClickGeoProps = {
  color?: string;
  lineWidth?: number;
  children?: ReactNode;
};

const ClickGeo = ({
  color = '#fff',
  lineWidth = 1,
  children,
}: ClickGeoProps) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const shapesRef = useRef<Shape[]>([]);
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
      if (shapesRef.current.length === 0) {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        isRunningRef.current = false;
        return;
      }

      ctx.clearRect(0, 0, canvas.width, canvas.height);

      shapesRef.current = shapesRef.current.filter((p) => {
        p.life -= p.decay;
        if (p.life <= 0) return false;

        p.r += p.vr;
        p.rot += p.vrot;

        ctx.globalAlpha = Math.max(0, p.life);
        ctx.strokeStyle = color;
        ctx.lineWidth = lineWidth;

        ctx.save();
        ctx.translate(p.x, p.y);
        ctx.rotate(p.rot);

        ctx.beginPath();
        if (p.shape === 'square') {
          ctx.rect(-p.r, -p.r, p.r * 2, p.r * 2);
        } else {
          ctx.moveTo(0, -p.r);
          ctx.lineTo(p.r, p.r);
          ctx.lineTo(-p.r, p.r);
          ctx.closePath();
        }
        ctx.stroke();

        ctx.restore();
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

    shapesRef.current.push(
      {
        shape: 'square',
        x,
        y,
        r: 0,
        vr: 1,
        rot: 0,
        vrot: 0.02,
        life: 1.0,
        decay: 0.015,
      },
      {
        shape: 'triangle',
        x,
        y,
        r: 0,
        vr: 1.5,
        rot: 0,
        vrot: -0.03,
        life: 1.0,
        decay: 0.015,
      }
    );

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

export default ClickGeo;