import { useRef, useEffect, ReactNode } from 'react';

type Heart = {
  x: number;
  y: number;
  vy: number;
  size: number;
  phase: number;
  life: number;
  decay: number;
};

type ClickHeartProps = {
  count?: number;
  speedMin?: number;
  speedMax?: number;
  sizeMin?: number;
  sizeMax?: number;
  decay?: number;
  children?: ReactNode;
};

const ClickHeart = ({
  count = 5,
  speedMin = 2,
  speedMax = 4,
  sizeMin = 18,
  sizeMax = 28,
  decay = 0.02,
  children,
}: ClickHeartProps) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const heartsRef = useRef<Heart[]>([]);
  const isRunningRef = useRef<boolean>(false);
  const animationIdRef = useRef<number | null>(null);
  const lastClickRef = useRef<number>(0);

  const MAX_PARTICLES = 120;
  const CLICK_DELAY = 60;

  useEffect(() => {
    const canvas = canvasRef.current;
    const parent = canvas?.parentElement;
    if (!canvas || !parent) return;

    const resize = () => {
      const { width, height } = parent.getBoundingClientRect();
      canvas.width = width;
      canvas.height = height;
    };

    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(parent);

    return () => ro.disconnect();
  }, []);

  const drawHeart = (ctx: CanvasRenderingContext2D, size: number) => {
    const s = size / 10;
    ctx.beginPath();
    ctx.moveTo(0, -s * 2);
    ctx.bezierCurveTo(s * 4, -s * 6, s * 8, 0, 0, s * 4);
    ctx.bezierCurveTo(-s * 8, 0, -s * 4, -s * 6, 0, -s * 2);
    ctx.closePath();
  };

  const startLoop = () => {
    if (isRunningRef.current) return;
    isRunningRef.current = true;

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const draw = () => {
      if (heartsRef.current.length === 0) {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        isRunningRef.current = false;
        return;
      }

      ctx.clearRect(0, 0, canvas.width, canvas.height);

      const hearts = heartsRef.current;
      let writeIndex = 0;

      for (let i = 0; i < hearts.length; i++) {
        const p = hearts[i];

        p.life -= p.decay;
        if (p.life <= 0) continue;

        p.y -= p.vy;
        p.x += Math.sin(p.phase + p.life * 10) * 1.5;

        ctx.save();
        ctx.globalAlpha = p.life;
        ctx.translate(p.x, p.y);

        ctx.font = `${p.size}px Arial`;
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText('❤️', 0, 0);

        ctx.restore();

        hearts[writeIndex++] = p;
      }

      hearts.length = writeIndex;
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
    const now = performance.now();
    if (now - lastClickRef.current < CLICK_DELAY) return;
    lastClickRef.current = now;

    const canvas = canvasRef.current;
    if (!canvas) return;

    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    if (heartsRef.current.length > MAX_PARTICLES) {
      heartsRef.current.splice(0, count);
    }

    for (let i = 0; i < count; i++) {
      heartsRef.current.push({
        x: x + (Math.random() - 0.5) * 30,
        y,
        vy: speedMin + Math.random() * (speedMax - speedMin),
        size: sizeMin + Math.random() * (sizeMax - sizeMin),
        phase: Math.random() * Math.PI * 2,
        life: 1,
        decay,
      });
    }

    startLoop();
  };

  return (
    <div className="relative w-fit h-fit" onClick={handleClick}>
      <canvas
        ref={canvasRef}
        className="absolute top-0 left-0 w-full h-full pointer-events-none z-10"
      />
      {children}
    </div>
  );
};

export default ClickHeart;