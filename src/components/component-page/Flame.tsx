import React, { useState } from 'react'
import ComponentPageLayout, { ColorPicker, ColorPreview } from './layout'
import clickFlameCode from '../../../registry/new-york/ClickFlame/ClickFlame.tsx?raw'
import ClickFlame from '../../../registry/new-york/ClickFlame/ClickFlame'
import SliderField from '../SliderField'
import CornerBrackets from '../CornerBrackets'

const Flame = () => {
  const [dotColor, setDotColor] = useState("#f59e0b")
  const [particleCount, setParticleCount] = useState(25)
  const [spreadX, setSpreadX] = useState(20)
  const [spreadY, setSpreadY] = useState(10)

  const colorOptions = ["#FFFFFF", "#000000", "#a3e635", "#f59e0b", "#8b5cf6"]

  const code = `<ClickFlame
  dotColor="${dotColor}"
  particleCount={${particleCount}}
  spreadX={${spreadX}}
  spreadY={${spreadY}}
>
  {/*Content div*/}
</ClickFlame>`

  return (
    <ComponentPageLayout
      title="Flame"
      code={code}
      cliCode="npx shadcn@latest add devsterxyz/Klick/click-flame"
      manualCode={clickFlameCode}
      controlTitle="Tune the flame"
      controlDescription="Shape the color, particle count, and spread."
      controlAdornment={<ColorPreview color={dotColor} />}
      preview={
        <ClickFlame dotColor={dotColor} particleCount={particleCount} spreadX={spreadX} spreadY={spreadY}>
          <div
            aria-label="Flame preview target"
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
        </ClickFlame>
      }
      controls={
        <>
          <ColorPicker value={dotColor} colors={colorOptions} onChange={setDotColor} />
          <SliderField title="particleCount" min={5} max={80} step={1} value={particleCount} onChange={setParticleCount} />
          <SliderField title="spreadX" min={0} max={80} step={1} value={spreadX} onChange={setSpreadX} />
          <SliderField title="spreadY" min={0} max={60} step={1} value={spreadY} onChange={setSpreadY} />
        </>
      }
    />
  )
}

export default Flame
