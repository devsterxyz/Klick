import React from 'react'
import GithubIcon from './icons/GithubIcon'
import TwitterXIcon from './icons/TwitterXIcon'
import BrightnessDownIcon from './icons/BrightnessDownIcon'
import { useTheme } from './ThemeContext'
import { Link } from 'react-router-dom'

const Navbar = () => {
  const { theme, toggleTheme } = useTheme()

  return (
    <header className="fixed z-10 bg-neutral-50 dark:bg-neutral-950 border border-b-black/20 dark:border-b-white/20 w-full z-50 ">
      <div className="mx-14 border-x border-x-black/20 dark:border-x-white/20 sm:mx-20 xl:mx-28">
        <div className="flex h-16 items-center justify-between px-6 md:px-10">
          <Link to="/" className="font-mono text-[1.05rem] tracking-[-0.06em]">
            Klick
          </Link>
          <div className='flex gap-4 items-center'>
            <button
              type="button"
              onClick={toggleTheme}
              aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
              className='flex items-center justify-center bg-white dark:bg-neutral-950 h-7 w-7 border hover:bg-neutral-50 dark:hover:bg-black'
            >
              <BrightnessDownIcon />
            </button>
            <button className='flex items-center justify-center bg-white dark:bg-neutral-950 h-7 w-7 border hover:bg-neutral-50 dark:hover:bg-black'>
              <GithubIcon />
            </button>
            <button className='flex items-center justify-center bg-white dark:bg-neutral-950 h-7 w-7 border hover:bg-neutral-50 dark:hover:bg-black'>  
              <TwitterXIcon />
            </button>
          </div>
        </div>
      </div>
    </header>
  )
}

export default Navbar
