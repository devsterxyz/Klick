import React from "react";

type SliderFieldProps = {
  title: string;
  min?: number;
  max?: number;
  value: number;
  onChange: (val: number) => void;
};

const SliderField = ({
  title,
  min = 0,
  max = 100,
  value,
  onChange,
}: SliderFieldProps) => {
  return (
    <div className="w-59 max-w-md mb-6 group">
      {/* Label + Value */}
      <div className="flex justify-between items-end mb-2 font-mono">
        <span className="text-[11px] uppercase tracking-[0.2em] text-gray-500 dark:text-gray-400 group-hover:text-gray-700 dark:group-hover:text-gray-200 transition-colors">
          {title}
        </span>
        <span className="text-xs text-black dark:text-white tabular-nums opacity-80">
          {value.toString().padStart(3, "0")}
        </span>
      </div>

      {/* Slider */}
      <div className="relative flex items-center h-6">
        {/* Track */}
        <div className="absolute w-full h-[1px] bg-black/10 dark:bg-white/10 group-hover:bg-black/20 dark:group-hover:bg-white/20 transition-colors"></div>

        {/* Input */}
        <input
          type="range"
          min={min}
          max={max}
          value={value}
          onChange={(e) => onChange(parseInt(e.target.value))}
          className="absolute w-full appearance-none bg-transparent cursor-pointer z-10 focus:outline-none
            [&::-webkit-slider-runnable-track]:appearance-none
            [&::-webkit-slider-thumb]:appearance-none
            [&::-webkit-slider-thumb]:h-5
            [&::-webkit-slider-thumb]:w-5
            [&::-webkit-slider-thumb]:rounded-full
            [&::-webkit-slider-thumb]:border
            [&::-webkit-slider-thumb]:border-black dark:[&::-webkit-slider-thumb]:border-white
            [&::-webkit-slider-thumb]:bg-white dark:[&::-webkit-slider-thumb]:bg-black
            [&::-webkit-slider-thumb]:transition-all
            [&::-webkit-slider-thumb]:active:scale-110
            [&::-moz-range-thumb]:h-5
            [&::-moz-range-thumb]:w-5
            [&::-moz-range-thumb]:rounded-full
            [&::-moz-range-thumb]:border
            [&::-moz-range-thumb]:border-black dark:[&::-moz-range-thumb]:border-white
            [&::-moz-range-thumb]:bg-white dark:[&::-moz-range-thumb]:bg-black"
        />
      </div>
    </div>
  );
};

export default SliderField;