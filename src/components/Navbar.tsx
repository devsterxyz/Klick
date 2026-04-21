import React from 'react'
import GithubIcon from './icons/GithubIcon'
import TwitterXIcon from './icons/TwitterXIcon'
import BrightnessDownIcon from './icons/BrightnessDownIcon'
import { useTheme } from './ThemeContext'

const Navbar = () => {
  const { theme, toggleTheme } = useTheme()

  return (
    <header className="relative z-10 bg-transparent border border-b-black/20 dark:border-b-white/20">
      <div className="mx-14 border-x border-x-black/20 dark:border-x-white/20 sm:mx-20 xl:mx-28">
        <div className="flex h-16 items-center justify-between px-6 md:px-10">
          <div className="font-mono text-[1.05rem] tracking-[-0.06em]">
            Klick
          </div>
          <div className='flex gap-4 items-center'>
            <button
              type="button"
              onClick={toggleTheme}
              aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
              className='flex items-center justify-center bg-white dark:bg-black h-7 w-7 border hover:bg-neutral-50 dark:hover:bg-neutral-950'
            >
              <BrightnessDownIcon />
            </button>
            <button className='flex items-center justify-center bg-white dark:bg-black h-7 w-7 border hover:bg-neutral-50 dark:hover:bg-neutral-950'>
              <GithubIcon />
            </button>
            <button className='flex items-center justify-center bg-white dark:bg-black h-7 w-7 border hover:bg-neutral-50 dark:hover:bg-neutral-950'>  
              <TwitterXIcon />
            </button>
          </div>
        </div>
      </div>
    </header>
  )
}

export default Navbar
