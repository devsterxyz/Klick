import React, { useState } from 'react'
import ComponentPageLayout, { ColorPicker, ColorPreview } from './layout'
import clickBulletTimeCode from '../../../registry/new-york/ClickBulletTime/ClickBulletTime.tsx?raw'
import ClickBulletTime from '../../../registry/new-york/ClickBulletTime/ClickBulletTime'
import SliderField from '../SliderField'
import CornerBrackets from '../CornerBrackets'

const BulletTime = () => {
  const [count, setCount] = useState(15)
  const [friction, setFriction] = useState(0.91)
  const [maxRadius, setMaxRadius] = useState(100)
  const [strokeColor, setStrokeColor] = useState("#ffffff");

  const colorOptions = ["#FFFFFF", "#000000", "#a3e635", "#f59e0b", "#8b5cf6"];

  const code = `<ClickBulletTime
  count={${count}}
  friction={${friction}}
  maxRadius={${maxRadius}}
  color="${strokeColor}"
>
  {/*Content div*/}
</ClickBulletTime>`
  return (
    <ComponentPageLayout
      title="Bullet Time"
      code={code}
      cliCode="npx shadcn@latest add http://localhost:5173/r/click-bullet-time.json"
      manualCode={clickBulletTimeCode}
      controlTitle="Tune the burst"
      controlDescription="Shape how noisy, fast, and visible each click feels."
      controlAdornment={<ColorPreview color={strokeColor} />}
      preview={
        <ClickBulletTime
          count={count}
          friction={friction}
          maxRadius={maxRadius}
          color={strokeColor}
        >
          <div
            aria-label="clickBulletTime preview target"
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
        </ClickBulletTime>
      }
      controls={
        <>
          <SliderField
            title="count"
            min={8}
            max={25}
            step={1}
            value={count}
            onChange={(value) => setCount(value)}
          />
          <SliderField
            title="friction"
            min={0.9}
            max={0.99}
            step={0.01}
            value={friction}
            onChange={(value) => setFriction(value)}
          />
          <SliderField
            title="maxRadius"
            min={40}
            max={200}
            step={1}
            value={maxRadius}
            onChange={(value) => setMaxRadius(value)}
          />
          <ColorPicker
            value={strokeColor}
            colors={colorOptions}
            onChange={(value) => setStrokeColor(value)}
          />
        </>
      }
    />
  )
}

export default BulletTime
