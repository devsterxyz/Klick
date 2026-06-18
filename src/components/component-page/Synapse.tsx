import React, { useState } from 'react'
import ComponentPageLayout, { ColorPicker, ColorPreview } from './layout'
import clickSynapseCode from '../../../registry/new-york/ClickSynapse/ClickSynapse.tsx?raw'
import ClickSynapse from '../../../registry/new-york/ClickSynapse/ClickSynapse'
import SliderField from '../SliderField'
import PreviewTarget from './PreviewTarget'

const colorOptions = ["#FFFFFF", "#000000", "#a3e635", "#f59e0b", "#8b5cf6"]

const Synapse = () => {
  const [strokeColor, setStrokeColor] = useState("#ffffff")
  const [nodeCount, setNodeCount] = useState(10)
  const [burstSpeed, setBurstSpeed] = useState(8)
  const [connectionDist, setConnectionDist] = useState(70)

  const code = `<ClickSynapse
  strokeColor="${strokeColor}"
  nodeCount={${nodeCount}}
  burstSpeed={${burstSpeed}}
  connectionDist={${connectionDist}}
>
  {/*Content div*/}
</ClickSynapse>`

  return (
    <ComponentPageLayout
      title="Synapse"
      code={code}
      cliCode="npx shadcn@latest add devsterxyz/Klick/click-synapse"
      manualCode={clickSynapseCode}
      controlTitle="Tune the synapse"
      controlDescription="Shape the color, node count, burst speed, and connection distance."
      controlAdornment={<ColorPreview color={strokeColor} />}
      preview={<ClickSynapse strokeColor={strokeColor} nodeCount={nodeCount} burstSpeed={burstSpeed} connectionDist={connectionDist}><PreviewTarget label="Synapse" /></ClickSynapse>}
      controls={
        <>
          <ColorPicker value={strokeColor} colors={colorOptions} onChange={setStrokeColor} />
          <SliderField title="nodeCount" min={3} max={40} step={1} value={nodeCount} onChange={setNodeCount} />
          <SliderField title="burstSpeed" min={2} max={20} step={1} value={burstSpeed} onChange={setBurstSpeed} />
          <SliderField title="connectionDist" min={20} max={160} step={1} value={connectionDist} onChange={setConnectionDist} />
        </>
      }
    />
  )
}

export default Synapse
