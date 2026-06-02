import { useState, useEffect, useRef, useCallback } from "react";

// ─── Easing & Math helpers ────────────────────────────────────────────────────

const easeOutCubic  = (t: number): number => 1 - Math.pow(1 - t, 3);
const easeInOutQuad = (t: number): number => t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t;
const easeOutBack   = (t: number): number => {
  const c = 1.70158;
  return 1 + (c + 1) * Math.pow(t - 1, 3) + c * Math.pow(t - 1, 2);
};
const lerp = (a: number, b: number, t: number): number => a + (b - a) * t;

const MATRIX_CHARS = "01アイウエオカキクケコサシスセソタチツテトナニヌネノ";

// ─── Types ────────────────────────────────────────────────────────────────────

type ParticleType = "dot" | "splinter" | "sonar-ping" | "sonar-tick" | "matrix";

interface BaseParticle {
  id: number;
  type: ParticleType;
  x: number;
  y: number;
  cx: number;
  cy: number;
  opacity: number;
  born: number;
  dur: number;
}

interface DotParticle extends BaseParticle {
  type: "dot";
  vx: number;
  vy: number;
  size: number;
  white: boolean;
  rot?: number;
  rotSpeed?: number;
}

interface SplinterParticle extends BaseParticle {
  type: "splinter";
  vx: number;
  vy: number;
  w: number;
  h: number;
  rot: number;
  rotSpeed: number;
}

interface SonarPingParticle extends BaseParticle {
  type: "sonar-ping";
  angle: number;
  maxR: number;
  size: number;
  bright: boolean;
}

interface SonarTickParticle extends BaseParticle {
  type: "sonar-tick";
  angle: number;
  length: number;
}

interface MatrixParticle extends BaseParticle {
  type: "matrix";
  targetY: number;
  ch: string;
  fadeDur: number;
  fadeStart: number | null;
  fontSize: number;
  bright: boolean;
}

type Particle =
  | DotParticle
  | SplinterParticle
  | SonarPingParticle
  | SonarTickParticle
  | MatrixParticle;

interface Ring {
  id: number;
  x: number;
  y: number;
  r: number;
  opacity: number;
  born: number;
  dur: number;
  delay: number;
  maxR: number;
  shape?: "sonar";
  strokeWidth?: number;
}

interface BlastResult {
  particles: Particle[];
  rings: Ring[];
}

interface CursorPos {
  x: number;
  y: number;
}

// ─── CursorSVG ────────────────────────────────────────────────────────────────

interface CursorSVGProps {
  dark: boolean;
  style?: React.CSSProperties;
  svgStyle?: React.CSSProperties;
}

function CursorSVG({ dark, style, svgStyle }: CursorSVGProps) {
  const stroke = dark ? "#ffffff" : "#000000";
  const fill   = dark ? "#000000" : "#ffffff";
  const shadow = dark ? "rgba(255,255,255,0.15)" : "rgba(0,0,0,0.18)";
  const inner  = dark ? "rgba(255,255,255,0.1)"  : "rgba(0,0,0,0.1)";

  return (
    <div style={{ position: "absolute", pointerEvents: "none", transform: "translate(-50%, -50%)", ...style }}>
      <svg
        style={{ width: 110, height: 110, filter: `drop-shadow(0 4px 18px ${shadow})`, transformOrigin: "top left", ...svgStyle }}
        viewBox="0 0 80 90"
        xmlns="http://www.w3.org/2000/svg"
      >
        <polygon points="8,4 8,64 24,50 33,74 44,70 35,46 54,46" fill={shadow} transform="translate(4,6)" />
        <polygon
          points="8,4 8,64 24,50 33,74 44,70 35,46 54,46"
          fill={fill} stroke={stroke} strokeWidth="3"
          strokeLinejoin="round" strokeLinecap="round"
        />
        <polyline
          points="14,14 14,54 24,44 32,62 38,59 30,40 46,40"
          fill="none" stroke={inner} strokeWidth="1.5" strokeLinejoin="round"
        />
      </svg>
    </div>
  );
}

// ─── Blast spawners ───────────────────────────────────────────────────────────

