import { useState } from 'react'
import ClickRipple from './animations/ClickRipple'
import ClickShatter from './animations/ClickShatter'
import ClickBinary from './animations/ClickBinary'
import ClickGeo from './animations/ClickGeo'
import ClickFirework from './animations/ClickFirework'
import ClickFocus from './animations/ClickFocus'
import ClickSparkle from './animations/ClickSparkle'
import ClickPing from './animations/ClickPing'
import { useTheme } from './ThemeContext'
import ClickGhost from './animations/ClickGhost'
import ClickSpark from './animations/ClickSpark'
import ClickHeart from './animations/ClickHeart'
import ClickSkull from './animations/ClickSkull'
import ClickFire from './animations/ClickFire'
import ClickBulletTime from './animations/ClickBulletTime'
import ClickMatrixRain from './animations/ClickMatrixRain'
import ClickWarp from './animations/ClickWarp'
import ClickTesseract from './animations/ClickTesseract'
import ClickSynapse from './animations/ClickSynapse'
import ClickHoloSphere from './animations/ClickHoloSphere'
import ClickQuantum from './animations/ClickQuantum'
import ClickFission from './animations/ClickFission'
import ClickFusion from './animations/ClickFusion'
import ClickRadiate from './animations/ClickRadiate'
import ClickFlowField from './animations/ClickFlowField'
import ClickRippleMatrix from './animations/ClickRippleMatrix'
import ClickDroplet from './animations/ClickDroplet'
import ClickSplash from './animations/ClickSplash'
import ClickRain from './animations/ClickRain'
import ClickFlame from './animations/ClickFlame'
import ClickEmbers from './animations/ClickEmbers'
import ClickSpark2 from './animations/ClickSpark2'
import ClickSmoke from './animations/ClickSmoke'
import ClickBlast from './animations/ClickBlast'
import ClickFireTrail from './animations/ClickFireTrail'
import ClickAgitate from './animations/ClickAgitate'
import ClickFloat from './animations/ClickFloat'



function TestingAni() {
  const { contrastColor } = useTheme();

  return (
    <div className='flex flex-col bg-white dark:bg-black'>
    <ClickRipple
      color={contrastColor}
    >
      <div className='h-30 w-30 border'></div>
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
      <div className='h-30 w-30 border'>

      </div>
    </ClickShatter>
    <ClickBinary
      textColor={contrastColor}
      fontSize={12}
      particleCount={10}
      spreadRadius={60}
      duration={800}
      easing="ease-out"
      chars={['0', '1']}
    >
      <div className='h-30 w-30 border'>

      </div>
    </ClickBinary>
    <ClickGeo
      color={contrastColor}
      lineWidth={1}
      maxRadius={50}
      duration={900}
      easing="ease-out"
      shapes={['square', 'triangle']}
    >
      <div className='h-30 w-30 border'>

      </div>
    </ClickGeo>
    <ClickFirework
      color={contrastColor}
      speed={1}       
      gravity={0.08}  
      friction={0.96}
      count={35}
      >
      <div className='h-30 w-30 border'>

      </div>
    </ClickFirework>
    <ClickFocus
      color={contrastColor}
      lineWidth={1}
      startDist={40}
      convergeSpeed={-1.5}
      bracketSize={10}
      decay={0.02}
    >
      <div className='h-30 w-30 border'>

      </div>
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
      <div className='h-30 w-30 border'>

      </div>
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
      <div className='h-30 w-30 border'>

      </div>
    </ClickPing>
    <ClickGhost>
      <div className='h-30 w-30 border'>

      </div>
    </ClickGhost>
    <ClickSpark
    color={contrastColor}
    count = {20}
    speedMin = {2}
    speedMax = {4}
    lenMin = {5}
    lenMax = {20}
    decay = {0.03}
    maxRadius = {30}
    >
      <div className='h-30 w-30 border'>

      </div>
    </ClickSpark>
    <ClickHeart>
      <div className='h-30 w-30 border'></div>
    </ClickHeart>
    <ClickSkull>
      <div className='h-30 w-30 border'></div>
    </ClickSkull>
    <ClickFire>
      <div className='h-30 w-30 border'></div>
    </ClickFire>
    <ClickBulletTime
    count = {10}
    speedMin = {4}
    speedMax = {6}
    friction = {0.92}
    decay = {0.015}
    maxRadius = {50}
    >
      <div className='h-30 w-30 border'></div>
    </ClickBulletTime>
    <ClickMatrixRain
    textColor ={contrastColor}
    >
      <div className='h-30 w-30 border'></div>
    </ClickMatrixRain>
    <ClickWarp>
      <div className='h-30 w-30 border'></div>
    </ClickWarp>
    <ClickTesseract>
      <div className='h-30 w-30 border'></div>
    </ClickTesseract>
    <ClickSynapse>
      <div className='h-30 w-30 border'></div>
    </ClickSynapse>
    <ClickHoloSphere>
      <div className='h-30 w-30 border'></div>
    </ClickHoloSphere>
    <ClickQuantum>
       <div className='h-30 w-30 border'></div>
    </ClickQuantum>
    <ClickFission>
      <div className='h-30 w-30 border'></div>
    </ClickFission>
    <ClickFusion>
      <div className='h-30 w-30 border'></div>
    </ClickFusion>
    <ClickRadiate>
      <div className='h-30 w-30 border'></div>
    </ClickRadiate>
    <ClickFlowField>
      <div className='h-30 w-30 border'></div>
    </ClickFlowField>
    <ClickRippleMatrix>
      <div className='h-30 w-30 border'></div>
    </ClickRippleMatrix>
    <ClickDroplet>
      <div className='h-30 w-30 border'></div>
    </ClickDroplet>
    <ClickSplash>
      <div className='h-30 w-30 border'></div>
    </ClickSplash>
    <ClickRain>
      <div className='h-30 w-30 border'></div>
    </ClickRain>
    <ClickFlame>
      <div className='h-30 w-30 border'></div>
    </ClickFlame>
    <ClickEmbers>
      <div className='h-30 w-30 border'></div>
    </ClickEmbers>
    <ClickSpark2>
      <div className='h-30 w-30 border'></div>
    </ClickSpark2>
    <ClickSmoke>
      <div className='h-30 w-30 border'></div>
    </ClickSmoke>
    <ClickBlast>
      <div className='h-30 w-30 border'></div>
    </ClickBlast>
    <ClickFireTrail>
      <div className='h-30 w-30 border'></div>
    </ClickFireTrail>
    <ClickAgitate>
      <div className='h-30 w-30 border'></div>
    </ClickAgitate>
    <ClickFloat>
      <div className='h-30 w-30 border'></div>
    </ClickFloat>
    </div>
  )
}

export default TestingAni
