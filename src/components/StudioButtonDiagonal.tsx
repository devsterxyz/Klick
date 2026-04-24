import React from "react";
import { motion, Variants } from "motion/react";

type Direction = {
  x: number;
  y: number;
};

type ButtonProps = {
  text?: string;
};

const cornerVariants: Variants = {
  initial: {
    x: 0,
    y: 0,
    borderColor: "#6B7280",
  },
  hover: (direction: Direction) => ({
    x: direction.x,
    y: direction.y,
    borderColor: "rgba(255, 255, 255, 1)",
  }),
  tap: (direction: Direction) => ({
    x: direction.x * -0.6,
    y: direction.y * -0.6,
    borderColor: "rgba(255, 255, 255, 1)",
  }),
};

const springConfig = {
  type: "spring",
  damping: 20,
  stiffness: 400,
};

const StudioButtonDiagonal: React.FC<ButtonProps> = ({
  text = "GET EFFECT",
}) => {
  return (
    <motion.div
      className="relative group cursor-pointer select-none"
      initial="initial"
      whileHover="hover"
      whileTap="tap"
    >
      {/* Corners */}
      {[
        { pos: "top-0 left-0", dir: { x: -5, y: -5 }, border: "border-t-2 border-l-2" },
        { pos: "top-0 right-0", dir: { x: 5, y: -5 }, border: "border-t-2 border-r-2" },
        { pos: "bottom-0 left-0", dir: { x: -5, y: 5 }, border: "border-b-2 border-l-2" },
        { pos: "bottom-0 right-0", dir: { x: 5, y: 5 }, border: "border-b-2 border-r-2" },
      ].map((corner, i) => (
        <motion.div
          key={i}
          custom={corner.dir}
          variants={cornerVariants}
          transition={springConfig}
          className={`absolute ${corner.pos} w-1.5 h-1.5 ${corner.border} z-30 pointer-events-none`}
        />
      ))}

      <motion.button
        variants={{ tap: { scale: 0.95 } }}
        transition={{ type: "spring", damping: 15, stiffness: 400 }}
        className="relative px-1 py-2 bg-transparent overflow-hidden flex items-center justify-center min-w-[160px]"
      >
        {/* Pattern */}
        <div
          className="absolute inset-0 opacity-10 z-0 transition-opacity group-hover:opacity-0"
          style={{
            backgroundImage:
              "repeating-linear-gradient(45deg, transparent, transparent 7px, #fff 7px, #fff 8px)",
            backgroundSize: "11.3px 11.3px",
          }}
        />

        {/* Diagonal Fill */}
        <motion.div
          className="absolute bg-white z-10"
          style={{
            top: 0,
            left: 0,
            width: "200%",
            height: "200%",
            originX: 0,
            originY: 0,
          }}
          variants={{
            initial: { x: "-100%", y: "-100%", rotate: -5 },
            hover: { x: "-10%", y: "-10%", rotate: 0 },
          }}
          transition={{ type: "spring", damping: 28, stiffness: 150, mass: 0.6 }}
        />

        <span className="relative z-20 transition-colors duration-500 group-hover:text-black text-white font-mono text-[10px] tracking-[0.3em] font-bold uppercase">
          {text}
        </span>
      </motion.button>
    </motion.div>
  );
};

export default StudioButtonDiagonal;