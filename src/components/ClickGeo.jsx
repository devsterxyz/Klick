import { useRef, useEffect } from 'react';

const ClickGeo = ({
  color = '#fff',
  lineWidth = 1,
  children,
}) => {
  const canvasRef = useRef(null);
  const shapesRef = useRef([]);
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
      if (shapesRef.current.length === 0) {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        isRunningRef.current = false;
        return;
      }

      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Exact port of original frame-based logic
      shapesRef.current = shapesRef.current.filter(p => {
        // Decay life each frame exactly like original
        p.life -= p.decay;
        if (p.life <= 0) return false;

        // Expand radius and rotate each frame exactly like original
        p.r += p.vr;
        p.rot += p.vrot;

        ctx.globalAlpha = Math.max(0, p.life);
        ctx.strokeStyle = color;
        ctx.lineWidth = lineWidth;

        ctx.save();
        ctx.translate(p.x, p.y);
        ctx.rotate(p.rot);

        ctx.beginPath();
        if (p.shape === 'square') {
          ctx.rect(-p.r, -p.r, p.r * 2, p.r * 2);
        } else {
          // Triangle — same as original
          ctx.moveTo(0, -p.r);
          ctx.lineTo(p.r, p.r);
          ctx.lineTo(-p.r, p.r);
          ctx.closePath();
        }
        ctx.stroke();

        ctx.restore();
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

  // Click handler
  const handleClick = e => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    // Exact values from original generateParticles geo case
    shapesRef.current.push(
      { shape: 'square',   x, y, r: 0, vr: 1,   rot: 0, vrot:  0.02,  life: 1.0, decay: 0.015 },
      { shape: 'triangle', x, y, r: 0, vr: 1.5,  rot: 0, vrot: -0.03,  life: 1.0, decay: 0.015 }
    );

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

export default ClickGeo;