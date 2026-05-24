import React, { useState } from 'react'
import ComponentPageLayout, { ColorPicker, ColorPreview } from './layout'
import clickQuantumCode from '@/components/animation/ClickQuantum.tsx?raw'
import ClickQuantum from '../animation/ClickQuantum'
import SliderField from '../SliderField'
import CornerBrackets from '../CornerBrackets'

const colorOptions = ["#FFFFFF", "#000000", "#a3e635", "#f59e0b", "#8b5cf6"]

const Quantum = () => {
  const [strokeColor, setStrokeColor] = useState("#ffffff")
  const [particleCount, setParticleCount] = useState(15)
  const [spreadRadius, setSpreadRadius] = useState(80)
  const [teleportInterval, setTeleportInterval] = useState(10)

  const code = `<ClickQuantum
  strokeColor="${strokeColor}"
  particleCount={${particleCount}}
  spreadRadius={${spreadRadius}}
  teleportInterval={${teleportInterval}}
>
  {/*Content div*/}
</ClickQuantum>`

  return (
    <ComponentPageLayout
      title="Quantum"
      code={code}
      cliCode="npx shadcn@latest add click-quantum"
      manualCode={clickQuantumCode}
      controlTitle="Tune the quantum"
      controlDescription="Shape the color, particle count, spread, and teleport timing."
      controlAdornment={<ColorPreview color={strokeColor} />}
      preview={
        <ClickQuantum strokeColor={strokeColor} particleCount={particleCount} spreadRadius={spreadRadius} teleportInterval={teleportInterval}>
          <div aria-label="Quantum preview target" className="group/effect-card relative flex aspect-square w-[min(18rem,66vw)] items-center justify-center border border-black/15 bg-neutral-50 shadow-[0_24px_80px_-45px_rgba(0,0,0,0.65)] transition-all duration-300 hover:-translate-y-1 hover:border-black/35 hover:bg-white hover:shadow-[0_34px_90px_-46px_rgba(0,0,0,0.85)] dark:border-white/10 dark:bg-[#020202] dark:shadow-[0_24px_80px_-45px_rgba(255,255,255,0.32)] dark:hover:border-white/30 dark:hover:bg-[#080808]">
            <CornerBrackets />
            <span className="font-mono text-sm uppercase tracking-[0.24em] text-black/25 transition-colors duration-300 group-hover/effect-card:text-black/45 dark:text-white/20 dark:group-hover/effect-card:text-white/40">Click</span>
          </div>
        </ClickQuantum>
      }
      controls={
        <>
          <ColorPicker value={strokeColor} colors={colorOptions} onChange={setStrokeColor} />
          <SliderField title="particleCount" min={5} max={60} step={1} value={particleCount} onChange={setParticleCount} />
          <SliderField title="spreadRadius" min={20} max={180} step={1} value={spreadRadius} onChange={setSpreadRadius} />
          <SliderField title="teleportInterval" min={2} max={40} step={1} value={teleportInterval} onChange={setTeleportInterval} />
        </>
      }
    />
  )
}

export default Quantum
