import { useRef, useEffect } from 'react';

const ClickFire = ({
  count = 3,
  minSpeed = 1.5,
  maxSpeed = 3.5,
  minSize = 16,
  maxSize = 28,
  decay = 0.025,
  children,
}) => {
  const canvasRef = useRef(null);
  const particlesRef = useRef([]);
  const isRunningRef = useRef(false);
  const animationIdRef = useRef(null);
  const lastClickRef = useRef(0);

  const MAX_PARTICLES = 120;   // 🔥 cap
  const CLICK_DELAY = 60;      // 🔥 throttle

  // Resize canvas
  useEffect(() => {
    const canvas = canvasRef.current;
    const parent = canvas?.parentElement;
    if (!canvas || !parent) return;

    const resize = () => {
      const { width, height } = parent.getBoundingClientRect();
      canvas.width = width;
      canvas.height = height;
    };

    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(parent);

    return () => ro.disconnect();
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

      const particles = particlesRef.current;
      let writeIndex = 0;

      // 🔥 NO filter() → no new array creation
      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];

        p.life -= p.decay;
        if (p.life <= 0) continue;

        p.x += p.vx;
        p.y += p.vy;

        ctx.globalAlpha = p.life;
        ctx.font = `${p.size}px Arial`;
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText('🔥', p.x, p.y);

        particles[writeIndex++] = p;
      }

      particles.length = writeIndex; // 🔥 shrink array in-place
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
    // 🔥 throttle clicks
    const now = performance.now();
    if (now - lastClickRef.current < CLICK_DELAY) return;
    lastClickRef.current = now;

    const canvas = canvasRef.current;
    if (!canvas) return;

    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const PI2 = Math.PI * 2;

    // 🔥 particle cap
    if (particlesRef.current.length > MAX_PARTICLES) {
      particlesRef.current.splice(0, count);
    }

    for (let i = 0; i < count; i++) {
      const angle = Math.random() * PI2;
      const speed = minSpeed + Math.random() * (maxSpeed - minSpeed);

      particlesRef.current.push({
        x,
        y,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed,
        size: minSize + Math.random() * (maxSize - minSize),
        life: 1,
        decay,
      });
    }

    startLoop();
  };

  return (
    <div className="relative w-fit h-fit" onClick={handleClick}>
      <canvas
        ref={canvasRef}
        className="absolute top-0 left-0 w-full h-full pointer-events-none"
      />
      {children}
    </div>
  );
};

export default ClickFire;