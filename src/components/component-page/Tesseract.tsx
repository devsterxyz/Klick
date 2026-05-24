import React, { useState } from 'react'
import ComponentPageLayout, { ColorPicker, ColorPreview } from './layout'
import clickTesseractCode from '@/components/animation/ClickTesseract.tsx?raw'
import ClickTesseract from '../animation/ClickTesseract'
import SliderField from '../SliderField'
import PreviewTarget from './PreviewTarget'

const colorOptions = ["#FFFFFF", "#000000", "#a3e635", "#f59e0b", "#8b5cf6"]

const Tesseract = () => {
  const [strokeColor, setStrokeColor] = useState("#ffffff")
  const [maxSize, setMaxSize] = useState(40)
  const [growSpeed, setGrowSpeed] = useState(2.5)
  const [rotSpeedY, setRotSpeedY] = useState(0.03)

  const code = `<ClickTesseract
  strokeColor="${strokeColor}"
  maxSize={${maxSize}}
  growSpeed={${growSpeed}}
  rotSpeedY={${rotSpeedY}}
>
  {/*Content div*/}
</ClickTesseract>`

  return (
    <ComponentPageLayout
      title="Tesseract"
      code={code}
      cliCode="npx shadcn@latest add click-tesseract"
      manualCode={clickTesseractCode}
      controlTitle="Tune the tesseract"
      controlDescription="Shape the stroke color, size, growth, and rotation."
      controlAdornment={<ColorPreview color={strokeColor} />}
      preview={<ClickTesseract strokeColor={strokeColor} maxSize={maxSize} growSpeed={growSpeed} rotSpeedY={rotSpeedY}><PreviewTarget label="Tesseract" /></ClickTesseract>}
      controls={
        <>
          <ColorPicker value={strokeColor} colors={colorOptions} onChange={setStrokeColor} />
          <SliderField title="maxSize" min={20} max={100} step={1} value={maxSize} onChange={setMaxSize} />
          <SliderField title="growSpeed" min={0.5} max={8} step={0.5} value={growSpeed} onChange={setGrowSpeed} />
          <SliderField title="rotSpeedY" min={0.01} max={0.12} step={0.01} value={rotSpeedY} onChange={setRotSpeedY} />
        </>
      }
    />
  )
}

export default Tesseract
