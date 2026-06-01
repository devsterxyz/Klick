import React, { JSX } from "react";
import ClickBinary from "../../../registry/new-york/ClickBinary/ClickBinary";
import ClickAgitate from "../../../registry/new-york/ClickAgitate/ClickAgitate";
import ClickAlignment from "../../../registry/new-york/ClickAlignment/ClickAlignment";
import ClickBlackHole from "../../../registry/new-york/ClickBlackHole/ClickBlackHole";
import ClickBlast from "../../../registry/new-york/ClickBlast/ClickBlast";
import ClickBoundingBox from "../../../registry/new-york/ClickBoundingBox/ClickBoundingBox";
import ClickBulletTime from "../animation/ClickBulletTime";
import ClickDiffusion from "../animation/ClickDiffusion";
import ClickDoubleSonar from "../animation/ClickDoubleSonar";
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
import ClickGenerative from "../animation/ClickGenerative";
import ClickGeo from "../animation/ClickGeo";
import ClickGhost from "../animation/ClickGhost";
import ClickHeart from "../animation/ClickHeart";
import ClickHoloSphere from "../animation/ClickHoloSphere";
import ClickLoad from "../animation/ClickLoad";
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
import ClickSonar from "../animation/ClickSonar";
import ClickSpark from "../animation/ClickSpark";
import ClickSpark2 from "../animation/ClickSpark2";
import ClickSparkle from "../animation/ClickSparkle";
import ClickSplash from "../animation/ClickSplash";
import ClickSupernova from "../animation/ClickSupernova";
import ClickSynapse from "../animation/ClickSynapse";
import ClickTesseract from "../animation/ClickTesseract";
import ClickWarp from "../animation/ClickWarp";
import EffectCard from "../EffectCard";
import ClickPrompt from "../animation/ClickPrompt";

const Grid = (): JSX.Element => {
  return (
    <div
      id="effects-grid"
      className="relative scroll-mt-16 overflow-hidden bg-transparent text-black dark:text-white"
    >
      <div className="relative z-10 w-full border-x border-b border-black/20 dark:border-white/10">
        <div className="grid w-full grid-cols-1 justify-items-center gap-x-10 gap-y-12 px-6 py-10 sm:grid-cols-2 md:px-10 lg:grid-cols-3 xl:grid-cols-4 xl:px-14">
          <EffectCard title="Agitate" Wrapper={ClickAgitate} to="/Agitate" />
          <EffectCard
            title="Alignment"
            Wrapper={ClickAlignment}
            to="/Alignment"
          />
          <EffectCard title="Binary" Wrapper={ClickBinary} to="/Binary" />
          <EffectCard
            title="Black Hole"
            Wrapper={ClickBlackHole}
            to="/BlackHole"
          />
          <EffectCard title="Blast" Wrapper={ClickBlast} to="/Blast" />
          <EffectCard
            title="Bounding Box"
            Wrapper={ClickBoundingBox}
            to="/BoundingBox"
          />
          <EffectCard
            title="Bullet Time"
            Wrapper={ClickBulletTime}
            to="/BulletTime"
          />
          <EffectCard
            title="Diffusion"
            Wrapper={ClickDiffusion}
            to="/Diffusion"
          />
          <EffectCard
            title="Double Sonar"
            Wrapper={ClickDoubleSonar}
            to="/DoubleSonar"
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
          <EffectCard
            title="Generative"
            Wrapper={ClickGenerative}
            to="/Generative"
          />
          <EffectCard title="Geo" Wrapper={ClickGeo} to="/Geo" />
          <EffectCard title="Ghost" Wrapper={ClickGhost} to="/Ghost" />
          <EffectCard title="Heart" Wrapper={ClickHeart} to="/Heart" />
          <EffectCard
            title="Holo Sphere"
            Wrapper={ClickHoloSphere}
            to="/HoloSphere"
          />
          <EffectCard title="Load" Wrapper={ClickLoad} to="/Load" />
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
          <EffectCard title="Sonar" Wrapper={ClickSonar} to="/Sonar" />
          <EffectCard title="Spark" Wrapper={ClickSpark} to="/Spark" />
          <EffectCard title="Spark2" Wrapper={ClickSpark2} to="/Spark2" />
          <EffectCard title="Sparkle" Wrapper={ClickSparkle} to="/Sparkle" />
          <EffectCard title="Splash" Wrapper={ClickSplash} to="/Splash" />
          <EffectCard
            title="Supernova"
            Wrapper={ClickSupernova}
            to="/Supernova"
          />
          <EffectCard title="Synapse" Wrapper={ClickSynapse} to="/Synapse" />
          <EffectCard title="Prompt" Wrapper={ClickPrompt} to="/Prompt" />
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
