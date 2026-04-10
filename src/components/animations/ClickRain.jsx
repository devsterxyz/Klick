import { useRef, useEffect, useCallback } from 'react';

const ClickRain = ({
  strokeColor = '#fff',
  dropCount = 15,
  fallSpeed = 5,
  maxExtraSpeed = 3,
  spreadX = 120,
  streakHeight = 15,
  rippleSpeed = 1.5,
  rippleSquish = 0.4,
  duration = 2000,
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

        if (!p.hit) {
          // Phase 1: falling streak
          p.y += p.vy;

          ctx.beginPath();
          ctx.moveTo(p.x, p.y - streakHeight);
          ctx.lineTo(p.x, p.y);
          ctx.strokeStyle = strokeColor;
          ctx.lineWidth = 1;
          ctx.globalAlpha = alpha;
          ctx.stroke();
          ctx.globalAlpha = 1;

          // Hit surface
          if (p.y >= p.targetY) {
            p.hit = true;
            p.y = p.targetY;
            p.r = 0;
          }
        } else {
          // Phase 2: elliptical ripple expanding outward
          p.r += rippleSpeed;
          // Faster decay once hit so ripple doesnt linger too long
          const rippleAlpha = Math.max(0, alpha - progress * 0.5);

          ctx.beginPath();
          ctx.ellipse(
            p.x,
            p.targetY,
            p.r,
            p.r * rippleSquish,
            0,
            0,
            Math.PI * 2
          );
          ctx.strokeStyle = strokeColor;
          ctx.lineWidth = 1;
          ctx.globalAlpha = rippleAlpha;
          ctx.stroke();
          ctx.globalAlpha = 1;
        }

        return true;
      });

      animIdRef.current = requestAnimationFrame(draw);
    };

    animIdRef.current = requestAnimationFrame(draw);
    return () => cancelAnimationFrame(animIdRef.current);
  }, [strokeColor, duration, streakHeight, rippleSpeed, rippleSquish]);

  const handleClick = useCallback(
    (e) => {
      const canvas = canvasRef.current;
      if (!canvas) return;
      const rect = canvas.getBoundingClientRect();
      const cx = e.clientX - rect.left;
      const cy = e.clientY - rect.top;
      const now = performance.now();

      const newParticles = Array.from({ length: dropCount }, () => ({
        // Spread drops horizontally around click point
        x: cx + (Math.random() - 0.5) * spreadX,
        // Start above the canvas top so drops visibly fall in
        y: cy - 80 - Math.random() * 50,
        targetY: cy + (Math.random() - 0.5) * 40,
        vy: fallSpeed + Math.random() * maxExtraSpeed,
        hit: false,
        r: 0,
        startTime: now,
      }));

      particlesRef.current.push(...newParticles);
    },
    [dropCount, fallSpeed, maxExtraSpeed, spreadX]
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

export default ClickRain;