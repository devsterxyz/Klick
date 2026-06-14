import React from 'react'
import { Link } from 'react-router-dom'
import GithubIcon from './icons/GithubIcon'
import TwitterXIcon from './icons/TwitterXIcon'

const quickLinks = [
  { label: 'Home', to: '/' },
  { label: 'Sponsor', to: 'https://buymeacoffee.com/devsterxyz' },
  { label: 'Req animation', to: 'https://x.com/devsterxyz' },
  { label: 'Github', to: 'https://github.com/devsterxyz/Klick' },
]

const linkClass =
  'w-fit text-sm font-medium text-black/60 transition hover:text-black dark:text-white/60 dark:hover:text-white'

const FooterLink = ({ label, to }: { label: string; to: string }) => {
  const isExternal = to.startsWith('http')

  if (isExternal) {
    return (
      <a href={to} target="_blank" rel="noreferrer" className={linkClass}>
        {label}
      </a>
    )
  }

  return (
    <Link to={to} className={linkClass}>
      {label}
    </Link>
  )
}

const Footer2 = () => {
  return (
    <footer className="relative w-full bg-transparent text-black dark:text-white font-pixel">
      <div className="w-full overflow-hidden border-y border-neutral-200/60 bg-white/80 dark:border-white/20 dark:bg-black lg:border-x">
        <div className="grid gap-10 px-8 py-10 sm:px-12 md:grid-cols-4 md:gap-8 lg:px-16 lg:py-12">
          <section className="flex items-center md:justify-center">
            <Link to="/" className="font-geist-pixel text-[40px] font-semibold tracking-wider text-black dark:text-white">
              Klick
            </Link>
          </section>

          <section>
            <h2 className="text-base font-semibold">Quick Links</h2>
            <nav className="mt-5 flex flex-col gap-4" aria-label="Footer quick links">
              {quickLinks.map((link) => (
                <FooterLink key={link.label} label={link.label} to={link.to} />
              ))}
            </nav>
          </section>

          <section>
            <h2 className="text-base font-semibold">Sponsor</h2>
            <div className="mt-5">
              <a
                href="https://buymeacoffee.com/devsterxyz"
                target="_blank"
                rel="noreferrer"
                className={linkClass}
              >
                Buy me a coffee
              </a>
            </div>
          </section>

          <section>
            <h2 className="text-base font-semibold">Connect</h2>
            <div className="mt-5 flex items-center gap-4">
              <a
                href="https://github.com/devsterxyz"
                target="_blank"
                rel="noreferrer"
                aria-label="Dev on GitHub"
                className="flex h-11 w-11 items-center justify-center rounded-lg border border-black/20 bg-white/40 text-black transition hover:border-black/40 hover:bg-black/[0.03] dark:border-white/20 dark:bg-white/[0.02] dark:text-white dark:hover:border-white/40 dark:hover:bg-white/[0.05]"
              >
                <GithubIcon size={19} className="cursor-default" />
              </a>
              <a
                href="https://x.com/devsterxyz"
                target="_blank"
                rel="noreferrer"
                aria-label="Dev on X"
                className="flex h-11 w-11 items-center justify-center rounded-lg border border-black/20 bg-white/40 text-black transition hover:border-black/40 hover:bg-black/[0.03] dark:border-white/20 dark:bg-white/[0.02] dark:text-white dark:hover:border-white/40 dark:hover:bg-white/[0.05]"
              >
                <TwitterXIcon size={19} className="cursor-default" />
              </a>
            </div>
          </section>
        </div>

        <div className="border-t border-neutral-200/60 px-8 py-6 text-md font-medium text-black/60 dark:border-white/10 dark:text-white/60 sm:px-12 lg:px-16">
          <a href="https://github.com/devsterxyz" target="_blank" rel="noreferrer" className="cursor-default">
            © 2026 klick. Built by Dev | Crafted with care.
          </a> 
        </div>
      </div>
    </footer>
  )
}

export default Footer2
