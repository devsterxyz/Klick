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
  particleCount={${particleCount}}
  particleSize={${particleSize}}
  duration={${duration}}
  strokeColor="${strokeColor}"
>
  {/*Content div*/}
</ClickAgitate>`;
  return (
    <PageRails segmentCount={6}>
      <div className="min-h-[calc(100vh-80px)] overflow-hidden bg-transparent text-black dark:text-white">
        <div className="min-h-[calc(100vh-80px)] w-full border-x border-b border-black/20 px-4 py-6 dark:border-white/10 sm:px-6 md:px-10 md:py-8">
          <BackToGridLink />

          <div className="mt-8 grid w-full gap-8 xl:grid-cols-[minmax(0,1.05fr)_minmax(25rem,0.95fr)]">
            <section className="min-w-0">
              <div className="mb-6">
                <p className="mb-3 font-mono text-[11px] uppercase tracking-[0.28em] text-black/45 dark:text-white/45">
                  Click effect
                </p>
                <h1 className="font-sans text-5xl font-semibold leading-none tracking-normal text-black dark:text-white sm:text-6xl">
                  Agitate
                </h1>
              </div>

              <div className="grid gap-5 lg:grid-cols-[minmax(18rem,1fr)_minmax(16rem,0.74fr)]">
                <div className="relative overflow-hidden border border-black/15 bg-white dark:border-white/10 dark:bg-[#050505]">
                  <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-black/35 to-transparent dark:via-white/35" />
                  <div className="relative flex min-h-[21rem] items-center justify-center p-7 sm:min-h-[25rem] lg:min-h-[28rem]">
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
                  </div>
                </div>

                <div className="border border-black/10 bg-white/70 p-5 dark:border-white/10 dark:bg-white/[0.03]">
                  <div className="mb-5 flex items-center justify-between gap-4">
                    <div>
                      <h2 className="text-lg font-medium tracking-normal">
                        Tune the burst
                      </h2>
                      <p className="mt-1 text-sm text-black/55 dark:text-white/50">
                        Shape how noisy, fast, and visible each click feels.
                      </p>
                    </div>
                    <div
                      className="h-8 w-8 shrink-0 border border-black/15 dark:border-white/15"
                      style={{ backgroundColor: strokeColor }}
                      aria-hidden="true"
                    />
                  </div>

                  <div>
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
                    <div className="mb-6 w-full max-w-md">
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
                            className={`h-7 w-7 border transition-all duration-200 ${
                              strokeColor.toLowerCase() === color.toLowerCase()
                                ? "scale-110 border-black shadow-[0_0_0_3px_rgba(0,0,0,0.08)] dark:border-white dark:shadow-[0_0_0_3px_rgba(255,255,255,0.12)]"
                                : "border-black/20 hover:scale-105 dark:border-white/20"
                            }`}
                            style={{ backgroundColor: color }}
                          />
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            <aside className="min-w-0">
              <div className="sticky top-24 space-y-7">
                <div>
                  <div className="mb-3 flex items-center justify-between">
                    <h2 className="text-lg font-medium tracking-normal">Usage</h2>
                    <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-black/40 dark:text-white/40">
                      React
                    </span>
                  </div>
                  <Terminal code={code} />
                </div>

                <div>
                  <h2 className="text-lg font-medium tracking-normal">
                    Installation
                  </h2>
                  <p className="mt-1 text-sm text-black/55 dark:text-white/50">
                    Add the component through the CLI or copy the source into
                    your project.
                  </p>
                </div>
                <InstallationOptions
                  CLICode="npx shadcn@latest add click-agitate"
                  ManualCode={clickAgitateCode}
                />
              </div>
            </aside>
          </div>
        </div>
      </div>
    </PageRails>
  );
};

export default Agitate;
