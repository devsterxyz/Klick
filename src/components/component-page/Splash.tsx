import React, { useState } from 'react'
import ComponentPageLayout, { ColorPicker, ColorPreview } from './layout'
import clickSplashCode from '@/components/animation/ClickSplash.tsx?raw'
import ClickSplash from '../animation/ClickSplash'
import SliderField from '../SliderField'
import PreviewTarget from './PreviewTarget'

const colorOptions = ["#FFFFFF", "#000000", "#a3e635", "#f59e0b", "#8b5cf6"]

const Splash = () => {
  const [dotColor, setDotColor] = useState("#ffffff")
  const [particleCount, setParticleCount] = useState(30)
  const [spreadSpeed, setSpreadSpeed] = useState(8)
  const [gravity, setGravity] = useState(0.3)

  const code = `<ClickSplash
  dotColor="${dotColor}"
  particleCount={${particleCount}}
  spreadSpeed={${spreadSpeed}}
  gravity={${gravity}}
>
  {/*Content div*/}
</ClickSplash>`

  return (
    <ComponentPageLayout
      title="Splash"
      code={code}
      cliCode="npx shadcn@latest add click-splash"
      manualCode={clickSplashCode}
      controlTitle="Tune the splash"
      controlDescription="Shape the dot color, count, spread speed, and gravity."
      controlAdornment={<ColorPreview color={dotColor} />}
      preview={<ClickSplash dotColor={dotColor} particleCount={particleCount} spreadSpeed={spreadSpeed} gravity={gravity}><PreviewTarget label="Splash" /></ClickSplash>}
      controls={
        <>
          <ColorPicker value={dotColor} colors={colorOptions} onChange={setDotColor} />
          <SliderField title="particleCount" min={5} max={80} step={1} value={particleCount} onChange={setParticleCount} />
          <SliderField title="spreadSpeed" min={2} max={20} step={1} value={spreadSpeed} onChange={setSpreadSpeed} />
          <SliderField title="gravity" min={0} max={1} step={0.05} value={gravity} onChange={setGravity} />
        </>
      }
    />
  )
}

export default Splash
