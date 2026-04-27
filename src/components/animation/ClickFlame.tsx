import { useRef, useEffect, useCallback, ReactNode } from 'react';

type Particle = {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  startTime: number;
};

type ClickFlameProps = {
  dotColor?: string;
  particleCount?: number;
  spreadX?: number;
  spreadY?: number;
  minRiseSpeed?: number;
  maxRiseSpeed?: number;
  driftSpeed?: number;
  shrinkRate?: number;
  minSize?: number;
  maxSize?: number;
  duration?: number;
  children?: ReactNode;
};

const ClickFlame = ({
  dotColor = 'orange',
  particleCount = 25,
  spreadX = 20,
  spreadY = 10,
  minRiseSpeed = 1,
  maxRiseSpeed = 3,
  driftSpeed = 1.5,
  shrinkRate = 0.05,
  minSize = 2,
  maxSize = 4,
  duration = 1200,
  children,
}: ClickFlameProps) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const particlesRef = useRef<Particle[]>([]);
  const animIdRef = useRef<number | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const parent = canvas.parentElement;
    if (!parent) return;

    const resize = () => {
      const { width, height } = parent.getBoundingClientRect();
      if (canvas.width !== width || canvas.height !== height) {
        canvas.width = width;
        canvas.height = height;
      }
    };

    const ro = new ResizeObserver(resize);
    ro.observe(parent);
    resize();

    return () => ro.disconnect();
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

        p.x += p.vx;
        p.y += p.vy;

        p.size = Math.max(0, p.size - shrinkRate);

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
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
  }, [dotColor, duration, shrinkRate]);

  const handleClick = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      const canvas = canvasRef.current;
      if (!canvas) return;
      const rect = canvas.getBoundingClientRect();
      const cx = e.clientX - rect.left;
      const cy = e.clientY - rect.top;
      const now = performance.now();

      const newParticles: Particle[] = Array.from(
        { length: particleCount },
        () => ({
          x: cx + (Math.random() - 0.5) * spreadX,
          y: cy + (Math.random() - 0.5) * spreadY,
          vx: (Math.random() - 0.5) * driftSpeed,
          vy: -(
            minRiseSpeed +
            Math.random() * (maxRiseSpeed - minRiseSpeed)
          ),
          size: minSize + Math.random() * (maxSize - minSize),
          startTime: now,
        })
      );

      particlesRef.current.push(...newParticles);
    },
    [
      particleCount,
      spreadX,
      spreadY,
      minRiseSpeed,
      maxRiseSpeed,
      driftSpeed,
      minSize,
      maxSize,
    ]
  );

  return (
    <div className="relative w-fit h-fit" onClick={handleClick}>
      <canvas
        ref={canvasRef}
        className="absolute top-0 left-0 w-full h-full pointer-events-none select-none z-10"
      />
      {children}
    </div>
  );
};

export default ClickFlame;