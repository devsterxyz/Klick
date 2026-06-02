import React, { useState } from 'react'
import ComponentPageLayout from './layout'
import clickFireCode from '../../../registry/new-york/ClickFire/ClickFire.tsx?raw'
import ClickFire from '../../../registry/new-york/ClickFire/ClickFire'
import SliderField from '../SliderField'
import CornerBrackets from '../CornerBrackets'

const Fire = () => {
  const [count, setCount] = useState(3)
  const [minSize, setMinSize] = useState(16)
  const [maxSize, setMaxSize] = useState(28)

  const code = `<ClickFire
  count={${count}}
  minSize={${minSize}}
  maxSize={${maxSize}}
>
  {/*Content div*/}
</ClickFire>`

  return (
    <ComponentPageLayout
      title="Fire"
      code={code}
      cliCode="npx shadcn@latest add https://klick-here.vercel.app/r/click-fire.json"
      manualCode={clickFireCode}
      controlTitle="Tune the fire"
      controlDescription="Shape the flame count and particle size."
      preview={
        <ClickFire count={count} minSize={minSize} maxSize={maxSize}>
          <div
            aria-label="Fire preview target"
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
        </ClickFire>
      }
      controls={
        <>
          <SliderField title="count" min={1} max={12} step={1} value={count} onChange={setCount} />
          <SliderField title="minSize" min={8} max={32} step={1} value={minSize} onChange={setMinSize} />
          <SliderField title="maxSize" min={12} max={48} step={1} value={maxSize} onChange={setMaxSize} />
        </>
      }
    />
  )
}

export default Fire
