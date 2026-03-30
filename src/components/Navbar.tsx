import { useState, useEffect } from 'react'

const links = [
  { label: 'About', href: '#about' },
  { label: 'Experience', href: '#experience' },
  { label: 'Projects', href: '#projects' },
  { label: 'Skills', href: '#skills' },
  { label: 'Life', href: '#lifestyle' },
  { label: 'Contact', href: '#contact' },
]

const styles: Record<string, React.CSSProperties> = {
  nav: {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    zIndex: 1000,
    padding: '0 clamp(20px, 5vw, 80px)',
    height: '60px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    transition: 'all 0.3s ease',
  },
  logo: {
    fontFamily: 'var(--font-mono)',
    fontSize: '0.85rem',
    color: 'var(--accent-blue)',
    letterSpacing: '0.05em',
    fontWeight: 600,
  },
  links: {
    display: 'flex',
    gap: '2rem',
    listStyle: 'none',
  },
  link: {
    fontFamily: 'var(--font-mono)',
    fontSize: '0.75rem',
    color: 'var(--text-secondary)',
    textDecoration: 'none',
    letterSpacing: '0.05em',
    transition: 'color 0.2s ease',
    cursor: 'pointer',
  },
  mobileToggle: {
    display: 'none',
    background: 'none',
    border: 'none',
    color: 'var(--text-primary)',
    fontSize: '1.5rem',
    cursor: 'pointer',
  },
}

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50)
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const navStyle = {
    ...styles.nav,
    background: scrolled ? 'rgba(10, 10, 10, 0.9)' : 'transparent',
    backdropFilter: scrolled ? 'blur(20px)' : 'none',
    borderBottom: scrolled ? '1px solid var(--border)' : '1px solid transparent',
  }

  return (
    <nav style={navStyle}>
      <a href="#" style={styles.logo}>SR</a>

      <button
        style={{
          ...styles.mobileToggle,
          display: 'none',
        }}
        onClick={() => setMobileOpen(!mobileOpen)}
        aria-label="Toggle menu"
      >
        ☰
      </button>

      <ul style={styles.links} className="nav-links">
        {links.map((l) => (
          <li key={l.href}>
            <a
              href={l.href}
              style={styles.link}
              onMouseEnter={(e) => (e.currentTarget.style.color = 'var(--accent-blue)')}
              onMouseLeave={(e) => (e.currentTarget.style.color = 'var(--text-secondary)')}
            >
              {l.label}
            </a>
          </li>
        ))}
      </ul>

      {mobileOpen && (
        <ul style={{
          position: 'fixed',
          top: '60px',
          left: 0,
          right: 0,
          background: 'rgba(10,10,10,0.98)',
          padding: '2rem',
          listStyle: 'none',
          display: 'flex',
          flexDirection: 'column',
          gap: '1.5rem',
          borderBottom: '1px solid var(--border)',
        }}>
          {links.map((l) => (
            <li key={l.href}>
              <a
                href={l.href}
                style={{ ...styles.link, fontSize: '1rem' }}
                onClick={() => setMobileOpen(false)}
              >
                {l.label}
              </a>
            </li>
          ))}
        </ul>
      )}

      <style>{`
        @media (max-width: 768px) {
          .nav-links { display: none !important; }
          nav button { display: block !important; }
        }
      `}</style>
    </nav>
  )
}
