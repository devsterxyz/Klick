import React, { useState } from 'react'
import PageRails from './PageRails'
import BackToGridLink from '@/components/BackToGridLink'
import CornerBrackets from '@/components/CornerBrackets'
import ClickAgitate from '../animations/ClickAgitate'
import SliderField from '../SliderField'
import Terminal from '../Terminal'

const Agitate = () => {
  const [particleCount, setParticleCount] = useState(25)
  const [area, setArea] = useState(50)
  const [particleSize, setParticleSize] = useState(3)
  const [duration, setDuration] = useState(400)

  const code = `<ClickAgitate
  particleCount={10}
  particleSize={4}
  duration={0.6}
>
  {/*Content div*/}
</ClickAgitate>`;
  return (
    <PageRails segmentCount={6}>
      <div className="min-h-[calc(100vh-64px)] overflow-hidden bg-transparent text-black dark:text-white">
        <div className="min-h-[calc(100vh-64px)] w-full border-x border-b border-black/20 px-6 py-8 dark:border-white/10 md:px-10">
          <BackToGridLink />
          <div className='w-full h-full flex mt-5 ml-5'>
            <div className='flex-1'>
              <ClickAgitate
              particleCount={particleCount}
              particleSize={particleSize}
              duration={duration}
              > 
                <div
                  className="group/effect-card relative w-75 aspect-[1.1/1] flex items-center justify-center
                  border border-gray-200 dark:border-[#151515]
                  bg-white dark:bg-[#050505]
                  transition-all duration-300
                  group-hover/effect-card:border-gray-400 dark:group-hover/effect-card:border-[#333]
                  group-hover/effect-card:bg-gray-50 dark:group-hover/effect-card:bg-[#0a0a0a]
                  shadow-sm group-hover/effect-card:shadow-md"
                >
                  <CornerBrackets />
                </div>
              </ClickAgitate>
              <div className='mt-5'>
                <SliderField title="Agitation" min={0} max={100} value={particleCount} onChange={setParticleCount} />
                <SliderField title="Size" min={1} max={10} value={particleSize} onChange={setParticleSize} />
                <SliderField title="Duration" min={100} max={1200} value={duration} onChange={setDuration} />
              </div>
            </div>
            <div className='w-180'>
              <Terminal code={code} />
            </div>
          </div>
        </div>
      </div>
    </PageRails>
  )
}

export default Agitate
