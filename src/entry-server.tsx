import { renderToString } from 'react-dom/server'
import { LanguageProvider } from './i18n/LanguageProvider'
import { StaticRouter } from 'react-router-dom'
import { Footer } from './components/Footer'
import { LandingScreen } from './screens/LandingScreen'

/**
 * Renders the landing page to a static HTML string at build time (see
 * scripts/prerender.mjs). Built via `vite build --ssr` (not a plain Node/Bun import)
 * so vite.config.ts's `define` values (__COMMIT_SHA__, __BUILD_DATE__ — used by
 * Footer) are applied the same way they are for the client bundle.
 */
export function renderLandingPage(): string {
  return renderToString(
    <LanguageProvider forcedInitialLanguage="en">
      <StaticRouter location="/">
        <LandingScreen onStart={() => {}} hasProgress={false} />
        <Footer />
      </StaticRouter>
    </LanguageProvider>,
  )
}
