import React, { JSX } from "react";
import ClickBinary from "../animation/ClickBinary";
import ClickAgitate from "../animation/ClickAgitate";
import ClickBlast from "../../../registry/new-york/ClickBlast/ClickBlast";
import ClickBulletTime from "../animation/ClickBulletTime";
import ClickDroplet from "../animation/ClickDroplet";
import ClickEmbers from "../animation/ClickEmbers";
import ClickFire from "../animation/ClickFire";
import ClickFireTrail from "../animation/ClickFireTrail";
import ClickFirework from "../animation/ClickFirework";
import ClickFission from "../animation/ClickFission";
import ClickFlame from "../animation/ClickFlame";
import ClickFloat from "../animation/ClickFloat";
import ClickFlowField from "../animation/ClickFlowField";
import ClickFocus from "../animation/ClickFocus";
import ClickFusion from "../animation/ClickFusion";
import ClickGeo from "../animation/ClickGeo";
import ClickGhost from "../animation/ClickGhost";
import ClickHeart from "../animation/ClickHeart";
import ClickHoloSphere from "../animation/ClickHoloSphere";
import ClickMatrixRain from "../animation/ClickMatrixRain";
import ClickPing from "../animation/ClickPing";
import ClickQuantum from "../animation/ClickQuantum";
import ClickRadiate from "../animation/ClickRadiate";
import ClickRain from "../animation/ClickRain";
import ClickRipple from "../animation/ClickRipple";
import ClickRippleMatrix from "../animation/ClickRippleMatrix";
import ClickShatter from "../animation/ClickShatter";
import ClickSkull from "../animation/ClickSkull";
import ClickSmoke from "../animation/ClickSmoke";
import ClickSpark from "../animation/ClickSpark";
import ClickSpark2 from "../animation/ClickSpark2";
import ClickSparkle from "../animation/ClickSparkle";
import ClickSplash from "../animation/ClickSplash";
import ClickSynapse from "../animation/ClickSynapse";
import ClickTesseract from "../animation/ClickTesseract";
import ClickWarp from "../animation/ClickWarp";
import EffectCard from "../EffectCard";

const Grid = (): JSX.Element => {
  return (
    <div
      id="effects-grid"
      className="relative scroll-mt-16 overflow-hidden bg-transparent text-black dark:text-white"
    >
      <div className="relative z-10 w-full border-x border-b border-black/20 dark:border-white/10">
        <div className="flex flex-wrap w-full justify-center gap-x-20 gap-y-10 px-15">
          <EffectCard title="Agitate" Wrapper={ClickAgitate} to="/Agitate" />
          <EffectCard title="Binary" Wrapper={ClickBinary} to="/Binary" />
          <EffectCard title="Blast" Wrapper={ClickBlast} to="/Blast" />
          <EffectCard
            title="Bullet Time"
            Wrapper={ClickBulletTime}
            to="/BulletTime"
          />
          <EffectCard title="Droplet" Wrapper={ClickDroplet} to="/Droplet" />
          <EffectCard title="Embers" Wrapper={ClickEmbers} to="/Embers" />
          <EffectCard title="Fire" Wrapper={ClickFire} to="/Fire" />
          <EffectCard
            title="Fire Trail"
            Wrapper={ClickFireTrail}
            to="/FireTrail"
          />
          <EffectCard title="Firework" Wrapper={ClickFirework} to="/Firework" />
          <EffectCard title="Fission" Wrapper={ClickFission} to="/Fission" />
          <EffectCard title="Flame" Wrapper={ClickFlame} to="/Flame" />
          <EffectCard title="Float" Wrapper={ClickFloat} to="/Float" />
          <EffectCard
            title="Flow Field"
            Wrapper={ClickFlowField}
            to="/FlowField"
          />
          <EffectCard title="Focus" Wrapper={ClickFocus} to="/Focus" />
          <EffectCard title="Fusion" Wrapper={ClickFusion} to="/Fusion" />
          <EffectCard title="Geo" Wrapper={ClickGeo} to="/Geo" />
          <EffectCard title="Ghost" Wrapper={ClickGhost} to="/Ghost" />
          <EffectCard title="Heart" Wrapper={ClickHeart} to="/Heart" />
          <EffectCard
            title="Holo Sphere"
            Wrapper={ClickHoloSphere}
            to="/HoloSphere"
          />
          <EffectCard
            title="Matrix Rain"
            Wrapper={ClickMatrixRain}
            to="/MatrixRain"
          />
          <EffectCard title="Ping" Wrapper={ClickPing} to="/Ping" />
          <EffectCard title="Quantum" Wrapper={ClickQuantum} to="/Quantum" />
          <EffectCard title="Radiate" Wrapper={ClickRadiate} to="/Radiate" />
          <EffectCard title="Rain" Wrapper={ClickRain} to="/Rain" />
          <EffectCard title="Ripple" Wrapper={ClickRipple} to="/Ripple" />
          <EffectCard
            title="Ripple Matrix"
            Wrapper={ClickRippleMatrix}
            to="/RippleMatrix"
          />
          <EffectCard title="Shatter" Wrapper={ClickShatter} to="/Shatter" />
          <EffectCard title="Skull" Wrapper={ClickSkull} to="/Skull" />
          <EffectCard title="Smoke" Wrapper={ClickSmoke} to="/Smoke" />
          <EffectCard title="Spark" Wrapper={ClickSpark} to="/Spark" />
          <EffectCard title="Spark2" Wrapper={ClickSpark2} to="/Spark2" />
          <EffectCard title="Sparkle" Wrapper={ClickSparkle} to="/Sparkle" />
          <EffectCard title="Splash" Wrapper={ClickSplash} to="/Splash" />
          <EffectCard title="Synapse" Wrapper={ClickSynapse} to="/Synapse" />
          <EffectCard
            title="Tesseract"
            Wrapper={ClickTesseract}
            to="/Tesseract"
          />
          <EffectCard title="Warp" Wrapper={ClickWarp} to="/Warp" />
        </div>
      </div>
    </div>
  );
};

export default Grid;
