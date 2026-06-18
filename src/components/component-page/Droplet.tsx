import React, { useState } from 'react'
import ComponentPageLayout, { ColorPicker, ColorPreview } from './layout'
import clickDropletCode from '../../../registry/new-york/ClickDroplet/ClickDroplet.tsx?raw'
import ClickDroplet from '../../../registry/new-york/ClickDroplet/ClickDroplet'
import SliderField from '../SliderField'
import CornerBrackets from '../CornerBrackets'

const Droplet = () => {
  const [splashCount, setSplashCount] = useState(6)
  const [ringSpeed, setRingSpeed] = useState(2)
  const [duration, setDuration] = useState(2000)
  const [dotColor, setDotColor] = useState("#ffffff")

  const colorOptions = ["#FFFFFF", "#000000", "#a3e635", "#f59e0b", "#8b5cf6"]

  const code = `<ClickDroplet
  splashCount={${splashCount}}
  ringSpeed={${ringSpeed}}
  duration={${duration}}
  dotColor="${dotColor}"
>
  {/*Content div*/}
</ClickDroplet>`

  return (
    <ComponentPageLayout
      title="Droplet"
      code={code}
      cliCode="npx shadcn@latest add devsterxyz/Klick/click-droplet"
      manualCode={clickDropletCode}
      controlTitle="Tune the droplet"
      controlDescription="Shape the splash count, ripple speed, and fade time."
      controlAdornment={<ColorPreview color={dotColor} />}
      preview={
        <ClickDroplet
          splashCount={splashCount}
          ringSpeed={ringSpeed}
          duration={duration}
          dotColor={dotColor}
        >
          <div
            aria-label="Droplet preview target"
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
        </ClickDroplet>
      }
      controls={
        <>
          <SliderField
            title="splashCount"
            min={1}
            max={20}
            step={1}
            value={splashCount}
            onChange={(value) => setSplashCount(value)}
          />
          <SliderField
            title="ringSpeed"
            min={0.5}
            max={6}
            step={0.5}
            value={ringSpeed}
            onChange={(value) => setRingSpeed(value)}
          />
          <SliderField
            title="duration"
            min={500}
            max={4000}
            step={100}
            value={duration}
            onChange={(value) => setDuration(value)}
          />
          <ColorPicker
            value={dotColor}
            colors={colorOptions}
            onChange={(value) => setDotColor(value)}
          />
        </>
      }
    />
  )
}

export default Droplet
