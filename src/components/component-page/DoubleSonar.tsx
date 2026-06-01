import React, { useState } from 'react'
import ComponentPageLayout from './layout'
import ClickDoubleSonar from '../../../registry/new-york/ClickDoubleSonar/ClickDoubleSonar'
import ClickDoubleSonarCode from '../../../registry/new-york/ClickDoubleSonar/ClickDoubleSonar.tsx?raw'
import CornerBrackets from '../CornerBrackets'
import SliderField from '../SliderField'
import { ColorPicker, ColorPreview } from './layout'

const DoubleSonar = () => {
  const [lineWidth, setLineWidth] = useState(2)
  const [speed, setSpeed] = useState(2)
  const [gap, setGap] = useState(15)
  const [strokeColor, setStrokeColor] = useState("#ffffff")

  const colorOptions = ["#FFFFFF", "#000000", "#a3e635", "#f59e0b", "#8b5cf6"]

  const code = `<ClickDoubleSonar
  lineWidth={${lineWidth}}
  speed={${speed}}
  gap={${gap}}
  strokeColor="${strokeColor}"
>
  {/*Content div*/}
</ClickDoubleSonar>`
  return (
    <ComponentPageLayout
      title="Double Sonar"
      code={code}
      cliCode="npx shadcn@latest add http://localhost:5173/r/click-double-sonar.json"
      manualCode={ClickDoubleSonarCode}
      controlTitle="Tune the burst"
      controlDescription="Shape how noisy, fast, and visible each click feels."
      controlAdornment={<ColorPreview color={strokeColor} />}
      preview={
        <ClickDoubleSonar
          lineWidth={lineWidth}
          speed={speed}
          gap={gap}
          color={strokeColor}
        >
          <div
            aria-label="DoubleSonar preview target"
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
        </ClickDoubleSonar>
      }
      controls={
        <>
          <SliderField
            title="lineWidth"
            min={1}
            max={5}
            value={lineWidth}
            onChange={(value) => setLineWidth(value)}
          />
          <SliderField
            title="speed"
            min={1}
            max={10}
            value={speed}
            onChange={(value) => setSpeed(value)}
          />
          <SliderField
            title="gap"
            min={10}
            max={30}
            value={gap}
            onChange={(value) => setGap(value)}
          />
          <ColorPicker
            value={strokeColor}
            colors={colorOptions}
            onChange={(value) => setStrokeColor(value)}
          />
        </>
      }
    />
  )
}

export default DoubleSonar
