import React, { useState } from 'react'
import ComponentPageLayout, { ColorPicker, ColorPreview } from './layout'
import clickFusionCode from '../../../registry/new-york/ClickFusion/ClickFusion.tsx?raw'
import ClickFusion from '../../../registry/new-york/ClickFusion/ClickFusion'
import SliderField from '../SliderField'
import CornerBrackets from '../CornerBrackets'

const Fusion = () => {
  const [strokeColor, setStrokeColor] = useState("#ffffff")
  const [particleCount, setParticleCount] = useState(20)
  const [burstRadius, setBurstRadius] = useState(40)
  const [maxSpread, setMaxSpread] = useState(100)

  const colorOptions = ["#FFFFFF", "#000000", "#a3e635", "#f59e0b", "#8b5cf6"]

  const code = `<ClickFusion
  strokeColor="${strokeColor}"
  particleCount={${particleCount}}
  burstRadius={${burstRadius}}
  maxSpread={${maxSpread}}
>
  {/*Content div*/}
</ClickFusion>`

  return (
    <ComponentPageLayout
      title="Fusion"
      code={code}
      cliCode="npx shadcn@latest add devsterxyz/Klick/click-fusion"
      manualCode={clickFusionCode}
      controlTitle="Tune the fusion"
      controlDescription="Shape the color, particle count, burst radius, and spread."
      controlAdornment={<ColorPreview color={strokeColor} />}
      preview={
        <ClickFusion
          strokeColor={strokeColor}
          particleCount={particleCount}
          burstRadius={burstRadius}
          maxSpread={maxSpread}
        >
          <div
            aria-label="Fusion preview target"
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
        </ClickFusion>
      }
      controls={
        <>
          <ColorPicker value={strokeColor} colors={colorOptions} onChange={setStrokeColor} />
          <SliderField title="particleCount" min={5} max={80} step={1} value={particleCount} onChange={setParticleCount} />
          <SliderField title="burstRadius" min={10} max={100} step={1} value={burstRadius} onChange={setBurstRadius} />
          <SliderField title="maxSpread" min={20} max={180} step={1} value={maxSpread} onChange={setMaxSpread} />
        </>
      }
    />
  )
}

export default Fusion
