import React from 'react'
import ClickHeart from '../../registry/new-york/ClickHeart/ClickHeart'
import ClickSonar from '../../registry/new-york/ClickSonar/ClickSonar'

const FooterClickSection = ({ title }: { title: string }) => {
  return (
    <section className="flex min-h-[21rem] flex-col px-6 py-7 sm:min-h-[24rem] sm:px-7 md:px-8 lg:min-h-0 lg:flex-1 lg:px-10">
      <h2 className="min-h-[3.25rem] font-geist-pixel text-xl leading-tight tracking-wide text-black dark:text-white md:text-2xl lg:min-h-0">
        {title}
      </h2>
      <div className="mt-6 min-h-0 flex-1 border border-dashed border-black/25 bg-white/40 dark:border-white/20 dark:bg-white/[0.02]" />
    </section>
  )
}

const FooterInspiration = () => {
  return (
    <section className="flex h-full items-start justify-center px-5 py-9 sm:px-8 lg:items-center lg:px-10">
      <div className="flex h-auto max-w-[34rem] flex-col justify-center lg:h-[70%]">
        <p className="font-mono text-[11px] font-medium uppercase tracking-[0.28em] text-black/40 dark:text-white/35">
          Inspiration
        </p>
        <h2 className="mt-4 font-geist-pixel text-3xl leading-none tracking-wide text-black dark:text-white sm:text-5xl lg:text-6xl">
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
    <div className='relative -mt-px overflow-hidden bg-transparent text-black dark:text-white lg:min-h-170'>
      <div className="relative z-10 mx-auto flex h-full max-w-[1600px] lg:px-16">
        <div className="flex w-full flex-col lg:min-h-170 lg:flex-row">
          <div className="flex border-b border-black/20 dark:border-white/10 lg:flex-1 lg:border-b-0 lg:border-r">
            <FooterInspiration />
          </div>
          <div className="hidden w-full border-t border-black/20 dark:border-white/10 sm:grid sm:grid-cols-2 lg:flex lg:h-full lg:flex-1 lg:flex-col lg:border-t-0">
            <ClickHeart count={10} className="flex min-h-[24rem] border-r border-black/20 dark:border-white/10 lg:min-h-0 lg:flex-1 lg:border-b lg:border-r-0">
              <FooterClickSection title="Click if you love the project" />
            </ClickHeart>
            <ClickSonar className="flex min-h-[24rem] lg:min-h-0 lg:flex-1">
              <FooterClickSection title="Click if you love the project too much" />
            </ClickSonar>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Footer
