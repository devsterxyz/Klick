import React, { useState } from 'react'
import ComponentPageLayout, { ColorPicker, ColorPreview } from './layout'
import clickSmokeCode from '../../../registry/new-york/ClickSmoke/ClickSmoke.tsx?raw'
import ClickSmoke from '../../../registry/new-york/ClickSmoke/ClickSmoke'
import SliderField from '../SliderField'
import PreviewTarget from './PreviewTarget'

const colorOptions = ["#FFFFFF", "#000000", "#a3e635", "#f59e0b", "#8b5cf6"]

const Smoke = () => {
  const [fillColor, setFillColor] = useState("#ffffff")
  const [puffCount, setPuffCount] = useState(8)
  const [spreadX, setSpreadX] = useState(10)
  const [maxRadius, setMaxRadius] = useState(15)

  const code = `<ClickSmoke
  fillColor="${fillColor}"
  puffCount={${puffCount}}
  spreadX={${spreadX}}
  maxRadius={${maxRadius}}
>
  {/*Content div*/}
</ClickSmoke>`

  return (
    <ComponentPageLayout
      title="Smoke"
      code={code}
      cliCode="npx shadcn@latest add http://localhost:5173/r/click-smoke.json"
      manualCode={clickSmokeCode}
      controlTitle="Tune the smoke"
      controlDescription="Shape the color, puff count, spread, and radius."
      controlAdornment={<ColorPreview color={fillColor} />}
      preview={<ClickSmoke fillColor={fillColor} puffCount={puffCount} spreadX={spreadX} maxRadius={maxRadius}><PreviewTarget label="Smoke" /></ClickSmoke>}
      controls={
        <>
          <ColorPicker value={fillColor} colors={colorOptions} onChange={setFillColor} />
          <SliderField title="puffCount" min={2} max={30} step={1} value={puffCount} onChange={setPuffCount} />
          <SliderField title="spreadX" min={0} max={80} step={1} value={spreadX} onChange={setSpreadX} />
          <SliderField title="maxRadius" min={6} max={40} step={1} value={maxRadius} onChange={setMaxRadius} />
        </>
      }
    />
  )
}

export default Smoke
