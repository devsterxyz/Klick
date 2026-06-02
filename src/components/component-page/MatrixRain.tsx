import React, { useState } from 'react'
import ComponentPageLayout, { ColorPicker, ColorPreview } from './layout'
import clickMatrixRainCode from '../../../registry/new-york/ClickMatrixRain/ClickMatrixRain.tsx?raw'
import ClickMatrixRain from '../../../registry/new-york/ClickMatrixRain/ClickMatrixRain'
import SliderField from '../SliderField'
import CornerBrackets from '../CornerBrackets'

const colorOptions = ["#FFFFFF", "#000000", "#a3e635", "#f59e0b", "#8b5cf6"]

const MatrixRain = () => {
  const [textColor, setTextColor] = useState("#ffffff")
  const [columnCount, setColumnCount] = useState(10)
  const [trailLength, setTrailLength] = useState(8)

  const code = `<ClickMatrixRain
  textColor="${textColor}"
  columnCount={${columnCount}}
  trailLength={${trailLength}}
>
  {/*Content div*/}
</ClickMatrixRain>`

  return (
    <ComponentPageLayout
      title="Matrix Rain"
      code={code}
      cliCode="npx shadcn@latest add https://klick-here.vercel.app/r/click-matrix-rain.json"
      manualCode={clickMatrixRainCode}
      controlTitle="Tune the matrix rain"
      controlDescription="Shape the text color, column count, and trail length."
      controlAdornment={<ColorPreview color={textColor} />}
      preview={
        <ClickMatrixRain textColor={textColor} columnCount={columnCount} trailLength={trailLength}>
          <div aria-label="Matrix Rain preview target" className="group/effect-card relative flex aspect-square w-[min(18rem,66vw)] items-center justify-center border border-black/15 bg-neutral-50 shadow-[0_24px_80px_-45px_rgba(0,0,0,0.65)] transition-all duration-300 hover:-translate-y-1 hover:border-black/35 hover:bg-white hover:shadow-[0_34px_90px_-46px_rgba(0,0,0,0.85)] dark:border-white/10 dark:bg-[#020202] dark:shadow-[0_24px_80px_-45px_rgba(255,255,255,0.32)] dark:hover:border-white/30 dark:hover:bg-[#080808]">
            <CornerBrackets />
            <span className="font-mono text-sm uppercase tracking-[0.24em] text-black/25 transition-colors duration-300 group-hover/effect-card:text-black/45 dark:text-white/20 dark:group-hover/effect-card:text-white/40">Click</span>
          </div>
        </ClickMatrixRain>
      }
      controls={
        <>
          <ColorPicker value={textColor} colors={colorOptions} onChange={setTextColor} />
          <SliderField title="columnCount" min={3} max={40} step={1} value={columnCount} onChange={setColumnCount} />
          <SliderField title="trailLength" min={2} max={20} step={1} value={trailLength} onChange={setTrailLength} />
        </>
      }
    />
  )
}

export default MatrixRain
