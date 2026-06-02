import React, { useState } from 'react'
import ComponentPageLayout, { ColorPicker, ColorPreview } from './layout'
import clickFloatCode from '../../../registry/new-york/ClickFloat/ClickFloat.tsx?raw'
import ClickFloat from '../../../registry/new-york/ClickFloat/ClickFloat'
import SliderField from '../SliderField'
import CornerBrackets from '../CornerBrackets'

const Float = () => {
  const [fillColor, setFillColor] = useState("#ffffff")
  const [particleCount, setParticleCount] = useState(25)
  const [spreadX, setSpreadX] = useState(40)
  const [maxAmplitude, setMaxAmplitude] = useState(3)

  const colorOptions = ["#FFFFFF", "#000000", "#a3e635", "#f59e0b", "#8b5cf6"]

  const code = `<ClickFloat
  fillColor="${fillColor}"
  particleCount={${particleCount}}
  spreadX={${spreadX}}
  maxAmplitude={${maxAmplitude}}
>
  {/*Content div*/}
</ClickFloat>`

  return (
    <ComponentPageLayout
      title="Float"
      code={code}
      cliCode="npx shadcn@latest add https://klick-here.vercel.app/r/click-float.json"
      manualCode={clickFloatCode}
      controlTitle="Tune the float"
      controlDescription="Shape the color, particle count, horizontal spread, and sway."
      controlAdornment={<ColorPreview color={fillColor} />}
      preview={
        <ClickFloat fillColor={fillColor} particleCount={particleCount} spreadX={spreadX} maxAmplitude={maxAmplitude}>
          <div
            aria-label="Float preview target"
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
        </ClickFloat>
      }
      controls={
        <>
          <ColorPicker value={fillColor} colors={colorOptions} onChange={setFillColor} />
          <SliderField title="particleCount" min={5} max={80} step={1} value={particleCount} onChange={setParticleCount} />
          <SliderField title="spreadX" min={0} max={100} step={1} value={spreadX} onChange={setSpreadX} />
          <SliderField title="maxAmplitude" min={0.5} max={12} step={0.5} value={maxAmplitude} onChange={setMaxAmplitude} />
        </>
      }
    />
  )
}

export default Float
