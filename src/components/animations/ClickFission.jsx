import { useRef, useEffect, useCallback } from 'react';

const ClickFission = ({
  fillColor = '#fff',
  duration = 1500,
  maxSpread = 40,
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

        // Three stages based on life remaining:
        // stage 1 (life > 0.6): 1 large circle at center
        // stage 2 (life > 0.3): 3 medium circles spreading out
        // stage 3 (life <= 0.3): 9 small circles spreading further
        const life = 1 - progress;

        let splits, radius, spread;
        if (life > 0.6) {
          splits = 1;
          radius = 8;
          spread = 0;
        } else if (life > 0.3) {
          splits = 3;
          radius = 4;
          spread = (1 - life) * maxSpread;
        } else {
          splits = 9;
          radius = 2;
          spread = (1 - life) * maxSpread;
        }

        // Spin angle so fragments rotate as they spread
        const spinAngle = life * 5;

        for (let i = 0; i < splits; i++) {
          const angle = i * ((Math.PI * 2) / splits) + spinAngle;
          const sx = p.x + (splits > 1 ? Math.cos(angle) * spread : 0);
          const sy = p.y + (splits > 1 ? Math.sin(angle) * spread : 0);

          ctx.beginPath();
          ctx.arc(sx, sy, radius, 0, Math.PI * 2);
          ctx.fillStyle = fillColor;
          ctx.globalAlpha = alpha;
          ctx.fill();
        }

        ctx.globalAlpha = 1;
        return true;
      });

      animIdRef.current = requestAnimationFrame(draw);
    };

    animIdRef.current = requestAnimationFrame(draw);
    return () => cancelAnimationFrame(animIdRef.current);
  }, [fillColor, duration, maxSpread]);

  const handleClick = useCallback(
    (e) => {
      const canvas = canvasRef.current;
      if (!canvas) return;
      const rect = canvas.getBoundingClientRect();
      const cx = e.clientX - rect.left;
      const cy = e.clientY - rect.top;
      const now = performance.now();

      particlesRef.current.push({
        x: cx,
        y: cy,
        startTime: now,
      });
    },
    []
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

export default ClickFission;