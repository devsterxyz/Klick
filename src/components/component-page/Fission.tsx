import React, { useState } from 'react'
import ComponentPageLayout, { ColorPicker, ColorPreview } from './layout'
import clickFissionCode from '../../../registry/new-york/ClickFission/ClickFission.tsx?raw'
import ClickFission from '../../../registry/new-york/ClickFission/ClickFission'
import SliderField from '../SliderField'
import CornerBrackets from '../CornerBrackets'

const Fission = () => {
  const [fillColor, setFillColor] = useState("#ffffff")
  const [duration, setDuration] = useState(1500)
  const [maxSpread, setMaxSpread] = useState(40)

  const colorOptions = ["#FFFFFF", "#000000", "#a3e635", "#f59e0b", "#8b5cf6"]

  const code = `<ClickFission
  fillColor="${fillColor}"
  duration={${duration}}
  maxSpread={${maxSpread}}
>
  {/*Content div*/}
</ClickFission>`

  return (
    <ComponentPageLayout
      title="Fission"
      code={code}
      cliCode="npx shadcn@latest add https://klick-here.vercel.app/r/click-fission.json"
      manualCode={clickFissionCode}
      controlTitle="Tune the fission"
      controlDescription="Shape the color, duration, and spread."
      controlAdornment={<ColorPreview color={fillColor} />}
      preview={
        <ClickFission fillColor={fillColor} duration={duration} maxSpread={maxSpread}>
          <div
            aria-label="Fission preview target"
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
        </ClickFission>
      }
      controls={
        <>
          <ColorPicker value={fillColor} colors={colorOptions} onChange={setFillColor} />
          <SliderField title="duration" min={500} max={3000} step={100} value={duration} onChange={setDuration} />
          <SliderField title="maxSpread" min={10} max={120} step={1} value={maxSpread} onChange={setMaxSpread} />
        </>
      }
    />
  )
}

export default Fission
