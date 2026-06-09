import React, { useState } from 'react'
import ComponentPageLayout, { ColorPicker, ColorPreview } from './layout'
import clickResonanceCode from '../../../registry/new-york/ClickResonance/ClickResonance.tsx?raw'
import ClickResonance from '../../../registry/new-york/ClickResonance/ClickResonance'
import SliderField from '../SliderField'

const colorOptions = ["#FFFFFF", "#000000", "#a3e635", "#f59e0b", "#8b5cf6"]

const Resonance = () => {
  const [color, setColor] = useState("#ffffff")
  const [stringsPerClick, setStringsPerClick] = useState(3)
  const [amplitude, setAmplitude] = useState(40)
  const [phaseSpeed, setPhaseSpeed] = useState(0.5)
  const [dampen, setDampen] = useState(0.95)

  const code = `<ClickResonance
  color="${color}"
  stringsPerClick={${stringsPerClick}}
  amplitude={${amplitude}}
  phaseSpeed={${phaseSpeed}}
  dampen={${dampen}}
/>`

  return (
    <ComponentPageLayout
      title="Resonance"
      code={code}
      cliCode="npx shadcn@latest add https://klick-here.vercel.app/r/click-resonance.json"
      manualCode={clickResonanceCode}
      controlTitle="Tune the resonance"
      controlDescription="Shape the string count, amplitude, oscillation speed, and dampening."
      controlAdornment={<ColorPreview color={color} />}
      preview={
        <ClickResonance
          width={400}
          height={240}
          color={color}
          stringsPerClick={stringsPerClick}
          amplitude={amplitude}
          phaseSpeed={phaseSpeed}
          dampen={dampen}
        />
      }
      controls={
        <>
          <ColorPicker value={color} colors={colorOptions} onChange={setColor} />
          <SliderField title="stringsPerClick" min={1} max={8} step={1} value={stringsPerClick} onChange={setStringsPerClick} />
          <SliderField title="amplitude" min={10} max={90} step={1} value={amplitude} onChange={setAmplitude} />
          <SliderField title="phaseSpeed" min={0.1} max={1.2} step={0.1} value={phaseSpeed} onChange={setPhaseSpeed} />
          <SliderField title="dampen" min={0.9} max={0.99} step={0.01} value={dampen} onChange={setDampen} />
        </>
      }
    />
  )
}

export default Resonance
