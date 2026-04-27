import { useRef, useEffect, ReactNode } from 'react';

type Bullet = {
  x: number;
  y: number;
  originX: number;
  originY: number;
  angle: number;
  speed: number;
  friction: number;
  size: number;
  life: number;
  decay: number;
};

type ClickBulletTimeProps = {
  count?: number;
  speedMin?: number;
  speedMax?: number;
  friction?: number;
  decay?: number;
  maxRadius?: number;
  children?: ReactNode;
};

const ClickBulletTime = ({
  count = 15,
  speedMin = 8,
  speedMax = 14,
  friction = 0.92,
  decay = 0.015,
  maxRadius = 80,
  children,
}: ClickBulletTimeProps) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const bulletsRef = useRef<Bullet[]>([]);
  const isRunningRef = useRef<boolean>(false);
  const animationIdRef = useRef<number | null>(null);
  const lastClickRef = useRef<number>(0);

  const MAX_PARTICLES = 150;
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

  const startLoop = () => {
    if (isRunningRef.current) return;
    isRunningRef.current = true;

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const draw = () => {
      if (bulletsRef.current.length === 0) {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        isRunningRef.current = false;
        return;
      }

      ctx.clearRect(0, 0, canvas.width, canvas.height);

      const bullets = bulletsRef.current;
      let writeIndex = 0;

      for (let i = 0; i < bullets.length; i++) {
        const p = bullets[i];

        p.life -= p.decay;
        if (p.life <= 0) continue;

        p.speed *= p.friction;
        p.x += Math.cos(p.angle) * p.speed;
        p.y += Math.sin(p.angle) * p.speed;

        const dx = p.x - p.originX;
        const dy = p.y - p.originY;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist > maxRadius) continue;

        const alpha = p.life;

        ctx.globalAlpha = alpha;
        ctx.strokeStyle = '#fff';
        ctx.lineWidth = p.size * p.life;
        ctx.lineCap = 'round';
        ctx.beginPath();
        ctx.moveTo(p.x, p.y);
        ctx.lineTo(
          p.x - Math.cos(p.angle) * p.speed * 2.5,
          p.y - Math.sin(p.angle) * p.speed * 2.5
        );
        ctx.stroke();

        if (p.life > 0.5) {
          ctx.globalAlpha = p.life * 0.3;
          ctx.lineWidth = 0.5;
          ctx.beginPath();
          ctx.arc(p.x, p.y, (1 - p.life) * 30, 0, Math.PI * 2);
          ctx.stroke();
        }

        ctx.globalAlpha = alpha;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size * 0.8, 0, Math.PI * 2);
        ctx.fill();

        bullets[writeIndex++] = p;
      }

      bullets.length = writeIndex;
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

    const PI2 = Math.PI * 2;

    if (bulletsRef.current.length > MAX_PARTICLES) {
      bulletsRef.current.splice(0, count);
    }

    for (let i = 0; i < count; i++) {
      const angle = Math.random() * PI2;
      const speed = speedMin + Math.random() * (speedMax - speedMin);

      bulletsRef.current.push({
        x,
        y,
        originX: x,
        originY: y,
        angle,
        speed,
        friction,
        size: 1.5 + Math.random() * 1.5,
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

export default ClickBulletTime;