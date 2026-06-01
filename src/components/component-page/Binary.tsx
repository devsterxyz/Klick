import React, { useState } from 'react'
import ComponentPageLayout, { ColorPicker, ColorPreview } from './layout'
import clickBinaryCode from '../../../registry/new-york/ClickBinary/ClickBinary.tsx?raw'
import ClickBinary from '../../../registry/new-york/ClickBinary/ClickBinary'
import SliderField from '../SliderField'
import CornerBrackets from '../CornerBrackets'

const Binary = () => {
  const [particleCount, setParticleCount] = useState(10)
  const [spreadRadius, setspreadRadius] = useState(60)
  const [fontSize, setFontSize] = useState(12)
  const [textColor, setTextColor] = useState("#ffffff")

  const colorOptions = ["#FFFFFF", "#000000", "#a3e635", "#f59e0b", "#8b5cf6"]

  const code = `<ClickBinary
  fontSize={${fontSize}}
  spreadRadius={${spreadRadius}}
  particleCount={${particleCount}}
  textColor="${textColor}"
>
  {/*Content div*/}
</ClickBinary>`

  return (
    <ComponentPageLayout
      title="Binary"
      code={code}
      cliCode="npx shadcn@latest add http://localhost:5173/r/click-binary.json"
      manualCode={clickBinaryCode}
      controlTitle="Tune the digits"
      controlDescription="Shape the size, spread, and density of each binary burst."
      controlAdornment={<ColorPreview color={textColor} />}
      preview={
        <ClickBinary
          particleCount={particleCount}
          spreadRadius={spreadRadius}
          fontSize={fontSize}
          textColor={textColor}
        >
          <div
            aria-label="Binary preview target"
            className="group/effect-card relative flex aspect-square w-[min(18rem,66vw)] items-center justify-center
            border border-black/15 bg-neutral-50 shadow-[0_24px_80px_-45px_rgba(0,0,0,0.65)]
            transition-all duration-300 hover:-translate-y-1 hover:border-black/35 hover:bg-white hover:shadow-[0_34px_90px_-46px_rgba(0,0,0,0.85)]
            dark:border-white/10 dark:bg-[#020202] dark:shadow-[0_24px_80px_-45px_rgba(255,255,255,0.32)] dark:hover:border-white/30 dark:hover:bg-[#080808]"
          >
            <CornerBrackets />
            <span className="font-mono text-sm uppercase tracking-[0.24em] text-black/25 transition-colors duration-300 group-hover/effect-card:text-black/45 dark:text-white/20 dark:group-hover/effect-card:text-white/40">
              Click
            </span>
          </div>
        </ClickBinary>
      }
      controls={
        <>
          <SliderField
            title="fontSize"
            min={1}
            max={25}
            value={fontSize}
            onChange={(value) => setFontSize(value)}
          />
          <SliderField
            title="spread Radius"
            min={30}
            max={150}
            value={spreadRadius}
            onChange={(value) => setspreadRadius(value)}
          />
          <SliderField
            title="Particle Count"
            min={5}
            max={35}
            value={particleCount}
            onChange={(value) => setParticleCount(value)}
          />
          <ColorPicker
            value={textColor}
            colors={colorOptions}
            onChange={(value) => setTextColor(value)}
          />
        </>
      }
    />
  )
}

export default Binary
