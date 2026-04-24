import React, { useEffect, useState } from 'react'
import { ArrowRight } from 'lucide-react'
import GithubIcon from '../icons/GithubIcon'
import VariationCard from '../VariationCard'
import Grid from './Grid'
import { useLocation } from 'react-router-dom'

const railSegments = Array.from({ length: 29 })
const installCommand = 'npx shadcn@latest add button card tabs'
const railSegmentClass =
  'bg-[repeating-linear-gradient(315deg,rgba(0,0,0,0.1)_0,rgba(0,0,0,0.1)_1px,transparent_0,transparent_50%)] dark:bg-[repeating-linear-gradient(315deg,rgba(255,255,255,0.08)_0,rgba(255,255,255,0.08)_1px,transparent_0,transparent_50%)] bg-[length:7px_7px]'

const CornerBrackets = ({ muted = false }: { muted?: boolean }) => {
  const color = muted ? 'border-black/20 dark:border-white/20' : 'border-black/40 dark:border-white/45'

  return (
    <>
      <span className={`pointer-events-none absolute left-0 top-0 h-2 w-2 border-l border-t ${color}`} />
      <span className={`pointer-events-none absolute right-0 top-0 h-2 w-2 border-r border-t ${color}`} />
      <span className={`pointer-events-none absolute bottom-0 left-0 h-2 w-2 border-b border-l ${color}`} />
      <span className={`pointer-events-none absolute bottom-0 right-0 h-2 w-2 border-b border-r ${color}`} />
    </>
  )
}

const GhostButton = ({
  href,
  children,
  invert = false,
}: {
  href: string
  children: React.ReactNode
  invert?: boolean
}) => {
  return (
    <a
      href={href}
      target='_blank'
      className={`group relative inline-flex h-8 items-center justify-center gap-2 overflow-hidden border border-dashed px-3 text-[12px] transition ${
        invert
          ? 'border-white bg-white text-black hover:bg-neutral-200'
          : 'border-black/20 text-black hover:border-black/40 hover:bg-black/[0.03] dark:border-white/20 dark:text-white dark:hover:border-white/40 dark:hover:bg-white/[0.03]'
      }`}
    >
      <CornerBrackets muted={!invert} />
      <span className="relative z-10 inline-flex items-center gap-2">{children}</span>
    </a>
  )
}

const PatternRail = ({ side }: { side: 'left' | 'right' }) => {
  const sideBorder = side === 'left' ? 'border-r' : 'border-l'

  return (
    <div
      className={`pointer-events-none absolute inset-y-0 ${side === 'left' ? 'left-0' : 'right-0'} flex w-14 flex-col text-white/8 sm:w-20 xl:w-28`}
    >
      {railSegments.map((_, index) => (
        <div
          key={`${side}-${index}`}
          className={`flex-1 ${sideBorder} ${index !== railSegments.length - 1 ? 'border-b' : ''} border-black/20 dark:border-white/20 ${railSegmentClass}`}
        />
      ))}
    </div>
  )
}

const Home = () => {
  const [copied, setCopied] = useState(false)
  const location = useLocation()

  useEffect(() => {
    if (!location.hash) {
      return
    }

    const frame = window.requestAnimationFrame(() => {
      const target = document.getElementById(location.hash.slice(1))

      target?.scrollIntoView({
        block: location.hash === '#effects-grid' ? 'start' : 'center',
        behavior: 'smooth',
      })
    })

    return () => window.cancelAnimationFrame(frame)
  }, [location.hash])

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(installCommand)
      setCopied(true)
      window.setTimeout(() => setCopied(false), 1600)
    } catch (error) {
      console.error('Copy failed', error)
    }
  }

  return (
    <div className="relative -mx-14 sm:-mx-20 xl:-mx-28">
      <PatternRail side="left" />
      <PatternRail side="right" />
      <div className="px-14 sm:px-20 xl:px-28">
        <div className="relative h-[calc(100vh-64px)] overflow-hidden bg-transparent text-black dark:text-white ">
          <div className="relative z-10 flex h-full w-full border-x border-b border-black/20 dark:border-white/10">
            <div className="flex min-w-0 flex-1 flex-col">  
              <div className="grid min-h-0 flex-1 lg:grid-cols-[minmax(0,1.06fr)_minmax(0,0.94fr)]">
                <section className="flex min-h-0 flex-col border-b border-black/20 dark:border-white/10 lg:border-b-0 lg:border-r">
                  <div className="flex flex-1 flex-col px-5 py-5 md:px-8 md:py-6">

                    <VariationCard title="01. The Original">
                      <div className="inline-flex items-center gap-2 border border-dashed border-black/20 dark:border-white/20 px-3 py-1 font-sans text-[10px] font-light group">
                        <span className="h-1.5 w-1.5 bg-black dark:bg-white group-hover:bg-green-500 dark:group-hover:bg-green-500" />
                        v1 &middot; Early Preview
                      </div>
                    </VariationCard>

                    <div className="mt-5 max-w-[32rem]">
                      <h1 className="font-geist-pixel text-[2.2rem] leading-[0.9] tracking-wide  sm:text-[3.1rem] xl:text-[3.75rem]">
                        Klick
                      </h1>
                      <p className="mt-4 max-w-[31rem] text-[11px] leading-6 text-black/55 dark:text-white/55 sm:text-[12px]">
                        Your website responds give it a click
                      </p>
                    </div>

                    <div className="mt-5 max-w-[31rem] flex items-center justify-between rounded-md border border border-black/10 dark:border-white/10 bg-neutral-100 dark:bg-[#0b0b0b] px-3 h-10">
    
                      {/* Command */}
                      <div className="flex items-center gap-2 font-mono text-sm text-black/80 dark:text-white/80 overflow-hidden">
                        <span className="text-black/40 dark:text-white/40">$</span>
                        <code className="truncate">{installCommand}</code>
                      </div>

                      {/* Copy button */}
                      <button
                        type="button"
                        onClick={handleCopy}
                        className="ml-3 text-xs text-black/60 dark:text-white/60 hover:text-black dark:hover:text-white transition"
                      >
                        {copied ? "Copied" : "Copy"}
                      </button>

                    </div>

                    <div className="mt-4 flex flex-wrap gap-3">
                      <GhostButton href="https://github.com/devsterdev">
                        <GithubIcon size={14} className="cursor-default" />
                        Github
                      </GhostButton>
                      <GhostButton href="#preview-panels" invert>
                        Get Started
                        <ArrowRight color="currentColor" size={14} />
                      </GhostButton>
                    </div>
                  </div>
                </section>

                <section id="preview-panels" className="min-h-0 overflow-hidden px-5 py-5 md:px-8 md:py-6">
                  <div className="grid h-full gap-3 grid-rows-2">
                    <div className="relative min-h-0 border border-dashed border-black/30 dark:border-white/20 bg-transparent p-5">
                      <CornerBrackets muted />
                    </div>
                    <div className="relative min-h-0 border border-dashed border-black/30 dark:border-white/20 bg-transparent p-3">
                      <CornerBrackets muted />
                    </div>
                  </div>
                </section>
              </div>
            </div>
          </div>
        </div>
        <Grid />
      </div>
    </div>
  )
}

export default Home
