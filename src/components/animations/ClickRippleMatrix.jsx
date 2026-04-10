import { useRef, useEffect, useCallback } from 'react';

const ClickRippleMatrix = ({
  dotColor = '#fff',
  gridRadius = 3,
  gridSpacing = 15,
  waveSpeed = 0.2,
  maxDotRadius = 3,
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

        // Advance wave phase outward each frame
        p.phase -= waveSpeed;

        for (let ix = -gridRadius; ix <= gridRadius; ix++) {
          for (let iy = -gridRadius; iy <= gridRadius; iy++) {
            // Distance from grid center in grid units
            const dist = Math.sqrt(ix * ix + iy * iy);

            // Sine wave radiating from center — dist offsets phase
            // so the ripple travels outward over time
            const size = Math.max(
              0,
              Math.sin(dist * 1 - p.phase) * maxDotRadius * alpha
            );

            if (size <= 0) continue;

            ctx.beginPath();
            ctx.arc(
              p.x + ix * gridSpacing,
              p.y + iy * gridSpacing,
              size,
              0,
              Math.PI * 2
            );
            ctx.fillStyle = dotColor;
            ctx.globalAlpha = alpha;
            ctx.fill();
          }
        }

        ctx.globalAlpha = 1;
        return true;
      });

      animIdRef.current = requestAnimationFrame(draw);
    };

    animIdRef.current = requestAnimationFrame(draw);
    return () => cancelAnimationFrame(animIdRef.current);
  }, [dotColor, duration, gridRadius, gridSpacing, waveSpeed, maxDotRadius]);

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
        phase: 0,
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

export default ClickRippleMatrix;