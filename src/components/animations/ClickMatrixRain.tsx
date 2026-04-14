import { useRef, useEffect, useCallback, ReactNode } from 'react';

type Particle = {
  x: number;
  y: number;
  vy: number;
  startTime: number;
};

type ClickMatrixRainProps = {
  textColor?: string;
  columnCount?: number;
  fallSpeed?: number;
  trailLength?: number;
  fontSize?: number;
  duration?: number;
  spreadRadius?: number;
  children?: ReactNode;
};

const ClickMatrixRain = ({
  textColor = '#fff',
  columnCount = 10,
  fallSpeed = 3,
  trailLength = 8,
  fontSize = 14,
  duration = 1200,
  spreadRadius = 120,
  children,
}: ClickMatrixRainProps) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const particlesRef = useRef<Particle[]>([]);
  const animIdRef = useRef<number | null>(null);

  const KATA =
    'ｱｲｳｴｵｶｷｸｹｺｻｼｽｾｿﾀﾁﾂﾃﾄﾅﾆﾇﾈﾉﾊﾋﾌﾍﾎﾏﾐﾑﾒﾓﾔﾕﾖﾗﾘﾙﾚﾛﾜﾝ0123456789';

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
      ctx.font = `${fontSize}px monospace`;
      ctx.textAlign = 'center';

      particlesRef.current = particlesRef.current.filter((p) => {
        const elapsed = timestamp - p.startTime;
        if (elapsed >= duration) return false;

        const progress = elapsed / duration;

        const traveled = p.vy * (elapsed / 16.67);
        const headY = p.y + traveled;

        for (let j = 0; j < trailLength; j++) {
          const charY = headY - j * (fontSize + 2);
          const trailAlpha = Math.max(
            0,
            (1 - j / trailLength) * (1 - progress)
          );

          if (j === 0) {
            ctx.fillStyle = textColor;
            ctx.globalAlpha = trailAlpha;
          } else {
            ctx.fillStyle = textColor;
            ctx.globalAlpha = trailAlpha * 0.8;
          }

          const char =
            KATA[Math.floor(Math.random() * KATA.length)];
          ctx.fillText(char, p.x, charY);
        }

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
  }, [textColor, fontSize, trailLength, duration, KATA]);

  const handleClick = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      const canvas = canvasRef.current;
      if (!canvas) return;
      const rect = canvas.getBoundingClientRect();
      const cx = e.clientX - rect.left;
      const cy = e.clientY - rect.top;
      const now = performance.now();

      const newParticles: Particle[] = Array.from(
        { length: columnCount },
        (_, i) => ({
          x: cx + (Math.random() - 0.5) * spreadRadius,
          y: cy - Math.random() * 50,
          vy: fallSpeed + Math.random() * (fallSpeed * 0.7),
          startTime: now + i * 30,
        })
      );

      particlesRef.current.push(...newParticles);
    },
    [columnCount, fallSpeed, spreadRadius]
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

export default ClickMatrixRain;