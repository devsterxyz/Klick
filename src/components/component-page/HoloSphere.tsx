import React, { useState } from 'react'
import ComponentPageLayout, { ColorPicker, ColorPreview } from './layout'
import clickHoloSphereCode from '../../../registry/new-york/ClickHoloSphere/ClickHoloSphere.tsx?raw'
import ClickHoloSphere from '../../../registry/new-york/ClickHoloSphere/ClickHoloSphere'
import SliderField from '../SliderField'
import CornerBrackets from '../CornerBrackets'

const colorOptions = ["#FFFFFF", "#000000", "#a3e635", "#f59e0b", "#8b5cf6"]

const HoloSphere = () => {
  const [dotColor, setDotColor] = useState("#ffffff")
  const [pointCount, setPointCount] = useState(40)
  const [dotSize, setDotSize] = useState(1.5)
  const [maxSize, setMaxSize] = useState(40)

  const code = `<ClickHoloSphere
  dotColor="${dotColor}"
  pointCount={${pointCount}}
  dotSize={${dotSize}}
  maxSize={${maxSize}}
>
  {/*Content div*/}
</ClickHoloSphere>`

  return (
    <ComponentPageLayout
      title="Holo Sphere"
      code={code}
      cliCode="npx shadcn@latest add https://klick-here.vercel.app/r/click-holo-sphere.json"
      manualCode={clickHoloSphereCode}
      controlTitle="Tune the holo sphere"
      controlDescription="Shape the dot color, point count, dot size, and sphere size."
      controlAdornment={<ColorPreview color={dotColor} />}
      preview={
        <ClickHoloSphere dotColor={dotColor} pointCount={pointCount} dotSize={dotSize} maxSize={maxSize}>
          <div aria-label="Holo Sphere preview target" className="group/effect-card relative flex aspect-square w-[min(18rem,66vw)] items-center justify-center border border-black/15 bg-neutral-50 shadow-[0_24px_80px_-45px_rgba(0,0,0,0.65)] transition-all duration-300 hover:-translate-y-1 hover:border-black/35 hover:bg-white hover:shadow-[0_34px_90px_-46px_rgba(0,0,0,0.85)] dark:border-white/10 dark:bg-[#020202] dark:shadow-[0_24px_80px_-45px_rgba(255,255,255,0.32)] dark:hover:border-white/30 dark:hover:bg-[#080808]">
            <CornerBrackets />
            <span className="font-mono text-sm uppercase tracking-[0.24em] text-black/25 transition-colors duration-300 group-hover/effect-card:text-black/45 dark:text-white/20 dark:group-hover/effect-card:text-white/40">Click</span>
          </div>
        </ClickHoloSphere>
      }
      controls={
        <>
          <ColorPicker value={dotColor} colors={colorOptions} onChange={setDotColor} />
          <SliderField title="pointCount" min={10} max={120} step={1} value={pointCount} onChange={setPointCount} />
          <SliderField title="dotSize" min={0.5} max={5} step={0.5} value={dotSize} onChange={setDotSize} />
          <SliderField title="maxSize" min={20} max={100} step={1} value={maxSize} onChange={setMaxSize} />
        </>
      }
    />
  )
}

export default HoloSphere
