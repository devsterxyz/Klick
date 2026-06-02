import React, { useState } from 'react'
import ComponentPageLayout, { ColorPicker, ColorPreview } from './layout'
import clickRadiateCode from '../../../registry/new-york/ClickRadiate/ClickRadiate.tsx?raw'
import ClickRadiate from '../../../registry/new-york/ClickRadiate/ClickRadiate'
import SliderField from '../SliderField'
import CornerBrackets from '../CornerBrackets'

const colorOptions = ["#FFFFFF", "#000000", "#a3e635", "#f59e0b", "#8b5cf6"]

const Radiate = () => {
  const [strokeColor, setStrokeColor] = useState("#ffffff")
  const [rayCount, setRayCount] = useState(15)
  const [lineWidth, setLineWidth] = useState(1.5)
  const [maxSpeed, setMaxSpeed] = useState(13)

  const code = `<ClickRadiate
  strokeColor="${strokeColor}"
  rayCount={${rayCount}}
  lineWidth={${lineWidth}}
  maxSpeed={${maxSpeed}}
>
  {/*Content div*/}
</ClickRadiate>`

  return (
    <ComponentPageLayout
      title="Radiate"
      code={code}
      cliCode="npx shadcn@latest add https://klick-here.vercel.app/r/click-radiate.json"
      manualCode={clickRadiateCode}
      controlTitle="Tune the radiance"
      controlDescription="Shape the ray color, count, line width, and max speed."
      controlAdornment={<ColorPreview color={strokeColor} />}
      preview={
        <ClickRadiate strokeColor={strokeColor} rayCount={rayCount} lineWidth={lineWidth} maxSpeed={maxSpeed}>
          <div aria-label="Radiate preview target" className="group/effect-card relative flex aspect-square w-[min(18rem,66vw)] items-center justify-center border border-black/15 bg-neutral-50 shadow-[0_24px_80px_-45px_rgba(0,0,0,0.65)] transition-all duration-300 hover:-translate-y-1 hover:border-black/35 hover:bg-white hover:shadow-[0_34px_90px_-46px_rgba(0,0,0,0.85)] dark:border-white/10 dark:bg-[#020202] dark:shadow-[0_24px_80px_-45px_rgba(255,255,255,0.32)] dark:hover:border-white/30 dark:hover:bg-[#080808]">
            <CornerBrackets />
            <span className="font-mono text-sm uppercase tracking-[0.24em] text-black/25 transition-colors duration-300 group-hover/effect-card:text-black/45 dark:text-white/20 dark:group-hover/effect-card:text-white/40">Click</span>
          </div>
        </ClickRadiate>
      }
      controls={
        <>
          <ColorPicker value={strokeColor} colors={colorOptions} onChange={setStrokeColor} />
          <SliderField title="rayCount" min={4} max={60} step={1} value={rayCount} onChange={setRayCount} />
          <SliderField title="lineWidth" min={0.5} max={6} step={0.5} value={lineWidth} onChange={setLineWidth} />
          <SliderField title="maxSpeed" min={4} max={30} step={1} value={maxSpeed} onChange={setMaxSpeed} />
        </>
      }
    />
  )
}

export default Radiate
