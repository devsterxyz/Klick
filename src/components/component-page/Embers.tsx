import React, { useState } from 'react'
import ComponentPageLayout, { ColorPicker, ColorPreview } from './layout'
import clickEmbersCode from '../../../registry/new-york/ClickEmbers/ClickEmbers.tsx?raw'
import ClickEmbers from '../../../registry/new-york/ClickEmbers/ClickEmbers'
import SliderField from '../SliderField'
import CornerBrackets from '../CornerBrackets'

const Embers = () => {
  const [particleCount, setParticleCount] = useState(30)
  const [gravity, setGravity] = useState(0.15)
  const [spreadSpeed, setSpreadSpeed] = useState(5)
  const [strokeColor, setStrokeColor] = useState("#ffffff")

  const colorOptions = ["#FFFFFF", "#000000", "#a3e635", "#f59e0b", "#8b5cf6"]

  const code = `<ClickEmbers
  particleCount={${particleCount}}
  gravity={${gravity}}
  spreadSpeed={${spreadSpeed}}
  strokeColor="${strokeColor}"
>
  {/*Content div*/}
</ClickEmbers>`

  return (
    <ComponentPageLayout
      title="Embers"
      code={code}
      cliCode="npx shadcn@latest add devsterxyz/Klick/click-embers"
      manualCode={clickEmbersCode}
      controlTitle="Tune the embers"
      controlDescription="Shape the ember count, fall, spread, and color."
      controlAdornment={<ColorPreview color={strokeColor} />}
      preview={
        <ClickEmbers
          particleCount={particleCount}
          gravity={gravity}
          spreadSpeed={spreadSpeed}
          strokeColor={strokeColor}
        >
          <div
            aria-label="Embers preview target"
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
        </ClickEmbers>
      }
      controls={
        <>
          <SliderField
            title="particleCount"
            min={5}
            max={80}
            step={1}
            value={particleCount}
            onChange={(value) => setParticleCount(value)}
          />
          <SliderField
            title="gravity"
            min={0}
            max={0.6}
            step={0.05}
            value={gravity}
            onChange={(value) => setGravity(value)}
          />
          <SliderField
            title="spreadSpeed"
            min={1}
            max={12}
            step={0.5}
            value={spreadSpeed}
            onChange={(value) => setSpreadSpeed(value)}
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

export default Embers
