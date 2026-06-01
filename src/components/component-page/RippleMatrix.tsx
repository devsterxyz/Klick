import React, { useState } from 'react'
import ComponentPageLayout, { ColorPicker, ColorPreview } from './layout'
import clickRippleMatrixCode from '../../../registry/new-york/ClickRippleMatrix/ClickRippleMatrix.tsx?raw'
import ClickRippleMatrix from '../../../registry/new-york/ClickRippleMatrix/ClickRippleMatrix'
import SliderField from '../SliderField'
import PreviewTarget from './PreviewTarget'

const colorOptions = ["#FFFFFF", "#000000", "#a3e635", "#f59e0b", "#8b5cf6"]

const RippleMatrix = () => {
  const [dotColor, setDotColor] = useState("#ffffff")
  const [gridRadius, setGridRadius] = useState(3)
  const [gridSpacing, setGridSpacing] = useState(15)
  const [waveSpeed, setWaveSpeed] = useState(0.2)

  const code = `<ClickRippleMatrix
  dotColor="${dotColor}"
  gridRadius={${gridRadius}}
  gridSpacing={${gridSpacing}}
  waveSpeed={${waveSpeed}}
>
  {/*Content div*/}
</ClickRippleMatrix>`

  return (
    <ComponentPageLayout
      title="Ripple Matrix"
      code={code}
      cliCode="npx shadcn@latest add http://localhost:5173/r/click-ripple-matrix.json"
      manualCode={clickRippleMatrixCode}
      controlTitle="Tune the matrix"
      controlDescription="Shape the dot color, grid size, spacing, and wave speed."
      controlAdornment={<ColorPreview color={dotColor} />}
      preview={<ClickRippleMatrix dotColor={dotColor} gridRadius={gridRadius} gridSpacing={gridSpacing} waveSpeed={waveSpeed}><PreviewTarget label="Ripple Matrix" /></ClickRippleMatrix>}
      controls={
        <>
          <ColorPicker value={dotColor} colors={colorOptions} onChange={setDotColor} />
          <SliderField title="gridRadius" min={1} max={8} step={1} value={gridRadius} onChange={setGridRadius} />
          <SliderField title="gridSpacing" min={8} max={32} step={1} value={gridSpacing} onChange={setGridSpacing} />
          <SliderField title="waveSpeed" min={0.05} max={0.8} step={0.05} value={waveSpeed} onChange={setWaveSpeed} />
        </>
      }
    />
  )
}

export default RippleMatrix
