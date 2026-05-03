import React, { useState } from "react";
import PageRails from "./PageRails";
import BackToGridLink from "@/components/BackToGridLink";
import clickBinaryCode from "@/components/animation/ClickBinary.tsx?raw";
import ClickBinary from "../animation/ClickBinary";
import CornerBrackets from "../CornerBrackets";
import SliderField from "../SliderField";
import Terminal from "../Terminal";

const Binary = () => {
  const [particleCount, setParticleCount] = useState(10);
  const [fontSize, setFontSize] = useState(12);
  const [spreadRadius, setSpreadRadius] = useState(60);
  const [duration, setDuration] = useState(800);

  const code = `<ClickBinary
  particleCount={${particleCount}}
  fontSize={${fontSize}}
  spreadRadius={${spreadRadius}}
  duration={${duration}}
>
  {/*Content div*/}
</ClickBinary>`;

  return (
    <PageRails segmentCount={29}>
      <div className="min-h-[calc(100vh-80px)] overflow-hidden bg-transparent text-black dark:text-white">
        <div className="min-h-[calc(100vh-80px)] w-full border-x border-b border-black/20 px-6 py-8 dark:border-white/10 md:px-10">
          <BackToGridLink />
          <div className="mt-5 ml-5 flex h-full w-full flex-col gap-8">
            <div className="flex items-start gap-10">
              <div>
                <ClickBinary
                  particleCount={particleCount}
                  fontSize={fontSize}
                  spreadRadius={spreadRadius}
                  duration={duration}
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
                </ClickBinary>
              </div>
              <div>
                <SliderField
                  title="Particles"
                  min={1}
                  max={50}
                  value={particleCount}
                  onChange={setParticleCount}
                />
                <SliderField
                  title="Font Size"
                  min={8}
                  max={32}
                  value={fontSize}
                  onChange={setFontSize}
                />
                <SliderField
                  title="Spread"
                  min={20}
                  max={140}
                  value={spreadRadius}
                  onChange={setSpreadRadius}
                />
                <SliderField
                  title="Duration"
                  min={200}
                  max={1600}
                  value={duration}
                  onChange={setDuration}
                />
              </div>
            </div>
            <div className="w-full max-w-[42rem]">
              <Terminal code={code} />
              <div className="mt-5">
                <h1 className="text-2xl">Installation</h1>
                <div className="mt-4 flex flex-col gap-5">
                  <Terminal
                    code="npx shadcn@latest add click-binary"
                    fileName="CLI"
                  />
                  <Terminal code={clickBinaryCode} fileName="Manual" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </PageRails>
  );
};

export default Binary;
