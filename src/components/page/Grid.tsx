import React, { JSX } from "react";
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
import EffectCard from "../EffectCard";

const Grid = (): JSX.Element => {
  return (
    <div id="effects-grid" className="relative scroll-mt-16 overflow-hidden bg-transparent text-black dark:text-white">
      <div className="relative z-10 w-full border-x border-b border-black/20 dark:border-white/10">
        <div className="flex flex-wrap w-full justify-center gap-x-20 gap-y-10 px-15">
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
