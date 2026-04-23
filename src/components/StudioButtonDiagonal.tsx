import React from "react";
import { motion } from "motion/react";

type Direction = { x: number; y: number };

interface StudioButtonProps {
  text?: string;
}

const cornerVariants = {
  initial: {
    x: 0,
    y: 0,
    borderColor: "rgba(255, 255, 255, 1)",
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

const StudioButtonDiagonal: React.FC<StudioButtonProps> = ({
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
        { x: -6, y: -6, pos: "top-0 left-0 border-t-2 border-l-2" },
        { x: 6, y: -6, pos: "top-0 right-0 border-t-2 border-r-2" },
        { x: -6, y: 6, pos: "bottom-0 left-0 border-b-2 border-l-2" },
        { x: 6, y: 6, pos: "bottom-0 right-0 border-b-2 border-r-2" },
      ].map((corner, i) => (
        <motion.div
          key={i}
          custom={{ x: corner.x, y: corner.y }}
          variants={cornerVariants}
          transition={springConfig}
          className={`absolute w-3 h-3 z-30 pointer-events-none ${corner.pos}`}
        />
      ))}

      <motion.button
        variants={{ tap: { scale: 0.95 } }}
        transition={{ type: "spring", damping: 15, stiffness: 400 }}
        className="relative px-8 py-3 bg-transparent overflow-hidden flex items-center justify-center"
      >
        {/* Background pattern */}
        <div
          className="absolute inset-0 opacity-15 z-0 transition-opacity group-hover:opacity-0"
          style={{
            backgroundImage:
              "repeating-linear-gradient(45deg, transparent, transparent 7px, #fff 7px, #fff 8px)",
            backgroundSize: "11.3px 11.3px",
          }}
        />

        {/* Animated fill */}
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
          transition={{
            type: "spring",
            damping: 28,
            stiffness: 150,
            mass: 0.6,
          }}
        />

        {/* Text */}
        <span className="relative z-20 transition-colors duration-500 group-hover:text-black text-white font-mono text-[11px] tracking-[0.4em] font-bold uppercase">
          {text}
        </span>
      </motion.button>
    </motion.div>
  );
};

export default StudioButtonDiagonal;
