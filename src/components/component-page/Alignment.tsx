import React, { useState } from 'react'
import ComponentPageLayout from './layout'
import clickAlignmentCode from "@/components/animation/ClickAlignment.tsx?raw";
import CornerBrackets from '../CornerBrackets'
import SliderField from '../SliderField'
import { ColorPicker, ColorPreview } from './layout'
import ClickAlignment from '../animation/ClickAlignment';

const Alignment = () => {
  const [dotSize, setDotSize] = useState(2)
  const [count, setCount] = useState(20)
  const [spread, setSpread] = useState(80)
  const [strokeColor, setStrokeColor] = useState("#ffffff")

  const colorOptions = ["#FFFFFF", "#000000", "#a3e635", "#f59e0b", "#8b5cf6"];

  const code = `<ClickAlignment
    dotSize={${dotSize}}
    count={${count}}
    spread={${spread}}
    color="${strokeColor}"
  >
    {/*Content div*/}
  </ClickAlignment>`;
  return (
    <ComponentPageLayout
      title="Alignment"
      code={code}
      cliCode="npx shadcn@latest add click-alignment"
      manualCode={clickAlignmentCode}
      controlTitle="Tune the grid"
      controlDescription="Shape the dot size, density, and alignment spread."
      controlAdornment={<ColorPreview color={strokeColor} />}
      preview={
        <ClickAlignment
          dotSize={dotSize}
          count={count}
          spread={spread}
          color={strokeColor}
        >
          <div
            aria-label="Alignment preview target"
            className="group/effect-card relative flex aspect-square w-[min(18rem,66vw)] items-center justify-center
            border border-black/15 bg-neutral-50 shadow-[0_24px_80px_-45px_rgba(0,0,0,0.65)]
            transition-all duration-300 hover:-translate-y-1 hover:border-black/35 hover:bg-white hover:shadow-[0_34px_90px_-46px_rgba(0,0,0,0.85)]
            dark:border-white/10 dark:bg-[#020202] dark:shadow-[0_24px_80px_-45px_rgba(255,255,255,0.32)] dark:hover:border-white/30 dark:hover:bg-[#080808]"
          >
            <CornerBrackets />
            <span className="font-mono text-sm uppercase tracking-[0.24em] text-black/25 transition-colors duration-300 group-hover/effect-card:text-black/45 dark:text-white/20 dark:group-hover/effect-card:text-white/40">
              Click
            </span>
          </div>
        </ClickAlignment>
      }
      controls={
        <>
          <SliderField
            title="dotSize"
            min={1}
            max={5}
            step={0.5}
            value={dotSize}
            onChange={(value) => setDotSize(value)}
          />
          <SliderField
            title="count"
            min={10}
            max={50}
            value={count}
            onChange={(value) => setCount(value)}
          />
          <SliderField
            title="spread"
            min={50}
            max={200}
            value={spread}
            onChange={(value) => setSpread(value)}
          />
          <ColorPicker
            value={strokeColor}
            colors={colorOptions}
            onChange={(value) => setStrokeColor(value)}
          />
        </>
      }
    />
  );
}

export default Alignment
