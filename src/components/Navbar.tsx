import React, { useEffect, useState } from 'react'
import GithubIcon from './icons/GithubIcon'
import TwitterXIcon from './icons/TwitterXIcon'
import BrightnessDownIcon from './icons/BrightnessDownIcon'
import { useTheme } from './ThemeContext'
import { Link } from 'react-router-dom'

const GITHUB_REPO = 'devsterxyz/Klick'

const StarIcon = ({ size = 16, color = 'currentColor', className = '' }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke={color}
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87L18.18 22 12 18.56 5.82 22 7 14.14 2 9.27l6.91-1.01L12 2z" />
  </svg>
)

const Navbar = () => {
  const { theme, toggleTheme } = useTheme()
  const [stars, setStars] = useState<number | null>(null)

  useEffect(() => {
    let active = true
    fetch(`https://api.github.com/repos/${GITHUB_REPO}`)
      .then((res) => {
        if (!res.ok) throw new Error('GitHub fetch failed')
        return res.json()
      })
      .then((data) => {
        if (active && typeof data?.stargazers_count === 'number') {
          setStars(data.stargazers_count)
        }
      })
      .catch(() => {
        if (active) setStars(null)
      })

    return () => {
      active = false
    }
  }, [])

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-50 bg-white/90 backdrop-blur-md border border-b-black/20 dark:bg-black dark:border-b-white/20 h-20">
        <div className="mx-12 h-full border-x border-x-black/20 dark:border-x-white/20 sm:mx-[78px] xl:mx-[110px]">
          <div className="flex h-full items-center justify-between px-6 md:px-10">
            <Link
              to="/"
              className="font-geist-pixel text-[30px] font-semibold tracking-wider text-black dark:text-white"
            >
              Klick
            </Link>

            <div className="flex items-center gap-3 text-black dark:text-white">
              <button
                type="button"
                onClick={toggleTheme}
                aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
                className="flex h-10 w-10 items-center justify-center rounded-xl border border-black/10 bg-white text-black shadow-sm transition hover:border-black/20 hover:bg-black/5 dark:border-white/10 dark:bg-neutral-950 dark:text-white dark:hover:bg-white/5"
              >
                <BrightnessDownIcon />
              </button>
              <a
                href="https://x.com/devsterxyz"
                target="_blank"
                rel="noreferrer"
                aria-label="Dev on X"
                className="flex h-10 w-10 items-center justify-center rounded-xl border border-black/10 bg-white text-black shadow-sm transition hover:border-black/20 hover:bg-black/5 dark:border-white/10 dark:bg-neutral-950 dark:text-white dark:hover:bg-white/5"
              >
                <TwitterXIcon />
              </a>
              <a
                href="https://github.com/devsterxyz/Klick"
                target="_blank"
                rel="noreferrer"
                aria-label="View Klick repo on GitHub"
                className="inline-flex items-center gap-2 rounded-xl border border-black/10 bg-white px-3 py-2 text-sm font-medium text-black shadow-sm transition hover:border-black/20 hover:bg-black/5 dark:border-white/10 dark:bg-neutral-950 dark:text-white dark:hover:bg-white/5"
              >
                <GithubIcon size={18} />
                <StarIcon size={14} />
                <span>{stars !== null ? stars.toLocaleString() : 'Star'}</span>
              </a>

              
            </div>
          </div>
        </div>
      </header>

      <div className="h-20" aria-hidden="true" />
    </>
  )
}

export default Navbar
