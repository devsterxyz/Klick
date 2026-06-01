import React, { useState } from 'react'
import ComponentPageLayout, { ColorPicker, ColorPreview } from './layout'
import clickSpark2Code from '../../../registry/new-york/ClickSpark2/ClickSpark2.tsx?raw'
import ClickSpark2 from '../../../registry/new-york/ClickSpark2/ClickSpark2'
import SliderField from '../SliderField'
import PreviewTarget from './PreviewTarget'

const colorOptions = ["#FFFFFF", "#000000", "#a3e635", "#f59e0b", "#8b5cf6"]

const Spark2 = () => {
  const [strokeColor, setStrokeColor] = useState("#ffffff")
  const [particleCount, setParticleCount] = useState(20)
  const [maxSpeed, setMaxSpeed] = useState(14)
  const [friction, setFriction] = useState(0.9)

  const code = `<ClickSpark2
  strokeColor="${strokeColor}"
  particleCount={${particleCount}}
  maxSpeed={${maxSpeed}}
  friction={${friction}}
>
  {/*Content div*/}
</ClickSpark2>`

  return (
    <ComponentPageLayout
      title="Spark2"
      code={code}
      cliCode="npx shadcn@latest add http://localhost:5173/r/click-spark2.json"
      manualCode={clickSpark2Code}
      controlTitle="Tune the sparks"
      controlDescription="Shape the color, count, speed, and friction."
      controlAdornment={<ColorPreview color={strokeColor} />}
      preview={<ClickSpark2 strokeColor={strokeColor} particleCount={particleCount} maxSpeed={maxSpeed} friction={friction}><PreviewTarget label="Spark2" /></ClickSpark2>}
      controls={
        <>
          <ColorPicker value={strokeColor} colors={colorOptions} onChange={setStrokeColor} />
          <SliderField title="particleCount" min={5} max={80} step={1} value={particleCount} onChange={setParticleCount} />
          <SliderField title="maxSpeed" min={4} max={30} step={1} value={maxSpeed} onChange={setMaxSpeed} />
          <SliderField title="friction" min={0.8} max={0.99} step={0.01} value={friction} onChange={setFriction} />
        </>
      }
    />
  )
}

export default Spark2