function spawnBlast1(x: number, y: number, uid: () => number): BlastResult {
  const now = performance.now();
  const particles: Particle[] = [];
  const rings: Ring[] = [];

  for (let i = 0; i < 22; i++) {
    const angle = (i / 22) * Math.PI * 2 + (Math.random() - 0.5) * 0.4;
    const speed = 60 + Math.random() * 160;
    const size  = 4 + Math.random() * 10;
    particles.push({
      id: uid(), type: "dot", x, y, cx: x, cy: y,
      vx: Math.cos(angle) * speed,
      vy: Math.sin(angle) * speed,
      size, white: Math.random() > 0.5,
      born: now, dur: 600 + Math.random() * 500, opacity: 1,
    } as DotParticle);
  }

  for (let i = 0; i < 10; i++) {
    const angle = (i / 10) * Math.PI * 2 + 0.3;
    const speed = 50 + Math.random() * 130;
    particles.push({
      id: uid(), type: "splinter", x, y, cx: x, cy: y,
      vx: Math.cos(angle) * speed,
      vy: Math.sin(angle) * speed,
      w: 2 + Math.random() * 2, h: 8 + Math.random() * 18,
      rot: Math.random() * 360, rotSpeed: (Math.random() - 0.5) * 720,
      born: now, dur: 500 + Math.random() * 600, opacity: 1,
    } as SplinterParticle);
  }

  for (let i = 0; i < 3; i++) {
    rings.push({
      id: uid(), x, y, r: 0, opacity: 1,
      born: now, dur: 550 + i * 120, delay: i * 80, maxR: 80 + i * 40,
    });
  }

  return { particles, rings };
}

function spawnBlast2(x: number, y: number, uid: () => number): BlastResult {
  const now = performance.now();
  const particles: Particle[] = [];
  const rings: Ring[] = [];
  const PULSES = 6;
  const PING_PER_PULSE = 8;

  for (let i = 0; i < PULSES; i++) {
    const delay  = i * 220;
    const maxR   = 50 + i * 38;
    const dur    = 1000 + i * 80;
    rings.push({
      id: uid(), x, y, r: 0, opacity: 1,
      born: now, dur, delay, maxR,
      shape: "sonar",
      strokeWidth: i === 0 ? 2.5 : 1.5,
    });

    for (let j = 0; j < PING_PER_PULSE; j++) {
      const angle    = (j / PING_PER_PULSE) * Math.PI * 2;
      const pingSize = i === 0 ? 5 + Math.random() * 4 : 2 + Math.random() * 3;
      particles.push({
        id: uid(), type: "sonar-ping",
        x, y, cx: x, cy: y,
        angle, maxR,
        born: now + delay,
        dur,
        size: pingSize,
        opacity: 1,
        bright: j === Math.floor(Math.random() * PING_PER_PULSE),
      } as SonarPingParticle);
    }
  }

  const TICKS = 4;
  for (let i = 0; i < TICKS; i++) {
    const angle = (i / TICKS) * Math.PI * 2;
    particles.push({
      id: uid(), type: "sonar-tick",
      cx: x, cy: y, x, y, angle,
      opacity: 1, born: now, dur: 1800, length: 14,
    } as SonarTickParticle);
  }

  return { particles, rings };
}

function spawnBlast3(x: number, y: number, uid: () => number): BlastResult {
  const now = performance.now();
  const COLS = 14;
  const particles: Particle[] = [];

  for (let c = 0; c < COLS; c++) {
    const col  = c - COLS / 2;
    const colX = x + col * 22 + 11;
    const drops = 6 + Math.floor(Math.random() * 5);
    const delay = Math.random() * 300;
    for (let r = 0; r < drops; r++) {
      const ch = MATRIX_CHARS[Math.floor(Math.random() * MATRIX_CHARS.length)];
      particles.push({
        id: uid(), type: "matrix",
        cx: colX, cy: y, x: colX, y,
        targetY: y + 60 + r * 28 + Math.random() * 20,
        ch, opacity: 0,
        born: now + delay + r * 60,
        dur: 180 + Math.random() * 120,
        fadeDur: 600 + Math.random() * 400,
        fadeStart: null,
        fontSize: 12 + Math.random() * 8,
        bright: r === 0,
      } as MatrixParticle);
    }
  }

  return { particles, rings: [] };
}

// ─── Tick ─────────────────────────────────────────────────────────────────────

