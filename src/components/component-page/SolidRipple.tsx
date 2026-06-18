import React, { useState } from 'react'
import ComponentPageLayout, { ColorPicker, ColorPreview } from './layout'
import clickSolidRippleCode from '../../../registry/new-york/ClickSolidRipple/ClickSolidRipple.tsx?raw'
import SliderField from '../SliderField'
import ClickSolidRipple from '../../../registry/new-york/ClickSolidRipple/ClickSolidRipple'

const colorOptions = ["#FFFFFF", "#000000", "#a3e635", "#f59e0b", "#8b5cf6"]

const SolidRipple = () => {

  const [fillColor, setFillColor] = useState("#ffffff")
  const [rippleWidth, setRippleWidth] = useState(300)
  const [rippleHeight, setRippleHeight] = useState(300)
  const [speed, setSpeed] = useState(8)

  const code = `<ClickSolidRipple
  color="${fillColor}"
  rippleWidth={${rippleWidth}}
  rippleHeight={${rippleHeight}}
  speed={${speed}}
/>`
  return (
    <ComponentPageLayout
      title="Solid Ripple"
      code={code}
      cliCode="npx shadcn@latest add devsterxyz/Klick/click-solid-ripple"
      manualCode={clickSolidRippleCode}
      controlTitle="Tune the solid ripple"
      controlDescription="Shape the color, ripple size, and expansion speed."
      controlAdornment={<ColorPreview color={fillColor} />}
      preview={
        <ClickSolidRipple
          color={fillColor}
          width={320}
          height={200}
          rippleWidth={rippleWidth}
          rippleHeight={rippleHeight}
          speed={speed}
        />
      }
      controls={
        <>
          <ColorPicker value={fillColor} colors={colorOptions} onChange={setFillColor} />
          <SliderField title="rippleWidth" min={40} max={1000} step={1} value={rippleWidth} onChange={setRippleWidth} />
          <SliderField title="rippleHeight" min={40} max={1000} step={1} value={rippleHeight} onChange={setRippleHeight} />
          <SliderField title="speed" min={1} max={20} step={1} value={speed} onChange={setSpeed} />
        </>
      }
    />
  )
}

export default SolidRipple
