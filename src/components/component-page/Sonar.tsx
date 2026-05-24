import React, { useState } from 'react'
import ComponentPageLayout, { ColorPicker, ColorPreview } from './layout'
import clickSonarCode from '@/components/animation/ClickSonar.tsx?raw'
import ClickSonar from '../animation/ClickSonar'
import SliderField from '../SliderField'
import PreviewTarget from './PreviewTarget'

const colorOptions = ["#FFFFFF", "#000000", "#a3e635", "#f59e0b", "#8b5cf6"]

const Sonar = () => {
  const [color, setColor] = useState("#ffffff")
  const [dotCount, setDotCount] = useState(20)
  const [dotSpread, setDotSpread] = useState(80)
  const [speed, setSpeed] = useState(2.5)

  const code = `<ClickSonar
  color="${color}"
  dotCount={${dotCount}}
  dotSpread={${dotSpread}}
  speed={${speed}}
>
  {/*Content div*/}
</ClickSonar>`

  return (
    <ComponentPageLayout
      title="Sonar"
      code={code}
      cliCode="npx shadcn@latest add click-sonar"
      manualCode={clickSonarCode}
      controlTitle="Tune the sonar"
      controlDescription="Shape the color, dot count, spread, and sweep speed."
      controlAdornment={<ColorPreview color={color} />}
      preview={<ClickSonar color={color} dotCount={dotCount} dotSpread={dotSpread} speed={speed}><PreviewTarget label="Sonar" /></ClickSonar>}
      controls={
        <>
          <ColorPicker value={color} colors={colorOptions} onChange={setColor} />
          <SliderField title="dotCount" min={4} max={80} step={1} value={dotCount} onChange={setDotCount} />
          <SliderField title="dotSpread" min={20} max={180} step={1} value={dotSpread} onChange={setDotSpread} />
          <SliderField title="speed" min={0.5} max={8} step={0.5} value={speed} onChange={setSpeed} />
        </>
      }
    />
  )
}

export default Sonar
