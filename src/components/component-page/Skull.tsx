import React, { useState } from 'react'
import ComponentPageLayout, { ColorPicker, ColorPreview } from './layout'
import clickSkullCode from '../../../registry/new-york/ClickSkull/ClickSkull.tsx?raw'
import ClickSkull from '../../../registry/new-york/ClickSkull/ClickSkull'
import SliderField from '../SliderField'
import PreviewTarget from './PreviewTarget'

const colorOptions = ["#FFFFFF", "#000000", "#a3e635", "#f59e0b", "#8b5cf6"]

const Skull = () => {
  const [color, setColor] = useState("#ffffff")
  const [count, setCount] = useState(5)
  const [gravity, setGravity] = useState(0.2)
  const [sizeMax, setSizeMax] = useState(24)

  const code = `<ClickSkull
  color="${color}"
  count={${count}}
  gravity={${gravity}}
  sizeMax={${sizeMax}}
>
  {/*Content div*/}
</ClickSkull>`

  return (
    <ComponentPageLayout
      title="Skull"
      code={code}
      cliCode="npx shadcn@latest add http://localhost:5173/r/click-skull.json"
      manualCode={clickSkullCode}
      controlTitle="Tune the skulls"
      controlDescription="Shape the color, count, gravity, and max size."
      controlAdornment={<ColorPreview color={color} />}
      preview={<ClickSkull color={color} count={count} gravity={gravity} sizeMax={sizeMax}><PreviewTarget label="Skull" /></ClickSkull>}
      controls={
        <>
          <ColorPicker value={color} colors={colorOptions} onChange={setColor} />
          <SliderField title="count" min={1} max={20} step={1} value={count} onChange={setCount} />
          <SliderField title="gravity" min={0} max={1} step={0.05} value={gravity} onChange={setGravity} />
          <SliderField title="sizeMax" min={12} max={60} step={1} value={sizeMax} onChange={setSizeMax} />
        </>
      }
    />
  )
}

export default Skull
