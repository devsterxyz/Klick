import React, { useState } from 'react'
import ComponentPageLayout, { ColorPicker, ColorPreview } from './layout'
import clickFireTrailCode from '@/components/animation/ClickFireTrail.tsx?raw'
import ClickFireTrail from '../animation/ClickFireTrail'
import SliderField from '../SliderField'
import CornerBrackets from '../CornerBrackets'

const FireTrail = () => {
  const [particleCount, setParticleCount] = useState(15)
  const [minAmplitude, setMinAmplitude] = useState(2)
  const [maxAmplitude, setMaxAmplitude] = useState(6)
  const [fillColor, setFillColor] = useState("#ffffff")

  const colorOptions = ["#FFFFFF", "#000000", "#a3e635", "#f59e0b", "#8b5cf6"]

  const code = `<ClickFireTrail
  particleCount={${particleCount}}
  minAmplitude={${minAmplitude}}
  maxAmplitude={${maxAmplitude}}
  fillColor="${fillColor}"
>
  {/*Content div*/}
</ClickFireTrail>`

  return (
    <ComponentPageLayout
      title="Fire Trail"
      code={code}
      cliCode="npx shadcn@latest add click-fire-trail"
      manualCode={clickFireTrailCode}
      controlTitle="Tune the fire trail"
      controlDescription="Shape the particle count, wave amplitude, and color."
      controlAdornment={<ColorPreview color={fillColor} />}
      preview={
        <ClickFireTrail
          particleCount={particleCount}
          minAmplitude={minAmplitude}
          maxAmplitude={maxAmplitude}
          fillColor={fillColor}
        >
          <div
            aria-label="Fire Trail preview target"
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
        </ClickFireTrail>
      }
      controls={
        <>
          <SliderField title="particleCount" min={5} max={60} step={1} value={particleCount} onChange={setParticleCount} />
          <SliderField title="minAmplitude" min={0} max={10} step={1} value={minAmplitude} onChange={setMinAmplitude} />
          <SliderField title="maxAmplitude" min={1} max={16} step={1} value={maxAmplitude} onChange={setMaxAmplitude} />
          <ColorPicker value={fillColor} colors={colorOptions} onChange={setFillColor} />
        </>
      }
    />
  )
}

export default FireTrail
