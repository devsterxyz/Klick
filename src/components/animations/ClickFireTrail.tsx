import { useRef, useEffect, useCallback, ReactNode } from 'react';

type Particle = {
  cx: number;
  y: number;
  vy: number;
  phase: number;
  amp: number;
  size: number;
  startTime: number;
};

type ClickFireTrailProps = {
  fillColor?: string;
  particleCount?: number;
  minRiseSpeed?: number;
  maxRiseSpeed?: number;
  minAmplitude?: number;
  maxAmplitude?: number;
  minSize?: number;
  maxSize?: number;
  shrinkRate?: number;
  duration?: number;
  children?: ReactNode;
};

const ClickFireTrail = ({
  fillColor = '#fff',
  particleCount = 15,
  minRiseSpeed = 2,
  maxRiseSpeed = 4,
  minAmplitude = 2,
  maxAmplitude = 6,
  minSize = 2,
  maxSize = 4,
  shrinkRate = 0.03,
  duration = 1500,
  children,
}: ClickFireTrailProps) => {
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

        p.y += p.vy;

        const xOffset = Math.sin(p.phase + p.y * 0.05) * p.amp;

        p.size = Math.max(0, p.size - shrinkRate);

        ctx.beginPath();
        ctx.arc(p.cx + xOffset, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = fillColor;
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
  }, [fillColor, duration, shrinkRate]);

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
          cx,
          y: cy,
          vy: -(
            minRiseSpeed +
            Math.random() * (maxRiseSpeed - minRiseSpeed)
          ),
          phase: Math.random() * Math.PI * 2,
          amp:
            minAmplitude +
            Math.random() * (maxAmplitude - minAmplitude),
          size: minSize + Math.random() * (maxSize - minSize),
          startTime: now,
        })
      );

      particlesRef.current.push(...newParticles);
    },
    [
      particleCount,
      minRiseSpeed,
      maxRiseSpeed,
      minAmplitude,
      maxAmplitude,
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

export default ClickFireTrail;