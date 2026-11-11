import { ArrowUp } from 'lucide-react'
import { Link, useLocation } from 'react-router-dom'
import { Logo } from './Logo'
import { scrollToTop } from './ScrollManager'

interface FooterLink {
  label: string
  to: string
}

// Tells ScrollManager to glide to the top of the destination page.
const NAV_STATE = { scrollTop: true }

const COMPANY_URL = 'https://nnaisolution.com/'

// "About" lives on the landing page (#about). There is no Contact page or section, so
// no Contact link is shown (add one here only when a real destination exists).
const EXPLORE_LINKS: FooterLink[] = [
  { label: 'Home', to: '/' },
  { label: 'About', to: '/#about' },
  { label: 'Learning Activities', to: '/app' },
]

const LEARNING_LINKS: FooterLink[] = [
  { label: 'Block Coding', to: '/app/blocks' },
  { label: 'Brain Training', to: '/app/thinking' },
  { label: 'Digital Citizenship', to: '/app/safety' },
]

const linkClass =
  'inline-block py-0.5 text-sm text-purple-200/85 hover:text-white hover:translate-x-0.5 hover:underline underline-offset-4 decoration-purple-400 transition-all duration-200 rounded focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-purple-300'

function Column({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <nav aria-label={title}>
      <h2 className="text-sm font-extrabold uppercase tracking-wider text-white mb-4">{title}</h2>
      <ul className="space-y-2">{children}</ul>
    </nav>
  )
}

export function Footer() {
  const { pathname, hash } = useLocation()

  // Clicking Home while already on "/" would not scroll anywhere by itself.
  const handleSameTarget = (to: string) => () => {
    if (to === '/' && pathname === '/' && !hash) scrollToTop()
  }

  return (
    <footer className="relative z-10 mt-12 border-t border-purple-900/40 bg-[#0A0618]/95 text-white">
      <div className="max-w-6xl mx-auto px-5 sm:px-8 py-12 grid gap-10 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
        <div>
          <Link
            to="/"
            state={NAV_STATE}
            onClick={handleSameTarget('/')}
            aria-label="Fun with NN — home"
            className="inline-flex items-center gap-2.5 mb-3 rounded focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-purple-300"
          >
            <Logo size={36} />
            <span className="font-black text-lg">Fun with NN</span>
          </Link>
          <p className="text-sm text-purple-200/85 leading-relaxed max-w-xs">
            Making learning fun through coding, creativity, and interactive challenges.
          </p>
          <p className="mt-3 text-xs font-semibold text-purple-300">
            An educational initiative by NN AI Solutions.
          </p>
        </div>

        <Column title="Explore">
          {EXPLORE_LINKS.map(l => (
            <li key={l.to}>
              <Link to={l.to} state={NAV_STATE} onClick={handleSameTarget(l.to)} className={linkClass}>{l.label}</Link>
            </li>
          ))}
        </Column>

        <Column title="Learning">
          {LEARNING_LINKS.map(l => (
            <li key={l.to}>
              <Link to={l.to} state={NAV_STATE} className={linkClass}>{l.label}</Link>
            </li>
          ))}
        </Column>

        <section aria-label="Our Company">
          <h2 className="text-sm font-extrabold uppercase tracking-wider text-white mb-4">Our Company</h2>
          <p className="font-bold text-white">NN AI Solutions</p>
          <p className="text-xs font-semibold text-pink-300 mb-2">Where AI Meets Innovation.</p>
          <p className="text-sm text-purple-200/85 leading-relaxed">
            NN AI Solutions is an AI-first technology company building intelligent software,
            artificial intelligence solutions, and digital transformation platforms.
          </p>
          <p className="mt-3 text-sm text-purple-200/85">
            <span className="font-semibold text-white">Location:</span> Nizamabad, Telangana, India
          </p>
          <a
            href={COMPANY_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-3 inline-flex items-center rounded-lg px-3.5 py-2 text-sm font-bold text-white transition-opacity hover:opacity-90 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-purple-300"
            style={{ background: 'linear-gradient(135deg, #7C3AED, #EC4899)' }}
          >
            Visit NN AI Solutions →<span className="sr-only"> (opens in a new tab)</span>
          </a>
        </section>
      </div>

      <div className="border-t border-white/10 bg-black/30">
        <div className="max-w-6xl mx-auto px-5 sm:px-8 py-4 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-purple-200/75">
          <p>© 2026 Fun with NN. All rights reserved.</p>
          <p>Powered by NN AI Solutions.</p>
          <button
            type="button"
            onClick={scrollToTop}
            className="inline-flex items-center gap-1.5 rounded-full border border-purple-400/30 px-3 py-1.5 font-semibold text-purple-100 hover:bg-white/10 hover:text-white transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-purple-300"
          >
            <ArrowUp className="w-3.5 h-3.5" aria-hidden="true" />
            Back to top
          </button>
        </div>
      </div>
    </footer>
  )
}
