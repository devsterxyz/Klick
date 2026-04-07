import { useRef, useEffect } from 'react';

const ClickFocus = ({
  color = '#fff',
  lineWidth = 1,
  // Starting distance of brackets from click point (px)
  startDist = 40,
  // Speed brackets move inward per frame (negative = inward)
  convergeSpeed = -1.5,
  // Length of each bracket arm (px)
  bracketSize = 10,
  // Fade speed — lower = longer life
  decay = 0.02,
  children,
}) => {
  const canvasRef = useRef(null);
  const bracketsRef = useRef([]);
  const isRunningRef = useRef(false);
  const animationIdRef = useRef(null);

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

  const startLoop = () => {
    if (isRunningRef.current) return;
    isRunningRef.current = true;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');

    const draw = () => {
      if (bracketsRef.current.length === 0) {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        isRunningRef.current = false;
        return;
      }

      ctx.clearRect(0, 0, canvas.width, canvas.height);

      bracketsRef.current = bracketsRef.current.filter(p => {
        p.life -= p.decay;
        if (p.life <= 0) return false;

        // Move brackets inward each frame
        p.dist += p.vdist;

// ❌ stop before reaching center → removes "+"
if (p.dist <= 2) return false;
        // Clamp so brackets never cross the center
        const d = Math.max(0, p.dist);
        const s = p.size;

        ctx.globalAlpha = Math.max(0, p.life);
        ctx.strokeStyle = color;
        ctx.lineWidth = lineWidth;
        ctx.beginPath();

        // Top Left bracket
        ctx.moveTo(p.x - d, p.y - d + s);
        ctx.lineTo(p.x - d, p.y - d);
        ctx.lineTo(p.x - d + s, p.y - d);

        // Top Right bracket
        ctx.moveTo(p.x + d - s, p.y - d);
        ctx.lineTo(p.x + d, p.y - d);
        ctx.lineTo(p.x + d, p.y - d + s);

        // Bottom Left bracket
        ctx.moveTo(p.x - d, p.y + d - s);
        ctx.lineTo(p.x - d, p.y + d);
        ctx.lineTo(p.x - d + s, p.y + d);

        // Bottom Right bracket
        ctx.moveTo(p.x + d - s, p.y + d);
        ctx.lineTo(p.x + d, p.y + d);
        ctx.lineTo(p.x + d, p.y + d - s);

        ctx.stroke();

        return true;
      });

      ctx.globalAlpha = 1;
      animationIdRef.current = requestAnimationFrame(draw);
    };

    animationIdRef.current = requestAnimationFrame(draw);
  };

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (animationIdRef.current) cancelAnimationFrame(animationIdRef.current);
    };
  }, []);

  // Click handler — exact original generateParticles focus case
  const handleClick = e => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    bracketsRef.current.push({
      x, y,
      dist: startDist,
      vdist: convergeSpeed,
      size: bracketSize,
      life: 1.0,
      decay,
    });

    startLoop();
  };

  return (
    <div className="relative w-fit h-fit" onClick={handleClick}>
      <canvas
        ref={canvasRef}
        className="w-full h-full block absolute top-0 left-0 select-none pointer-events-none"
      />
      {children}
    </div>
  );
};

export default ClickFocus;