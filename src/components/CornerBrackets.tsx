import React from 'react'

const CornerBrackets = () => (
  <>
    <div
      className="absolute top-0 left-0 w-1.5 h-1.5
      border-t border-l
      border-gray-300 dark:border-white/20
      group-hover/effect-card:border-gray-500 dark:group-hover/effect-card:border-white
      transition-all duration-300"
    />
    <div
      className="absolute top-0 right-0 w-1.5 h-1.5
      border-t border-r
      border-gray-300 dark:border-white/20
      group-hover/effect-card:border-gray-500 dark:group-hover/effect-card:border-white
      transition-all duration-300"
    />
    <div
      className="absolute bottom-0 left-0 w-1.5 h-1.5
      border-b border-l
      border-gray-300 dark:border-white/20
      group-hover/effect-card:border-gray-500 dark:group-hover/effect-card:border-white
      transition-all duration-300"
    />
    <div
      className="absolute bottom-0 right-0 w-1.5 h-1.5
      border-b border-r
      border-gray-300 dark:border-white/20
      group-hover/effect-card:border-gray-500 dark:group-hover/effect-card:border-white
      transition-all duration-300"
    />
  </>
)

export default CornerBrackets
