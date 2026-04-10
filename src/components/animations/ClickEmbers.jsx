import { useRef, useEffect, useCallback } from 'react';

const ClickEmbers = ({
  strokeColor = '#fff',
  particleCount = 30,
  spreadSpeed = 5,
  minRiseSpeed = 3,
  maxRiseSpeed = 6,
  gravity = 0.15,
  trailLength = 1.5,
  lineWidth = 1.5,
  duration = 1800,
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

        // Apply gravity pulling ember back down
        p.vy += gravity;
        p.x += p.vx;
        p.y += p.vy;

        // Draw as a short streak from tail to head
        // tail is offset backward along velocity vector
        ctx.beginPath();
        ctx.moveTo(p.x, p.y);
        ctx.lineTo(
          p.x - p.vx * trailLength,
          p.y - p.vy * trailLength
        );
        ctx.lineWidth = lineWidth;
        ctx.strokeStyle = strokeColor;
        ctx.globalAlpha = alpha;
        ctx.stroke();
        ctx.globalAlpha = 1;

        return true;
      });

      animIdRef.current = requestAnimationFrame(draw);
    };

    animIdRef.current = requestAnimationFrame(draw);
    return () => cancelAnimationFrame(animIdRef.current);
  }, [strokeColor, duration, gravity, trailLength, lineWidth]);

  const handleClick = useCallback(
    (e) => {
      const canvas = canvasRef.current;
      if (!canvas) return;
      const rect = canvas.getBoundingClientRect();
      const cx = e.clientX - rect.left;
      const cy = e.clientY - rect.top;
      const now = performance.now();

      const newParticles = Array.from({ length: particleCount }, () => ({
        x: cx,
        y: cy,
        vx: (Math.random() - 0.5) * spreadSpeed,
        vy: -(minRiseSpeed + Math.random() * (maxRiseSpeed - minRiseSpeed)),
        startTime: now,
      }));

      particlesRef.current.push(...newParticles);
    },
    [particleCount, spreadSpeed, minRiseSpeed, maxRiseSpeed]
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

export default ClickEmbers;