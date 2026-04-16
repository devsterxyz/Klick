import React from 'react'

const VariationCard = ({ title, children }: { title: string; children: React.ReactNode }) => {
  return (
    <div className="flex flex-col items-start gap-4">

      <div className="rounded-xl border-zinc-800/50">
        {children}
      </div>
    </div>
  )
}

export default VariationCard