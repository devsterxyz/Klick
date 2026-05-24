import React, { useState } from 'react'
import ComponentPageLayout from './layout'
import clickHeartCode from '@/components/animation/ClickHeart.tsx?raw'
import ClickHeart from '../animation/ClickHeart'
import SliderField from '../SliderField'
import CornerBrackets from '../CornerBrackets'

const Heart = () => {
  const [count, setCount] = useState(5)
  const [sizeMin, setSizeMin] = useState(18)
  const [sizeMax, setSizeMax] = useState(28)

  const code = `<ClickHeart
  count={${count}}
  sizeMin={${sizeMin}}
  sizeMax={${sizeMax}}
>
  {/*Content div*/}
</ClickHeart>`

  return (
    <ComponentPageLayout
      title="Heart"
      code={code}
      cliCode="npx shadcn@latest add click-heart"
      manualCode={clickHeartCode}
      controlTitle="Tune the hearts"
      controlDescription="Shape the count and size range."
      preview={
        <ClickHeart count={count} sizeMin={sizeMin} sizeMax={sizeMax}>
          <div aria-label="Heart preview target" className="group/effect-card relative flex aspect-square w-[min(18rem,66vw)] items-center justify-center border border-black/15 bg-neutral-50 shadow-[0_24px_80px_-45px_rgba(0,0,0,0.65)] transition-all duration-300 hover:-translate-y-1 hover:border-black/35 hover:bg-white hover:shadow-[0_34px_90px_-46px_rgba(0,0,0,0.85)] dark:border-white/10 dark:bg-[#020202] dark:shadow-[0_24px_80px_-45px_rgba(255,255,255,0.32)] dark:hover:border-white/30 dark:hover:bg-[#080808]">
            <CornerBrackets />
            <span className="font-mono text-sm uppercase tracking-[0.24em] text-black/25 transition-colors duration-300 group-hover/effect-card:text-black/45 dark:text-white/20 dark:group-hover/effect-card:text-white/40">Click</span>
          </div>
        </ClickHeart>
      }
      controls={
        <>
          <SliderField title="count" min={1} max={20} step={1} value={count} onChange={setCount} />
          <SliderField title="sizeMin" min={8} max={32} step={1} value={sizeMin} onChange={setSizeMin} />
          <SliderField title="sizeMax" min={12} max={56} step={1} value={sizeMax} onChange={setSizeMax} />
        </>
      }
    />
  )
}

export default Heart
