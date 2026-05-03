import React, { useState } from "react";
import PageRails from "./PageRails";
import BackToGridLink from "@/components/BackToGridLink";
import CornerBrackets from "@/components/CornerBrackets";
import InstallationOptions from "@/components/InstallationOptions";
import clickAgitateCode from "@/components/animation/ClickAgitate.tsx?raw";
import ClickAgitate from "../animation/ClickAgitate";
import SliderField from "../SliderField";
import Terminal from "../Terminal";

const Agitate = () => {
  const [particleCount, setParticleCount] = useState(17);
  const [particleSize, setParticleSize] = useState(4);
  const [duration, setDuration] = useState(400);
  const [strokeColor, setStrokeColor] = useState("#ffffff");

  const colorOptions = ["#FFFFFF", "#000000", "#a3e635", "#f59e0b", "#8b5cf6"];

  const code = `<ClickAgitate
  particleCount=${particleCount}
  particleSize=${particleSize}
  duration=${duration}
  strokeColor="${strokeColor}"
>
  {/*Content div*/}
</ClickAgitate>`;
  return (
    <PageRails segmentCount={6}>
      <div className="min-h-[calc(100vh-80px)] overflow-hidden bg-transparent text-black dark:text-white">
        <div className="min-h-[calc(100vh-80px)] w-full border-x border-b border-black/20 px-6 py-8 dark:border-white/10 md:px-10">
          <BackToGridLink />
          <div className="w-full h-full flex mt-5 ml-5">
            <div className="flex-1">
              <ClickAgitate
                particleCount={particleCount}
                particleSize={particleSize}
                duration={duration}
                strokeColor={strokeColor}
              >
                <div
                  className="group/effect-card relative w-75 aspect-[1.1/1] flex items-center justify-center
                  border border-gray-200 dark:border-[#151515]
                  bg-white dark:bg-[#050505]
                  transition-all duration-300
                  group-hover/effect-card:border-gray-400 dark:group-hover/effect-card:border-[#333]
                  group-hover/effect-card:bg-gray-50 dark:group-hover/effect-card:bg-[#0a0a0a]
                  shadow-sm group-hover/effect-card:shadow-md"
                >
                  <CornerBrackets />
                </div>
              </ClickAgitate>
              <div className="mt-5">
                <SliderField
                  title="Agitation"
                  min={0}
                  max={50}
                  value={particleCount}
                  onChange={setParticleCount}
                />
                <SliderField
                  title="Size"
                  min={1}
                  max={10}
                  value={particleSize}
                  onChange={setParticleSize}
                />
                <SliderField
                  title="Duration"
                  min={100}
                  max={1200}
                  value={duration}
                  onChange={setDuration}
                />
                <div className="w-59 max-w-md mb-6">
                  <div className="mb-3 font-sans text-[11px] font-medium uppercase tracking-[0.2em] text-gray-500 dark:text-gray-400">
                    Color
                  </div>
                  <div className="flex gap-3">
                    {colorOptions.map((color) => (
                      <button
                        key={color}
                        type="button"
                        aria-label={`Set particle color to ${color}`}
                        onClick={() => setStrokeColor(color)}
                        className={`h-6 w-6 rounded-full border transition-transform duration-200 ${
                          strokeColor === color
                            ? "scale-110 border-black dark:border-white"
                            : "border-black/20 dark:border-white/20"
                        }`}
                        style={{ backgroundColor: color }}
                      />
                    ))}
                  </div>
                </div>
              </div>
            </div>
            <div className="w-180">
              <Terminal code={code} />
              <div className="mt-5">
                <h1 className="text-2xl">Installation</h1>
                <InstallationOptions
                  CLICode="npx shadcn@latest add click-agitate"
                  ManualCode={clickAgitateCode}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </PageRails>
  );
};

export default Agitate;
