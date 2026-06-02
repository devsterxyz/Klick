import React, { useState } from 'react'
import ComponentPageLayout, { ColorPicker, ColorPreview } from './layout'
import clickFireworkCode from '../../../registry/new-york/ClickFirework/ClickFirework.tsx?raw'
import ClickFirework from '../../../registry/new-york/ClickFirework/ClickFirework'
import SliderField from '../SliderField'
import CornerBrackets from '../CornerBrackets'

const Firework = () => {
  const [color, setColor] = useState("#ffffff")
  const [count, setCount] = useState(35)
  const [gravity, setGravity] = useState(0.08)
  const [friction, setFriction] = useState(0.96)

  const colorOptions = ["#FFFFFF", "#000000", "#a3e635", "#f59e0b", "#8b5cf6"]

  const code = `<ClickFirework
  color="${color}"
  count={${count}}
  gravity={${gravity}}
  friction={${friction}}
>
  {/*Content div*/}
</ClickFirework>`

  return (
    <ComponentPageLayout
      title="Firework"
      code={code}
      cliCode="npx shadcn@latest add https://klick-here.vercel.app/r/click-firework.json"
      manualCode={clickFireworkCode}
      controlTitle="Tune the firework"
      controlDescription="Shape the burst color, count, gravity, and drag."
      controlAdornment={<ColorPreview color={color} />}
      preview={
        <ClickFirework color={color} count={count} gravity={gravity} friction={friction}>
          <div
            aria-label="Firework preview target"
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
        </ClickFirework>
      }
      controls={
        <>
          <ColorPicker value={color} colors={colorOptions} onChange={setColor} />
          <SliderField title="count" min={5} max={100} step={1} value={count} onChange={setCount} />
          <SliderField title="gravity" min={0} max={0.3} step={0.01} value={gravity} onChange={setGravity} />
          <SliderField title="friction" min={0.9} max={0.99} step={0.01} value={friction} onChange={setFriction} />
        </>
      }
    />
  )
}

export default Firework
