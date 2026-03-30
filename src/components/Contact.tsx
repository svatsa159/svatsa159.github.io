import { useEffect, useRef, useState, useCallback } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { prepareWithSegments, layoutWithLines } from '@chenglou/pretext'
import { ExternalLink, Mail } from 'lucide-react'

gsap.registerPlugin(ScrollTrigger)

const css = `
  .contact-section {
    padding: var(--section-padding);
    min-height: 80vh;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    text-align: center;
    max-width: 800px;
    margin: 0 auto;
  }
  .contact-pretext {
    margin-bottom: 3rem;
    opacity: 0;
  }
  .contact-pretext canvas {
    max-width: 100%;
  }
  .contact-heading {
    font-size: clamp(2rem, 5vw, 3.5rem);
    font-weight: 800;
    letter-spacing: -0.03em;
    margin-bottom: 1rem;
    opacity: 0;
  }
  .contact-heading .gold { color: var(--accent-gold); }
  .contact-sub {
    font-size: clamp(0.9rem, 1.3vw, 1.1rem);
    color: var(--text-secondary);
    margin-bottom: 3rem;
    line-height: 1.8;
    opacity: 0;
  }
  .contact-links {
    display: flex;
    gap: 1.5rem;
    flex-wrap: wrap;
    justify-content: center;
    opacity: 0;
  }
  .contact-link {
    display: flex;
    align-items: center;
    gap: 10px;
    padding: 12px 24px;
    border: 1px solid var(--border);
    border-radius: 8px;
    color: var(--text-secondary);
    font-family: var(--font-mono);
    font-size: 0.8rem;
    text-decoration: none;
    transition: all 0.3s ease;
    letter-spacing: 0.03em;
  }
  .contact-link:hover {
    border-color: var(--accent-blue);
    color: var(--accent-blue);
    background: var(--accent-blue-dim);
    transform: translateY(-2px);
  }
  .contact-footer {
    margin-top: 6rem;
    padding-top: 2rem;
    border-top: 1px solid var(--border);
    width: 100%;
    opacity: 0;
  }
  .contact-footer-text {
    font-family: var(--font-mono);
    font-size: 0.7rem;
    color: var(--text-muted);
    letter-spacing: 0.05em;
  }
  .contact-footer-text .blue { color: var(--accent-blue); }
`

const links = [
  { icon: <ExternalLink size={18} />, label: 'GitHub: svatsa159', url: 'https://github.com/svatsa159' },
  { icon: <ExternalLink size={18} />, label: '@svatsa159', url: 'https://instagram.com/svatsa159' },
  { icon: <ExternalLink size={18} />, label: 'Letterboxd', url: 'https://letterboxd.com/svatsa159' },
  { icon: <ExternalLink size={18} />, label: 'LinkedIn', url: '#' },
  { icon: <Mail size={18} />, label: 'Email', url: 'mailto:srivatsa.rampalli@example.com' },
]

export default function Contact() {
  const sectionRef = useRef<HTMLElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [canvasReady, setCanvasReady] = useState(false)

  // Pretext creative text rendering
  const renderPretext = useCallback(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const dpr = window.devicePixelRatio || 1
    const text = "Jack of All Trades, Master of Getting Shit Done."
    const font = '700 24px Inter, sans-serif'
    const maxWidth = Math.min(600, window.innerWidth - 80)

    canvas.style.width = `${maxWidth}px`
    canvas.width = maxWidth * dpr
    
    try {
      const prepared = prepareWithSegments(text, font)
      const result = layoutWithLines(prepared, maxWidth * dpr, 36 * dpr)

      canvas.style.height = `${result.height / dpr + 20}px`
      canvas.height = (result.height + 20 * dpr)

      ctx.scale(dpr, dpr)
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      result.lines.forEach((line, i) => {
        const y = 28 + i * 36
        // Draw each line with color effect
        ctx.font = font
        if (i === 0) {
          ctx.fillStyle = '#f0f0f0'
        } else {
          ctx.fillStyle = '#ffaa00'
        }
        ctx.fillText(line.text, 0, y)
      })
      setCanvasReady(true)
    } catch {
      // Fallback: just draw the text normally
      canvas.style.height = '80px'
      canvas.height = 80 * dpr
      ctx.scale(dpr, dpr)
      ctx.font = font
      ctx.fillStyle = '#ffaa00'
      ctx.fillText(text, 0, 40)
      setCanvasReady(true)
    }
  }, [])

  useEffect(() => {
    // Delay to ensure font is loaded
    const timeout = setTimeout(renderPretext, 500)
    return () => clearTimeout(timeout)
  }, [renderPretext])

  useEffect(() => {
    const el = sectionRef.current
    if (!el) return

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: el,
        start: 'top 65%',
      },
    })

    tl.to(el.querySelector('.contact-pretext'), { opacity: 1, duration: 0.6 })
      .to(el.querySelector('.contact-heading'), { opacity: 1, duration: 0.5 }, '-=0.3')
      .to(el.querySelector('.contact-sub'), { opacity: 1, duration: 0.5 }, '-=0.2')
      .to(el.querySelector('.contact-links'), { opacity: 1, duration: 0.5 }, '-=0.2')
      .to(el.querySelector('.contact-footer'), { opacity: 1, duration: 0.5 }, '-=0.1')
  }, [])

  return (
    <>
      <style>{css}</style>
      <section className="contact-section" id="contact" ref={sectionRef}>
        <div className="contact-pretext" style={{ opacity: 0, minHeight: canvasReady ? 'auto' : '60px' }}>
          <canvas ref={canvasRef} />
        </div>

        <h2 className="contact-heading" style={{ opacity: 0 }}>
          Let&apos;s <span className="gold">Build</span> Something
        </h2>
        <p className="contact-sub" style={{ opacity: 0 }}>
          Whether it&apos;s a distributed system, a production Kubernetes platform, 
          or just a conversation about the best pasta shape — I&apos;m all in.
        </p>

        <div className="contact-links" style={{ opacity: 0 }}>
          {links.map((link, i) => (
            <a
              key={i}
              href={link.url}
              target={link.url.startsWith('http') ? '_blank' : undefined}
              rel="noopener noreferrer"
              className="contact-link"
            >
              {link.icon}
              {link.label}
            </a>
          ))}
        </div>

        <div className="contact-footer" style={{ opacity: 0 }}>
          <div className="contact-footer-text">
            Designed & built with <span className="blue">React</span> + <span className="blue">GSAP</span> + <span className="blue">Pretext</span> — by Srivatsa Rampalli © 2026
          </div>
        </div>
      </section>
    </>
  )
}
