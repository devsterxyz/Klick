import { useRef, useEffect, useCallback } from 'react';

const ClickBinary = ({
  textColor = '#fff',
  fontSize = 12,
  particleCount = 10,
  spreadRadius = 60,
  duration = 800,
  easing = 'ease-out',
  chars = ['0', '1'],
  children,
}) => {
  const canvasRef = useRef(null);
  const particlesRef = useRef([]);

  // Resize canvas to match parent
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const parent = canvas.parentElement;
    if (!parent) return;

    let resizeTimeout;
    const resizeCanvas = () => {
      const { width, height } = parent.getBoundingClientRect();
      if (canvas.width !== width || canvas.height !== height) {
        canvas.width = width;
        canvas.height = height;
      }
    };
    const handleResize = () => {
      clearTimeout(resizeTimeout);
      resizeTimeout = setTimeout(resizeCanvas, 100);
    };

    const ro = new ResizeObserver(handleResize);
    ro.observe(parent);
    resizeCanvas();
    return () => {
      ro.disconnect();
      clearTimeout(resizeTimeout);
    };
  }, []);

  // Easing function
  const easeFunc = useCallback(
    t => {
      switch (easing) {
        case 'linear':
          return t;
        case 'ease-in':
          return t * t;
        case 'ease-in-out':
          return t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t;
        default: // ease-out
          return t * (2 - t);
      }
    },
    [easing]
  );

  // Render loop
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let animationId;

    const draw = timestamp => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.font = `${fontSize}px monospace`;

      particlesRef.current = particlesRef.current.filter(p => {
        const elapsed = timestamp - p.startTime;
        if (elapsed >= duration) return false;

        const progress = elapsed / duration;
        const eased = easeFunc(progress);

        // Position: move outward along angle
        const x = p.originX + Math.cos(p.angle) * eased * p.distance;
        // Slight upward float bias (vy bias of -0.5 from original)
        const y = p.originY + Math.sin(p.angle) * eased * p.distance - eased * spreadRadius * 0.3;

        // Fade out in second half
        const alpha = progress < 0.5 ? 1 : 1 - (progress - 0.5) * 2;

        ctx.globalAlpha = Math.max(0, alpha);
        ctx.fillStyle = textColor;
        ctx.fillText(p.char, x, y);

        return true;
      });

      ctx.globalAlpha = 1;
      animationId = requestAnimationFrame(draw);
    };

    animationId = requestAnimationFrame(draw);
    return () => cancelAnimationFrame(animationId);
  }, [textColor, fontSize, spreadRadius, duration, easeFunc]);

  // Click handler
  const handleClick = e => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const now = performance.now();

    const newParticles = Array.from({ length: particleCount }, () => ({
      originX: x,
      originY: y,
      char: chars[Math.floor(Math.random() * chars.length)],
      angle: Math.random() * Math.PI * 2,
      // Each particle gets a random travel distance for organic spread
      distance: spreadRadius * (0.4 + Math.random() * 0.6),
      startTime: now,
    }));

    particlesRef.current.push(...newParticles);
  };

  return (
    <div className="relative w-fit h-fit" onClick={handleClick}>
      <canvas
        ref={canvasRef}
        className="w-full h-full block absolute top-0 left-0 select-none pointer-events-none z-10"
      />
      {children}
    </div>
  );
};

export default ClickBinary;