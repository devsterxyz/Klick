import React, { useState } from 'react'
import ComponentPageLayout, { ColorPicker, ColorPreview } from './layout';
import ClickBlackHoleCode from '../../../registry/new-york/ClickBlackHole/ClickBlackHole.tsx?raw';
import ClickBlackHole from '../../../registry/new-york/ClickBlackHole/ClickBlackHole';
import CornerBrackets from '../CornerBrackets';
import SliderField from '../SliderField';

export default function BlackHole() {
  const [dotSize, setDotSize] = useState(2)

  const [strokeColor, setStrokeColor] = useState("#ffffff");
  const [count, setCount] = useState(40)
  const [coreRadius, setCoreRadius] = useState(8)
  const colorOptions = ["#FFFFFF", "#000000", "#a3e635", "#f59e0b", "#8b5cf6"];

  const code = `<ClickBlackHole
  dotSize={${dotSize}}
  count={${count}}
  coreRadius={${coreRadius}}
  color="${strokeColor}"
>
  {/*Content div*/}
</ClickBlackHole>`
  return (
    <ComponentPageLayout
      title="Black Hole"
      code={code}
      cliCode="npx shadcn@latest add https://klick-here.vercel.app/r/click-black-hole.json"
      manualCode={ClickBlackHoleCode}
      controlTitle="Tune the gravity"
      controlDescription="Shape the orbiting dots, core radius, and color."
      controlAdornment={<ColorPreview color={strokeColor} />}
      preview={
        <ClickBlackHole
          dotSize={dotSize}
          count={count}
          coreRadius={coreRadius}
          color={strokeColor}
        >
          <div
            aria-label="Black Hole preview target"
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
        </ClickBlackHole>
      }
      controls={
        <>
          <SliderField
            title="Dot Size"
            min={1}
            max={5}
            value={dotSize}
            onChange={(value) => setDotSize(value)}
          />
          <SliderField
            title="Count"
            min={10}
            max={90}
            value={count}
            onChange={(value) => setCount(value)}
          />
          <SliderField
            title="Core Radius"
            min={4}
            max={16}
            value={coreRadius}
            onChange={(value) => setCoreRadius(value)}
          />
          <ColorPicker
            value={strokeColor}
            colors={colorOptions}
            onChange={(value) => setStrokeColor(value)}
          />
        </>
      }
    />
  )
}

