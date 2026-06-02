import React, { useState } from 'react'
import ComponentPageLayout, { ColorPicker, ColorPreview } from './layout'
import clickSparkleCode from '../../../registry/new-york/ClickSparkle/ClickSparkle.tsx?raw'
import ClickSparkle from '../../../registry/new-york/ClickSparkle/ClickSparkle'
import SliderField from '../SliderField'
import PreviewTarget from './PreviewTarget'

const colorOptions = ["#FFFFFF", "#000000", "#a3e635", "#f59e0b", "#8b5cf6"]

const Sparkle = () => {
  const [color, setColor] = useState("#ffffff")
  const [count, setCount] = useState(8)
  const [scatter, setScatter] = useState(50)
  const [maxSize, setMaxSize] = useState(8)

  const code = `<ClickSparkle
  color="${color}"
  count={${count}}
  scatter={${scatter}}
  maxSize={${maxSize}}
>
  {/*Content div*/}
</ClickSparkle>`

  return (
    <ComponentPageLayout
      title="Sparkle"
      code={code}
      cliCode="npx shadcn@latest add https://klick-here.vercel.app/r/click-sparkle.json"
      manualCode={clickSparkleCode}
      controlTitle="Tune the sparkle"
      controlDescription="Shape the color, count, scatter, and size."
      controlAdornment={<ColorPreview color={color} />}
      preview={<ClickSparkle color={color} count={count} scatter={scatter} maxSize={maxSize}><PreviewTarget label="Sparkle" /></ClickSparkle>}
      controls={
        <>
          <ColorPicker value={color} colors={colorOptions} onChange={setColor} />
          <SliderField title="count" min={1} max={30} step={1} value={count} onChange={setCount} />
          <SliderField title="scatter" min={0} max={140} step={1} value={scatter} onChange={setScatter} />
          <SliderField title="maxSize" min={3} max={24} step={1} value={maxSize} onChange={setMaxSize} />
        </>
      }
    />
  )
}

export default Sparkle
