import React, { useState } from 'react'
import ComponentPageLayout from './layout'
import clickGhostCode from '../../../registry/new-york/ClickGhost/ClickGhost.tsx?raw'
import ClickGhost from '../../../registry/new-york/ClickGhost/ClickGhost'
import SliderField from '../SliderField'
import CornerBrackets from '../CornerBrackets'

const Ghost = () => {
  const [count, setCount] = useState(6)
  const [scatter, setScatter] = useState(40)
  const [size, setSize] = useState(24)

  const code = `<ClickGhost
  count={${count}}
  scatter={${scatter}}
  size={${size}}
>
  {/*Content div*/}
</ClickGhost>`

  return (
    <ComponentPageLayout
      title="Ghost"
      code={code}
      cliCode="npx shadcn@latest add http://localhost:5173/r/click-ghost.json"
      manualCode={clickGhostCode}
      controlTitle="Tune the ghost"
      controlDescription="Shape the count, scatter, and size."
      preview={
        <ClickGhost count={count} scatter={scatter} size={size}>
          <div aria-label="Ghost preview target" className="group/effect-card relative flex aspect-square w-[min(18rem,66vw)] items-center justify-center border border-black/15 bg-neutral-50 shadow-[0_24px_80px_-45px_rgba(0,0,0,0.65)] transition-all duration-300 hover:-translate-y-1 hover:border-black/35 hover:bg-white hover:shadow-[0_34px_90px_-46px_rgba(0,0,0,0.85)] dark:border-white/10 dark:bg-[#020202] dark:shadow-[0_24px_80px_-45px_rgba(255,255,255,0.32)] dark:hover:border-white/30 dark:hover:bg-[#080808]">
            <CornerBrackets />
            <span className="font-mono text-sm uppercase tracking-[0.24em] text-black/25 transition-colors duration-300 group-hover/effect-card:text-black/45 dark:text-white/20 dark:group-hover/effect-card:text-white/40">Click</span>
          </div>
        </ClickGhost>
      }
      controls={
        <>
          <SliderField title="count" min={1} max={20} step={1} value={count} onChange={setCount} />
          <SliderField title="scatter" min={0} max={120} step={1} value={scatter} onChange={setScatter} />
          <SliderField title="size" min={12} max={56} step={1} value={size} onChange={setSize} />
        </>
      }
    />
  )
}

export default Ghost
