import React, { useState } from 'react'
import ComponentPageLayout, { ColorPicker, ColorPreview } from './layout'
import clickShatterCode from '../../../registry/new-york/ClickShatter/ClickShatter.tsx?raw'
import ClickShatter from '../../../registry/new-york/ClickShatter/ClickShatter'
import SliderField from '../SliderField'
import PreviewTarget from './PreviewTarget'

const colorOptions = ["#FFFFFF", "#000000", "#a3e635", "#f59e0b", "#8b5cf6"]

const Shatter = () => {
  const [shardColor, setShardColor] = useState("#ffffff")
  const [shardCount, setShardCount] = useState(12)
  const [shardSize, setShardSize] = useState(6)
  const [spreadRadius, setSpreadRadius] = useState(80)

  const code = `<ClickShatter
  shardColor="${shardColor}"
  shardCount={${shardCount}}
  shardSize={${shardSize}}
  spreadRadius={${spreadRadius}}
>
  {/*Content div*/}
</ClickShatter>`

  return (
    <ComponentPageLayout
      title="Shatter"
      code={code}
      cliCode="npx shadcn@latest add http://localhost:5173/r/click-shatter.json"
      manualCode={clickShatterCode}
      controlTitle="Tune the shatter"
      controlDescription="Shape the shard color, count, size, and spread."
      controlAdornment={<ColorPreview color={shardColor} />}
      preview={<ClickShatter shardColor={shardColor} shardCount={shardCount} shardSize={shardSize} spreadRadius={spreadRadius}><PreviewTarget label="Shatter" /></ClickShatter>}
      controls={
        <>
          <ColorPicker value={shardColor} colors={colorOptions} onChange={setShardColor} />
          <SliderField title="shardCount" min={4} max={40} step={1} value={shardCount} onChange={setShardCount} />
          <SliderField title="shardSize" min={2} max={18} step={1} value={shardSize} onChange={setShardSize} />
          <SliderField title="spreadRadius" min={20} max={180} step={1} value={spreadRadius} onChange={setSpreadRadius} />
        </>
      }
    />
  )
}

export default Shatter
