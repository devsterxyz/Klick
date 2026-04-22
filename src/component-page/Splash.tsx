import React from 'react'
import PageRails from './PageRails'

const Splash = () => {
  return (
    <PageRails segmentCount={10}>
      <div className="mt-16 min-h-[calc(100vh-64px)] overflow-hidden bg-transparent text-black dark:text-white">
        <div className="min-h-[calc(100vh-64px)] w-full border-x border-b border-black/20 px-6 py-8 dark:border-white/10 md:px-10">
          Splash
        </div>
      </div>
    </PageRails>
  )
}

export default Splash