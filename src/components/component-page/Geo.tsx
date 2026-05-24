import React, { useState } from 'react'
import ComponentPageLayout, { ColorPicker, ColorPreview } from './layout'
import clickGeoCode from '@/components/animation/ClickGeo.tsx?raw'
import ClickGeo from '../animation/ClickGeo'
import SliderField from '../SliderField'
import CornerBrackets from '../CornerBrackets'

const colorOptions = ["#FFFFFF", "#000000", "#a3e635", "#f59e0b", "#8b5cf6"]

const Geo = () => {
  const [color, setColor] = useState("#ffffff")
  const [lineWidth, setLineWidth] = useState(1)

  const code = `<ClickGeo
  color="${color}"
  lineWidth={${lineWidth}}
>
  {/*Content div*/}
</ClickGeo>`

  return (
    <ComponentPageLayout
      title="Geo"
      code={code}
      cliCode="npx shadcn@latest add click-geo"
      manualCode={clickGeoCode}
      controlTitle="Tune the geometry"
      controlDescription="Shape the line color and width."
      controlAdornment={<ColorPreview color={color} />}
      preview={
        <ClickGeo color={color} lineWidth={lineWidth}>
          <div aria-label="Geo preview target" className="group/effect-card relative flex aspect-square w-[min(18rem,66vw)] items-center justify-center border border-black/15 bg-neutral-50 shadow-[0_24px_80px_-45px_rgba(0,0,0,0.65)] transition-all duration-300 hover:-translate-y-1 hover:border-black/35 hover:bg-white hover:shadow-[0_34px_90px_-46px_rgba(0,0,0,0.85)] dark:border-white/10 dark:bg-[#020202] dark:shadow-[0_24px_80px_-45px_rgba(255,255,255,0.32)] dark:hover:border-white/30 dark:hover:bg-[#080808]">
            <CornerBrackets />
            <span className="font-mono text-sm uppercase tracking-[0.24em] text-black/25 transition-colors duration-300 group-hover/effect-card:text-black/45 dark:text-white/20 dark:group-hover/effect-card:text-white/40">Click</span>
          </div>
        </ClickGeo>
      }
      controls={
        <>
          <ColorPicker value={color} colors={colorOptions} onChange={setColor} />
          <SliderField title="lineWidth" min={1} max={8} step={1} value={lineWidth} onChange={setLineWidth} />
        </>
      }
    />
  )
}

export default Geo
