import React, { useState } from "react";
import CornerBrackets from "@/components/CornerBrackets";
import clickAgitateCode from "../../../registry/new-york/ClickAgitate/ClickAgitate.tsx?raw";
import ClickAgitate from "../../../registry/new-york/ClickAgitate/ClickAgitate";
import SliderField from "../SliderField";
import ComponentPageLayout, { ColorPicker, ColorPreview } from "./layout";

export default function Agitate() {
  const [particleCount, setParticleCount] = useState(17)
  const [particleSize, setParticleSize] = useState(4)
  const [duration, setDuration] = useState(1200)
  const [strokeColor, setStrokeColor] = useState("#ffffff")

  const colorOptions = ["#FFFFFF", "#000000", "#a3e635", "#f59e0b", "#8b5cf6"]

  const code = `<ClickAgitate
  particleCount={${particleCount}}
  particleSize={${particleSize}}
  duration={${duration}}
  strokeColor="${strokeColor}"
>
  {/*Content div*/}
</ClickAgitate>`
  return (
    <ComponentPageLayout
      title="Agitate"
      code={code}
      cliCode="npx shadcn@latest add devsterxyz/Klick/click-agitate"
      manualCode={clickAgitateCode}
      controlTitle="Tune the burst"
      controlDescription="Shape how noisy, fast, and visible each click feels."
      controlAdornment={<ColorPreview color={strokeColor} />}
      preview={
        <ClickAgitate
          particleCount={particleCount}
          particleSize={particleSize}
          duration={duration}
          strokeColor={strokeColor}
        >
          <div
            aria-label="Agitate preview target"
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
        </ClickAgitate>
      }
      controls={
        <>
          <SliderField
            title="Agitation"
            min={0}
            max={50}
            value={particleCount}
            onChange={(value) => setParticleCount(value)}
          />
          <SliderField
            title="Size"
            min={1}
            max={10}
            value={particleSize}
            onChange={(value) => setParticleSize(value)}
          />
          <SliderField
            title="Duration"
            min={500}
            max={2000}
            value={duration}
            onChange={(value) => setDuration(value)}
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

