import { useRef, useEffect } from 'react';

const ClickSkull = ({
  color = '#fff',
  count = 5,
  speedMin = 2,
  speedMax = 5,
  sizeMin = 14,
  sizeMax = 24,
  gravity = 0.2,
  decay = 0.015,
  children,
}) => {
  const canvasRef = useRef(null);
  const skullsRef = useRef([]);
  const isRunningRef = useRef(false);
  const animationIdRef = useRef(null);

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

  // Draws a skull centered at (0,0) scaled by `s`
  const drawSkull = (ctx, s, fillColor) => {
    // --- Cranium ---
    ctx.beginPath();
    ctx.arc(0, -s * 0.15, s * 0.52, Math.PI, 0);
    ctx.bezierCurveTo(s * 0.52, s * 0.28, s * 0.28, s * 0.48, 0, s * 0.48);
    ctx.bezierCurveTo(-s * 0.28, s * 0.48, -s * 0.52, s * 0.28, -s * 0.52, s * 0.1);
    ctx.closePath();
    ctx.fillStyle = fillColor;
    ctx.fill();

    // --- Jaw base ---
    ctx.beginPath();
    ctx.rect(-s * 0.36, s * 0.38, s * 0.72, s * 0.26);
    ctx.fillStyle = fillColor;
    ctx.fill();

    // --- Jaw bottom rounded ---
    ctx.beginPath();
    ctx.arc(0, s * 0.64, s * 0.36, 0, Math.PI);
    ctx.fillStyle = fillColor;
    ctx.fill();

    // --- Eye sockets (cut out with destination-out or just draw dark) ---
    // Left eye
    ctx.beginPath();
    ctx.ellipse(-s * 0.18, s * 0.04, s * 0.13, s * 0.15, 0, 0, Math.PI * 2);
    ctx.fillStyle = 'rgba(0,0,0,0.85)';
    ctx.fill();

    // Right eye
    ctx.beginPath();
    ctx.ellipse(s * 0.18, s * 0.04, s * 0.13, s * 0.15, 0, 0, Math.PI * 2);
    ctx.fillStyle = 'rgba(0,0,0,0.85)';
    ctx.fill();

    // --- Nose hole ---
    ctx.beginPath();
    ctx.moveTo(-s * 0.06, s * 0.26);
    ctx.lineTo(0, s * 0.18);
    ctx.lineTo(s * 0.06, s * 0.26);
    ctx.closePath();
    ctx.fillStyle = 'rgba(0,0,0,0.85)';
    ctx.fill();

    // --- Teeth (3 rects cut into jaw) ---
    const teethX = [-s * 0.22, -s * 0.07, s * 0.07, s * 0.22];
    teethX.forEach(tx => {
      ctx.beginPath();
      ctx.rect(tx - s * 0.065, s * 0.42, s * 0.1, s * 0.18);
      ctx.fillStyle = 'rgba(0,0,0,0.85)';
      ctx.fill();
    });
  };

  const startLoop = () => {
    if (isRunningRef.current) return;
    isRunningRef.current = true;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');

    const draw = () => {
      if (skullsRef.current.length === 0) {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        isRunningRef.current = false;
        return;
      }

      ctx.clearRect(0, 0, canvas.width, canvas.height);

      skullsRef.current = skullsRef.current.filter(p => {
        p.life -= p.decay;
        if (p.life <= 0) return false;

        p.vy += p.gravity;
        p.x += p.vx;
        p.y += p.vy;
        p.rot += p.vrot;

        ctx.save();
        ctx.globalAlpha = Math.max(0, p.life);
        ctx.translate(p.x, p.y);
        ctx.rotate(p.rot);
        drawSkull(ctx, p.size, color);
        ctx.restore();

        return true;
      });

      ctx.globalAlpha = 1;
      animationIdRef.current = requestAnimationFrame(draw);
    };

    animationIdRef.current = requestAnimationFrame(draw);
  };

  useEffect(() => {
    return () => {
      if (animationIdRef.current) cancelAnimationFrame(animationIdRef.current);
    };
  }, []);

  const handleClick = e => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const newSkulls = Array.from({ length: count }, () => ({
      x: x + (Math.random() - 0.5) * 20,
      y,
      vx: (Math.random() - 0.5) * 6,
      vy: -(speedMin + Math.random() * (speedMax - speedMin)),
      gravity,
      rot: (Math.random() - 0.5) * 0.4,
      vrot: (Math.random() - 0.5) * 0.12,
      size: sizeMin + Math.random() * (sizeMax - sizeMin),
      life: 1.0,
      decay,
    }));

    skullsRef.current.push(...newSkulls);
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

export default ClickSkull;