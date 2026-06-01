"use client"
import { useRef, useEffect, ReactNode } from 'react';

interface BoundingBox {
  x: number;
  y: number;
  w: number;
  h: number;
  targetW: number;
  targetH: number;
  life: number;
  decay: number;
}

interface ClickBoundingBoxProps {
  color?: string;
  lineWidth?: number;
  decay?: number;
  minSize?: number;
  maxSize?: number;
  cornerLen?: number;
  children?: ReactNode;
}

const ClickBoundingBox = ({
  color = '#fff',
  lineWidth = 1,
  decay = 0.015,
  minSize = 40,
  maxSize = 60,
  cornerLen = 8,
  children,
}: ClickBoundingBoxProps) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const boxesRef = useRef<BoundingBox[]>([]);
  const isRunningRef = useRef<boolean>(false);
  const animationIdRef = useRef<number | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const parent = canvas.parentElement;
    if (!parent) return;

    let resizeTimeout: ReturnType<typeof setTimeout>;

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
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const draw = () => {
      if (boxesRef.current.length === 0) {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        isRunningRef.current = false;
        return;
      }

      ctx.clearRect(0, 0, canvas.width, canvas.height);

      boxesRef.current = boxesRef.current.filter((p: BoundingBox) => {
        p.life -= p.decay;
        if (p.life <= 0) return false;

        // Ease toward target size
        p.w += (p.targetW - p.w) * 0.15;
        p.h += (p.targetH - p.h) * 0.15;

        const hw = p.w / 2;
        const hh = p.h / 2;
        const cl = cornerLen;

        ctx.globalAlpha = Math.max(0, p.life);

        ctx.save();
        ctx.translate(p.x, p.y);

        // Faint full box outline
        ctx.beginPath();
        ctx.rect(-hw, -hh, p.w, p.h);
        ctx.lineWidth = lineWidth;
        ctx.strokeStyle = `rgba(255,255,255,${p.life * 0.3})`;
        ctx.stroke();

        // Bold corner brackets
        ctx.beginPath();
        // Top Left
        ctx.moveTo(-hw, -hh + cl);
        ctx.lineTo(-hw, -hh);
        ctx.lineTo(-hw + cl, -hh);
        // Top Right
        ctx.moveTo(hw - cl, -hh);
        ctx.lineTo(hw, -hh);
        ctx.lineTo(hw, -hh + cl);
        // Bottom Left
        ctx.moveTo(-hw, hh - cl);
        ctx.lineTo(-hw, hh);
        ctx.lineTo(-hw + cl, hh);
        // Bottom Right
        ctx.moveTo(hw - cl, hh);
        ctx.lineTo(hw, hh);
        ctx.lineTo(hw, hh - cl);

        ctx.lineWidth = lineWidth * 2;
        ctx.strokeStyle = color;
        ctx.stroke();

        // Label tag — "OBJ 0.99"
        ctx.fillStyle = `rgba(255,255,255,${p.life})`;
        ctx.fillRect(-hw, -hh - 10, 36, 10);
        ctx.fillStyle = `rgba(0,0,0,${p.life})`;
        ctx.font = '8px monospace';
        ctx.textAlign = 'left';
        ctx.textBaseline = 'top';
        ctx.fillText('OBJ 0.99', -hw + 2, -hh - 8);

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
      if (animationIdRef.current !== null) {
        cancelAnimationFrame(animationIdRef.current);
      }
    };
  }, []);

  const handleClick = (e: React.MouseEvent<HTMLDivElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    boxesRef.current.push({
      x,
      y,
      w: 0,
      h: 0,
      targetW: minSize + Math.random() * (maxSize - minSize),
      targetH: minSize + Math.random() * (maxSize - minSize),
      life: 1.0,
      decay,
    });

    startLoop();
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

export default ClickBoundingBox;