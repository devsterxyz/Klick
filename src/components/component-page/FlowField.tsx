import React, { useState } from 'react'
import ComponentPageLayout, { ColorPicker, ColorPreview } from './layout'
import clickFlowFieldCode from '../../../registry/new-york/ClickFlowField/ClickFlowField.tsx?raw'
import ClickFlowField from '../../../registry/new-york/ClickFlowField/ClickFlowField'
import SliderField from '../SliderField'
import CornerBrackets from '../CornerBrackets'

const FlowField = () => {
  const [dotColor, setDotColor] = useState("#ffffff")
  const [dotCount, setDotCount] = useState(40)
  const [initialSpeed, setInitialSpeed] = useState(4)
  const [fieldScale, setFieldScale] = useState(0.05)

  const colorOptions = ["#FFFFFF", "#000000", "#a3e635", "#f59e0b", "#8b5cf6"]

  const code = `<ClickFlowField
  dotColor="${dotColor}"
  dotCount={${dotCount}}
  initialSpeed={${initialSpeed}}
  fieldScale={${fieldScale}}
>
  {/*Content div*/}
</ClickFlowField>`

  return (
    <ComponentPageLayout
      title="Flow Field"
      code={code}
      cliCode="npx shadcn@latest add https://klick-here.vercel.app/r/click-flow-field.json"
      manualCode={clickFlowFieldCode}
      controlTitle="Tune the flow field"
      controlDescription="Shape the dot color, count, starting speed, and field scale."
      controlAdornment={<ColorPreview color={dotColor} />}
      preview={
        <ClickFlowField dotColor={dotColor} dotCount={dotCount} initialSpeed={initialSpeed} fieldScale={fieldScale}>
          <div
            aria-label="Flow Field preview target"
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
        </ClickFlowField>
      }
      controls={
        <>
          <ColorPicker value={dotColor} colors={colorOptions} onChange={setDotColor} />
          <SliderField title="dotCount" min={5} max={100} step={1} value={dotCount} onChange={setDotCount} />
          <SliderField title="initialSpeed" min={1} max={12} step={1} value={initialSpeed} onChange={setInitialSpeed} />
          <SliderField title="fieldScale" min={0.01} max={0.15} step={0.01} value={fieldScale} onChange={setFieldScale} />
        </>
      }
    />
  )
}

export default FlowField
