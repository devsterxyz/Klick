import React from 'react'
import ClickHeart from '../../registry/new-york/ClickHeart/ClickHeart'
import ClickSonar from '../../registry/new-york/ClickSonar/ClickSonar'

const railSegments = Array.from({ length: 4 })
const railSegmentClass =
  'bg-[repeating-linear-gradient(315deg,rgba(0,0,0,0.1)_0,rgba(0,0,0,0.1)_1px,transparent_0,transparent_50%)] dark:bg-[repeating-linear-gradient(315deg,rgba(255,255,255,0.08)_0,rgba(255,255,255,0.08)_1px,transparent_0,transparent_50%)] bg-[length:7px_7px]'

const PatternRail = ({ side }: { side: 'left' | 'right' }) => {
  const sideBorder = side === 'left' ? 'border-r' : 'border-l'

  return (
    <div
      className={`pointer-events-none absolute inset-y-0 ${side === 'left' ? 'left-0' : 'right-0'} flex w-14 flex-col text-white/8 sm:w-20 xl:w-28`}
    >
      {railSegments.map((_, index) => (
        <div
          key={`${side}-${index}`}
          className={`flex-1 ${sideBorder} ${index === 0 ? 'border-t' : ''} ${index !== railSegments.length - 1 ? 'border-b' : ''} border-black/20 dark:border-white/20 ${railSegmentClass}`}
        />
      ))}
    </div>
  )
}

const FooterClickSection = ({ title }: { title: string }) => {
  return (
    <section className="flex min-h-0 flex-1 flex-col px-6 py-8 sm:px-8 lg:px-10">
      <h2 className="font-geist-pixel text-xl leading-none tracking-wide text-black dark:text-white sm:text-2xl">
        {title}
      </h2>
      <div className="mt-6 min-h-0 flex-1 border border-dashed border-black/25 bg-white/40 dark:border-white/20 dark:bg-white/[0.02]" />
    </section>
  )
}

const Footer = () => {
  return (
    <div className='relative -mt-px h-170 overflow-hidden bg-transparent text-black dark:text-white'>
      <PatternRail side="left" />
      <PatternRail side="right" />
      <div className="relative z-10 h-full px-14 sm:px-20 xl:px-28">
        <div className="flex h-full w-full border-x border-black/20 dark:border-white/10">
          <div className="flex flex-1 border-r border-black/20 dark:border-white/10" />
          <div className="flex h-full w-full flex-1 flex-col">
            <ClickHeart count={10} className="flex min-h-0 flex-1">
              <FooterClickSection title="Click if you love the project" />
            </ClickHeart>
            <div className="border-t border-black/20 dark:border-white/10" />
            <ClickSonar className="flex min-h-0 flex-1">
              <FooterClickSection title="Click if you love the project too much" />
            </ClickSonar>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Footer
