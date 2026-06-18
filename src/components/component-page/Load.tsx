import React, { useState } from 'react'
import ComponentPageLayout, { ColorPicker, ColorPreview } from './layout'
import clickLoadCode from '../../../registry/new-york/ClickLoad/ClickLoad.tsx?raw'
import ClickLoad from '../../../registry/new-york/ClickLoad/ClickLoad'
import SliderField from '../SliderField'
import CornerBrackets from '../CornerBrackets'

const colorOptions = ["#FFFFFF", "#000000", "#a3e635", "#f59e0b", "#8b5cf6"]

const Load = () => {
  const [color, setColor] = useState("#ffffff")
  const [decay, setDecay] = useState(0.015)
  const [speed, setSpeed] = useState(2.5)

  const code = `<ClickLoad
  color="${color}"
  decay={${decay}}
  speed={${speed}}
>
  {/*Content div*/}
</ClickLoad>`

  return (
    <ComponentPageLayout
      title="Load"
      code={code}
      cliCode="npx shadcn@latest add devsterxyz/Klick/click-load"
      manualCode={clickLoadCode}
      controlTitle="Tune the loader"
      controlDescription="Shape the color, fade, and loading speed."
      controlAdornment={<ColorPreview color={color} />}
      preview={
        <ClickLoad color={color} decay={decay} speed={speed}>
          <div aria-label="Load preview target" className="group/effect-card relative flex aspect-square w-[min(18rem,66vw)] items-center justify-center border border-black/15 bg-neutral-50 shadow-[0_24px_80px_-45px_rgba(0,0,0,0.65)] transition-all duration-300 hover:-translate-y-1 hover:border-black/35 hover:bg-white hover:shadow-[0_34px_90px_-46px_rgba(0,0,0,0.85)] dark:border-white/10 dark:bg-[#020202] dark:shadow-[0_24px_80px_-45px_rgba(255,255,255,0.32)] dark:hover:border-white/30 dark:hover:bg-[#080808]">
            <CornerBrackets />
            <span className="font-mono text-sm uppercase tracking-[0.24em] text-black/25 transition-colors duration-300 group-hover/effect-card:text-black/45 dark:text-white/20 dark:group-hover/effect-card:text-white/40">Click</span>
          </div>
        </ClickLoad>
      }
      controls={
        <>
          <ColorPicker value={color} colors={colorOptions} onChange={setColor} />
          <SliderField title="decay" min={0.005} max={0.05} step={0.005} value={decay} onChange={setDecay} />
          <SliderField title="speed" min={0.5} max={8} step={0.5} value={speed} onChange={setSpeed} />
        </>
      }
    />
  )
}

export default Load
