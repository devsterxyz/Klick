import { useState } from 'react'
import ClickSpark from './components/ClickSpark'
import ClickRipple from './components/ClickRipple'
import ClickShatter from './components/ClickShatter'
import ClickBinary from './components/ClickBinary'
import ClickGeo from './components/ClickGeo'
import ClickFirework from './components/ClickFirework'
import ClickFocus from './components/ClickFocus'
import ClickSparkle from './components/ClickSparkle'



function App() {
  const [count, setCount] = useState(0)

  return (
    <div className='flex flex-col'>
      <ClickSpark
        sparkColor='black'
        sparkSize={10}
        sparkRadius={15}
        sparkCount={8}
        duration={400}
      >
        <div className='h-20 w-20 border'>

        </div>
      </ClickSpark>
      <ClickRipple
      color='black'
    >
      <div className='flex'>
        <div className='h-20 w-20 border'></div>
      </div>
    </ClickRipple>
    <ClickShatter
      shardColor="black"
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
      textColor="black"
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
      color="black"
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
      color='black'
      speed={1}       
      gravity={0.08}  
      friction={0.96}
      count={35}
      >
      <div className='h-20 w-20 border'>

      </div>
    </ClickFirework>
    <ClickFocus
      color="black"
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
      color="black"
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
    </div>
  )
}

export default App
