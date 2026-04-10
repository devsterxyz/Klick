import { useRef, useEffect, useCallback } from 'react';

const ClickFireTrail = ({
  fillColor = '#fff',
  particleCount = 15,
  minRiseSpeed = 2,
  maxRiseSpeed = 4,
  minAmplitude = 2,
  maxAmplitude = 6,
  minSize = 2,
  maxSize = 4,
  shrinkRate = 0.03,
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

        // Rise upward each frame
        p.y += p.vy;

        // Horizontal oscillation driven by sine wave
        // phase offset + y position creates the weaving motion
        const xOffset = Math.sin(p.phase + p.y * 0.05) * p.amp;

        // Shrink size as particle climbs
        p.size = Math.max(0, p.size - shrinkRate);

        ctx.beginPath();
        ctx.arc(p.cx + xOffset, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = fillColor;
        ctx.globalAlpha = alpha;
        ctx.fill();
        ctx.globalAlpha = 1;

        return true;
      });

      animIdRef.current = requestAnimationFrame(draw);
    };

    animIdRef.current = requestAnimationFrame(draw);
    return () => cancelAnimationFrame(animIdRef.current);
  }, [fillColor, duration, shrinkRate]);

  const handleClick = useCallback(
    (e) => {
      const canvas = canvasRef.current;
      if (!canvas) return;
      const rect = canvas.getBoundingClientRect();
      const cx = e.clientX - rect.left;
      const cy = e.clientY - rect.top;
      const now = performance.now();

      const newParticles = Array.from({ length: particleCount }, () => ({
        // cx is the horizontal anchor the sine wave oscillates around
        cx,
        y: cy,
        vy: -(minRiseSpeed + Math.random() * (maxRiseSpeed - minRiseSpeed)),
        // Random phase so each tongue weaves out of sync
        phase: Math.random() * Math.PI * 2,
        amp: minAmplitude + Math.random() * (maxAmplitude - minAmplitude),
        size: minSize + Math.random() * (maxSize - minSize),
        startTime: now,
      }));

      particlesRef.current.push(...newParticles);
    },
    [particleCount, minRiseSpeed, maxRiseSpeed, minAmplitude, maxAmplitude, minSize, maxSize]
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

export default ClickFireTrail;