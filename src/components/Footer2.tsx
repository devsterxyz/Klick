import React from 'react'
import { Link } from 'react-router-dom'
import GithubIcon from './icons/GithubIcon'
import TwitterXIcon from './icons/TwitterXIcon'

const quickLinks = [
  { label: 'Home', to: '/' },
  { label: 'Sponsor', to: 'https://buymeacoffee.com/devsterdev' },
  { label: 'Req an icon', to: 'https://github.com/devsterdev' },
  { label: 'Github', to: 'https://github.com/devsterdev' },
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
    <footer className="relative bg-transparent px-4 pb-8 pt-0 text-black dark:text-white sm:px-8 lg:px-12">
      <div className="mx-auto max-w-7xl overflow-hidden rounded-[1.75rem] border border-black/20 dark:border-white/20">
        <div className="grid gap-10 px-7 py-10 sm:px-9 md:grid-cols-4 md:gap-8 lg:px-12 lg:py-12">
          <section className="flex items-center md:justify-center">
            <Link to="/" className="font-sans text-3xl font-semibold tracking-normal">
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
                href="https://buymeacoffee.com/devsterdev"
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
                href="https://github.com/devsterdev"
                target="_blank"
                rel="noreferrer"
                aria-label="Dev on GitHub"
                className="flex h-11 w-11 items-center justify-center rounded-lg border border-black/20 bg-white/40 text-black transition hover:border-black/40 hover:bg-black/[0.03] dark:border-white/20 dark:bg-white/[0.02] dark:text-white dark:hover:border-white/40 dark:hover:bg-white/[0.05]"
              >
                <GithubIcon size={19} className="cursor-default" />
              </a>
              <a
                href="https://x.com/devsterdev"
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

        <div className="border-t border-black/20 px-7 py-6 text-sm font-medium text-black/60 dark:border-white/20 dark:text-white/60 sm:px-9 lg:px-12">
          © 2026 klick. Built by Dev
        </div>
      </div>
    </footer>
  )
}

export default Footer2
