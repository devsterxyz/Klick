import React from 'react'
import GithubIcon from './icons/GithubIcon'
import TwitterXIcon from './icons/TwitterXIcon'

const Navbar = () => {
  return (
    <header className="relative z-10 bg-transparent text-white border border-b-white/20">
      <div className="mx-14 border-x sm:mx-20 xl:mx-28">
        <div className="flex h-16 items-center justify-between px-6 md:px-10">
          <div className="font-mono text-[1.05rem] tracking-[-0.06em] text-white/88">
            Klick
          </div>
          <div className='flex gap-4'>
            <GithubIcon />
            <TwitterXIcon />
          </div>
        </div>
      </div>
    </header>
  )
}

export default Navbar
