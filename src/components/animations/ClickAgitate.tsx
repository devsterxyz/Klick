import { useRef, useEffect, useCallback, ReactNode } from 'react';

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
  minSpeed?: number;
  maxSpeed?: number;
  jitterAmp?: number;
  jitterDecay?: number;
  trailOpacity?: number;
  duration?: number;
  children?: ReactNode;
};

const ClickAgitate = ({
  strokeColor = '#fff',
  particleCount = 25,
  minSpeed = 2,
  maxSpeed = 6,
  jitterAmp = 12,
  jitterDecay = 0.95,
  trailOpacity = 0.5,
  duration = 1500,
  children,
}: ClickAgitateProps) => {
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

        p.amp *= jitterDecay;

        const jx = p.x + (Math.random() - 0.5) * p.amp;
        const jy = p.y + (Math.random() - 0.5) * p.amp;

        ctx.fillStyle = strokeColor;
        ctx.globalAlpha = alpha;
        ctx.fillRect(jx, jy, 2, 2);

        ctx.beginPath();
        ctx.moveTo(jx, jy);
        ctx.lineTo(
          jx - p.vx * 2 + (Math.random() - 0.5) * p.amp,
          jy - p.vy * 2 + (Math.random() - 0.5) * p.amp
        );
        ctx.lineWidth = 1;
        ctx.strokeStyle = strokeColor;
        ctx.globalAlpha = alpha * trailOpacity;
        ctx.stroke();
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
  }, [strokeColor, duration, jitterDecay, trailOpacity]);

  const handleClick = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      const canvas = canvasRef.current;
      if (!canvas) return;
      const rect = canvas.getBoundingClientRect();
      const cx = e.clientX - rect.left;
      const cy = e.clientY - rect.top;
      const now = performance.now();

      const newParticles: Particle[] = Array.from({ length: particleCount }, () => {
        const angle = Math.random() * Math.PI * 2;
        const speed = minSpeed + Math.random() * (maxSpeed - minSpeed);
        return {
          x: cx,
          y: cy,
          vx: Math.cos(angle) * speed,
          vy: Math.sin(angle) * speed,
          amp: jitterAmp,
          startTime: now,
        };
      });

      particlesRef.current.push(...newParticles);
    },
    [particleCount, minSpeed, maxSpeed, jitterAmp]
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

export default ClickAgitate;