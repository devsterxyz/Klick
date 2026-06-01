import React, { useState } from 'react'
import ComponentPageLayout, { ColorPicker, ColorPreview } from './layout'
import clickPingCode from '../../../registry/new-york/ClickPing/ClickPing.tsx?raw'
import ClickPing from '../../../registry/new-york/ClickPing/ClickPing'
import SliderField from '../SliderField'
import CornerBrackets from '../CornerBrackets'

const colorOptions = ["#FFFFFF", "#000000", "#a3e635", "#f59e0b", "#8b5cf6"]

const Ping = () => {
  const [color, setColor] = useState("#ffffff")
  const [ringLineWidth, setRingLineWidth] = useState(1.5)
  const [dotSize, setDotSize] = useState(3)
  const [maxRadius, setMaxRadius] = useState(80)

  const code = `<ClickPing
  color="${color}"
  ringLineWidth={${ringLineWidth}}
  dotSize={${dotSize}}
  maxRadius={${maxRadius}}
>
  {/*Content div*/}
</ClickPing>`

  return (
    <ComponentPageLayout
      title="Ping"
      code={code}
      cliCode="npx shadcn@latest add http://localhost:5173/r/click-ping.json"
      manualCode={clickPingCode}
      controlTitle="Tune the ping"
      controlDescription="Shape the color, ring width, dot size, and radius."
      controlAdornment={<ColorPreview color={color} />}
      preview={
        <ClickPing color={color} ringLineWidth={ringLineWidth} dotSize={dotSize} maxRadius={maxRadius}>
          <div aria-label="Ping preview target" className="group/effect-card relative flex aspect-square w-[min(18rem,66vw)] items-center justify-center border border-black/15 bg-neutral-50 shadow-[0_24px_80px_-45px_rgba(0,0,0,0.65)] transition-all duration-300 hover:-translate-y-1 hover:border-black/35 hover:bg-white hover:shadow-[0_34px_90px_-46px_rgba(0,0,0,0.85)] dark:border-white/10 dark:bg-[#020202] dark:shadow-[0_24px_80px_-45px_rgba(255,255,255,0.32)] dark:hover:border-white/30 dark:hover:bg-[#080808]">
            <CornerBrackets />
            <span className="font-mono text-sm uppercase tracking-[0.24em] text-black/25 transition-colors duration-300 group-hover/effect-card:text-black/45 dark:text-white/20 dark:group-hover/effect-card:text-white/40">Click</span>
          </div>
        </ClickPing>
      }
      controls={
        <>
          <ColorPicker value={color} colors={colorOptions} onChange={setColor} />
          <SliderField title="ringLineWidth" min={0.5} max={8} step={0.5} value={ringLineWidth} onChange={setRingLineWidth} />
          <SliderField title="dotSize" min={1} max={12} step={1} value={dotSize} onChange={setDotSize} />
          <SliderField title="maxRadius" min={20} max={180} step={1} value={maxRadius} onChange={setMaxRadius} />
        </>
      }
    />
  )
}

export default Ping
