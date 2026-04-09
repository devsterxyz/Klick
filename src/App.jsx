import { useState } from 'react'
import ClickRipple from './components/animations/ClickRipple'
import ClickShatter from './components/animations/ClickShatter'
import ClickBinary from './components/animations/ClickBinary'
import ClickGeo from './components/animations/ClickGeo'
import ClickFirework from './components/animations/ClickFirework'
import ClickFocus from './components/animations/ClickFocus'
import ClickSparkle from './components/animations/ClickSparkle'
import ClickPing from './components/animations/ClickPing'
import { useTheme } from './components/ThemeContext'
import ClickGhost from './components/animations/ClickGhost'
import ClickSpark from './components/animations/ClickSpark'
import ClickHeart from './components/animations/ClickHeart'
import ClickSkull from './components/animations/ClickSkull'
import ClickFire from './components/animations/ClickFire'
import ClickBulletTime from './components/animations/ClickBulletTime'



function App() {
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
    </div>
  )
}

export default App
