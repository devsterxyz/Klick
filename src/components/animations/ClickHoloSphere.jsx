import { useRef, useEffect, useCallback } from 'react';

const ClickHoloSphere = ({
  dotColor = '#fff',
  pointCount = 40,
  maxSize = 40,
  growSpeed = 2,
  rotSpeedX = 0.02,
  rotSpeedY = 0.03,
  dotSize = 1.5,
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

        // Grow sphere up to maxSize
        if (p.size < maxSize) p.size += growSpeed;

        // Advance rotation
        p.rotX += rotSpeedX;
        p.rotY += rotSpeedY;

        // Project each 3D surface point to 2D
        for (const [sx, sy, sz] of p.pts) {
          // Rotate X axis
          const py = sy * Math.cos(p.rotX) - sz * Math.sin(p.rotX);
          const pz = sy * Math.sin(p.rotX) + sz * Math.cos(p.rotX);
          // Rotate Y axis
          const px = sx * Math.cos(p.rotY) - pz * Math.sin(p.rotY);

          // Depth-based opacity: pz in [-1,1] → alpha ramp
          const depth = (pz + 1) / 2;

          ctx.fillStyle = dotColor;
          ctx.globalAlpha = alpha * depth;
          ctx.fillRect(
            p.x + px * p.size,
            p.y + py * p.size,
            dotSize,
            dotSize
          );
        }

        ctx.globalAlpha = 1;
        return true;
      });

      animIdRef.current = requestAnimationFrame(draw);
    };

    animIdRef.current = requestAnimationFrame(draw);
    return () => cancelAnimationFrame(animIdRef.current);
  }, [dotColor, duration, maxSize, growSpeed, rotSpeedX, rotSpeedY, dotSize]);

  const handleClick = useCallback(
    (e) => {
      const canvas = canvasRef.current;
      if (!canvas) return;
      const rect = canvas.getBoundingClientRect();
      const cx = e.clientX - rect.left;
      const cy = e.clientY - rect.top;
      const now = performance.now();

      // Distribute points evenly on sphere surface using
      // spherical coordinates with uniform random sampling
      const pts = Array.from({ length: pointCount }, () => {
        const theta = Math.random() * Math.PI * 2;
        const phi = Math.acos(2 * Math.random() - 1);
        return [
          Math.cos(theta) * Math.sin(phi),
          Math.cos(phi),
          Math.sin(theta) * Math.sin(phi),
        ];
      });

      particlesRef.current.push({
        x: cx,
        y: cy,
        pts,
        size: 0,
        rotX: 0,
        rotY: 0,
        startTime: now,
      });
    },
    [pointCount]
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

export default ClickHoloSphere;