"use client"

import { useRef, useEffect, useCallback } from 'react';
import type { ReactNode } from 'react';

type NodeParticle = {
  x: number;
  y: number;
  vx: number;
  vy: number;
};

type ParticleGroup = {
  nodes: NodeParticle[];
  startTime: number;
};

type ClickSynapseProps = {
  strokeColor?: string;
  nodeCount?: number;
  burstSpeed?: number;
  friction?: number;
  connectionDist?: number;
  nodeRadius?: number;
  duration?: number;
  children?: ReactNode;
};

export default function ClickSynapse({
  strokeColor = '#fff',
  nodeCount = 10,
  burstSpeed = 8,
  friction = 0.88,
  connectionDist = 70,
  nodeRadius = 2,
  duration = 1500,
  children,
}: ClickSynapseProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const particlesRef = useRef<ParticleGroup[]>([]);
  const animIdRef = useRef<number | null>(null);

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
    if (!ctx) return;

    const draw = (timestamp: number) => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      particlesRef.current = particlesRef.current.filter((group) => {
        const elapsed = timestamp - group.startTime;
        if (elapsed >= duration) return false;

        const progress = elapsed / duration;
        const alpha = Math.max(0, 1 - progress);

        // Update node positions
        for (const n of group.nodes) {
          n.vx *= friction;
          n.vy *= friction;
          n.x += n.vx;
          n.y += n.vy;
        }

        // Connections
        ctx.beginPath();
        for (let i = 0; i < group.nodes.length; i++) {
          for (let j = i + 1; j < group.nodes.length; j++) {
            const dx = group.nodes[i].x - group.nodes[j].x;
            const dy = group.nodes[i].y - group.nodes[j].y;
            const dist = Math.sqrt(dx * dx + dy * dy);

            if (dist < connectionDist) {
              ctx.moveTo(group.nodes[i].x, group.nodes[i].y);
              ctx.lineTo(group.nodes[j].x, group.nodes[j].y);
            }
          }
        }

        ctx.lineWidth = 1;
        ctx.strokeStyle = strokeColor;
        ctx.globalAlpha = alpha * 0.4;
        ctx.stroke();

        // Nodes
        ctx.beginPath();
        for (const n of group.nodes) {
          ctx.moveTo(n.x + nodeRadius, n.y);
          ctx.arc(n.x, n.y, nodeRadius, 0, Math.PI * 2);
        }

        ctx.fillStyle = strokeColor;
        ctx.globalAlpha = alpha;
        ctx.fill();

        ctx.globalAlpha = 1;
        return true;
      });

      animIdRef.current = requestAnimationFrame(draw);
    };

    animIdRef.current = requestAnimationFrame(draw);

    return () => {
      if (animIdRef.current !== null) {
        cancelAnimationFrame(animIdRef.current);
      }
    };
  }, [strokeColor, duration, friction, connectionDist, nodeRadius]);

  const handleClick = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      const canvas = canvasRef.current;
      if (!canvas) return;

      const rect = canvas.getBoundingClientRect();
      const cx = e.clientX - rect.left;
      const cy = e.clientY - rect.top;
      const now = performance.now();

      const nodes: NodeParticle[] = Array.from(
        { length: nodeCount },
        () => ({
          x: cx,
          y: cy,
          vx: (Math.random() - 0.5) * burstSpeed,
          vy: (Math.random() - 0.5) * burstSpeed,
        })
      );

      particlesRef.current.push({
        nodes,
        startTime: now,
      });
    },
    [nodeCount, burstSpeed]
  );

  return (
    <div className="relative w-fit h-fit" onClick={handleClick}>
      <canvas
        ref={canvasRef}
        className="absolute top-0 left-0 w-full h-full pointer-events-none select-none z-10"
      />
      {children}
    </div>
  );
};
