import { useEffect, useState } from 'react'

const links = [
  { label: 'About', href: '#about' },
  { label: 'Experience', href: '#experience' },
  { label: 'Projects', href: '#projects' },
  { label: 'Skills', href: '#skills' },
  { label: 'Life', href: '#lifestyle' },
  { label: 'Contact', href: '#contact' },
]

const css = `
  .nav-root {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    z-index: 1100;
    padding: 14px var(--section-x);
    transition: transform 0.25s ease;
  }
  .nav-shell {
    max-width: var(--content-max);
    margin: 0 auto;
    padding: 10px 14px;
    border: 1px solid transparent;
    border-radius: 999px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    backdrop-filter: blur(0px);
    transition: all 0.3s ease;
  }
  .nav-shell.scrolled {
    border-color: var(--border);
    background: rgba(9, 14, 25, 0.78);
    box-shadow: var(--shadow-soft);
    backdrop-filter: blur(14px);
  }
  .nav-brand {
    display: inline-flex;
    align-items: center;
    gap: 10px;
    color: var(--text-primary);
    font-family: var(--font-mono);
    font-size: 0.8rem;
    letter-spacing: 0.08em;
    text-transform: uppercase;
  }
  .nav-brand-mark {
    width: 28px;
    height: 28px;
    border-radius: 50%;
    border: 1px solid var(--border-strong);
    display: inline-flex;
    align-items: center;
    justify-content: center;
    color: var(--accent-blue);
    background: rgba(91, 168, 255, 0.1);
    font-size: 0.7rem;
  }
  .nav-links {
    list-style: none;
    display: flex;
    align-items: center;
    gap: 8px;
  }
  .nav-link {
    color: var(--text-secondary);
    font-family: var(--font-mono);
    font-size: 0.68rem;
    letter-spacing: 0.09em;
    text-transform: uppercase;
    padding: 8px 12px;
    border-radius: 999px;
    border: 1px solid transparent;
    transition: all 0.2s ease;
  }
  .nav-link:hover,
  .nav-link:focus-visible {
    color: var(--text-primary);
    border-color: var(--border);
    background: rgba(91, 168, 255, 0.1);
    outline: none;
  }
  .nav-toggle {
    display: none;
    border: 1px solid var(--border);
    border-radius: 10px;
    background: var(--bg-card-solid);
    color: var(--text-primary);
    padding: 8px 10px;
    font-family: var(--font-mono);
    font-size: 0.72rem;
    letter-spacing: 0.06em;
  }
  .nav-mobile {
    margin-top: 10px;
    border: 1px solid var(--border);
    border-radius: 16px;
    padding: 12px;
    background: rgba(9, 14, 25, 0.95);
    display: grid;
    gap: 8px;
  }
  .nav-mobile .nav-link {
    display: block;
    width: 100%;
    text-align: left;
    padding: 10px;
  }
  @media (max-width: 860px) {
    .nav-links { display: none; }
    .nav-toggle { display: inline-flex; }
  }
`

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 18)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <>
      <style>{css}</style>
      <nav className="nav-root" aria-label="Primary">
        <div className={`nav-shell ${scrolled ? 'scrolled' : ''}`}>
          <a href="#hero" className="nav-brand" aria-label="Go to top">
            <span className="nav-brand-mark">SR</span>
            Srivatsa Rampalli
          </a>

          <ul className="nav-links">
            {links.map((item) => (
              <li key={item.href}>
                <a href={item.href} className="nav-link">{item.label}</a>
              </li>
            ))}
          </ul>

          <button
            className="nav-toggle"
            onClick={() => setMobileOpen((prev) => !prev)}
            aria-expanded={mobileOpen}
            aria-controls="mobile-menu"
          >
            Menu
          </button>
        </div>

        {mobileOpen && (
          <div id="mobile-menu" className="nav-mobile">
            {links.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className="nav-link"
                onClick={() => setMobileOpen(false)}
              >
                {item.label}
              </a>
            ))}
          </div>
        )}
      </nav>
    </>
  )
}