function tickParticles(
  particles: Particle[],
  rings: Ring[],
  now: number,
  blastType: number
): BlastResult {
  const gravity = blastType === 2 ? 0 : 220;

  const nextParticles = particles.map((p): Particle | null => {
    if (p.type === "sonar-ping") {
      const elapsed = now - p.born;
      if (elapsed < 0) return p;
      const t = Math.min(elapsed / p.dur, 1);
      if (t >= 1) return null;
      const et  = easeOutCubic(t);
      const r   = et * p.maxR;
      const fade = t < 0.15 ? t / 0.15 : t > 0.6 ? 1 - (t - 0.6) / 0.4 : 1;
      return { ...p, cx: p.x + Math.cos(p.angle) * r, cy: p.y + Math.sin(p.angle) * r, opacity: Math.max(0, fade) };
    }

    if (p.type === "sonar-tick") {
      const elapsed = now - p.born;
      if (elapsed < 0) return p;
      const t = Math.min(elapsed / p.dur, 1);
      if (t >= 1) return null;
      const fade = t < 0.1 ? t / 0.1 : 1 - t;
      return { ...p, opacity: Math.max(0, fade) };
    }

    if (p.type === "matrix") {
      const elapsed = now - p.born;
      if (elapsed < 0) return p;
      if (p.fadeStart !== null) {
        const ft = Math.min((now - p.fadeStart) / p.fadeDur, 1);
        if (ft >= 1) return null;
        return { ...p, opacity: Math.max(0, 1 - ft) };
      }
      const t  = Math.min(elapsed / p.dur, 1);
      const cy = lerp(p.y, p.targetY, easeOutBack(t));
      if (t >= 1) return { ...p, cy: p.targetY, opacity: 1, fadeStart: now };
      return { ...p, cy, opacity: t < 0.1 ? t * 10 : 1 };
    }

    // dot / splinter
    const dotP = p as DotParticle | SplinterParticle;
    const t = Math.min((now - dotP.born) / dotP.dur, 1);
    if (t < 0) return { ...dotP, opacity: 0 };
    if (t >= 1) return null;
    const et   = easeOutCubic(t);
    const fade = t < 0.3 ? 1 : 1 - (t - 0.3) / 0.7;
    return {
      ...dotP,
      cx: dotP.x + dotP.vx * et,
      cy: dotP.y + dotP.vy * et + gravity * t * t,
      rot: "rot" in dotP && dotP.rot !== undefined ? dotP.rot + (dotP.rotSpeed ?? 0) * t : 0,
      opacity: Math.max(0, fade),
    } as Particle;
  }).filter((p): p is Particle => p !== null);

  const nextRings = rings.map((r): Ring | null => {
    const elapsed = now - r.born - (r.delay ?? 0);
    if (elapsed < 0) return r;
    const t = Math.min(elapsed / r.dur, 1);
    if (t >= 1) return null;
    const et = easeOutCubic(t);
    const opacity = r.shape === "sonar"
      ? (t < 0.5 ? 0.7 : Math.max(0, 0.7 * (1 - (t - 0.5) / 0.5)))
      : Math.max(0, (1 - t) * 0.7);
    return { ...r, r: et * r.maxR, opacity };
  }).filter((r): r is Ring => r !== null);

  return { particles: nextParticles, rings: nextRings };
}

// ─── Render helpers ───────────────────────────────────────────────────────────

interface RenderParticleProps { p: Particle; dark: boolean; }

function RenderParticle({ p, dark }: RenderParticleProps) {
  const fg = dark ? "#ffffff" : "#000000";

  if (p.type === "sonar-ping") {
    const s = p.bright ? p.size * 1.4 : p.size;
    return (
      <div style={{
        position: "absolute", pointerEvents: "none",
        left: p.cx, top: p.cy, width: s, height: s,
        transform: "translate(-50%,-50%)", borderRadius: "50%",
        background: p.bright ? fg : "transparent",
        border: p.bright ? "none" : `1.5px solid ${fg}`,
        opacity: p.opacity,
      }} />
    );
  }

  if (p.type === "sonar-tick") {
    const tx  = p.cx + Math.cos(p.angle) * 8;
    const ty  = p.cy + Math.sin(p.angle) * 8;
    const tx2 = p.cx + Math.cos(p.angle) * (8 + p.length);
    const ty2 = p.cy + Math.sin(p.angle) * (8 + p.length);
    return (
      <svg style={{
        position: "absolute", pointerEvents: "none",
        left: 0, top: 0, width: "100%", height: "100%",
        overflow: "visible", opacity: p.opacity,
      }}>
        <line x1={tx} y1={ty} x2={tx2} y2={ty2} stroke={fg} strokeWidth="1.5" strokeLinecap="round" />
      </svg>
    );
  }

  if (p.type === "matrix") {
    return (
      <div style={{
        position: "absolute", pointerEvents: "none",
        left: p.cx, top: p.cy,
        transform: "translate(-50%, -50%)",
        color: p.bright ? fg : (dark ? "rgba(255,255,255,0.5)" : "rgba(0,0,0,0.4)"),
        opacity: p.opacity,
        fontSize: p.fontSize,
        fontFamily: "monospace",
        fontWeight: p.bright ? 700 : 400,
        userSelect: "none", whiteSpace: "nowrap",
      }}>{p.ch}</div>
    );
  }

  if (p.type === "splinter") {
    return (
      <div style={{
        position: "absolute", pointerEvents: "none",
        left: p.cx, top: p.cy, width: p.w, height: p.h,
        transform: `translate(-50%,-50%) rotate(${p.rot}deg)`,
        background: fg, borderRadius: 1, opacity: p.opacity,
      }} />
    );
  }

  // dot
  const dot = p as DotParticle;
  return (
    <div style={{
      position: "absolute", pointerEvents: "none",
      left: dot.cx, top: dot.cy, width: dot.size, height: dot.size,
      transform: "translate(-50%,-50%)", borderRadius: "50%",
      background: dot.white ? (dark ? "#000000" : "#ffffff") : fg,
      border: dot.white ? `1.5px solid ${fg}` : "none",
      opacity: dot.opacity,
    }} />
  );
}

