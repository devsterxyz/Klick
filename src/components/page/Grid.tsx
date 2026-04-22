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
import { Link } from "react-router-dom";

const Grid = (): JSX.Element => {
  return (
    <div className="relative overflow-hidden bg-transparent text-black dark:text-white">
      <div className="relative z-10 w-full border-x border-b border-black/20 dark:border-white/10">
        <div className="grid grid-cols-4 gap-4 px-10 py-10">
          <EffectCard title="Agitate" Wrapper={ClickAgitate} to="/Agitate" />
          <EffectCard title="Binary" Wrapper={ClickBinary} to="/Binary" />
          <EffectCard title="Blast" Wrapper={ClickBlast} to="/Blast" />
          <EffectCard title="Bullet Time" Wrapper={ClickBulletTime} to="/BulletTime" />
          <EffectCard title="Droplet" Wrapper={ClickDroplet} to="/Droplet" />
          <EffectCard title="Embers" Wrapper={ClickEmbers} to="/Embers" />
          <EffectCard title="Fire" Wrapper={ClickFire} to="/Fire" />
          <EffectCard title="Fire Trail" Wrapper={ClickFireTrail} to="/FireTrail" />
          <EffectCard title="Firework" Wrapper={ClickFirework} to="/Firework" />
          <EffectCard title="Fission" Wrapper={ClickFission} to="/Fission" />
          <EffectCard title="Flame" Wrapper={ClickFlame} to="/Flame" />
          <EffectCard title="Float" Wrapper={ClickFloat} to="/Float" />
          <EffectCard title="Flow Field" Wrapper={ClickFlowField} to="/FlowField" />
          <EffectCard title="Focus" Wrapper={ClickFocus} to="/Focus" />
          <EffectCard title="Fusion" Wrapper={ClickFusion} to="/Fusion" />
          <EffectCard title="Geo" Wrapper={ClickGeo} to="/Geo" />
          <EffectCard title="Ghost" Wrapper={ClickGhost} to="/Ghost" />
          <EffectCard title="Heart" Wrapper={ClickHeart} to="/Heart" />
          <EffectCard title="Holo Sphere" Wrapper={ClickHoloSphere} to="/HoloSphere" />
          <EffectCard title="Matrix Rain" Wrapper={ClickMatrixRain} to="/MatrixRain" />
          <EffectCard title="Ping" Wrapper={ClickPing} to="/Ping" />
          <EffectCard title="Quantum" Wrapper={ClickQuantum} to="/Quantum" />
          <EffectCard title="Radiate" Wrapper={ClickRadiate} to="/Radiate" />
          <EffectCard title="Rain" Wrapper={ClickRain} to="/Rain" />
          <EffectCard title="Ripple" Wrapper={ClickRipple} to="/Ripple" />
          <EffectCard title="Ripple Matrix" Wrapper={ClickRippleMatrix} to="/RippleMatrix" />
          <EffectCard title="Shatter" Wrapper={ClickShatter} to="/Shatter" />
          <EffectCard title="Skull" Wrapper={ClickSkull} to="/Skull" />
          <EffectCard title="Smoke" Wrapper={ClickSmoke} to="/Smoke" />
          <EffectCard title="Spark" Wrapper={ClickSpark} to="/Spark" />
          <EffectCard title="Spark2" Wrapper={ClickSpark2} to="/Spark2" />
          <EffectCard title="Sparkle" Wrapper={ClickSparkle} to="/Sparkle" />
          <EffectCard title="Splash" Wrapper={ClickSplash} to="/Splash" />
          <EffectCard title="Synapse" Wrapper={ClickSynapse} to="/Synapse" />
          <EffectCard title="Tesseract" Wrapper={ClickTesseract} to="/Tesseract" />
          <EffectCard title="Warp" Wrapper={ClickWarp} to="/Warp" />
        </div>
      </div>
    </div>
  );
};

export default Grid;

type EffectCardProps = {
  title: string;
  Wrapper?: ComponentType<{ children: ReactNode }>;
  to: string;
};

const EffectCard = ({ title, Wrapper, to }: EffectCardProps): JSX.Element => {
  const content = (
    <div
      className="relative w-40 aspect-[1.3/1] flex items-center justify-center
      border border-gray-200 dark:border-[#151515]
      bg-white dark:bg-[#050505]
      transition-all duration-300
      group-hover:border-gray-400 dark:group-hover:border-[#333]
      group-hover:bg-gray-50 dark:group-hover:bg-[#0a0a0a]
      shadow-sm group-hover:shadow-md"
    >
      <CornerBrackets />

      <span
        className="text-[9px] font-mono tracking-[0.2em] uppercase
        text-gray-400 dark:text-[#222]
        opacity-100 group-hover:opacity-0
        transition-opacity duration-300"
      >
        CLICK
      </span>
    </div>
  );

  return (
    <div className="group flex flex-col space-y-3 cursor-default p-4 items-center">
      <div className="flex items-center h-4">
        <span
          className="text-[10px] font-mono tracking-[0.15em] font-bold uppercase
          text-gray-500 dark:text-[#555]
          group-hover:text-black dark:group-hover:text-white
          transition-colors duration-200"
        >
          {title}
        </span>
      </div>

      {Wrapper ? <Wrapper>{content}</Wrapper> : content} 
        <Link
          className="px-6 py-2.5 bg-black text-white rounded-lg font-medium hover:bg-zinc-800 transition-all active:scale-95 shadow-sm"
          to={to}
        >
          Get Started
        </Link>
    </div>
  );
};

const CardBox = (): JSX.Element => {
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
    <div
      className="absolute top-0 left-0 w-1.5 h-1.5 
      border-t border-l 
      border-gray-300 dark:border-white/20 
      group-hover:border-gray-500 dark:group-hover:border-white 
      transition-all duration-300"
    />
    <div
      className="absolute top-0 right-0 w-1.5 h-1.5 
      border-t border-r 
      border-gray-300 dark:border-white/20 
      group-hover:border-gray-500 dark:group-hover:border-white 
      transition-all duration-300"
    />
    <div
      className="absolute bottom-0 left-0 w-1.5 h-1.5 
      border-b border-l 
      border-gray-300 dark:border-white/20 
      group-hover:border-gray-500 dark:group-hover:border-white 
      transition-all duration-300"
    />
    <div
      className="absolute bottom-0 right-0 w-1.5 h-1.5 
      border-b border-r 
      border-gray-300 dark:border-white/20 
      group-hover:border-gray-500 dark:group-hover:border-white 
      transition-all duration-300"
    />
  </>
);
