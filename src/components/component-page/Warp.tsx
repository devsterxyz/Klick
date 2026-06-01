import React, { useState } from 'react'
import ComponentPageLayout, { ColorPicker, ColorPreview } from './layout'
import clickWarpCode from '../../../registry/new-york/ClickWarp/ClickWarp.tsx?raw'
import ClickWarp from '../../../registry/new-york/ClickWarp/ClickWarp'
import SliderField from '../SliderField'
import PreviewTarget from './PreviewTarget'

const colorOptions = ["#FFFFFF", "#000000", "#a3e635", "#f59e0b", "#8b5cf6"]

const Warp = () => {
  const [textColor, setTextColor] = useState("#ffffff")
  const [streakCount, setStreakCount] = useState(30)
  const [baseSpeed, setBaseSpeed] = useState(1)
  const [acceleration, setAcceleration] = useState(1.1)

  const code = `<ClickWarp
  textColor="${textColor}"
  streakCount={${streakCount}}
  baseSpeed={${baseSpeed}}
  acceleration={${acceleration}}
>
  {/*Content div*/}
</ClickWarp>`

  return (
    <ComponentPageLayout
      title="Warp"
      code={code}
      cliCode="npx shadcn@latest add http://localhost:5173/r/click-warp.json"
      manualCode={clickWarpCode}
      controlTitle="Tune the warp"
      controlDescription="Shape the color, streak count, speed, and acceleration."
      controlAdornment={<ColorPreview color={textColor} />}
      preview={<ClickWarp textColor={textColor} streakCount={streakCount} baseSpeed={baseSpeed} acceleration={acceleration}><PreviewTarget label="Warp" /></ClickWarp>}
      controls={
        <>
          <ColorPicker value={textColor} colors={colorOptions} onChange={setTextColor} />
          <SliderField title="streakCount" min={5} max={100} step={1} value={streakCount} onChange={setStreakCount} />
          <SliderField title="baseSpeed" min={0.5} max={6} step={0.5} value={baseSpeed} onChange={setBaseSpeed} />
          <SliderField title="acceleration" min={1} max={1.5} step={0.05} value={acceleration} onChange={setAcceleration} />
        </>
      }
    />
  )
}

export default Warp
