import React from 'react'
import PageRails from './PageRails'
import BackToGridLink from '@/components/BackToGridLink'

const HoloSphere = () => {
  return (
    <PageRails segmentCount={6}>
      <div className="min-h-[calc(100vh-80px)] overflow-hidden bg-transparent text-black dark:text-white">
        <div className="min-h-[calc(100vh-80px)] w-full border-x border-b border-black/20 px-6 py-8 dark:border-white/10 md:px-10">
          <BackToGridLink />
        </div>
      </div>
    </PageRails>
  )
}

export default HoloSphere