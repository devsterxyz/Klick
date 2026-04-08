import { useRef, useEffect } from 'react';

// Preset color filters mapped to human-readable names


const ClickGhost = ({
  // Number of ghosts per click
  count = 6,
  // Scatter width around click point (px)
  scatter = 40,
  // Min and max float speed upward
  minSpeed = 1,
  maxSpeed = 3,
  // Emoji size (px)
  size = 24,
  // Sideways wobble amount (px)
  wobble = 1.5,
  // Fade speed
  decay = 0.015,
  // Color — 'white' | 'red' | 'blue' | 'green' | 'yellow' | 'purple' | 'pink' | 'cyan' | 'random'
  color = 'white',
  children,
}) => {
  const canvasRef = useRef(null);
  const ghostsRef = useRef([]);
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
      if (ghostsRef.current.length === 0) {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        isRunningRef.current = false;
        return;
      }

      ctx.clearRect(0, 0, canvas.width, canvas.height);

      ghostsRef.current = ghostsRef.current.filter(p => {
        p.life -= p.decay;
        if (p.life <= 0) return false;

        // Exact original render logic
        p.y -= p.vy;
        p.x += Math.sin(p.phase + p.life * 10) * wobble;


        ctx.filter = "none";
        ctx.font = `${p.size}px Arial`;
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText('👻', p.x, p.y);
        ctx.filter = 'none';

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

  // Click handler — exact original generateParticles emoji_ghost case
  const handleClick = e => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const PI2 = Math.PI * 2;

    for (let i = 0; i < count; i++) {
      ghostsRef.current.push({
        x: x + (Math.random() - 0.5) * scatter,
        y: y,
        vy: minSpeed + Math.random() * (maxSpeed - minSpeed),
        phase: Math.random() * PI2,
        size,
        life: 1.0,
        decay,
        // Each ghost gets its own color filter — 'random' gives each one different color
      });
    }

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

export default ClickGhost;