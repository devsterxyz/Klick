import React, { ReactNode, ComponentType, JSX } from "react";
import ClickBinary from "../animations/ClickBinary";
import ClickAgitate from "../animations/ClickAgitate";
import ClickBlast from "../animations/ClickBlast";
import ClickBulletTime from "../animations/ClickBulletTime";
import ClickDroplet from "../animations/ClickDroplet";
import ClickEmbers from "../animations/ClickEmbers";
import ClickFire from "../animations/ClickFire";
import ClickFireTrail from "../animations/ClickFireTrail";
import ClickFirework from "../animations/ClickFirework";
import ClickFission from "../animations/ClickFission";
import ClickFlame from "../animations/ClickFlame";
import ClickFloat from "../animations/ClickFloat";
import ClickFlowField from "../animations/ClickFlowField";
import ClickFocus from "../animations/ClickFocus";
import ClickFusion from "../animations/ClickFusion";
import ClickGeo from "../animations/ClickGeo";
import ClickGhost from "../animations/ClickGhost";
import ClickHeart from "../animations/ClickHeart";
import ClickHoloSphere from "../animations/ClickHoloSphere";
import ClickMatrixRain from "../animations/ClickMatrixRain";
import ClickPing from "../animations/ClickPing";
import ClickQuantum from "../animations/ClickQuantum";
import ClickRadiate from "../animations/ClickRadiate";
import ClickRain from "../animations/ClickRain";
import ClickRipple from "../animations/ClickRipple";
import ClickRippleMatrix from "../animations/ClickRippleMatrix";
import ClickShatter from "../animations/ClickShatter";
import ClickSkull from "../animations/ClickSkull";
import ClickSmoke from "../animations/ClickSmoke";
import ClickSpark from "../animations/ClickSpark";
import ClickSpark2 from "../animations/ClickSpark2";
import ClickSparkle from "../animations/ClickSparkle";
import ClickSplash from "../animations/ClickSplash";
import ClickSynapse from "../animations/ClickSynapse";
import ClickTesseract from "../animations/ClickTesseract";
import ClickWarp from "../animations/ClickWarp";

const railSegments = Array.from({ length: 8 });

const railSegmentClass =
  'bg-[repeating-linear-gradient(315deg,rgba(0,0,0,0.1)_0,rgba(0,0,0,0.1)_1px,transparent_0,transparent_50%)] dark:bg-[repeating-linear-gradient(315deg,rgba(255,255,255,0.08)_0,rgba(255,255,255,0.08)_1px,transparent_0,transparent_50%)] bg-[length:7px_7px]'

const PatternRail = ({ side }: { side: "left" | "right" }): JSX.Element => {
  const sideBorder = side === "left" ? "border-r" : "border-l";

  return (
    <div
      className={`pointer-events-none absolute inset-y-0 ${side === "left" ? "left-0" : "right-0"} flex w-14 flex-col text-white/8 sm:w-20 xl:w-28`}
    >
      {railSegments.map((_, index) => (
        <div
          key={`${side}-${index}`}
          className={`flex-1 ${sideBorder} ${index !== railSegments.length - 1 ? "border-b" : ""} border-black/20 dark:border-white/20 ${railSegmentClass}`}
        />
      ))}
    </div>
  );
};

const Grid = (): JSX.Element => {
  return (
    <div className="relative overflow-hidden bg-white dark:bg-black text-black dark:text-white">
      <PatternRail side="left" />
      <PatternRail side="right" />

      <div className="relative z-10 mx-14 border-x border-b border-black/20 dark:border-white/10 sm:mx-20 xl:mx-28">
        <div className="grid grid-cols-4 gap-4 px-10 py-10">
          <EffectCard title="Warp" Wrapper={ClickWarp} />
          <EffectCard title="2" Wrapper={ClickBlast} />
          <EffectCard title="3" />
          <EffectCard title="4" />
          <EffectCard title="5" />
          <EffectCard title="6" />
          <EffectCard title="7" />
          <EffectCard title="8" />
          <EffectCard title="9" />
          <EffectCard title="10" />
          <EffectCard title="10" />
          <EffectCard title="10" />
        </div>
      </div>
    </div>
  );
};

export default Grid;


type EffectCardProps = {
  title: string;
  Wrapper?: ComponentType<{ children: ReactNode }>;
};

const EffectCard = ({ title, Wrapper }: EffectCardProps): JSX.Element => {
  const content = (
    <div className="relative w-40 aspect-[1.3/1] border border-[#151515] bg-[#050505] transition-colors duration-300 flex items-center justify-center group-hover:border-[#333] group-hover:bg-[#0a0a0a]">
      
      {/* 🔥 Reused Corner Borders */}
      <CornerBrackets />

      <span className="text-[9px] font-mono tracking-[0.2em] text-[#222] opacity-100 group-hover:opacity-0 transition-opacity duration-300">
        CLICK
      </span>
    </div>
  );

  return (
    <div className="group flex flex-col space-y-3 cursor-default">
      <div className="flex items-center h-4">
        <span className="text-[10px] font-mono tracking-[0.15em] font-bold text-[#555] group-hover:text-white transition-colors duration-200">
          {title}
        </span>
      </div>
      {Wrapper ? <Wrapper>{content}</Wrapper> : content}
    </div>
  );
};
const CardBox = (): JSX.Element=> {
  return (
    <div className="relative w-40 aspect-[1.3/1] border border-[#151515] bg-[#050505] transition-colors duration-300 flex items-center justify-center hover:border-[#333] hover:bg-[#0a0a0a]">
      <div className="absolute top-0 left-0 w-[6px] h-[6px] border-t border-l border-white opacity-0 hover:opacity-100 transition-opacity duration-200" />
      <div className="absolute bottom-0 right-0 w-[6px] h-[6px] border-b border-r border-white opacity-0 hover:opacity-100 transition-opacity duration-200" />

      <span className="text-[9px] font-mono tracking-[0.2em] text-[#222] opacity-100 hover:opacity-0 transition-opacity duration-300">
        CLICK
      </span>
    </div>
  );
};

const CornerBrackets = () => (
  <>
    <div className="absolute top-0 left-0 w-2 h-2 border-t border-l border-white opacity-20 group-hover:opacity-100 transition-all duration-300" />
    <div className="absolute top-0 right-0 w-2 h-2 border-t border-r border-white opacity-20 group-hover:opacity-100 transition-all duration-300" />
    <div className="absolute bottom-0 left-0 w-2 h-2 border-b border-l border-white opacity-20 group-hover:opacity-100 transition-all duration-300" />
    <div className="absolute bottom-0 right-0 w-2 h-2 border-b border-r border-white opacity-20 group-hover:opacity-100 transition-all duration-300" />
  </>
);
