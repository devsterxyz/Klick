import { useState } from "react";
import ClickRipple from "./animation/ClickRipple";
import ClickShatter from "./animation/ClickShatter";
import ClickBinary from "../../registry/new-york/ClickBinary/ClickBinary";
import ClickGeo from "./animation/ClickGeo";
import ClickFirework from "./animation/ClickFirework";
import ClickFocus from "./animation/ClickFocus";
import ClickSparkle from "./animation/ClickSparkle";
import ClickPing from "./animation/ClickPing";
import { useTheme } from "./ThemeContext";
import ClickGhost from "./animation/ClickGhost";
import ClickSpark from "./animation/ClickSpark";
import ClickHeart from "./animation/ClickHeart";
import ClickSkull from "./animation/ClickSkull";
import ClickFire from "./animation/ClickFire";
import ClickBulletTime from "./animation/ClickBulletTime";
import ClickMatrixRain from "./animation/ClickMatrixRain";
import ClickWarp from "./animation/ClickWarp";
import ClickTesseract from "./animation/ClickTesseract";
import ClickSynapse from "./animation/ClickSynapse";
import ClickHoloSphere from "./animation/ClickHoloSphere";
import ClickQuantum from "./animation/ClickQuantum";
import ClickFission from "./animation/ClickFission";
import ClickFusion from "./animation/ClickFusion";
import ClickRadiate from "./animation/ClickRadiate";
import ClickFlowField from "./animation/ClickFlowField";
import ClickRippleMatrix from "./animation/ClickRippleMatrix";
import ClickDroplet from "./animation/ClickDroplet";
import ClickSplash from "./animation/ClickSplash";
import ClickRain from "./animation/ClickRain";
import ClickFlame from "./animation/ClickFlame";
import ClickEmbers from "./animation/ClickEmbers";
import ClickSpark2 from "./animation/ClickSpark2";
import ClickSmoke from "./animation/ClickSmoke";
import ClickBlast from "../../registry/new-york/ClickBlast/ClickBlast";
import ClickFireTrail from "./animation/ClickFireTrail";
import ClickAgitate from "../../registry/new-york/ClickAgitate/ClickAgitate";
import ClickFloat from "./animation/ClickFloat";

function TestingAni() {
  const { contrastColor } = useTheme();

  return (
    <div className="flex flex-col bg-white dark:bg-black">
      <ClickRipple color={contrastColor}>
        <div className="h-30 w-30 border"></div>
      </ClickRipple>
      <ClickShatter
        shardColor={contrastColor}
        shardCount={7}
        shardSize={3}
        spreadRadius={40}
        duration={700}
        easing="ease-out"
        gravity={0.6}
      >
        <div className="h-30 w-30 border"></div>
      </ClickShatter>
      <ClickBinary
        textColor={contrastColor}
        fontSize={12}
        particleCount={10}
        spreadRadius={60}
        duration={800}
        easing="ease-out"
        chars={["0", "1"]}
      >
        <div className="h-30 w-30 border"></div>
      </ClickBinary>
      <ClickGeo
        color={contrastColor}
        lineWidth={1}
        maxRadius={50}
        duration={900}
        easing="ease-out"
        shapes={["square", "triangle"]}
      >
        <div className="h-30 w-30 border"></div>
      </ClickGeo>
      <ClickFirework
        color={contrastColor}
        speed={1}
        gravity={0.08}
        friction={0.96}
        count={35}
      >
        <div className="h-30 w-30 border"></div>
      </ClickFirework>
      <ClickFocus
        color={contrastColor}
        lineWidth={1}
        startDist={40}
        convergeSpeed={-1.5}
        bracketSize={10}
        decay={0.02}
      >
        <div className="h-30 w-30 border"></div>
      </ClickFocus>
      <ClickSparkle
        color={contrastColor}
        lineWidth={0.5}
        count={8}
        scatter={50}
        minSize={2}
        maxSize={6}
        decay={0.02}
      >
        <div className="h-30 w-30 border"></div>
      </ClickSparkle>
      <ClickPing
        color={contrastColor}
        ringSpeed={0.6}
        ringLineWidth={1.5}
        dotSize={2}
        ringDecay={0.025}
        dotDecay={0.05}
        maxRadius={20}
      >
        <div className="h-30 w-30 border"></div>
      </ClickPing>
      <ClickGhost>
        <div className="h-30 w-30 border"></div>
      </ClickGhost>
      <ClickSpark
        color={contrastColor}
        count={20}
        speedMin={2}
        speedMax={4}
        lenMin={5}
        lenMax={20}
        decay={0.03}
        maxRadius={30}
      >
        <div className="h-30 w-30 border"></div>
      </ClickSpark>
      <ClickHeart>
        <div className="h-30 w-30 border"></div>
      </ClickHeart>
      <ClickSkull>
        <div className="h-30 w-30 border"></div>
      </ClickSkull>
      <ClickFire>
        <div className="h-30 w-30 border"></div>
      </ClickFire>
      <ClickBulletTime
        count={10}
        speedMin={4}
        speedMax={6}
        friction={0.92}
        decay={0.015}
        maxRadius={50}
      >
        <div className="h-30 w-30 border"></div>
      </ClickBulletTime>
      <ClickMatrixRain textColor={contrastColor}>
        <div className="h-30 w-30 border"></div>
      </ClickMatrixRain>
      <ClickWarp>
        <div className="h-30 w-30 border"></div>
      </ClickWarp>
      <ClickTesseract>
        <div className="h-30 w-30 border"></div>
      </ClickTesseract>
      <ClickSynapse>
        <div className="h-30 w-30 border"></div>
      </ClickSynapse>
      <ClickHoloSphere>
        <div className="h-30 w-30 border"></div>
      </ClickHoloSphere>
      <ClickQuantum>
        <div className="h-30 w-30 border"></div>
      </ClickQuantum>
      <ClickFission>
        <div className="h-30 w-30 border"></div>
      </ClickFission>
      <ClickFusion>
        <div className="h-30 w-30 border"></div>
      </ClickFusion>
      <ClickRadiate>
        <div className="h-30 w-30 border"></div>
      </ClickRadiate>
      <ClickFlowField>
        <div className="h-30 w-30 border"></div>
      </ClickFlowField>
      <ClickRippleMatrix>
        <div className="h-30 w-30 border"></div>
      </ClickRippleMatrix>
      <ClickDroplet>
        <div className="h-30 w-30 border"></div>
      </ClickDroplet>
      <ClickSplash>
        <div className="h-30 w-30 border"></div>
      </ClickSplash>
      <ClickRain>
        <div className="h-30 w-30 border"></div>
      </ClickRain>
      <ClickFlame>
        <div className="h-30 w-30 border"></div>
      </ClickFlame>
      <ClickEmbers>
        <div className="h-30 w-30 border"></div>
      </ClickEmbers>
      <ClickSpark2>
        <div className="h-30 w-30 border"></div>
      </ClickSpark2>
      <ClickSmoke>
        <div className="h-30 w-30 border"></div>
      </ClickSmoke>
      <ClickBlast>
        <div className="h-30 w-30 border"></div>
      </ClickBlast>
      <ClickFireTrail>
        <div className="h-30 w-30 border"></div>
      </ClickFireTrail>
      <ClickAgitate>
        <div className="h-30 w-30 border"></div>
      </ClickAgitate>
      <ClickFloat>
        <div className="h-30 w-30 border"></div>
      </ClickFloat>
    </div>
  );
}

export default TestingAni;
