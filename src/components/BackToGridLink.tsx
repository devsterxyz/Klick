import React from 'react'
import { useNavigate } from 'react-router-dom'
import ArrowNarrowLeftIcon from './icons/ArrowNarrowLeftIcon'

const BackToGridLink = () => {
  const navigate = useNavigate()

  return (
    <button
      type="button"
      onClick={() => navigate(-1)}
      aria-label="Go back"
      className="group inline-flex h-8 w-10 items-center justify-center rounded-md border border-black/15 bg-white/80 text-black shadow-[0_12px_30px_-18px_rgba(0,0,0,0.65)] backdrop-blur transition-all duration-300 hover:-translate-x-0.5 hover:border-black/30 hover:bg-black hover:text-white hover:shadow-[0_18px_36px_-20px_rgba(0,0,0,0.8)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-black/30 focus-visible:ring-offset-2 focus-visible:ring-offset-white active:scale-95 dark:border-white/15 dark:bg-white/10 dark:text-white dark:shadow-[0_12px_30px_-18px_rgba(255,255,255,0.55)] dark:hover:border-white/30 dark:hover:bg-white dark:hover:text-black dark:focus-visible:ring-white/35 dark:focus-visible:ring-offset-black"
    >
      <ArrowNarrowLeftIcon
        size={22}
        strokeWidth={2.25}
        className="transition-transform duration-300 group-hover:-translate-x-0.5"
      />
    </button>
  )
}

export default BackToGridLink
