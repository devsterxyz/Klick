import { useRef, useEffect, useCallback } from 'react';

const ClickQuantum = ({
  strokeColor = '#fff',
  particleCount = 15,
  spreadRadius = 80,
  crossSize = 3,
  teleportInterval = 10,
  duration = 1500,
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

        // Count down timer; teleport to new random position when it hits 0
        p.timer--;
        if (p.timer <= 0) {
          p.x = p.cx + (Math.random() - 0.5) * spreadRadius;
          p.y = p.cy + (Math.random() - 0.5) * spreadRadius;
          p.timer = Math.random() * teleportInterval;
        }

        // Draw cross / plus symbol at current position
        ctx.beginPath();
        ctx.moveTo(p.x - crossSize, p.y);
        ctx.lineTo(p.x + crossSize, p.y);
        ctx.moveTo(p.x, p.y - crossSize);
        ctx.lineTo(p.x, p.y + crossSize);
        ctx.lineWidth = 1;
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
  }, [strokeColor, duration, crossSize, teleportInterval, spreadRadius]);

  const handleClick = useCallback(
    (e) => {
      const canvas = canvasRef.current;
      if (!canvas) return;
      const rect = canvas.getBoundingClientRect();
      const cx = e.clientX - rect.left;
      const cy = e.clientY - rect.top;
      const now = performance.now();

      const newParticles = Array.from({ length: particleCount }, () => ({
        cx,
        cy,
        x: cx,
        y: cy,
        timer: Math.random() * teleportInterval,
        startTime: now,
      }));

      particlesRef.current.push(...newParticles);
    },
    [particleCount, teleportInterval]
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

export default ClickQuantum;