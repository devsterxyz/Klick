import React, { JSX } from "react";
import ClickBinary from "../../../registry/new-york/ClickBinary/ClickBinary";
import ClickAgitate from "../../../registry/new-york/ClickAgitate/ClickAgitate";
import ClickAlignment from "../../../registry/new-york/ClickAlignment/ClickAlignment";
import ClickBlackHole from "../../../registry/new-york/ClickBlackHole/ClickBlackHole";
import ClickBlast from "../../../registry/new-york/ClickBlast/ClickBlast";
import ClickBoundingBox from "../../../registry/new-york/ClickBoundingBox/ClickBoundingBox";
import ClickBulletTime from "../../../registry/new-york/ClickBulletTime/ClickBulletTime";
import ClickDiffusion from "../../../registry/new-york/ClickDiffusion/ClickDiffusion";
import ClickDoubleSonar from "../../../registry/new-york/ClickDoubleSonar/ClickDoubleSonar";
import ClickDroplet from "../../../registry/new-york/ClickDroplet/ClickDroplet";
import ClickEmbers from "../../../registry/new-york/ClickEmbers/ClickEmbers";
import ClickFire from "../../../registry/new-york/ClickFire/ClickFire";
import ClickFireTrail from "../../../registry/new-york/ClickFireTrail/ClickFireTrail";
import ClickFirework from "../../../registry/new-york/ClickFirework/ClickFirework";
import ClickFission from "../../../registry/new-york/ClickFission/ClickFission";
import ClickFlame from "../../../registry/new-york/ClickFlame/ClickFlame";
import ClickFloat from "../../../registry/new-york/ClickFloat/ClickFloat";
import ClickFlowField from "../../../registry/new-york/ClickFlowField/ClickFlowField";
import ClickFocus from "../../../registry/new-york/ClickFocus/ClickFocus";
import ClickFusion from "../../../registry/new-york/ClickFusion/ClickFusion";
import ClickGenerative from "../../../registry/new-york/ClickGenerative/ClickGenerative";
import ClickGeo from "../../../registry/new-york/ClickGeo/ClickGeo";
import ClickGhost from "../../../registry/new-york/ClickGhost/ClickGhost";
import ClickHeart from "../../../registry/new-york/ClickHeart/ClickHeart";
import ClickHoloSphere from "../../../registry/new-york/ClickHoloSphere/ClickHoloSphere";
import ClickLoad from "../../../registry/new-york/ClickLoad/ClickLoad";
import ClickMatrixRain from "../../../registry/new-york/ClickMatrixRain/ClickMatrixRain";
import ClickPing from "../../../registry/new-york/ClickPing/ClickPing";
import ClickQuantum from "../../../registry/new-york/ClickQuantum/ClickQuantum";
import ClickRadiate from "../../../registry/new-york/ClickRadiate/ClickRadiate";
import ClickRain from "../../../registry/new-york/ClickRain/ClickRain";
import ClickResonance from "../../../registry/new-york/ClickResonance/ClickResonance";
import ClickRipple from "../../../registry/new-york/ClickRipple/ClickRipple";
import ClickRippleMatrix from "../../../registry/new-york/ClickRippleMatrix/ClickRippleMatrix";
import ClickShatter from "../../../registry/new-york/ClickShatter/ClickShatter";
import ClickSkull from "../../../registry/new-york/ClickSkull/ClickSkull";
import ClickSmoke from "../../../registry/new-york/ClickSmoke/ClickSmoke";
import ClickSonar from "../../../registry/new-york/ClickSonar/ClickSonar";
import ClickSolidRipple from "../../../registry/new-york/ClickSolidRipple/ClickSolidRipple";
import ClickSpark from "../../../registry/new-york/ClickSpark/ClickSpark";
import ClickSpark2 from "../../../registry/new-york/ClickSpark2/ClickSpark2";
import ClickSparkle from "../../../registry/new-york/ClickSparkle/ClickSparkle";
import ClickSplash from "../../../registry/new-york/ClickSplash/ClickSplash";
import ClickSupernova from "../../../registry/new-york/ClickSupernova/ClickSupernova";
import ClickSynapse from "../../../registry/new-york/ClickSynapse/ClickSynapse";
import ClickTesseract from "../../../registry/new-york/ClickTesseract/ClickTesseract";
import ClickWarp from "../../../registry/new-york/ClickWarp/ClickWarp";
import EffectCard from "../EffectCard";
import ClickPrompt from "../../../registry/new-york/ClickPrompt/ClickPrompt";
import { useTheme } from "../ThemeContext";
import Footer from "../Footer";

const SolidRippleGridPreview = ({ color }: { color?: string }) => (
  <ThemeAwareGridPreview type="solid-ripple" color={color} />
);

const ResonanceGridPreview = ({ color }: { color?: string }) => (
  <ThemeAwareGridPreview type="resonance" color={color} />
);

const ThemeAwareGridPreview = ({
  type,
  color,
}: {
  type: "resonance" | "solid-ripple";
  color?: string;
}) => {
  const { theme, contrastColor } = useTheme();
  const [isMobilePreview, setIsMobilePreview] = React.useState(false);
  const isDark = theme === "dark";
  const effectColor = color ?? contrastColor;
  const background = isDark ? "#050505" : "#ffffff";
  const previewSize = isMobilePreview ? 148 : 192;
  const previewClassName =
    "border border-gray-200 dark:border-[#151515] transition-all duration-300 group-hover/effect-card:border-gray-400 dark:group-hover/effect-card:border-[#333]";

  React.useEffect(() => {
    const mediaQuery = window.matchMedia("(max-width: 639px)");
    const handleChange = () => setIsMobilePreview(mediaQuery.matches);

    handleChange();
    mediaQuery.addEventListener("change", handleChange);

    return () => mediaQuery.removeEventListener("change", handleChange);
  }, []);

  if (type === "resonance") {
    return (
      <ClickResonance
        className={previewClassName}
        width={previewSize}
        height={previewSize}
        color={effectColor}
        background={background}
      />
    );
  }

  return (
    <ClickSolidRipple
      className={previewClassName}
      width={previewSize}
      height={previewSize}
      color={effectColor}
      background={background}
    />
  );
};

const Grid = (): JSX.Element => {
  return (
    <div
      id="effects-grid"
      className="relative scroll-mt-16 overflow-hidden bg-transparent text-black dark:text-white"
    >
      <div className="relative z-10 w-full border-b border-black/20 dark:border-white/10 lg:border-x">
        <div className="grid w-full grid-cols-2 justify-items-center gap-x-1 gap-y-8 px-0 pb-16 pt-8 min-[390px]:gap-x-3 sm:gap-x-10 sm:gap-y-12 sm:px-6 sm:pb-24 md:px-10 lg:grid-cols-3 lg:pb-28 xl:grid-cols-4 xl:px-14">
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
          <EffectCard
            title="Resonance"
            Wrapper={ResonanceGridPreview}
            to="/Resonance"
          />
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
          <EffectCard
            title="Solid Ripple"
            Wrapper={SolidRippleGridPreview}
            to="/SolidRipple"
          />
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
      <Footer />
    </div>
  );
};

export default Grid;
