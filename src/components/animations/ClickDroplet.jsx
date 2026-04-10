import { useRef, useEffect, useCallback } from 'react';

const ClickDroplet = ({
  dotColor = '#fff',
  dropSpeed = 5,
  splashCount = 6,
  splashSpeed = 4,
  ringSpeed = 2,
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

        if (p.state === 0) {
          // Phase 1: falling drop
          p.vy += 0.5; // gravity
          p.y += p.vy;

          // Draw teardrop as a circle
          ctx.beginPath();
          ctx.arc(p.x, p.y, 2, 0, Math.PI * 2);
          ctx.fillStyle = dotColor;
          ctx.globalAlpha = alpha;
          ctx.fill();
          ctx.globalAlpha = 1;

          // Hit the target y — switch to splash phase
          if (p.y >= p.targetY) {
            p.y = p.targetY;
            p.state = 1;

            // Spawn splash particles at impact point
            p.splash = Array.from({ length: splashCount }, () => ({
              x: p.x,
              y: p.targetY,
              vx: (Math.random() - 0.5) * splashSpeed,
              vy: -1 - Math.random() * splashSpeed,
            }));
          }
        } else {
          // Phase 2: expanding ring + splash droplets

          // Expand ring
          p.ringR += ringSpeed;
          ctx.beginPath();
          ctx.arc(p.x, p.targetY, p.ringR, 0, Math.PI * 2);
          ctx.strokeStyle = dotColor;
          ctx.lineWidth = 1;
          ctx.globalAlpha = alpha;
          ctx.stroke();

          // Animate splash droplets
          for (const s of p.splash) {
            s.vy += 0.2; // splash gravity
            s.x += s.vx;
            s.y += s.vy;

            ctx.beginPath();
            ctx.arc(s.x, s.y, 1.5, 0, Math.PI * 2);
            ctx.fillStyle = dotColor;
            ctx.globalAlpha = alpha;
            ctx.fill();
          }

          ctx.globalAlpha = 1;
        }

        return true;
      });

      animIdRef.current = requestAnimationFrame(draw);
    };

    animIdRef.current = requestAnimationFrame(draw);
    return () => cancelAnimationFrame(animIdRef.current);
  }, [dotColor, duration, splashCount, splashSpeed, ringSpeed]);

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
        // Drop starts above the click point
        y: 0,
        vy: dropSpeed,
        targetY: cy,
        state: 0,
        ringR: 0,
        splash: [],
        startTime: now,
      });
    },
    [dropSpeed]
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

export default ClickDroplet;