import React, { useState } from 'react'
import ComponentPageLayout, { ColorPicker, ColorPreview } from './layout'
import clickRippleCode from '../../../registry/new-york/ClickRipple/ClickRipple.tsx?raw'
import ClickRipple from '../../../registry/new-york/ClickRipple/ClickRipple'
import SliderField from '../SliderField'
import CornerBrackets from '../CornerBrackets'

const colorOptions = ["#FFFFFF", "#000000", "#a3e635", "#f59e0b", "#8b5cf6"]

const Ripple = () => {
  const [color, setColor] = useState("#ffffff")
  const [lineWidth, setLineWidth] = useState(0.5)
  const [maxRadius, setMaxRadius] = useState(50)
  const [rippleCount, setRippleCount] = useState(5)

  const code = `<ClickRipple
  color="${color}"
  lineWidth={${lineWidth}}
  maxRadius={${maxRadius}}
  rippleCount={${rippleCount}}
>
  {/*Content div*/}
</ClickRipple>`

  return (
    <ComponentPageLayout
      title="Ripple"
      code={code}
      cliCode="npx shadcn@latest add http://localhost:5173/r/click-ripple.json"
      manualCode={clickRippleCode}
      controlTitle="Tune the ripple"
      controlDescription="Shape the color, line width, radius, and ripple count."
      controlAdornment={<ColorPreview color={color} />}
      preview={
        <ClickRipple color={color} lineWidth={lineWidth} maxRadius={maxRadius} rippleCount={rippleCount}>
          <div aria-label="Ripple preview target" className="group/effect-card relative flex aspect-square w-[min(18rem,66vw)] items-center justify-center border border-black/15 bg-neutral-50 shadow-[0_24px_80px_-45px_rgba(0,0,0,0.65)] transition-all duration-300 hover:-translate-y-1 hover:border-black/35 hover:bg-white hover:shadow-[0_34px_90px_-46px_rgba(0,0,0,0.85)] dark:border-white/10 dark:bg-[#020202] dark:shadow-[0_24px_80px_-45px_rgba(255,255,255,0.32)] dark:hover:border-white/30 dark:hover:bg-[#080808]">
            <CornerBrackets />
            <span className="font-mono text-sm uppercase tracking-[0.24em] text-black/25 transition-colors duration-300 group-hover/effect-card:text-black/45 dark:text-white/20 dark:group-hover/effect-card:text-white/40">Click</span>
          </div>
        </ClickRipple>
      }
      controls={
        <>
          <ColorPicker value={color} colors={colorOptions} onChange={setColor} />
          <SliderField title="lineWidth" min={0.5} max={6} step={0.5} value={lineWidth} onChange={setLineWidth} />
          <SliderField title="maxRadius" min={20} max={180} step={1} value={maxRadius} onChange={setMaxRadius} />
          <SliderField title="rippleCount" min={1} max={12} step={1} value={rippleCount} onChange={setRippleCount} />
        </>
      }
    />
  )
}

export default Ripple
