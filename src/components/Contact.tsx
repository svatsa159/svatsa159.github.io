import { useEffect, useRef, useState, useCallback } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { prepareWithSegments, layoutWithLines } from '@chenglou/pretext'
import { ExternalLink, Mail } from 'lucide-react'

gsap.registerPlugin(ScrollTrigger)

const css = `
  .contact-wrap {
    max-width: 860px;
    margin: 0 auto;
    text-align: center;
  }
  .contact-banner {
    border: 1px solid var(--border);
    border-radius: var(--radius-md);
    padding: clamp(18px, 3vw, 30px);
    background: linear-gradient(160deg, rgba(91, 168, 255, 0.12), rgba(255, 211, 138, 0.08));
    opacity: 0;
    transform: translateY(20px);
  }
  .contact-pretext {
    margin-bottom: 1.2rem;
    min-height: 70px;
  }
  .contact-pretext canvas {
    max-width: 100%;
    height: auto;
  }
  .contact-heading {
    font-size: clamp(1.8rem, 4vw, 3rem);
    letter-spacing: -0.03em;
    margin-bottom: 0.7rem;
  }
  .contact-heading .gold { color: var(--accent-gold-strong); }
  .contact-sub {
    color: var(--text-secondary);
    max-width: 62ch;
    margin: 0 auto 1.2rem;
  }
  .contact-links {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    gap: 9px;
  }
  .contact-link {
    display: inline-flex;
    align-items: center;
    gap: 8px;
    border: 1px solid var(--border);
    border-radius: 999px;
    padding: 9px 12px;
    font-family: var(--font-mono);
    font-size: 0.67rem;
    letter-spacing: 0.06em;
    text-transform: uppercase;
    color: var(--text-secondary);
    background: rgba(9, 14, 25, 0.6);
  }
  .contact-link:hover {
    color: var(--text-primary);
    border-color: var(--border-strong);
  }
  .contact-footer {
    margin-top: 1rem;
    font-family: var(--font-mono);
    font-size: 0.66rem;
    color: var(--text-muted);
    letter-spacing: 0.04em;
  }
`

const links = [
  { icon: <ExternalLink size={16} />, label: 'GitHub: svatsa159', url: 'https://github.com/svatsa159' },
  { icon: <ExternalLink size={16} />, label: 'Instagram @svatsa159', url: 'https://instagram.com/svatsa159' },
  { icon: <ExternalLink size={16} />, label: 'Letterboxd', url: 'https://letterboxd.com/svatsa159' },
  { icon: <Mail size={16} />, label: 'Email', url: 'mailto:svatsa159@gmail.com' },
]

export default function Contact() {
  const sectionRef = useRef<HTMLElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [canvasReady, setCanvasReady] = useState(false)

  const renderPretext = useCallback(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const dpr = window.devicePixelRatio || 1
    const text = 'Jack of All Trades, Master of Getting Shit Done.'
    const font = '700 24px Inter, sans-serif'
    const maxWidth = Math.min(650, window.innerWidth - 90)

    canvas.style.width = `${maxWidth}px`
    canvas.width = Math.floor(maxWidth * dpr)

    ctx.setTransform(1, 0, 0, 1, 0, 0)

    try {
      const prepared = prepareWithSegments(text, font)
      const result = layoutWithLines(prepared, maxWidth * dpr, 38 * dpr)

      canvas.height = Math.floor(result.height + 26 * dpr)
      canvas.style.height = `${canvas.height / dpr}px`

      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
      ctx.clearRect(0, 0, canvas.width / dpr, canvas.height / dpr)

      result.lines.forEach((line, i) => {
        ctx.font = font
        ctx.fillStyle = i === 0 ? '#e9edf8' : '#ffd38a'
        const lineWidth = ctx.measureText(line.text).width
        const x = Math.max(0, (maxWidth - lineWidth) / 2)
        ctx.fillText(line.text, x, 30 + i * 34)
      })
      setCanvasReady(true)
    } catch {
      canvas.height = Math.floor(84 * dpr)
      canvas.style.height = '84px'

      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
      ctx.clearRect(0, 0, canvas.width / dpr, canvas.height / dpr)
      ctx.font = font
      ctx.fillStyle = '#ffd38a'
      const textWidth = ctx.measureText(text).width
      const x = Math.max(0, (maxWidth - textWidth) / 2)
      ctx.fillText(text, x, 40)
      setCanvasReady(true)
    }
  }, [])

  useEffect(() => {
    const timeout = window.setTimeout(renderPretext, 350)
    window.addEventListener('resize', renderPretext)
    return () => {
      window.clearTimeout(timeout)
      window.removeEventListener('resize', renderPretext)
    }
  }, [renderPretext])

  useEffect(() => {
    const el = sectionRef.current
    if (!el) return

    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const banner = el.querySelector('.contact-banner')
    if (reduceMotion) {
      gsap.set(banner, { opacity: 1, y: 0 })
      return
    }

    gsap.to(banner, {
      opacity: 1,
      y: 0,
      duration: 0.68,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: el,
        start: 'top 76%',
      },
    })
  }, [])

  return (
    <>
      <style>{css}</style>
      <section id="contact" ref={sectionRef}>
        <div className="section-shell">
          <div className="contact-wrap">
            <div className="contact-banner">
              <div className="contact-pretext" style={{ opacity: canvasReady ? 1 : 0.6 }}>
                <canvas ref={canvasRef} />
              </div>
              <h2 className="contact-heading">Let&apos;s <span className="gold">Build</span> Something</h2>
              <p className="contact-sub">
                Whether it&apos;s a distributed system, a production Kubernetes platform, or just a conversation about the best pasta shape — I&apos;m all in.
              </p>
              <div className="contact-links">
                {links.map((link) => (
                  <a
                    key={link.label}
                    href={link.url}
                    target={link.url.startsWith('http') ? '_blank' : undefined}
                    rel={link.url.startsWith('http') ? 'noopener noreferrer' : undefined}
                    className="contact-link"
                  >
                    {link.icon}
                    {link.label}
                  </a>
                ))}
              </div>
              <div className="contact-footer">
                Designed & built with React + GSAP + Pretext — by Srivatsa Rampalli © 2026
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
