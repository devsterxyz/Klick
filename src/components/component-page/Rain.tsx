import React, { useState } from 'react'
import ComponentPageLayout, { ColorPicker, ColorPreview } from './layout'
import clickRainCode from '../../../registry/new-york/ClickRain/ClickRain.tsx?raw'
import ClickRain from '../../../registry/new-york/ClickRain/ClickRain'
import SliderField from '../SliderField'
import CornerBrackets from '../CornerBrackets'

const colorOptions = ["#FFFFFF", "#000000", "#a3e635", "#f59e0b", "#8b5cf6"]

const Rain = () => {
  const [strokeColor, setStrokeColor] = useState("#ffffff")
  const [dropCount, setDropCount] = useState(15)
  const [spreadX, setSpreadX] = useState(120)
  const [streakHeight, setStreakHeight] = useState(15)

  const code = `<ClickRain
  strokeColor="${strokeColor}"
  dropCount={${dropCount}}
  spreadX={${spreadX}}
  streakHeight={${streakHeight}}
>
  {/*Content div*/}
</ClickRain>`

  return (
    <ComponentPageLayout
      title="Rain"
      code={code}
      cliCode="npx shadcn@latest add http://localhost:5173/r/click-rain.json"
      manualCode={clickRainCode}
      controlTitle="Tune the rain"
      controlDescription="Shape the stroke color, drop count, spread, and streak height."
      controlAdornment={<ColorPreview color={strokeColor} />}
      preview={
        <ClickRain strokeColor={strokeColor} dropCount={dropCount} spreadX={spreadX} streakHeight={streakHeight}>
          <div aria-label="Rain preview target" className="group/effect-card relative flex aspect-square w-[min(18rem,66vw)] items-center justify-center border border-black/15 bg-neutral-50 shadow-[0_24px_80px_-45px_rgba(0,0,0,0.65)] transition-all duration-300 hover:-translate-y-1 hover:border-black/35 hover:bg-white hover:shadow-[0_34px_90px_-46px_rgba(0,0,0,0.85)] dark:border-white/10 dark:bg-[#020202] dark:shadow-[0_24px_80px_-45px_rgba(255,255,255,0.32)] dark:hover:border-white/30 dark:hover:bg-[#080808]">
            <CornerBrackets />
            <span className="font-mono text-sm uppercase tracking-[0.24em] text-black/25 transition-colors duration-300 group-hover/effect-card:text-black/45 dark:text-white/20 dark:group-hover/effect-card:text-white/40">Click</span>
          </div>
        </ClickRain>
      }
      controls={
        <>
          <ColorPicker value={strokeColor} colors={colorOptions} onChange={setStrokeColor} />
          <SliderField title="dropCount" min={3} max={60} step={1} value={dropCount} onChange={setDropCount} />
          <SliderField title="spreadX" min={20} max={240} step={1} value={spreadX} onChange={setSpreadX} />
          <SliderField title="streakHeight" min={4} max={50} step={1} value={streakHeight} onChange={setStreakHeight} />
        </>
      }
    />
  )
}

export default Rain
