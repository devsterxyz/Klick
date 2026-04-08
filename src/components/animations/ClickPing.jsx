import { useRef, useEffect } from 'react';

const ClickPing = ({
  color = '#fff',
  ringSpeed = 2.5,
  ringLineWidth = 1.5,
  dotSize = 3,
  ringDecay = 0.025,
  dotDecay = 0.05,
  maxRadius = 80, // ✅ NEW: limit expansion
  children,
}) => {
  const canvasRef = useRef(null);
  const particlesRef = useRef([]);
  const isRunningRef = useRef(false);
  const animationIdRef = useRef(null);

  // Resize canvas
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

  const startLoop = () => {
    if (isRunningRef.current) return;
    isRunningRef.current = true;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');

    const draw = () => {
      if (particlesRef.current.length === 0) {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        isRunningRef.current = false;
        return;
      }

      ctx.clearRect(0, 0, canvas.width, canvas.height);

      particlesRef.current = particlesRef.current.filter(p => {
        p.life -= p.decay;

        // ✅ STOP if life ends OR radius exceeds max
        if (
          p.life <= 0 ||
          (p.type === 'ping_ring' && p.r >= maxRadius)
        ) {
          return false;
        }

        ctx.globalAlpha = Math.max(0, p.life);
        ctx.strokeStyle = color;
        ctx.fillStyle = color;

        if (p.type === 'ping_ring') {
          p.r += p.vr;

          ctx.beginPath();
          ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
          ctx.lineWidth = p.lineWidth;
          ctx.stroke();
        } else {
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
          ctx.fill();
        }

        return true;
      });

      ctx.globalAlpha = 1;
      animationIdRef.current = requestAnimationFrame(draw);
    };

    animationIdRef.current = requestAnimationFrame(draw);
  };

  // Cleanup
  useEffect(() => {
    return () => {
      if (animationIdRef.current) cancelAnimationFrame(animationIdRef.current);
    };
  }, []);

  // Click handler
  const handleClick = e => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    // Ring
    particlesRef.current.push({
      type: 'ping_ring',
      x,
      y,
      r: 0,
      vr: ringSpeed,
      lineWidth: ringLineWidth,
      life: 1.0,
      decay: ringDecay,
    });

    // Center dot
    particlesRef.current.push({
      type: 'simple_dot',
      x,
      y,
      size: dotSize,
      life: 1.0,
      decay: dotDecay,
    });

    startLoop();
  };

  return (
    <div className="relative w-fit h-fit" onClick={handleClick}>
      <canvas
        ref={canvasRef}
        className="w-fit h-fit block absolute top-0 left-0 select-none pointer-events-none"
      />
      {children}
    </div>
  );
};

export default ClickPing;