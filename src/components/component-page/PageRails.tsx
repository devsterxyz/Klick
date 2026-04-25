import React, { ReactNode } from 'react'

const railSegmentClass =
  'bg-[repeating-linear-gradient(315deg,rgba(0,0,0,0.1)_0,rgba(0,0,0,0.1)_1px,transparent_0,transparent_50%)] dark:bg-[repeating-linear-gradient(315deg,rgba(255,255,255,0.08)_0,rgba(255,255,255,0.08)_1px,transparent_0,transparent_50%)] bg-[length:7px_7px]'

type PatternRailProps = {
  side: 'left' | 'right'
  segmentCount: number
}

type PageRailsProps = {
  children: ReactNode
  segmentCount?: number
}

const PatternRail = ({ side, segmentCount }: PatternRailProps) => {
  const sideBorder = side === 'left' ? 'border-r' : 'border-l'
  const railSegments = Array.from({ length: segmentCount })

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

const PageRails = ({ children, segmentCount = 29 }: PageRailsProps) => {
  const normalizedSegmentCount = Math.max(1, Math.floor(segmentCount))

  return (
    <div className="relative -mx-14 sm:-mx-20 xl:-mx-28">
      <PatternRail side="left" segmentCount={normalizedSegmentCount} />
      <PatternRail side="right" segmentCount={normalizedSegmentCount} />
      <div className="px-14 sm:px-20 xl:px-28">{children}</div>
    </div>
  )
}

export default PageRails
