import React, { ComponentType, JSX, ReactNode, useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import CornerBrackets from './CornerBrackets'
import StudioButtonDiagonal from './StudioButtonDiagonal'
import { useTheme } from './ThemeContext'

type EffectWrapperProps = {
  children?: ReactNode
  color?: string
  strokeColor?: string
  fillColor?: string
  dotColor?: string
  textColor?: string
  shardColor?: string
}

type EffectCardProps = {
  title: string
  Wrapper?: ComponentType<any>
  to: string
}

const EffectCard = ({ title, Wrapper, to }: EffectCardProps): JSX.Element => {
  const { contrastColor } = useTheme()
  const cardRef = useRef<HTMLDivElement>(null)
  const [isVisible, setIsVisible] = useState(false)
  const cardId = `effect-${to.replace('/', '').toLowerCase()}`
  const effectColorProps: EffectWrapperProps = {
    color: contrastColor,
    strokeColor: contrastColor,
    fillColor: contrastColor,
    dotColor: contrastColor,
    textColor: contrastColor,
    shardColor: contrastColor,
  }

  useEffect(() => {
    const card = cardRef.current

    if (!card) {
      return
    }

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches

    if (prefersReducedMotion || !('IntersectionObserver' in window)) {
      setIsVisible(true)
      return
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
          observer.unobserve(entry.target)
        }
      },
      {
        rootMargin: '0px 0px -4% 0px',
        threshold: 0.08,
      },
    )

    observer.observe(card)

    return () => observer.disconnect()
  }, [])

  const content = (
    <div
      className="relative flex aspect-square w-[9.25rem] items-center justify-center
      border border-gray-200 dark:border-[#151515]
      bg-white dark:bg-[#050505]
      transition-all duration-300
      group-hover/effect-card:border-gray-400 dark:group-hover/effect-card:border-[#333]
      group-hover/effect-card:bg-gray-50 dark:group-hover/effect-card:bg-[#0a0a0a]
      shadow-sm group-hover/effect-card:shadow-md sm:w-48"
    >
      <CornerBrackets />

      <span
        className="text-[10px] font-sans tracking-[0.16em] uppercase
        text-gray-500 dark:text-[#222]
        opacity-100 group-hover/effect-card:opacity-0
        transition-opacity duration-300 sm:text-[12px] sm:tracking-[0.2em]"
      >
        CLICK
      </span>
    </div>
  )

  return (
    <div
      ref={cardRef}
      id={cardId}
      className={`group/effect-card flex w-[9.25rem] scroll-mt-24 cursor-default flex-col items-center gap-2.5 transition-all duration-500 ease-out sm:w-56 sm:gap-3 ${
        isVisible
          ? 'translate-y-0 opacity-100 blur-0'
          : 'translate-y-8 opacity-0 blur-sm'
      }`}
    >
      <div className="flex h-4 max-w-full items-center">
        <span
          className="truncate text-[9px] font-sans font-bold uppercase tracking-[0.1em]
          text-gray-500 dark:text-[#555]
          group-hover/effect-card:text-black dark:group-hover/effect-card:text-white
          transition-colors duration-200 sm:text-[10px] sm:tracking-[0.15em]"
        >
          {title}
        </span>
      </div>

      {Wrapper ? <Wrapper {...effectColorProps}>{content}</Wrapper> : content}
      <Link className="" to={to}>
        <StudioButtonDiagonal />
      </Link>
    </div>
  )
}

export default EffectCard
