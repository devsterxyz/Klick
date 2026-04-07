import { useRef, useEffect, useCallback } from 'react';

const ClickShatter = ({
  shardColor = '#fff',
  shardCount = 12,
  shardSize = 6,
  spreadRadius = 80,
  duration = 700,
  easing = 'ease-out',
  gravity = 0.6,
  children,
}) => {
  const canvasRef = useRef(null);
  const shardsRef = useRef([]);

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

      shardsRef.current = shardsRef.current.filter(shard => {
        const elapsed = timestamp - shard.startTime;
        if (elapsed >= duration) return false;

        const progress = elapsed / duration;
        const eased = easeFunc(progress);

        // Position: fly outward + gravity arc downward
        const x =
          shard.originX +
          Math.cos(shard.angle) * eased * shard.distance;
        const y =
          shard.originY +
          Math.sin(shard.angle) * eased * shard.distance +
          gravity * eased * eased * spreadRadius;

        // Rotation: spins as it flies
        const rotation = shard.initialRotation + shard.rotationSpeed * progress * Math.PI * 4;

        // Fade out in last 40%
        const alpha = progress < 0.6 ? 1 : 1 - (progress - 0.6) / 0.4;

        ctx.save();
        ctx.globalAlpha = Math.max(0, alpha);
        ctx.fillStyle = shardColor;
        ctx.translate(x, y);
        ctx.rotate(rotation);

        // Draw triangle shard (matches original poly type)
        const s = shard.size;
        ctx.beginPath();
        ctx.moveTo(0, -s);
        ctx.lineTo(s, s);
        ctx.lineTo(-s, s);
        ctx.closePath();
        ctx.fill();

        ctx.restore();
        return true;
      });

      animationId = requestAnimationFrame(draw);
    };

    animationId = requestAnimationFrame(draw);
    return () => cancelAnimationFrame(animationId);
  }, [shardColor, shardSize, spreadRadius, duration, gravity, easeFunc]);

  // Click handler
  const handleClick = e => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const now = performance.now();

    const newShards = Array.from({ length: shardCount }, () => ({
      originX: x,
      originY: y,
      angle: Math.random() * Math.PI * 2,
      distance: spreadRadius * (0.4 + Math.random() * 0.6),
      size: shardSize * (0.5 + Math.random() * 0.8),
      initialRotation: Math.random() * Math.PI * 2,
      // Random spin direction and speed per shard
      rotationSpeed: (Math.random() - 0.5) * 2,
      startTime: now,
    }));

    shardsRef.current.push(...newShards);
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

export default ClickShatter;