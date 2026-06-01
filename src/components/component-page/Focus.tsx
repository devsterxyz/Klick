import React, { useState } from 'react'
import ComponentPageLayout, { ColorPicker, ColorPreview } from './layout'
import clickFocusCode from '../../../registry/new-york/ClickFocus/ClickFocus.tsx?raw'
import ClickFocus from '../../../registry/new-york/ClickFocus/ClickFocus'
import SliderField from '../SliderField'
import CornerBrackets from '../CornerBrackets'

const Focus = () => {
  const [color, setColor] = useState("#ffffff")
  const [bracketSize, setBracketSize] = useState(10)
  const [lineWidth, setLineWidth] = useState(1)
  const [startDist, setStartDist] = useState(40)

  const colorOptions = ["#FFFFFF", "#000000", "#a3e635", "#f59e0b", "#8b5cf6"]

  const code = `<ClickFocus
  color="${color}"
  bracketSize={${bracketSize}}
  lineWidth={${lineWidth}}
  startDist={${startDist}}
>
  {/*Content div*/}
</ClickFocus>`

  return (
    <ComponentPageLayout
      title="Focus"
      code={code}
      cliCode="npx shadcn@latest add http://localhost:5173/r/click-focus.json"
      manualCode={clickFocusCode}
      controlTitle="Tune the focus"
      controlDescription="Shape the bracket color, size, line width, and starting distance."
      controlAdornment={<ColorPreview color={color} />}
      preview={
        <ClickFocus color={color} bracketSize={bracketSize} lineWidth={lineWidth} startDist={startDist}>
          <div
            aria-label="Focus preview target"
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
        </ClickFocus>
      }
      controls={
        <>
          <ColorPicker value={color} colors={colorOptions} onChange={setColor} />
          <SliderField title="bracketSize" min={4} max={30} step={1} value={bracketSize} onChange={setBracketSize} />
          <SliderField title="lineWidth" min={1} max={6} step={1} value={lineWidth} onChange={setLineWidth} />
          <SliderField title="startDist" min={10} max={100} step={1} value={startDist} onChange={setStartDist} />
        </>
      }
    />
  )
}

export default Focus
