import React, { useEffect, useId, useState } from 'react'
import { Link } from 'react-router-dom'
import { Send, X } from 'lucide-react'
import GithubIcon from './icons/GithubIcon'
import TwitterXIcon from './icons/TwitterXIcon'

const quickLinks = [
  { label: 'Home', to: '/' },
  { label: 'Sponsor', to: 'https://buymeacoffee.com/devsterxyz' },
  { label: 'Req animation', to: '#request-animation' },
  { label: 'Github', to: 'https://github.com/devsterxyz/Klick' },
]

const linkClass =
  'w-fit text-sm font-medium text-black/60 transition hover:text-black dark:text-white/60 dark:hover:text-white'

const FooterLink = ({
  label,
  to,
  onRequestAnimation,
}: {
  label: string
  to: string
  onRequestAnimation?: () => void
}) => {
  const isExternal = to.startsWith('http')

  if (label === 'Req animation') {
    return (
      <button type="button" onClick={onRequestAnimation} className={linkClass}>
        {label}
      </button>
    )
  }

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
  const [isRequestOpen, setIsRequestOpen] = useState(false)
  const titleId = useId()

  useEffect(() => {
    if (!isRequestOpen) return

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setIsRequestOpen(false)
    }

    document.addEventListener('keydown', handleKeyDown)
    document.body.style.overflow = 'hidden'

    return () => {
      document.removeEventListener('keydown', handleKeyDown)
      document.body.style.overflow = ''
    }
  }, [isRequestOpen])

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
                <FooterLink
                  key={link.label}
                  label={link.label}
                  to={link.to}
                  onRequestAnimation={() => setIsRequestOpen(true)}
                />
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
          <a href="https://github.com/devsterxyz" target="_blank" rel="noreferrer" className="ml-14 cursor-default">
            © 2026 klick. Built by Dev | Crafted with care.
          </a> 
        </div>
      </div>

      {isRequestOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-white/70 px-5 py-6 backdrop-blur-sm dark:bg-black/70 sm:px-4 sm:py-8"
          role="dialog"
          aria-modal="true"
          aria-labelledby={titleId}
          onMouseDown={() => setIsRequestOpen(false)}
        >
          <form
            className="max-h-[calc(100dvh-3rem)] w-full max-w-[21rem] overflow-y-auto rounded-lg border border-black/15 bg-white p-3.5 text-black shadow-[4px_4px_0_rgba(0,0,0,0.12)] dark:border-white/20 dark:bg-black dark:text-white dark:shadow-[4px_4px_0_rgba(255,255,255,0.08)] sm:max-h-[calc(100dvh-4rem)] sm:max-w-lg sm:p-6 sm:shadow-[8px_8px_0_rgba(0,0,0,0.12)] sm:dark:shadow-[8px_8px_0_rgba(255,255,255,0.08)]"
            onSubmit={(event) => event.preventDefault()}
            onMouseDown={(event) => event.stopPropagation()}
          >
            <div className="flex items-start justify-between gap-4">
              <h2 id={titleId} className="font-geist-pixel text-lg font-semibold tracking-wide sm:text-2xl">
                Request Animation
              </h2>
              <button
                type="button"
                aria-label="Close request animation form"
                onClick={() => setIsRequestOpen(false)}
                className="flex h-8 w-8 items-center justify-center rounded-lg border border-black/15 text-black/70 transition hover:border-black/40 hover:bg-black/[0.04] hover:text-black dark:border-white/20 dark:text-white/70 dark:hover:border-white/40 dark:hover:bg-white/[0.06] dark:hover:text-white sm:h-9 sm:w-9"
              >
                <X size={18} />
              </button>
            </div>

            <div className="mt-4 grid gap-3.5 sm:mt-6 sm:gap-5">
              <label className="grid gap-1.5 text-xs font-medium text-black/75 dark:text-white/75 sm:gap-2 sm:text-sm">
                Description *
                <textarea
                  required
                  rows={5}
                  placeholder="Describe the animation you want..."
                  className="min-h-28 w-full resize-y rounded-lg border border-black/15 bg-white px-3 py-2.5 font-sans text-xs text-black outline-none transition placeholder:text-black/35 focus:border-black/50 focus:ring-2 focus:ring-black/10 dark:border-white/20 dark:bg-black dark:text-white dark:placeholder:text-white/35 dark:focus:border-white/50 dark:focus:ring-white/15 sm:min-h-44 sm:py-3 sm:text-sm"
                />
              </label>

              <label className="grid gap-1.5 text-xs font-medium text-black/75 dark:text-white/75 sm:gap-2 sm:text-sm">
                Reference URL <span className="text-black/40 dark:text-white/40">(optional)</span>
                <input
                  type="url"
                  placeholder="https://example.com/reference"
                  className="h-10 w-full rounded-lg border border-black/15 bg-white px-3 font-sans text-xs text-black outline-none transition placeholder:text-black/35 focus:border-black/50 focus:ring-2 focus:ring-black/10 dark:border-white/20 dark:bg-black dark:text-white dark:placeholder:text-white/35 dark:focus:border-white/50 dark:focus:ring-white/15 sm:h-11 sm:text-sm"
                />
              </label>

              <label className="grid gap-1.5 text-xs font-medium text-black/75 dark:text-white/75 sm:gap-2 sm:text-sm">
                GitHub Username <span className="text-black/40 dark:text-white/40">(optional)</span>
                <div className="flex h-10 items-center rounded-lg border border-black/15 bg-white px-3 transition focus-within:border-black/50 focus-within:ring-2 focus-within:ring-black/10 dark:border-white/20 dark:bg-black dark:focus-within:border-white/50 dark:focus-within:ring-white/15 sm:h-11">
                  <span className="font-sans text-xs text-black/35 dark:text-white/35 sm:text-sm">@</span>
                  <input
                    type="text"
                    placeholder="username"
                    className="h-full min-w-0 flex-1 bg-transparent pl-2 font-sans text-xs text-black outline-none placeholder:text-black/35 dark:text-white dark:placeholder:text-white/35 sm:text-sm"
                  />
                </div>
              </label>
            </div>

            <button
              type="submit"
              className="mt-5 inline-flex h-10 w-full items-center justify-center gap-2 rounded-lg border border-black bg-black px-4 font-pixel text-xs font-semibold text-white transition hover:bg-black/85 dark:border-white dark:bg-white dark:text-black dark:hover:bg-white/85 sm:mt-7 sm:h-11 sm:text-sm"
            >
              <Send size={16} />
              Submit Request
            </button>
          </form>
        </div>
      )}
    </footer>
  )
}

export default Footer2
