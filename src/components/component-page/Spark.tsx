import React, { useState } from 'react'
import ComponentPageLayout, { ColorPicker, ColorPreview } from './layout'
import clickSparkCode from '@/components/animation/ClickSpark.tsx?raw'
import ClickSpark from '../animation/ClickSpark'
import SliderField from '../SliderField'
import PreviewTarget from './PreviewTarget'

const colorOptions = ["#FFFFFF", "#000000", "#a3e635", "#f59e0b", "#8b5cf6"]

const Spark = () => {
  const [color, setColor] = useState("#ffffff")
  const [count, setCount] = useState(20)
  const [speedMax, setSpeedMax] = useState(12)
  const [maxRadius, setMaxRadius] = useState(80)

  const code = `<ClickSpark
  color="${color}"
  count={${count}}
  speedMax={${speedMax}}
  maxRadius={${maxRadius}}
>
  {/*Content div*/}
</ClickSpark>`

  return (
    <ComponentPageLayout
      title="Spark"
      code={code}
      cliCode="npx shadcn@latest add click-spark"
      manualCode={clickSparkCode}
      controlTitle="Tune the sparks"
      controlDescription="Shape the color, count, speed, and radius."
      controlAdornment={<ColorPreview color={color} />}
      preview={<ClickSpark color={color} count={count} speedMax={speedMax} maxRadius={maxRadius}><PreviewTarget label="Spark" /></ClickSpark>}
      controls={
        <>
          <ColorPicker value={color} colors={colorOptions} onChange={setColor} />
          <SliderField title="count" min={5} max={80} step={1} value={count} onChange={setCount} />
          <SliderField title="speedMax" min={4} max={30} step={1} value={speedMax} onChange={setSpeedMax} />
          <SliderField title="maxRadius" min={20} max={180} step={1} value={maxRadius} onChange={setMaxRadius} />
        </>
      }
    />
  )
}

export default Spark
