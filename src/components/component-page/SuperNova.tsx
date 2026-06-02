import React, { useState } from 'react'
import ComponentPageLayout, { ColorPicker, ColorPreview } from './layout'
import clickSupernovaCode from '../../../registry/new-york/ClickSupernova/ClickSupernova.tsx?raw'
import ClickSupernova from '../../../registry/new-york/ClickSupernova/ClickSupernova'
import SliderField from '../SliderField'
import PreviewTarget from './PreviewTarget'

const colorOptions = ["#FFFFFF", "#000000", "#a3e635", "#f59e0b", "#8b5cf6"]

const SuperNova = () => {
  const [color, setColor] = useState("#ffffff")
  const [dotCount, setDotCount] = useState(30)
  const [dotSize, setDotSize] = useState(1.5)
  const [ringSpeed, setRingSpeed] = useState(4)

  const code = `<ClickSupernova
  color="${color}"
  dotCount={${dotCount}}
  dotSize={${dotSize}}
  ringSpeed={${ringSpeed}}
>
  {/*Content div*/}
</ClickSupernova>`

  return (
    <ComponentPageLayout
      title="Supernova"
      code={code}
      cliCode="npx shadcn@latest add https://klick-here.vercel.app/r/click-supernova.json"
      manualCode={clickSupernovaCode}
      controlTitle="Tune the supernova"
      controlDescription="Shape the color, ejecta count, dot size, and ring speed."
      controlAdornment={<ColorPreview color={color} />}
      preview={<ClickSupernova color={color} dotCount={dotCount} dotSize={dotSize} ringSpeed={ringSpeed}><PreviewTarget label="Supernova" /></ClickSupernova>}
      controls={
        <>
          <ColorPicker value={color} colors={colorOptions} onChange={setColor} />
          <SliderField title="dotCount" min={5} max={100} step={1} value={dotCount} onChange={setDotCount} />
          <SliderField title="dotSize" min={0.5} max={6} step={0.5} value={dotSize} onChange={setDotSize} />
          <SliderField title="ringSpeed" min={1} max={12} step={1} value={ringSpeed} onChange={setRingSpeed} />
        </>
      }
    />
  )
}

export default SuperNova
