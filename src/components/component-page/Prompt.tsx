import React, { useState } from 'react'
import ComponentPageLayout, { ColorPicker, ColorPreview } from './layout'
import clickPromptCode from '../../../registry/new-york/ClickPrompt/ClickPrompt.tsx?raw'
import ClickPrompt from '../../../registry/new-york/ClickPrompt/ClickPrompt'
import SliderField from '../SliderField'
import PreviewTarget from './PreviewTarget'

const colorOptions = ["#FFFFFF", "#000000", "#a3e635", "#f59e0b", "#8b5cf6"]

const Prompt = () => {
  const [color, setColor] = useState("#ffffff")
  const [decay, setDecay] = useState(0.015)

  const code = `<ClickPrompt
  color="${color}"
  decay={${decay}}
>
  {/*Content div*/}
</ClickPrompt>`

  return (
    <ComponentPageLayout
      title="Prompt"
      code={code}
      cliCode="npx shadcn@latest add https://klick-here.vercel.app/r/click-prompt.json"
      manualCode={clickPromptCode}
      controlTitle="Tune the prompt"
      controlDescription="Shape the prompt color and fade."
      controlAdornment={<ColorPreview color={color} />}
      preview={<ClickPrompt color={color} decay={decay}><PreviewTarget label="Prompt" /></ClickPrompt>}
      controls={
        <>
          <ColorPicker value={color} colors={colorOptions} onChange={setColor} />
          <SliderField title="decay" min={0.005} max={0.05} step={0.005} value={decay} onChange={setDecay} />
        </>
      }
    />
  )
}

export default Prompt
