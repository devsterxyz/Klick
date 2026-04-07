import { useState } from 'react'
import ClickSpark from './components/animations/ClickSpark'
import ClickRipple from './components/animations/ClickRipple'
import ClickShatter from './components/animations/ClickShatter'
import ClickBinary from './components/animations/ClickBinary'
import ClickGeo from './components/animations/ClickGeo'
import ClickFirework from './components/animations/ClickFirework'
import ClickFocus from './components/animations/ClickFocus'
import ClickSparkle from './components/animations/ClickSparkle'
import ClickPing from './components/animations/ClickPing'
import { useTheme } from './components/ThemeContext'



function App() {
  const { contrastColor } = useTheme();

  return (
    <div className='flex flex-col bg-white dark:bg-black'>
      <ClickSpark
        sparkColor={contrastColor}
        sparkSize={10}
        sparkRadius={15}
        sparkCount={8}
        duration={400}
      >
        <div className='h-20 w-20 border'>

        </div>
      </ClickSpark>
    <ClickRipple
      color={contrastColor}
    >
      <div className='h-20 w-20 border'></div>
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
      <div className='h-20 w-20 border'>

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
      <div className='h-20 w-20 border'>

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
      <div className='h-20 w-20 border'>

      </div>
    </ClickGeo>
    <ClickFirework
      color={contrastColor}
      speed={1}       
      gravity={0.08}  
      friction={0.96}
      count={35}
      >
      <div className='h-20 w-20 border'>

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
      <div className='h-20 w-20 border'>

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
      <div className='h-20 w-20 border'>

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
      <div className='h-20 w-20 border'>

      </div>
    </ClickPing>
    </div>
  )
}

export default App