interface RenderRingProps { r: Ring; dark: boolean; blastType: number; }

function RenderRing({ r, dark }: RenderRingProps) {
  const fg = dark ? "#ffffff" : "#000000";
  const s  = r.r * 2;
  const sw = r.strokeWidth ?? 2.5;
  return (
    <div style={{
      position: "absolute", borderRadius: "50%", pointerEvents: "none",
      left: r.x, top: r.y, width: s, height: s,
      transform: "translate(-50%,-50%)",
      border: `${sw}px solid ${fg}`, opacity: r.opacity,
    }} />
  );
}

// ─── Main Component ───────────────────────────────────────────────────────────

type Phase = "idle" | "enter" | "settle" | "click" | "explode" | "pause";

interface CursorAnimationProps {
  className?: string;
  showOverlay?: boolean;
}

const getIsDarkMode = (): boolean =>
  typeof document !== "undefined" && document.documentElement.classList.contains("dark");

export default function CursorAnimation({ className = "", showOverlay = false }: CursorAnimationProps) {
  const [dark,          setDark]          = useState<boolean>(getIsDarkMode);
  const [cursorPos,     setCursorPos]     = useState<CursorPos>({ x: 0, y: 0 });
  const [cursorOpacity, setCursorOpacity] = useState<number>(0);
  const [cursorScale,   setCursorScale]   = useState<number>(1);
  const [particles,     setParticles]     = useState<Particle[]>([]);
  const [rings,         setRings]         = useState<Ring[]>([]);
  const [blastType,     setBlastType]     = useState<number>(1);

  const containerRef  = useRef<HTMLDivElement | null>(null);
  const phaseRef      = useRef<Phase>("idle");
  const phaseStart    = useRef<number>(0);
  const clickPoint    = useRef<CursorPos>({ x: 0, y: 0 });
  const blastCountRef = useRef<number>(0);
  const blastTypeRef  = useRef<number>(1);
  const rafRef        = useRef<number | null>(null);
  const idRef         = useRef<number>(0);

  const uid = useCallback((): number => ++idRef.current, []);

  useEffect(() => {
    const root = document.documentElement;
    const observer = new MutationObserver(() => setDark(getIsDarkMode()));

    observer.observe(root, { attributes: true, attributeFilter: ["class"] });
    setDark(getIsDarkMode());

    return () => observer.disconnect();
  }, []);

  const doSpawn = useCallback((x: number, y: number): void => {
    blastCountRef.current = (blastCountRef.current % 3) + 1;
    const bt = blastCountRef.current;
    blastTypeRef.current = bt;
    setBlastType(bt);

    let result: BlastResult;
    if      (bt === 1) result = spawnBlast1(x, y, uid);
    else if (bt === 2) result = spawnBlast2(x, y, uid);
    else               result = spawnBlast3(x, y, uid);

    setParticles(result.particles);
    setRings(result.rings);
  }, [uid]);

  const tick = useCallback((now: number): void => {
    if (!containerRef.current) {
      rafRef.current = requestAnimationFrame(tick);
      return;
    }

    const W  = containerRef.current.clientWidth;
    const H  = containerRef.current.clientHeight;
    const dt = now - phaseStart.current;
    const { x: cx, y: cy } = clickPoint.current;

    if (phaseRef.current === "enter") {
      const t  = Math.min(dt / 900, 1);
      const et = easeOutCubic(t);
      setCursorPos({
        x: lerp(cx, cx, et) + Math.sin(et * Math.PI) * -30,
        y: lerp(cy - H * 0.55, cy - 55, et),
      });
      setCursorOpacity(Math.min(et * 3, 1));
      setCursorScale(1);
      if (t >= 1) { phaseRef.current = "settle"; phaseStart.current = now; }
    }
    else if (phaseRef.current === "settle") {
      const t   = Math.min(dt / 400, 1);
      const bob = Math.sin(t * Math.PI * 2) * 4;
      setCursorPos(prev => ({ ...prev, y: cy - 55 + bob }));
      if (t >= 1) { phaseRef.current = "click"; phaseStart.current = now; }
    }
    else if (phaseRef.current === "click") {
      const t  = Math.min(dt / 200, 1);
      const et = easeInOutQuad(t);
      setCursorPos(prev => ({ ...prev, y: lerp(cy - 55, cy - 5, et) }));
      setCursorScale(1 - et * 0.22);
      if (t >= 1) {
        phaseRef.current = "explode";
        phaseStart.current = now;
        setCursorOpacity(0);
        doSpawn(cx, cy);
      }
    }
    else if (phaseRef.current === "explode") {
      const bt = blastTypeRef.current;
      const maxDur = bt === 3 ? 2200 : bt === 2 ? 2400 : 1100;
      setParticles(prev => tickParticles(prev, [], now, bt).particles);
      setRings(prev => tickParticles([], prev, now, bt).rings);
      if (dt > maxDur) { phaseRef.current = "pause"; phaseStart.current = now; }
    }
    else if (phaseRef.current === "pause") {
      if (dt > 600) {
        const ox = (Math.random() - 0.5) * W * 0.18;
        const oy = (Math.random() - 0.5) * H * 0.18;
        clickPoint.current = { x: W / 2 + ox, y: H / 2 + oy };
        setParticles([]);
        setRings([]);
        setCursorOpacity(0);
        setCursorScale(1);
        phaseRef.current = "enter";
        phaseStart.current = now;
      }
    }

    rafRef.current = requestAnimationFrame(tick);
  }, [doSpawn]);

  useEffect(() => {
    if (!containerRef.current) return;
    const W = containerRef.current.clientWidth;
    const H = containerRef.current.clientHeight;
    clickPoint.current = { x: W / 2, y: H / 2 };
    phaseRef.current   = "enter";
    phaseStart.current = performance.now();
    rafRef.current     = requestAnimationFrame(tick);
    return () => { if (rafRef.current !== null) cancelAnimationFrame(rafRef.current); };
  }, [tick]);

  const fgMuted    = dark ? "rgba(255,255,255,0.05)" : "rgba(0,0,0,0.05)";
  const labelColor = dark ? "rgba(255,255,255,0.18)" : "rgba(0,0,0,0.16)";
  const blastLabels: string[] = ["", "RADIAL BURST", "SONAR PULSE", "MATRIX RAIN"];

  return (
    <div
      ref={containerRef}
      className={className}
      style={{
        position: "relative",
        width: "100%",
        height: "100%",
        minHeight: 0,
        background: "transparent",
        overflow: "hidden",
        cursor: "auto",
      }}
    >
      {showOverlay && (
        <>
          <div style={{
            position: "absolute", inset: 0, pointerEvents: "none",
            backgroundImage: `linear-gradient(${fgMuted} 1px,transparent 1px),linear-gradient(90deg,${fgMuted} 1px,transparent 1px)`,
            backgroundSize: "40px 40px",
          }} />

          <div style={{
            position: "absolute", bottom: 24, left: "50%",
            transform: "translateX(-50%)",
            color: labelColor,
            fontSize: 11, letterSpacing: "0.18em",
            fontFamily: "monospace", userSelect: "none", pointerEvents: "none",
          }}>
            BLAST {blastType} / 3 &nbsp;·&nbsp; {blastLabels[blastType]}
          </div>
        </>
      )}

      {rings.map(r     => <RenderRing     key={r.id} r={r} dark={dark} blastType={blastType} />)}
      {particles.map(p => <RenderParticle key={p.id} p={p} dark={dark} />)}

      <CursorSVG
        dark={dark}
        style={{ left: cursorPos.x, top: cursorPos.y, opacity: cursorOpacity }}
        svgStyle={{ transform: `scale(${cursorScale})` }}
      />
    </div>
  );
}
