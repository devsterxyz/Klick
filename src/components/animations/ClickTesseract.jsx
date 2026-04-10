import { useRef, useEffect, useCallback } from 'react';

const ClickTesseract = ({
  strokeColor = '#fff',
  maxSize = 40,
  growSpeed = 2.5,
  rotSpeedX = 0.02,
  rotSpeedY = 0.03,
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

    const NODES = [
      [-1, -1, -1], [1, -1, -1], [1, 1, -1], [-1, 1, -1],
      [-1, -1,  1], [1, -1,  1], [1, 1,  1], [-1, 1,  1],
    ];

    const EDGES = [
      [0, 1], [1, 2], [2, 3], [3, 0],
      [4, 5], [5, 6], [6, 7], [7, 4],
      [0, 4], [1, 5], [2, 6], [3, 7],
    ];

    const draw = (timestamp) => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      particlesRef.current = particlesRef.current.filter((p) => {
        const elapsed = timestamp - p.startTime;
        if (elapsed >= duration) return false;

        const progress = elapsed / duration;
        const alpha = Math.max(0, 1 - progress);

        // Grow cube up to maxSize
        if (p.size < maxSize) p.size += growSpeed;

        // Advance rotation
        p.rotX += rotSpeedX;
        p.rotY += rotSpeedY;

        // Project each 3D node to 2D with Y then X rotation
        const proj = NODES.map(([nx, ny, nz]) => {
          // Rotate Y
          const x1 = nx * Math.cos(p.rotY) - nz * Math.sin(p.rotY);
          const z1 = nx * Math.sin(p.rotY) + nz * Math.cos(p.rotY);
          const y1 = ny;
          // Rotate X
          const y2 = y1 * Math.cos(p.rotX) - z1 * Math.sin(p.rotX);
          const x2 = x1;

          return [p.x + x2 * p.size, p.y + y2 * p.size];
        });

        ctx.beginPath();
        for (const [a, b] of EDGES) {
          ctx.moveTo(proj[a][0], proj[a][1]);
          ctx.lineTo(proj[b][0], proj[b][1]);
        }
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
  }, [strokeColor, duration, maxSize, growSpeed, rotSpeedX, rotSpeedY]);

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
        size: 0,
        rotX: Math.random() * Math.PI * 2,
        rotY: Math.random() * Math.PI * 2,
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

export default ClickTesseract;