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

const FooterInspiration = () => {
  return (
    <section className="flex h-full items-center justify-center px-6 py-8 sm:px-8 lg:px-10">
      <div className="flex h-[70%] max-w-[34rem] flex-col justify-center">
        <p className="font-mono text-[11px] font-medium uppercase tracking-[0.28em] text-black/40 dark:text-white/35">
          Inspiration
        </p>
        <h2 className="mt-4 font-geist-pixel text-4xl leading-none tracking-wide text-black dark:text-white sm:text-5xl lg:text-6xl">
          The forgotten gesture.
        </h2>
        <div className="mt-7 space-y-4 text-sm leading-6 text-black/58 dark:text-white/55">
          <div className="relative border border-dashed border-black/20 bg-black/[0.025] px-5 py-4 dark:border-white/15 dark:bg-white/[0.035]">
            <span className="absolute -left-px top-4 h-10 w-1 bg-black dark:bg-white" />
            <div className="space-y-3 pl-3">
              <p className="italic text-black/70 dark:text-white/70">
                "Every interaction deserves a response. A click isn't just an input, It is a conversation between the user and the interface."
              </p>
              <p className="italic text-black/70 dark:text-white/70">
                "Micro interactions are what make interfaces feel alive. They transform static screens into experiences that feel responsive, intentional, and human."
              </p>
            </div>
          </div>
          <p>
            A button that reacts to a click feels more trustworthy than one that doesn't. The action may take the same amount of time, but the experience feels faster, clearer, and more satisfying.
          </p>
          <p>
            Designers spend countless hours perfecting layouts, typography, and color systems. Yet the moment of interaction, the instant a user clicks, taps, or presses, is often left silent and static.
          </p>
          <p>
            That's where delight lives.
          </p>
        </div>
      </div>
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
          <div className="flex flex-1 border-r border-black/20 dark:border-white/10">
            <FooterInspiration />
          </div>
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
