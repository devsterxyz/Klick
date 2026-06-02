import React, { useState } from 'react'
import ComponentPageLayout from './layout'
import clickBlastCode from '../../../registry/new-york/ClickBlast/ClickBlast.tsx?raw'
import ClickBlast from '../../../registry/new-york/ClickBlast/ClickBlast'
import SliderField from '../SliderField'
import { ColorPicker, ColorPreview } from './layout'
import CornerBrackets from '@/components/CornerBrackets'

export default function Blast() {
  const [particleCount, setParticleCount] = useState(40)
  const [spread, setSpread] = useState(1)
  const [duration, setDuration] = useState(1200)
  const [strokeColor, setStrokeColor] = useState("#ffffff")

  const colorOptions = ["#FFFFFF", "#000000", "#a3e635", "#f59e0b", "#8b5cf6"];

  const code = `<ClickBlast
  particleCount={${particleCount}}
  spread={${spread}}
  duration={${duration}}
  strokeColor="${strokeColor}"
>
  {/*Content div*/}
</ClickBlast>`
  return (
    <ComponentPageLayout
      title="Blast"
      code={code}
      cliCode="npx shadcn@latest add https://klick-here.vercel.app/r/click-blast.json"
      manualCode={clickBlastCode}
      controlTitle="Tune the burst"
      controlDescription="Shape how noisy, fast, and visible each click feels."
      controlAdornment={<ColorPreview color={strokeColor} />}
      preview={
        <ClickBlast
          particleCount={particleCount}
          spread={spread}
          duration={duration}
          fillColor={strokeColor}
        >
          <div
            aria-label="Blast preview target"
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
        </ClickBlast>
      }
      controls={
        <>
          <SliderField
            title="particleCount"
            min={20}
            max={80}
            value={particleCount}
            onChange={(value) => setParticleCount(value)}
          />
          <SliderField
            title="Spread"
            min={1}
            max={5}
            value={spread}
            onChange={(value) => setSpread(value)}
          />
          <SliderField
            title="Duration"
            min={500}
            max={2000}
            value={duration}
            onChange={(value) => setDuration(value)}
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


