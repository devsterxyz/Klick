import React, { useEffect, useState } from 'react'
import { ArrowRight } from 'lucide-react'
import GithubIcon from '../icons/GithubIcon'
import VariationCard from '../VariationCard'
import Grid from './Grid'
import { useLocation } from 'react-router-dom'
import CursorAnimation from '../CursorAnimation'

const railSegments = Array.from({ length: 29 })
const installCommand = 'npx shadcn@latest add devsterxyz/Klick/click-supernova'
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
  className = '',
}: {
  href: string
  children: React.ReactNode
  invert?: boolean
  className?: string
}) => {
  const isExternal = href.startsWith('http')

  return (
    <a
      href={href}
      target={isExternal ? '_blank' : undefined}
      rel={isExternal ? 'noreferrer' : undefined}
      className={`group relative inline-flex h-9 items-center justify-center gap-2 overflow-hidden border border-dashed px-4 text-[13px] font-medium transition ${
        invert
          ? 'border-black bg-black text-white hover:bg-neutral-900 dark:border-white dark:bg-white dark:text-black dark:hover:bg-neutral-200'
          : 'border-black/20 text-black hover:border-black/40 hover:bg-black/[0.03] dark:border-white/20 dark:text-white dark:hover:border-white/40 dark:hover:bg-white/[0.03]'
      } ${className}`}
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
      className={`pointer-events-none absolute inset-y-0 ${side === 'left' ? 'left-0' : 'right-0'} hidden w-8 flex-col text-white/8 min-[769px]:flex lg:w-14 xl:w-28`}
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
  const [heroVisible, setHeroVisible] = useState(false)
  const location = useLocation()

  useEffect(() => {
    const frame = window.requestAnimationFrame(() => {
      setHeroVisible(true)
    })

    return () => window.cancelAnimationFrame(frame)
  }, [])

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
    <div className="relative min-[769px]:-mx-8 lg:-mx-14 xl:-mx-28">
      <PatternRail side="left" />
      <PatternRail side="right" />
      <div className="min-[769px]:px-8 lg:px-14 xl:px-28">
        <div
          className={`relative overflow-hidden bg-transparent text-black transition-all duration-300 ease-out dark:text-white min-h-[calc(100svh-72px)] sm:min-h-[calc(100svh-80px)] lg:h-[calc(100vh-80px)] ${
            heroVisible
              ? 'translate-y-0 opacity-100 blur-0'
              : 'translate-y-3 opacity-0 blur-sm'
          }`}
        >
          <div className="relative z-10 flex min-h-[calc(100svh-72px)] w-full border-b border-black/20 dark:border-white/10 sm:min-h-[calc(100svh-80px)] lg:h-full lg:min-h-0 lg:border-x">
            <div className="flex min-w-0 flex-1 flex-col">  
              <div className="grid min-h-0 flex-1 lg:grid-cols-[minmax(0,1.06fr)_minmax(0,0.94fr)]">
                <section className="flex min-h-[calc(100svh-72px)] flex-col border-b border-black/20 dark:border-white/10 sm:min-h-[calc(100svh-80px)] lg:min-h-0 lg:border-b-0 lg:border-r">
                  <div className="flex flex-1 flex-col justify-center px-5 py-7 min-[390px]:py-8 sm:mt-14 sm:justify-start sm:px-6 sm:py-7 md:px-9 md:py-8 lg:mt-[4.5rem] lg:px-10">

                    <VariationCard title="01. The Original">
                      <div className="inline-flex items-center gap-2.5 border border-dashed border-black/20 dark:border-white/20 px-3 py-1.5 font-sans text-[10px] font-medium group sm:px-3.5 sm:text-[11px]">
                        <span className="h-2 w-2 bg-black dark:bg-white group-hover:bg-green-500 dark:group-hover:bg-green-500" />
                        v1 &middot; Early Preview
                      </div>
                    </VariationCard>

                    <div className="mt-4 w-full max-w-[36rem] min-[390px]:mt-5 sm:mt-6">
                      <h1 className="max-w-full font-geist-pixel text-[clamp(1.72rem,8.8vw,2.35rem)] leading-[1.04] tracking-normal sm:text-[3.5rem] sm:tracking-wide lg:text-[4rem] xl:text-[4.35rem]">
                        Click effects for sharper interfaces
                      </h1>
                      <p className="mt-3 max-w-[32rem] text-[13px] leading-5 text-black/55 dark:text-white/55 min-[375px]:text-sm min-[390px]:leading-6 sm:mt-5 sm:text-base sm:leading-7">
                        Add responsive click feedback to buttons, cards, and controls with small animation wrappers built for React.
                      </p>
                    </div>

                    <div className="mt-4 flex min-h-11 w-full max-w-[34rem] items-center justify-between rounded-md border border-black/10 bg-neutral-100 px-2 dark:border-white/10 dark:bg-[#0b0b0b] min-[390px]:mt-5 min-[390px]:px-3 sm:mt-6 sm:min-h-12 sm:px-4">
    
                      {/* Command */}
                      <div className="flex min-w-0 flex-1 items-center gap-1 overflow-hidden font-mono text-[10px] text-black/80 dark:text-white/80 min-[375px]:gap-1.5 min-[375px]:text-[11px] min-[390px]:gap-2 min-[390px]:text-xs sm:gap-2.5 sm:text-sm">
                        <span className="text-black/40 dark:text-white/40">$</span>
                        <code className="truncate">{installCommand}</code>
                      </div>

                      {/* Copy button */}
                      <button
                        type="button"
                        onClick={handleCopy}
                        className="ml-2 shrink-0 text-[11px] font-medium text-black/60 transition hover:text-black dark:text-white/60 dark:hover:text-white min-[375px]:text-xs sm:ml-0"
                      >
                        {copied ? "Copied" : "Copy"}
                      </button>

                    </div>

                    <div className="mt-4 flex flex-wrap gap-2 min-[390px]:mt-5 min-[390px]:gap-2.5 sm:gap-3">
                      <GhostButton href="https://github.com/devsterxyz/Klick">
                        <GithubIcon size={15} className="cursor-default" />
                        Github
                      </GhostButton>
                      <GhostButton href="#effects-grid" invert className="sm:hidden">
                        Get Started
                        <ArrowRight color="currentColor" size={15} />
                      </GhostButton>
                      <span className="hidden sm:inline-flex">
                        <GhostButton href="#effects-grid" invert>
                          Get Started
                          <ArrowRight color="currentColor" size={15} />
                        </GhostButton>
                      </span>
                    </div>
                  </div>
                </section>

                <section id="preview-panels" className="relative hidden min-h-0 w-full overflow-hidden px-5 py-5 sm:block md:px-8 md:py-6">
                  <div className="flex h-[28rem] w-full md:h-[34rem] lg:h-full">
                    <div className="relative min-h-0 overflow-hidden border border-dashed border-black/30 dark:border-white/20 bg-transparent p-5 flex flex-1">
                      <CornerBrackets muted />
                      <CursorAnimation className="h-full w-full" />
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
