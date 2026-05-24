import React, { useState } from 'react'
import ComponentPageLayout from './layout'
import ClickDiffusion from '../animation/ClickDiffusion'
import ClickDiffusionCode from '../animation/ClickDiffusion.tsx?raw'
import CornerBrackets from '../CornerBrackets'
import SliderField from '../SliderField'
import { ColorPicker, ColorPreview } from './layout'

const Diffusion = () => {
  const [dotSize, setDotSize] = useState(2)
  const [count, setCount] = useState(30)
  const [radius, setRadius] = useState(25)
  const [strokeColor, setStrokeColor] = useState("#ffffff");

  const colorOptions = ["#FFFFFF", "#000000", "#a3e635", "#f59e0b", "#8b5cf6"];

  const code = `<ClickDiffusion
  dotSize={${dotSize}}
  count={${count}}
  radius={${radius}}
  strokeColor="${strokeColor}"
>
  {/*Content div*/}
</ClickDiffusion>`
  return (
    <ComponentPageLayout
      title="Agitate"
      code={code}
      cliCode="npx shadcn@latest add click-agitate"
      manualCode={ClickDiffusionCode}
      controlTitle="Tune the burst"
      controlDescription="Shape how noisy, fast, and visible each click feels."
      controlAdornment={<ColorPreview color={strokeColor} />}
      preview={
        <ClickDiffusion
          dotSize={dotSize}
          count={count}
          radius={radius}
          color={strokeColor}
        >
          <div
            aria-label="Diffusion preview target"
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
        </ClickDiffusion>
      }
      controls={
        <>
          <SliderField
            title="dotSize"
            min={1}
            max={5}
            value={dotSize}
            onChange={(value) => setDotSize(value)}
          />
          <SliderField
            title="count"
            min={10}
            max={70}
            value={count}
            onChange={(value) => setCount(value)}
          />
          <SliderField
            title="radius"
            min={10}
            max={100}
            value={radius}
            onChange={(value) => setRadius(value)}
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

export default Diffusion