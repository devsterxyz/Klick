import { useRef, useEffect, useCallback } from 'react';

const ClickWarp = ({
  textColor = '#fff',
  streakCount = 30,
  baseSpeed = 1,
  acceleration = 1.1,
  maxLineWidth = 4,
  duration = 1000,
  children,
}) => {
  const canvasRef = useRef(null);
  const particlesRef = useRef([]);
  const animIdRef = useRef(null);

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

    const draw = (timestamp) => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      particlesRef.current = particlesRef.current.filter((p) => {
        const elapsed = timestamp - p.startTime;
        if (elapsed >= duration) return false;

        const progress = elapsed / duration;
        const alpha = Math.max(0, 1 - progress);

        // Accelerate speed each frame using accel multiplier
        p.speed *= p.accel;

        const oldX = p.x + Math.cos(p.angle) * p.dist;
        const oldY = p.y + Math.sin(p.angle) * p.dist;
        p.dist += p.speed;
        const newX = p.x + Math.cos(p.angle) * p.dist;
        const newY = p.y + Math.sin(p.angle) * p.dist;

        const lineW = Math.min(maxLineWidth, p.speed * 0.15);

        ctx.beginPath();
        ctx.moveTo(oldX, oldY);
        ctx.lineTo(newX, newY);
        ctx.lineWidth = lineW;
        ctx.strokeStyle = textColor;
        ctx.globalAlpha = alpha;
        ctx.stroke();
        ctx.globalAlpha = 1;

        return true;
      });

      animIdRef.current = requestAnimationFrame(draw);
    };

    animIdRef.current = requestAnimationFrame(draw);
    return () => cancelAnimationFrame(animIdRef.current);
  }, [textColor, duration, maxLineWidth]);

  const handleClick = useCallback(
    (e) => {
      const canvas = canvasRef.current;
      if (!canvas) return;
      const rect = canvas.getBoundingClientRect();
      const cx = e.clientX - rect.left;
      const cy = e.clientY - rect.top;
      const now = performance.now();

      const newParticles = Array.from({ length: streakCount }, () => ({
        x: cx,
        y: cy,
        angle: Math.random() * Math.PI * 2,
        dist: 5,
        speed: baseSpeed + Math.random() * baseSpeed,
        accel: acceleration + Math.random() * 0.1,
        startTime: now,
      }));

      particlesRef.current.push(...newParticles);
    },
    [streakCount, baseSpeed, acceleration]
  );

  return (
    <div className="relative w-fit h-fit" onClick={handleClick}>
      <canvas
        ref={canvasRef}
        className="absolute top-0 left-0 w-full h-full pointer-events-none select-none"
      />
      {children}
    </div>
  );
};

export default ClickWarp;